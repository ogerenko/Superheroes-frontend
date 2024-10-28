import "./ModalWindow.scss";

import React from "react";
import { AddHeroForm } from "../AddHeroForm";
import { DeleteHero } from "../DeleteHero";
import { Hero } from "../../types/Hero";
import { ModalWindowIs } from "../../types/ModalWindowIs";

type Props = {
  onModal: (flag: ModalWindowIs) => void;
  modalIs: ModalWindowIs;
  currentHero: Hero;
  onCurrentHero: (hero: Hero) => void;
};

export const ModalWindow: React.FC<Props> = ({
  onModal,
  modalIs,
  currentHero,
  onCurrentHero,
}) => {
  return (
    <div className="modal-window">
      <div className="modal-window__container">
        <div className="close-button" onClick={() => onModal(false)}></div>
        {modalIs === "add" && (
          <AddHeroForm onModal={onModal} onCurrentHero={onCurrentHero} />
        )}
        {modalIs === "delete" && (
          <DeleteHero onModal={onModal} currentHero={currentHero} />
        )}
        {modalIs === "edit" && (
          <AddHeroForm
            onModal={onModal}
            currentHero={currentHero}
            onCurrentHero={onCurrentHero}
          />
        )}
      </div>
    </div>
  );
};
