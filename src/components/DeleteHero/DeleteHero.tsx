import "./DeleteHero.scss";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteHero, getHeroes } from "../../utils/api";
import { HeroContext } from "../../context/HeroContext";
import { Hero } from "../../types/Hero";
import { ModalWindowIs } from "../../types/ModalWindowIs";

type Props = {
  onModal: (flag: ModalWindowIs) => void;
  currentHero: Hero;
};

export const DeleteHero: React.FC<Props> = ({ onModal, currentHero }) => {
  const { setAllHeroes } = useContext(HeroContext);
  
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteHero(currentHero.id);

      const updatedHeroes = await getHeroes();
      setAllHeroes(updatedHeroes);

      navigate("/heroes-list");
      onModal(false);
    } catch (err) {
      console.error("Error delete hero", err);
    }
  };

  return (
    <>
      <div className="delete__message">
        Are you sure??? <br /> Delete {currentHero.nickname}???
      </div>
      <button className="button-submit" onClick={handleDelete}>
        yes!
      </button>
    </>
  );
};
