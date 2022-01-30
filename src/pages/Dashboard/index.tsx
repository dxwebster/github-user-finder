import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container, Main, FilterOptions, ProfileContainer, DisplayButton } from './styles';

import Header from '../../components/Header';
import Repositories from '../../components/Repositories';
import SvgList from '../../assets/SvgList';
import SvgGrid from '../../assets/SvgGrid';
import { reposRequest, setLoadingUserSearch, userRequest } from '../../store/modules/user/actions';
import { useToast } from '../../hooks/useToast';
import { getFromLocalStorage } from '../../helpers/local-storage';

export default function Dashboard() {
  const [isListActive, setListActive] = useState(true);
  const [isGridActive, setGridActive] = useState(false);

  const { repos, user } = useSelector((state: RootStateOrAny) => state.user);

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reposRequest(user?.login));
  }, []);

  useEffect(() => {
    const localStorageUser = getFromLocalStorage('@Github: user');

    if (!user?.login) {
      if (!localStorageUser?.login) {
        navigate('/', { replace: true });
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Para acessar o dashboard, é necessário buscar o usuário antes'
        });
      } else {
        dispatch(userRequest(localStorageUser.login));
        dispatch(reposRequest(localStorageUser.login));
      }
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

        <ProfileContainer>
          {user?.name && (
            <ul>
              <li> {user?.name}</li>
              <li> {user?.login}</li>
              <li> {user?.bio}</li>
              <li>
                <img src={user?.avatar_url} alt="" width={20} />
              </li>
              <li> {user?.location}</li>
              <li> {user?.starred_url}</li>
              <li> {user?.repos_url}</li>
            </ul>
          )}
        </ProfileContainer>

        {repos && <Repositories isListActive={isListActive} repos={repos} />}
      </Main>
    </Container>
  );
}
