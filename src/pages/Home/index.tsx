import React, { useState, useEffect, FormEvent, useRef, useCallback } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, SearchContent, Background } from './styles';
import { userGit } from '../../mocks/user';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/local-storage';
import { Repository } from '../../models/Repository';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import getValidationError from '../../helpers/validations';
import { userRequest } from '../../store/modules/user/actions';

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
  user: string;
}

export default function Home() {
  const [user, setUser] = useState<User>(getFromLocalStorage('@Github:user'));
  const [repositories, setRepositories] = useState<Repository[]>(getFromLocalStorage('@Github:repos'));
  const dispatch = useDispatch();

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

      dispatch(userRequest(data.user));

      // navigate('../dashboard', { replace: true });
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
            <Input name="user" type="text" placeholder="Digite um nome de usuário do Github" />
            <button type="submit">Pesquisar</button>
          </section>
        </Form>
      </SearchContent>

      <Background />
    </Container>
  );
}
