import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Container, RepositoriesList } from './styles';
import { Repository } from '../../interfaces/Repository';
import Pageable from '../Pageable';
import { userRequest } from '../../store/modules/user/actions';

export default function Repositories({ isListActive, repos }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.user);

  return (
    <Container>
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

      {repos?.pageable?.totalPages > 1 && (
        <Pageable
          style={{ justifyContent: 'center', width: '70%' }}
          data={repos.pageable}
          size={repos.pageable.size}
          serviceRequest={(_, currentPage) => dispatch(userRequest(user.login, currentPage))}
        />
      )}
    </Container>
  );
}
