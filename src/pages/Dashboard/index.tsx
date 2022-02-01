import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Container, Main } from './styles';

import { userRequest } from '../../store/modules/user/actions';
import { reposRequest } from '../../store/modules/repos/actions';
import { useToast } from '../../hooks/useToast';

import Header from '../../components/Header';
import Repositories from './components/Repositories';
import ProfileCard from './components/ProfileCard';
import FilterOptions from './components/FilterOptions';

export default function Dashboard() {
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const { isListActive, repos, filteredRepos } = useSelector((state: RootStateOrAny) => state.repos);

  const [reposList, setReposList] = useState(null);

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { queryValue } = handleQueryParams();

    if (!queryValue) {
      navigate('/', { replace: true });
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Para acessar o dashboard, é necessário buscar o usuário antes'
      });
      return;
    }

    dispatch(userRequest(queryValue));
  }, []);

  useEffect(() => {
    if (user?.login) {
      const { queryValue, queryPage, querySize } = handleQueryParams();
      dispatch(reposRequest(queryValue, queryPage, querySize));
    }
  }, [location, user]);

  const handleQueryParams = () => {
    const query = new URLSearchParams(location.search);
    const queryValue = query.get('username');
    const queryPage = Number(query.get('page'));
    const querySize = Number(query.get('size'));

    return { queryValue, queryPage, querySize };
  };

  return (
    <Container>
      <Header />
      <Main>
        <FilterOptions />
        {user && <ProfileCard user={user} />}
        {filteredRepos && <Repositories isListActive={isListActive} reposList={filteredRepos} pageable={repos.pageable} />}
      </Main>
    </Container>
  );
}
