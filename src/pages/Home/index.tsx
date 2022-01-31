import React, { useRef, useCallback, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, SearchContent, Background, Loading } from './styles';

import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import getValidationError from '../../helpers/validations';
import SvgLoading from '../../assets/SvgLoading';

interface SearchData {
  user: string;
}

export default function Home() {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { loadingUser } = useSelector((state: RootStateOrAny) => state.user);

  const validForm = async () => {
    try {
      const data = formRef?.current?.getData();

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({ user: Yup.string().required('User obrigatório') });

      await schema.validate(data, { abortEarly: false });

      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        formRef.current?.setErrors(errors);
        return;
      }

      return false;
    }
  };

  const handleSubmit = useCallback(async (data: SearchData) => {
    const formIsValid = await validForm();

    if (formIsValid) {
      navigate(`../dashboard?username=${data.user}&page=1&size=5`, { replace: true });
    }
  }, []);

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
              <Input
                name="user"
                type="text"
                hasValidation={true}
                placeholder="Digite um nome de usuário do Github"
                hasBorder={false}
                inputHeight="6rem"
              />
              <button type="submit">Pesquisar</button>
            </section>
          </Form>
        </SearchContent>

        <Background />

        {loadingUser && (
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
