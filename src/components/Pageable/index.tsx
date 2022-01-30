import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, ButtonPage, ButtonArrow } from './styles';

Pageable.displayName = 'src/client/components/Pageable';

interface PageableProps {
  data: any;
  size: number;
  serviceRequest: any;
  style?: Record<string, unknown>;
}

export default function Pageable({ data, size, serviceRequest, style }: PageableProps) {
  const [pageSelected, setPageSelected] = useState(data.page || data.number || data.pageNumber);
  const [arrayPages, setArrayPages] = useState<any>([0]);
  const [showLast, setShowLast] = useState(true);
  const [showFirst, setShowFirst] = useState(false);

  const QUANTITY_PAGES = 2;

  const [currentArrayPages, setCurrentArrayPages] = useState<any>([0]);

  useEffect(() => {
    const newArrayPages = [];

    if (data && data.totalPages > 0) {
      for (let page = 0; page < data.totalPages; page += 1) {
        newArrayPages.push(page);
      }

      setArrayPages(newArrayPages);
    }

    gotoPage(data.pageNumber, newArrayPages);
  }, [data]);

  const gotoPage = (page: number, pages: Array<number>) => {
    const currentPage = Math.max(0, Math.min(page, data.totalPages));
    const paginationData = { currentPage, pages };

    onPageChanged(paginationData);
  };

  const onPageChanged = (paginationData: any) => {
    const { currentPage, pages } = paginationData;

    setShowLast(false);
    setShowFirst(false);

    const offset = Math.max(0, currentPage - 1);

    let sliceDown = currentPage - QUANTITY_PAGES / 2;
    let sliceUp = currentPage + 1 + QUANTITY_PAGES / 2;

    if (sliceUp < data.totalPages) setShowLast(true);

    if (sliceUp > data.totalPages) {
      sliceDown = sliceDown + data.totalPages - sliceUp;
    }

    if (sliceUp + 1 === data.totalPages) {
      setShowLast(false);
      sliceUp += 1;
    }

    if (sliceUp + 2 === data.totalPages && currentPage === 0) {
      setShowLast(false);
      sliceUp += 1;
    }

    if (sliceDown <= 0) {
      sliceUp += sliceDown * -1;
      sliceDown = 0;
    }

    if (sliceDown > 1) setShowFirst(true);

    if (sliceDown - 1 === 0) {
      setShowFirst(false);
      sliceDown = 0;
    }

    const newCurrentArrayPages = pages.slice(sliceDown, sliceUp);

    if (currentPage !== pageSelected) {
      serviceRequest(offset, currentPage, size);
    }

    setPageSelected(currentPage);
    setCurrentArrayPages(newCurrentArrayPages);
  };

  const handleClick = (page: number) => gotoPage(page, arrayPages);
  const handleMoveLeft = () => gotoPage(pageSelected - 1, arrayPages);
  const handleMoveRight = () => gotoPage(pageSelected + 1, arrayPages);

  return (
    <Container style={style} hidden={data.totalPages === 1}>
      <ButtonArrow type="button" onClick={handleMoveLeft} disabled={!(pageSelected > 0)}>
        {'<<'}
      </ButtonArrow>

      {showFirst && (
        <>
          <ButtonPage type="button" onClick={() => handleClick(0)}>
            1
          </ButtonPage>

          <ButtonPage type="button" disabled>
            ...
          </ButtonPage>
        </>
      )}

      {currentArrayPages.map((page: number) => (
        <ButtonPage
          key={page}
          type="button"
          disabled={page === pageSelected || page.toString() === '...'}
          selected={page === pageSelected}
          onClick={() => handleClick(page)}
        >
          {page + 1}
        </ButtonPage>
      ))}

      {showLast && (
        <>
          <ButtonPage type="button" disabled>
            ...
          </ButtonPage>

          <ButtonPage type="button" onClick={() => handleClick(data.totalPages - 1)}>
            {data.totalPages}
          </ButtonPage>
        </>
      )}

      <ButtonArrow id="next-pageable" type="button" onClick={handleMoveRight} disabled={!(pageSelected < data.totalPages - 1)}>
        {'>>'}
      </ButtonArrow>
    </Container>
  );
}
