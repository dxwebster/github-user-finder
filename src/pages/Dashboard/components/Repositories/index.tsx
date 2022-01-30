import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Container, RepositoriesList, PaginationContainer, Arrow } from './styles';

import { reposRequest } from '../../../../store/modules/user/actions';
import { Repository } from '../../../../interfaces/Repository';
import Pageable from '../../../../components/Pageable';

export default function Repositories({ isListActive, repos }) {
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <RepositoriesList displayList={isListActive}>
        {repos?.data?.map((repo: Repository) => (
          <li key={repo?.full_name}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              <div>
                <span>{repo?.full_name}</span>
                {repo?.description && <p>{repo.description}</p>}
              </div>
              <Arrow>
                <FiChevronRight size={20} />
              </Arrow>
            </a>
          </li>
        ))}
      </RepositoriesList>

      <PaginationContainer>
        {repos?.pageable?.totalPages > 1 && (
          <Pageable
            data={repos.pageable}
            serviceRequest={(_: any, currentPage: number) => {
              dispatch(reposRequest(user, currentPage));
            }}
          />
        )}
      </PaginationContainer>
    </Container>
  );
}
