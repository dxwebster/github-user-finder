import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, FilterContainer, ButtonContainer, Button, FilterMenu } from './styles';

import SvgList from '../../../../assets/SvgList';
import SvgGrid from '../../../../assets/SvgGrid';
import SvgSearch from '../../../../assets/SvgSearch';

import Input from '../../../../components/Input';

export default function Options() {
  const [isListActive, setListActive] = useState(true);
  const [isGridActive, setGridActive] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const formRef = useRef<FormHandles>(null);

  function handleSubmit() {
    return;
  }

  const filterMenu = ['Mais recentes', 'Stars', 'Linguagens'];

  const handleActive = (index) => {
    setActiveItem(index);
  };

  return (
    <Container>
      <FilterContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input type="search" name="filter" icon={SvgSearch} hasValidation={false} hasBorder={true} inputHeight="4rem" />
        </Form>

        <FilterMenu>
          {filterMenu.map((item, index) => (
            <a key={index} onClick={() => handleActive(index)} className={activeItem === index ? 'active' : ''}>
              {item}
            </a>
          ))}
        </FilterMenu>
      </FilterContainer>

      <ButtonContainer>
        <Button
          active={isListActive}
          className="list"
          onClick={() => {
            setListActive(true);
            setGridActive(false);
          }}
        >
          <SvgList />
        </Button>

        <Button
          active={isGridActive}
          className="grid"
          onClick={() => {
            setListActive(false);
            setGridActive(true);
          }}
        >
          <SvgGrid />
        </Button>
      </ButtonContainer>
    </Container>
  );
}
