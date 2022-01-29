import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

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
