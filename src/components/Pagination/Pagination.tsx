import "./Pagination.scss";

import React from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { Hero } from "../../types/Hero";
import { adaptivePaginationPages } from "../../utils";

type Props = {
  heroes: Hero[];
};

export const Pagination: React.FC<Props> = ({ heroes }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page") || 1;

  const amountOfPages = () => {
    const pagesAmount = Math.ceil(heroes.length / 5 || 0);

    return Array.from({ length: pagesAmount }, (_, index) => index + 1);
  };

  const handlePrevPageChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set("page", (+pageParam - 1).toString());

    setSearchParams(params);
  };

  const handleNextPageChange = () => {
    const params = new URLSearchParams(searchParams);

    params.set("page", (+pageParam + 1).toString());

    setSearchParams(params);
  };

  const handlePageChange = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", currentPage.toString());

    setSearchParams(params);
  };

  return amountOfPages().length > 1 ? (
    <div className="pagination">
      <button
        className={classNames("pagination__button pagination__button--prev", {
          "pagination__button--prev--disabled":
            +pageParam === amountOfPages()[0],
        })}
        disabled={+pageParam === amountOfPages()[0]}
        onClick={handlePrevPageChange}
      />

      {adaptivePaginationPages(amountOfPages(), +pageParam).map((page, index) =>
        page !== "..." ? (
          <button
            className={classNames("pagination__button", {
              pagination__active: +pageParam === page,
            })}
            key={page}
            onClick={() => handlePageChange(+page)}
          >
            {page}
          </button>
        ) : (
          <div className="pagination__darks" key={`${page}${index}`}>
            {page}
          </div>
        )
      )}

      <button
        disabled={+pageParam === amountOfPages()[amountOfPages().length - 1]}
        className={classNames("pagination__button pagination__button--next", {
          "pagination__button--next--disabled":
            +pageParam === amountOfPages()[amountOfPages().length - 1],
        })}
        onClick={handleNextPageChange}
      />
    </div>
  ) : null;
};
