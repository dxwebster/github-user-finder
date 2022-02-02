import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Container, FilterContent, ButtonContent, Button, MenuContent } from './styles';

import SvgList from '../../../../assets/SvgList';
import SvgGrid from '../../../../assets/SvgGrid';

import { setDisplayRepos, setIsStarred } from '../../../../store/modules/repos/actions';
import { handleQueryParams, setUrlQuery } from '../../../../helpers/url-search-params';
import SvgStar from '../../../../assets/SvgStar';

export default function Options() {
  const { isListActive, isGridActive, isStarred } = useSelector((state: RootStateOrAny) => state.repos);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleReposMenu(type: string) {
    const { queryValue, queryPage, querySize } = handleQueryParams();
    const { urlQuery } = setUrlQuery(queryValue, queryPage, querySize, type);
    navigate(urlQuery, { replace: true });

    if (type === 'starred') dispatch(setIsStarred(true));
    if (type === 'all') dispatch(setIsStarred(false));
  }

  useEffect(() => {
    const { queryType } = handleQueryParams();
    if (queryType === 'starred') dispatch(setIsStarred(true));
  }, []);

  return (
    <Container>
      <FilterContent>
        <MenuContent>
          <button onClick={() => handleReposMenu('all')} disabled={!isStarred} className={!isStarred ? 'active' : ''}>
            Mostrar todos
          </button>

          <button onClick={() => handleReposMenu('starred')} disabled={isStarred} className={isStarred ? 'active' : ''}>
            <SvgStar /> Starred
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
