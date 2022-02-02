import React from 'react';

import { Container, Main, FilterOptions, Repositories, ProfileCard } from './styles';

export default function NotFound() {
  return (
    <Container>
      <Main>
        <FilterOptions>Usuário não encontrado</FilterOptions>
        <ProfileCard>Usuário não encontrado</ProfileCard>
        <Repositories>Usuário não encontrado</Repositories>
      </Main>
    </Container>
  );
}
