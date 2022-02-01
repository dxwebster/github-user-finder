import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';

import {
  Container,
  RepositoriesList,
  TitleContent,
  ArrowContent,
  InfosContent,
  PaginationContent,
  MessageContent
} from './styles';

import { Repository } from '../../../../interfaces/Repository';
import Pageable from '../../../../components/Pageable';
import { handleQueryParams, setUrlQuery } from '../../../../helpers/url-search-params';

import SvgStar from '../../../../assets/SvgStar';
import SvgFork from '../../../../assets/SvgFork';
import SvgWatch from '../../../../assets/SvgWatch';
import { RootStateOrAny, useSelector } from 'react-redux';

export default function Repositories({ isListActive, reposList, pageable }) {
  const [elementsPerPage, setElementsPerPage] = useState(4);
  const { notFound } = useSelector((state: RootStateOrAny) => state.repos);
  const navigate = useNavigate();

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

  return (
    <Container>
      <RepositoriesList displayList={isListActive}>
        {notFound && <MessageContent>Repositório não encontrado.</MessageContent>}

        {!notFound &&
          reposList?.map((repo: Repository) => (
            <a key={repo?.name} href={repo.html_url} target="_blank" rel="noreferrer">
              <TitleContent>
                <h2>{repo?.name}</h2>
                <p>{repo.description || 'Sem descrição'}</p>
              </TitleContent>

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
            </a>
          ))}
      </RepositoriesList>

      <PaginationContent>
        <select onChange={(e) => setElementsPerPage(Number(e.target.value))}>
          {querySizeList.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>

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
    </Container>
  );
}
