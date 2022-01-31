import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';

import { Container, RepositoriesList, TitleContent, ArrowContent, InfosContent, PaginationContainer } from './styles';

import { Repository } from '../../../../interfaces/Repository';
import Pageable from '../../../../components/Pageable';

import SvgStar from '../../../../assets/SvgStar';
import SvgFork from '../../../../assets/SvgFork';
import SvgWatch from '../../../../assets/SvgWatch';

export default function Repositories({ isListActive, repos }) {
  const navigate = useNavigate();

  const handleQueryParams = () => {
    const query = new URLSearchParams(location.search);
    const queryValue = query.get('username');
    const queryPage = query.get('page');
    const querySize = query.get('size');

    return { queryValue, queryPage, querySize };
  };

  return (
    <Container>
      <RepositoriesList displayList={isListActive}>
        {repos?.data?.map((repo: Repository) => (
          <a key={repo?.full_name} href={repo.html_url} target="_blank" rel="noreferrer">
            <TitleContent>
              <h2>{repo?.full_name}</h2>
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

      <PaginationContainer>
        {repos?.pageable?.totalPages > 1 && (
          <Pageable
            data={repos.pageable}
            serviceRequest={(_: any, currentPage: number) => {
              const { queryValue, querySize } = handleQueryParams();
              const urlQuery = `/dashboard?username=${queryValue}&page=${currentPage}&size=${querySize}`;
              navigate(urlQuery, { replace: true });
            }}
          />
        )}
      </PaginationContainer>
    </Container>
  );
}
