import React, { useEffect, useRef, useCallback } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, SearchContent, Background, Loading } from './styles';

import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import getValidationError from '../../helpers/validations';
import SvgLoading from '../../assets/SvgLoading';

import { setLoading, userRequest } from '../../store/modules/user/actions';

interface SearchData {
  user: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { loading } = useSelector((state: RootStateOrAny) => state.user);

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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        formRef.current?.setErrors(errors);
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        navigate('../dashboard', { replace: true });
        dispatch(setLoading(false));
      }, 2000);
    }
  }, [loading]);

  return (
    <>
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

        {loading && (
          <Loading>
            <div>
              <SvgLoading />
              <h1>Procurando usuário...</h1>
            </div>
          </Loading>
        )}
      </Container>
    </>
  );
}
