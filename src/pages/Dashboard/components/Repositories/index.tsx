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

  const querySizeList = [5, 10, 15];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

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
        <Select options={options} />

        {/* <Select
          style={{ width: '220px', zIndex: '888' }}
          id="command"
          baseId="select-consult-search-bar-base-id"
          name="command"
          defaultValue={commands[0]}
          options={commands}
          onChange={(option: any) => {
            formRef.current.setFieldValue('command', option);
            validForm();
          }}
        /> */}

        <select name="" id="">
          {querySizeList.map((size, i) => (
            <option key={i} onChange={() => setQuerySize(size)}>
              {size}
            </option>
          ))}
        </select>

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
