import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container, Main, FilterOptions, DisplayButton } from './styles';

import SvgList from '../../assets/SvgList';
import SvgGrid from '../../assets/SvgGrid';

import { reposRequest, userRequest } from '../../store/modules/user/actions';
import { getFromLocalStorage } from '../../helpers/local-storage';
import { useToast } from '../../hooks/useToast';

import Header from '../../components/Header';
import Repositories from './components/Repositories';
import ProfileCard from './components/ProfileCard';

export default function Dashboard() {
  const { repos, user } = useSelector((state: RootStateOrAny) => state.user);

  const [isListActive, setListActive] = useState(true);
  const [isGridActive, setGridActive] = useState(false);

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser = getFromLocalStorage('@Github: user');

    if (user?.login) {
      dispatch(reposRequest(user));
      return;
    } else if (localStorageUser?.login) {
      dispatch(userRequest(localStorageUser.login));
    } else {
      navigate('/', { replace: true });
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Para acessar o dashboard, é necessário buscar o usuário antes'
      });
      return;
    }
  }, [user?.login]);

  return (
    <Container>
      <Header />
      <Main>
        <FilterOptions>
          <input type="search" />

          <ul>
            <li>Mais recentes</li>
            <li>Stars</li>
            <li>Linguagens</li>
          </ul>

          <section>
            <DisplayButton
              active={isListActive}
              className="list"
              onClick={() => {
                setListActive(true);
                setGridActive(false);
              }}
            >
              <SvgList />
            </DisplayButton>

            <DisplayButton
              active={isGridActive}
              className="grid"
              onClick={() => {
                setListActive(false);
                setGridActive(true);
              }}
            >
              <SvgGrid />
            </DisplayButton>
          </section>
        </FilterOptions>

        {user && <ProfileCard user={user} />}
        {repos && <Repositories isListActive={isListActive} repos={repos} />}
      </Main>
    </Container>
  );
}
