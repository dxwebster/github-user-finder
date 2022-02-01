import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import Select from 'react-select';

import {
  Container,
  RepositoriesList,
  TitleContent,
  ArrowContent,
  InfosContent,
  PaginationContent,
  MessageContent
} from './styles';

import { Repository } from '../../../../interfaces/Repository';
import Pageable from '../../../../components/Pageable';

import SvgStar from '../../../../assets/SvgStar';
import SvgFork from '../../../../assets/SvgFork';
import SvgWatch from '../../../../assets/SvgWatch';
import { RootStateOrAny, useSelector } from 'react-redux';

export default function Repositories({ isListActive, reposList, pageable }) {
  const [querySize, setQuerySize] = useState(5);

  const { user } = useSelector((state: RootStateOrAny) => state.user);
  const { notFound } = useSelector((state: RootStateOrAny) => state.repos);

  const navigate = useNavigate();

  const options = [
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  };

  return (
    <Container>
      <RepositoriesList displayList={isListActive}>
        {notFound && <MessageContent>Repositório não encontrado.</MessageContent>}

        {!notFound &&
          reposList?.map((repo: Repository) => (
            <a key={repo?.full_name} href={repo.html_url} target="_blank" rel="noreferrer">
              <TitleContent>
                <h2>{repo?.full_name}</h2>
                <p>{repo.description || 'Sem descrição'}</p>
              </TitleContent>

              <InfosContent>
                <li>
                  <SvgWatch />
                  <span>{repo?.watchers || '0'}</span>
                  <div>Watchs</div>
                </li>

                <li>
                  <SvgStar />
                  <span>{repo?.stars || '0'}</span>
                  <div>Stars</div>
                </li>

                <li>
                  <SvgFork />
                  <span>{repo?.forks || '0'}</span>
                  <div>Forks</div>
                </li>
              </InfosContent>

              <ArrowContent>
                <div>
                  <FiChevronRight size={20} />
                </div>
              </ArrowContent>
            </a>
          ))}
      </RepositoriesList>

      <PaginationContent>
        <Select
          options={options}
          styles={customStyles}
          onChange={(option: any) => {
            setQuerySize(option);
          }}
        />

        {/* <select name="" id="">
          {querySizeList.map((size, i) => (
            <option key={i} onChange={() => setQuerySize(size)}>
              {size}
            </option>
          ))}
        </select> */}

        {!notFound && pageable?.totalPages > 1 && (
          <Pageable
            data={pageable}
            serviceRequest={(_: any, currentPage: number) => {
              const urlQuery = `/dashboard?username=${user.login}&page=${currentPage}&size=${querySize}`;
              navigate(urlQuery, { replace: true });
            }}
          />
        )}
      </PaginationContent>
    </Container>
  );
}
