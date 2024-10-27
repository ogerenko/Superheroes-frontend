import React, { useEffect, useMemo, useState } from "react";
import { Hero } from "../types/Hero";
import { getHeroes } from "../utils/api";

type PropsContext = {
  allHeroes: Hero[];
  setAllHeroes: (heroes: Hero[]) => void;
};

export const HeroContext = React.createContext<PropsContext>({
  allHeroes: [],
  setAllHeroes: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const HeroProvider: React.FC<Props> = ({ children }) => {
  const [allHeroes, setAllHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    getHeroes()
      .then(setAllHeroes)
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const heroValue = useMemo(
    () => ({
      allHeroes,
      setAllHeroes,
    }),
    [allHeroes]
  );

  return (<HeroContext.Provider value={heroValue}>{children}</HeroContext.Provider>)
};
