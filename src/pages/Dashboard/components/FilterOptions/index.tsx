import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Container, FilterContent, ButtonContent, Button, MenuContent } from './styles';

import SvgList from '../../../../assets/SvgList';
import SvgGrid from '../../../../assets/SvgGrid';
import SvgSearch from '../../../../assets/SvgSearch';
import Input from '../../../../components/Input';

import { setDisplayRepos, searchRepoRequest } from '../../../../store/modules/repos/actions';
import { handleQueryParams, setUrlQuery } from '../../../../helpers/url-search-params';

export default function Options() {
  const { isListActive, isGridActive } = useSelector((state: RootStateOrAny) => state.repos);
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  const [searchValue, setSearchValue] = useState('');
  const [isStarred, setIsStarred] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit() {
    dispatch(searchRepoRequest(user.login, searchValue));
  }

  function handleReposMenu(type: string) {
    const { queryValue, queryPage, querySize } = handleQueryParams();
    const { urlQuery } = setUrlQuery(queryValue, queryPage, querySize, type);
    navigate(urlQuery, { replace: true });

    if (type === 'starred') setIsStarred(true);
    if (type === 'all') setIsStarred(false);

    setSearchValue('');
  }

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
          <button onClick={() => handleReposMenu('all')} disabled={!isStarred} className={!isStarred ? 'active' : ''}>
            Mostrar todos
          </button>

          <button onClick={() => handleReposMenu('starred')} disabled={isStarred} className={isStarred ? 'active' : ''}>
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
