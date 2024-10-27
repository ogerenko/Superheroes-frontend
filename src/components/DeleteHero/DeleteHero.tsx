import React, { useContext } from "react";
import "./DeleteHero.scss";
import { ModalWindowIs } from "../../pages/DetailHero";
import { useNavigate, useParams } from "react-router-dom";
import { deleteHero, getHeroes } from "../../utils/api";
import { HeroContext } from "../../context/HeroContext";

type Props = {
  onModal: (flag: ModalWindowIs) => void;
};

export const DeleteHero: React.FC<Props> = ({ onModal }) => {
  const { setAllHeroes } = useContext(HeroContext);
  const { heroId = "" } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteHero(heroId);

      const updatedHeroes = await getHeroes();
      setAllHeroes(updatedHeroes);

      navigate("/heroes-list");
      onModal(false);


    } catch (err) {
      console.error("Error delete hero", err)
    }
  };

  return (
    <>
      <div className="delete__message">
        Are you sure??? <br /> Delete this hero???
      </div>
      <button className="button-submit" onClick={handleDelete}>
        yes!
      </button>
    </>
  );
};
