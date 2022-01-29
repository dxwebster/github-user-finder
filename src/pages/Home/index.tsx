import React, { useState, useEffect, FormEvent, useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, SearchContent, Background } from './styles';
import { userGit } from '../../mocks/user';
import { reposGit } from '../../mocks/repositories';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/local-storage';
import { Repository } from '../../models/Repository';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import getValidationError from '../../helpers/validations';

interface User {
  id: number;
  avatar_url: string;
  bio: string;
  location: string;
  login: string;
  name: string;
  starred_url: string;
  public_repos: number;
  repos_url: string;
}

interface SearchData {
  search: string;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User>(getFromLocalStorage('@Github:user'));
  const [repositories, setRepositories] = useState<Repository[]>(getFromLocalStorage('@Github:repos'));

  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SearchData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        user: Yup.string().required('User obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      // await signIn({
      //   email: data.email,
      //   password: data.password
      // });

      setUser(userGit.data);
      setRepositories(reposGit);
      navigate('../dashboard', { replace: true });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        formRef.current?.setErrors(errors);
        return;
      }
    }
  }, []);

  useEffect(() => {
    setToLocalStorage('@Github:user', user);
    setToLocalStorage('@Github:repos', repositories);
  }, [user, repositories]);

  return (
    <Container>
      <SearchContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <header>
            <h1>Github User Finder </h1>
            <h5> Veja informações de usuários e seus repositórios</h5>
          </header>

          <section>
            <Input
              name="user"
              type="text"
              placeholder="Digite um nome de usuário do Github"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
          </section>
        </Form>
      </SearchContent>

      <Background />
    </Container>
  );
}
