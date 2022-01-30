import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Container, RepositoriesList } from './styles';

import { reposRequest } from '../../../../store/modules/user/actions';
import { Repository } from '../../../../interfaces/Repository';
import Pageable from '../../../../components/Pageable';

export default function Repositories({ isListActive, repos }) {
  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      {repos?.pageable?.totalPages > 1 && (
        <Pageable
          style={{ justifyContent: 'center', width: '70%' }}
          data={repos.pageable}
          serviceRequest={(_, currentPage) => {
            dispatch(reposRequest(user, currentPage));
          }}
        />
      )}

      <RepositoriesList displayList={isListActive}>
        {repos?.data?.map((repo: Repository) => (
          <section key={repo?.full_name}>
            <Link to="/dashboard">
              <div>
                <span>{repo?.full_name}</span>
                {repo?.description && <p>{repo.description}</p>}
              </div>
              <FiChevronRight size={20} />
            </Link>
          </section>
        ))}
      </RepositoriesList>
    </Container>
  );
}
