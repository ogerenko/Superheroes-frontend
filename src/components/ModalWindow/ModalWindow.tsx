import React from "react";
import "./ModalWindow.scss";
import { ModalWindowIs } from "../../pages/DetailHero";
import { useParams } from "react-router-dom";
import { AddHeroForm } from "../AddHeroForm";
import { DeleteHero } from "../DeleteHero";

type Props = {
  onModal: (flag: ModalWindowIs) => void;
  modalIs: ModalWindowIs;
};

export const ModalWindow: React.FC<Props> = ({ onModal, modalIs }) => {
  const { heroId = "" } = useParams();
  console.log(heroId);

  return (
    <div className="modal-window">
      <div className="modal-window__container">
        <div className="close-button" onClick={() => onModal(false)}></div>
        {modalIs === 'add' && <AddHeroForm onModal={onModal} />}
        {modalIs === 'delete' && <DeleteHero onModal={onModal}/> }
      </div>
    </div>
  );
};
