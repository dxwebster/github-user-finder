import React, { useEffect } from 'react';
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
import Pageable from '../../components/Pageable';

export default function Dashboard() {
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const { isListActive, repos } = useSelector((state: RootStateOrAny) => state.repos);

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location);

    const { queryValue, queryPage, querySize } = handleQueryParams();

    if (!queryValue && !queryPage && !querySize) {
      navigate('/', { replace: true });
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Para acessar o dashboard, é necessário buscar o usuário antes'
      });
      return;
    }

    dispatch(userRequest(queryValue));
    handleReposRequest(queryValue, queryPage, querySize);
  }, [location]);

  useEffect(() => {
    if (user) {
      const { queryValue, queryPage, querySize } = handleQueryParams();
      handleReposRequest(queryValue, queryPage, querySize);
    }
  }, [user]);

  const handleQueryParams = () => {
    const query = new URLSearchParams(location.search);
    const queryValue = query.get('username');
    const queryPage = query.get('page');
    const querySize = query.get('size');

    return { queryValue, queryPage, querySize };
  };

  const handleReposRequest = (queryValue: string, queryPage: string, querySize: string) => {
    dispatch(reposRequest(queryValue, queryPage, querySize));
  };

  return (
    <Container>
      <Header />
      <Main>
        <FilterOptions />
        {user && <ProfileCard user={user} />}
        {repos && <Repositories isListActive={isListActive} repos={repos} />}
      </Main>
    </Container>
  );
}
