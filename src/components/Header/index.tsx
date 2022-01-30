import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, LogoContent, BackButton } from './styles';
import SvgArrowBack from '../../assets/SvgArrowBack';
import SvgLogo from '../../assets/SvgLogo';
import { cleanLocalStorage } from '../../helpers/local-storage';
import { cleanStates } from '../../store/modules/user/actions';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBack() {
    cleanLocalStorage();
    dispatch(cleanStates());

    navigate('/', { replace: true });
  }

  return (
    <Container>
      <main>
        <BackButton>
          <a onClick={() => handleBack()}>
            <SvgArrowBack />
            <span>Voltar</span>
          </a>
        </BackButton>

        <LogoContent>
          <SvgLogo />
        </LogoContent>
      </main>
    </Container>
  );
}
