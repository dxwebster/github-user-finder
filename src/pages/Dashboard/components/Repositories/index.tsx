import React, { useEffect, useRef, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {
  Container,
  RepositoriesList,
  TitleContent,
  ArrowContent,
  InfosContent,
  PaginationContent,
  MessageContent,
  TableHeader,
  IconsWrapper
} from './styles';

import { Repository } from '../../../../interfaces/Repository';
import { handleQueryParams, setUrlQuery } from '../../../../helpers/url-search-params';
import { searchRepoRequest, setIsStarred } from '../../../../store/modules/repos/actions';

import SvgStar from '../../../../assets/SvgStar';
import SvgFork from '../../../../assets/SvgFork';
import SvgWatch from '../../../../assets/SvgWatch';
import SvgSearch from '../../../../assets/SvgSearch';
import Input from '../../../../components/Input';
import Pageable from '../../../../components/Pageable';

export default function Repositories({ isListActive, reposList, pageable }) {
  const { notFound, isStarred } = useSelector((state: RootStateOrAny) => state.repos);

  const [elementsPerPage, setElementsPerPage] = useState(4);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const querySizeList = [
    { value: 4, label: 4 },
    { value: 6, label: 6 },
    { value: 8, label: 8 }
  ];

  useEffect(() => {
    const { queryValue, queryPage, queryType } = handleQueryParams();
    const { urlQuery } = setUrlQuery(queryValue, queryPage, elementsPerPage, queryType);
    navigate(urlQuery, { replace: true });
  }, [elementsPerPage]);

  function handleSubmit() {
    const { queryValue } = handleQueryParams();
    dispatch(searchRepoRequest(queryValue, searchValue));
    dispatch(setIsStarred(false));
  }

  return (
    <Container>
      <TableHeader>
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
            disabled={isStarred}
          />
          <button type="submit" disabled={searchValue === ''}>
            Procurar
          </button>
        </Form>

        <PaginationContent>
          <section>
            <span>Exibir</span>
            <select onChange={(e) => setElementsPerPage(Number(e.target.value))}>
              {querySizeList.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <span>Itens por página</span>
          </section>

          {!notFound && pageable?.totalPages > 1 && elementsPerPage && (
            <Pageable
              data={pageable}
              serviceRequest={(_: any, currentPage: number) => {
                const { queryValue, queryType } = handleQueryParams();
                const { urlQuery } = setUrlQuery(queryValue, currentPage, elementsPerPage, queryType);
                navigate(urlQuery, { replace: true });
              }}
            />
          )}
        </PaginationContent>
      </TableHeader>

      <RepositoriesList displayList={isListActive}>
        {notFound && <MessageContent>Repositório não encontrado.</MessageContent>}

        {!notFound &&
          reposList?.map((repo: Repository) => (
            <a key={repo?.name} href={repo.html_url} target="_blank" rel="noreferrer">
              <TitleContent>
                <h2>{repo?.name}</h2>
                <p>{repo.description || 'Sem descrição'}</p>
              </TitleContent>
              <IconsWrapper>
                <InfosContent>
                  <li>
                    <SvgWatch />
                    <span>{repo?.watchers || '0'}</span>
                    <div>Watchs</div>
                  </li>

                  <li>
                    <SvgStar />
                    <span>{repo?.stars || '0'}</span>
                    <div>Stars</div>
                  </li>

                  <li>
                    <SvgFork />
                    <span>{repo?.forks || '0'}</span>
                    <div>Forks</div>
                  </li>
                </InfosContent>

                <ArrowContent>
                  <div>
                    <FiChevronRight size={20} />
                  </div>
                </ArrowContent>
              </IconsWrapper>
            </a>
          ))}
      </RepositoriesList>
    </Container>
  );
}
