import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Container, Main, FilterOptions, ProfileContainer, DisplayButton } from './styles';

import Header from '../../components/Header';
import Repositories from '../../components/Repositories';
import SvgList from '../../assets/SvgList';
import SvgGrid from '../../assets/SvgGrid';

export default function Dashboard() {
  const [isListActive, setListActive] = useState(true);
  const [isGridActive, setGridActive] = useState(false);
  const { repos, user } = useSelector((state: RootStateOrAny) => state.user);

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

        <Repositories isListActive={isListActive} repos={repos} />
      </Main>
    </Container>
  );
}
