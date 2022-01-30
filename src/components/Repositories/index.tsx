import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, RepositoriesList } from './styles';

import { Repository } from '../../interfaces/Repository';
import Pageable from '../Pageable';

export default function Repositories({ isListActive, repos }) {
  return (
    <Container>
      <RepositoriesList displayList={isListActive}>
        {repos?.data?.map((repo: Repository) => (
          <section key={repo?.full_name}>
            <Link to="/dashboard">
              <div>
                <span>{repo?.full_name}</span>
                {repo?.description && <p>{repo.description}</p>}
              </div>
              <FiChevronRight size={20} />
            </Link>
          </section>
        ))}
      </RepositoriesList>

      {/* {repos && (
        <Pageable
          style={{ justifyContent: 'center', width: '70%' }}
          data={repos}
          size={10}
          serviceRequest={(_, currentPage) => {
            // setStep(null);
            // dispatch(findStepsRequest(option.value, textSearch, selectedOperation.value, currentPage));
          }}
        />
      )} */}
    </Container>
  );
}
