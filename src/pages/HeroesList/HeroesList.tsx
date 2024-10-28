import "./HeroesList.scss";

import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { FilterForm } from "../../components/FilterForm";
import { HeroContext } from "../../context/HeroContext";
import { Hero } from "../../types/Hero";

export const HeroesList = () => {
  const { allHeroes } = useContext(HeroContext);

  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [visibleHeroes, setVisibleHeroes] = useState<Hero[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page") || 1;
  const queryParam = searchParams.get("query") || "";

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params);

    setFilteredHeroes(
      allHeroes.filter((hero) =>
        hero.nickname.toLowerCase().includes(queryParam.toLowerCase().trim())
      )
    );
    // I disable because I don't need dependence of searchParams
    // eslint-disable-next-line
  }, [allHeroes, queryParam]);

  useEffect(() => {
    setVisibleHeroes(
      filteredHeroes.slice((+pageParam - 1) * 5, +pageParam * 5)
    );
  }, [filteredHeroes, pageParam]);

  return (
    <div className="heroes">
      <div className="heroes__search">
        <FilterForm />
      </div>
      <div className="heroes__list">
        {!!visibleHeroes.length &&
          visibleHeroes.map((hero) => (
            <Link to={`../hero/${hero.id}`} className="hero" key={hero.id}>
              <img
                className="hero__image"
                src={hero.image}
                alt={hero.nickname}
              />
              <div className="hero__nickname">{hero.nickname}</div>
            </Link>
          ))}
      </div>
      <div className="heroes__pagination">
        <Pagination heroes={filteredHeroes} />
      </div>
    </div>
  );
};
