import React, { useContext, useEffect } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Pagination, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
const Paginationn = () => {
  const { page, name } = useParams();
  const {
    gamesState: {
      gamesTillEndOfYear,
      currentActivePage,
      paginationPages,
      loadPaginationPages,
      startPage,
      endPage,
    },
    changePage,
    setEndPage,
    setStartPage,
    setFirstPage,
    makeCurrentPaginationPage,
    setPreviousPage,
    setNextPage,
    setLastPage,
  } = useContext(GamesContext);
  useEffect(() => {
    makeCurrentPaginationPage();
  }, []);
  useEffect(() => {
    if (!page) {
      setEndPage(5);
      setStartPage(1);
      changePage(1);
    }
    if (page) {
      changePage(Math.floor(page));
      if (Math.floor(page) == 0) {
        setEndPage(5);
        setStartPage(1);
      } else if (
        Math.floor(gamesTillEndOfYear.length / 10) - Math.floor(page) ==
        0
      ) {
        setStartPage(Math.floor(page));
        setEndPage(Math.floor(page));
      } else if (
        Math.floor(gamesTillEndOfYear.length / 10) - Math.floor(page) <
        0
      ) {
        changePage(1);
        setEndPage(5);
        setStartPage(1);
      } else if (
        Math.floor(gamesTillEndOfYear.length / 10) - Math.floor(page) >
        0
      ) {
        if (
          Math.floor(gamesTillEndOfYear.length / 10) - Math.floor(page) <=
          4
        ) {
          setStartPage(Math.floor(page));
          setEndPage(Math.floor(gamesTillEndOfYear.length) / 10);
        }
        if (Math.floor(gamesTillEndOfYear.length / 10) - Math.floor(page) > 4) {
          setStartPage(Math.floor(page));
          setEndPage(Math.floor(page) + 4);
        }
      }
    }
  }, []);

  let items = [];
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        activeLabel={false}
        key={number}
        active={number == currentActivePage}
        onClick={(e) => changePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      {loadPaginationPages ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Pagination>
            <Pagination.First
              disabled={endPage <= 5 ? true : false}
              onClick={setFirstPage}
            />
            <Pagination.Prev
              disabled={startPage == 1 ? true : false}
              onClick={setPreviousPage}
            />
            {items}
            <Pagination.Next
              onClick={setNextPage}
              disabled={
                endPage >= Math.floor(gamesTillEndOfYear.length / 10)
                  ? true
                  : false
              }
            />
            <Pagination.Last
              onClick={setLastPage}
              disabled={
                endPage >= Math.floor(gamesTillEndOfYear.length / 10)
                  ? true
                  : false
              }
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default Paginationn;
