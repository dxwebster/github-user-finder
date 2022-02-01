import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Container, FilterContent, ButtonContent, Button, MenuContent } from './styles';

import SvgList from '../../../../assets/SvgList';
import SvgGrid from '../../../../assets/SvgGrid';
import SvgSearch from '../../../../assets/SvgSearch';

import Input from '../../../../components/Input';
import { setFilterRepos, setDisplayRepos } from '../../../../store/modules/repos/actions';

export default function Options() {
  const { isListActive, isGridActive, repos } = useSelector((state: RootStateOrAny) => state.repos);
  const [activeItem, setActiveItem] = useState(0);

  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  function handleSubmit() {
    return;
  }
  const filterMenu = ['Mais recentes', 'Stars', 'Linguagens'];

  const handleActive = (index) => setActiveItem(index);

  const filterRepositories = (value: string) => {
    if (value === '' || value === null) setFilterRepos(repos);

    const filtered = repos?.data?.filter((repository: any) => {
      return repository.full_name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });

    dispatch(setFilterRepos(filtered));
  };

  return (
    <Container>
      <FilterContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            type="search"
            name="filter"
            icon={SvgSearch}
            hasValidation={false}
            hasBorder={true}
            inputHeight="4rem"
            placeholder="Busque por repositório"
            onChange={(e) => filterRepositories(e.target.value)}
          />
        </Form>

        <MenuContent>
          {filterMenu.map((item, index) => (
            <div key={index} onClick={() => handleActive(index)} className={activeItem === index ? 'active' : ''}>
              {item}
            </div>
          ))}
        </MenuContent>
      </FilterContent>

      <ButtonContent>
        <Button active={isListActive} className="list" onClick={() => dispatch(setDisplayRepos(true, false))}>
          <SvgList />
        </Button>

        <Button active={isGridActive} className="grid" onClick={() => dispatch(setDisplayRepos(false, true))}>
          <SvgGrid />
        </Button>
      </ButtonContent>
    </Container>
  );
}
