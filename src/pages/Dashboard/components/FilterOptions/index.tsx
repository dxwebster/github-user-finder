import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Container, FilterContent, ButtonContent, Button, MenuContent } from './styles';

import SvgList from '../../../../assets/SvgList';
import SvgGrid from '../../../../assets/SvgGrid';
import SvgSearch from '../../../../assets/SvgSearch';
import Input from '../../../../components/Input';

import { setDisplayRepos, searchRepoRequest, reposRequest, starredReposRequest } from '../../../../store/modules/repos/actions';

export default function Options() {
  const { isListActive, isGridActive, repos } = useSelector((state: RootStateOrAny) => state.repos);
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const [activeItem, setActiveItem] = useState(true);
  const [activeStarredItem, setActiveStarredItem] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(searchRepoRequest(user.login, searchValue));
  }

  useEffect(() => {
    if (repos?.data?.length === 1) {
      setActiveItem(false);
    }
  }, [repos?.data]);

  return (
    <Container>
      <FilterContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="filter"
            icon={SvgSearch}
            hasValidation={false}
            hasBorder={true}
            inputHeight="4.1rem"
            placeholder="Busque por nome de repositório"
            radius="left"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" disabled={searchValue === ''}>
            Procurar
          </button>
        </Form>

        <MenuContent>
          <button
            onClick={() => {
              dispatch(reposRequest(user.login));
              setActiveItem(true);
              setActiveStarredItem(false);
              setSearchValue('');
            }}
            className={activeItem ? 'active' : ''}
          >
            Mostrar todos
          </button>

          <button
            onClick={() => {
              dispatch(starredReposRequest(user.login));
              setActiveStarredItem(true);
              setActiveItem(false);
              setSearchValue('');
            }}
            className={activeStarredItem ? 'active' : ''}
          >
            Starred
          </button>
        </MenuContent>

        <ButtonContent>
          <Button active={isListActive} className="list" onClick={() => dispatch(setDisplayRepos(true, false))}>
            <SvgList />
          </Button>

          <Button active={isGridActive} className="grid" onClick={() => dispatch(setDisplayRepos(false, true))}>
            <SvgGrid />
          </Button>
        </ButtonContent>
      </FilterContent>
    </Container>
  );
}
