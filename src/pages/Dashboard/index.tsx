import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

import { Container, Main, Top, Repositories } from './styles';

import Header from '../../components/Header';
import { Repository } from '../../models/Repository';

export default function Dashboard() {
  const { name, user, repositories } = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <Container>
      <Header />
      <Main>
        <Top>
          <h2>Olá, {name}</h2>
          <p>
            É bom ter você de volta! <br />
            Continue aprendendo, retorne para a aula que parou.
          </p>
        </Top>

        {user?.name && (
          <ul>
            <li> {user?.name}</li>
            <li> {user?.login}</li>
            <li> {user?.bio}</li>
            <li>
              <img src={user?.avatar_url} alt="" width={20} />
            </li>
            <li> {user?.location}</li>
            <li> {user?.starred_url}</li>
            <li> {user?.repos_url}</li>
          </ul>
        )}

        <Repositories>
          {repositories?.map((repository: Repository) => (
            <Link key={repository?.full_name} to={`/repositories/${repository?.full_name}`}>
              <img src={repository?.owner?.avatar_url} alt={repository?.owner?.login} />
              <div>
                <strong>{repository?.full_name}</strong>
                <p>{repository?.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          ))}
        </Repositories>
      </Main>
    </Container>
  );
}
