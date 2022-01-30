import React, { useState, useEffect, useRef } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Main, FilterOptions, ButtonContainer, Button, FilterMenu, ListHeader } from './styles';

import SvgList from '../../assets/SvgList';
import SvgGrid from '../../assets/SvgGrid';
import SvgSearch from '../../assets/SvgSearch';

import { reposRequest, userRequest } from '../../store/modules/user/actions';
import { getFromLocalStorage } from '../../helpers/local-storage';
import { useToast } from '../../hooks/useToast';

import Header from '../../components/Header';
import Repositories from './components/Repositories';
import ProfileCard from './components/ProfileCard';
import Input from '../../components/Input';

export default function Dashboard() {
  const { repos, user } = useSelector((state: RootStateOrAny) => state.user);

  const [isListActive, setListActive] = useState(true);
  const [isGridActive, setGridActive] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

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

  function handleSubmit() {
    return;
  }

  const filterMenu = ['Mais recentes', 'Stars', 'Linguagens'];

  const handleActive = (index) => {
    setActiveItem(index);
  };

  return (
    <Container>
      <Header />
      <Main>
        <ListHeader>
          <FilterOptions>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input type="search" name="filter" icon={SvgSearch} hasValidation={false} hasBorder={true} inputHeight="4rem" />
            </Form>

            <FilterMenu>
              {filterMenu.map((item, index) => (
                <a key={index} onClick={() => handleActive(index)} className={activeItem === index ? 'active' : ''}>
                  {item}
                </a>
              ))}
            </FilterMenu>
          </FilterOptions>

          <ButtonContainer>
            <Button
              active={isListActive}
              className="list"
              onClick={() => {
                setListActive(true);
                setGridActive(false);
              }}
            >
              <SvgList />
            </Button>

            <Button
              active={isGridActive}
              className="grid"
              onClick={() => {
                setListActive(false);
                setGridActive(true);
              }}
            >
              <SvgGrid />
            </Button>
          </ButtonContainer>
        </ListHeader>

        {user && <ProfileCard user={user} />}
        {repos && <Repositories isListActive={isListActive} repos={repos} />}
      </Main>
    </Container>
  );
}
