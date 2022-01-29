import React from 'react';
import { Link } from 'react-router-dom';

import { Container, LogoContent, BackButton } from './styles';
import SvgArrowBack from '../../assets/SvgArrowBack';
import SvgLogo from '../../assets/SvgLogo';

export default function Header() {
  return (
    <Container>
      <main>
        <BackButton>
          <Link to="/">
            <SvgArrowBack />
            <span>Voltar</span>
          </Link>
        </BackButton>

        <LogoContent>
          <SvgLogo />
        </LogoContent>
      </main>
    </Container>
  );
}
