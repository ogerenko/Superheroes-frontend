import React, { useContext } from "react";
import "./AddHeroForm.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { Hero } from "../../types/Hero";
import { ModalWindowIs } from "../../pages/DetailHero";
import { HeroContext } from "../../context/HeroContext";
import { addHero, getHeroes } from "../../utils/api";
import { useNavigate } from "react-router-dom";
// import { getHeroes } from "../../utils/api";

type Props = {
  onModal: (flag: ModalWindowIs) => void;
};

export const AddHeroForm: React.FC<Props> = ({ onModal }) => {
  const { allHeroes, setAllHeroes } = useContext(HeroContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Hero>();

  const onSubmit: SubmitHandler<Hero> = async (data) => {
    try {
      const maxId = (Math.max(...allHeroes.map((h) => +h.id)) + 1).toString();

      await addHero({ ...data, id: maxId });

      const updatedHeroes = await getHeroes();
      setAllHeroes(updatedHeroes);

      navigate(`/hero/${maxId}`);
      onModal(false);

      
    } catch (err) {
      console.error("Error submit new hero", err)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__container-input">
        <div className="form__input">
          <label>Nickname</label>
          <input
            {...register("nickname", { required: "Nickname is required" })}
          />
          {errors.nickname && (
            <p className="input__error">{errors.nickname.message}</p>
          )}
        </div>

        <div className="form__input">
          <label>Real Name</label>
          <input
            {...register("real_name", { required: "Real name is required" })}
          />
          {errors.real_name && (
            <p className="input__error">{errors.real_name.message}</p>
          )}
        </div>

        <div className="form__input">
          <label>Catchphrase</label>
          <input
            {...register("cath_phrase", {
              required: "Catchphrase is required",
            })}
          />
          {errors.cath_phrase && (
            <p className="input__error">{errors.cath_phrase.message}</p>
          )}
        </div>

        <div className="form__input">
          <label>Superpowers</label>
          <input
            {...register("superpowers", {
              required: "Superpowers are required",
            })}
          />
          {errors.superpowers && (
            <p className="input__error">{errors.superpowers.message}</p>
          )}
        </div>

        <div className="form__input">
          <label>Description</label>
          <input
            {...register("origin_description", {
              required: "Description is required",
            })}
          />
          {errors.origin_description && (
            <p className="input__error">{errors.origin_description.message}</p>
          )}
        </div>

        <div className="form__input">
          <label>Image URL</label>
          <input
            type="url"
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && (
            <p className="input__error">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="form__container-submit">
        <button className="button-submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
