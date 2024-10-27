import { useNavigate, useParams } from "react-router-dom";
import "./DetailHero.scss";
import { useEffect, useState } from "react";
import { Hero } from "../../types/Hero";
import { getHero } from "../../utils/api";
import { ModalWindow } from "../../components/ModalWindow";

export type ModalWindowIs = "add" | "edit" | "delete" | false;

export const DetailHero = () => {
  const { heroId = "" } = useParams();
  const [currentHero, setCurrentHero] = useState<Hero | null>(null);
  const [modalWindow, setModalWindow] = useState<ModalWindowIs>(false);
  const navigate = useNavigate()

  useEffect(() => {
    getHero(heroId)
      .then(setCurrentHero)
      .catch((err) => {
        console.error("Error fetching hero", err);
        navigate('/heroes-list');
      });
  }, [heroId, navigate]);

  const openModalWindow = (action: ModalWindowIs) => {
    if (action) {
      setModalWindow(action);
    }
  };

  return (
    <div className="detail-hero">
      <img
        className="detail-hero__image"
        src={currentHero?.image}
        alt={currentHero?.nickname}
      />
      <div className="detail-hero__card">
        <div className="detail-hero__controls">
          <div
            className="controls__button controls__button--add"
            onClick={() => openModalWindow("add")}
          ></div>
          <div
            className="controls__button controls__button--edit"
            onClick={() => openModalWindow("edit")}
          ></div>
          <div
            className="controls__button controls__button--delete"
            onClick={() => openModalWindow("delete")}
          ></div>
        </div>
        <div className="detail-hero__info">
          <div className="detail-hero__name">
            <div className="name__nickname">{currentHero?.nickname}</div>
            <div className="name__real-name">({currentHero?.real_name})</div>
          </div>
          <div className="detail-hero__phrase">
            <div className="phrase__description">Hero catch prase is:</div>
            <div className="phrase__catchphrase">
              {currentHero?.cath_phrase}
            </div>
          </div>
          <div className="detail-hero__superpowers">
            <div className="superpowers__description">Superpowers:</div>
            <div className="superpowers__values">
              {currentHero?.superpowers}
            </div>
          </div>
          <div className="detail-hero__history">
            {currentHero?.origin_description}
          </div>
        </div>
      </div>
      {modalWindow && (
        <ModalWindow onModal={setModalWindow} modalIs={modalWindow} />
      )}
    </div>
  );
};
