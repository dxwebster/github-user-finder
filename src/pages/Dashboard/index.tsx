import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

import { Container, Main, Top, Repositories } from './styles';

import Header from '../../components/Header';
import { Repository } from '../../interfaces/Repository';
import { getFromLocalStorage } from '../../helpers/local-storage';

export default function Dashboard() {
  // const { user } = useSelector((state: RootStateOrAny) => state.user);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    setUser(getFromLocalStorage('@Github: user'));
    setRepos(getFromLocalStorage('@Github: repos'));
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        {user?.name && (
          <>
            <Top>
              <h2>Olá, {user.name}</h2>
              <p>
                É bom ter você de volta! <br />
                Continue aprendendo, retorne para a aula que parou.
              </p>
            </Top>

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
          </>
        )}

        <Repositories>
          {repos?.map((repo: Repository) => (
            <Link key={repo?.full_name} to={`/repositories/${repo?.full_name}`}>
              <img src={repo?.owner?.avatar_url} alt={repo?.owner?.login} />
              <div>
                <strong>{repo?.full_name}</strong>
                <p>{repo?.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          ))}
        </Repositories>
      </Main>
    </Container>
  );
}
