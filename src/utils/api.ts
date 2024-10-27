import { Hero } from "../types/Hero";

const BASE_URL = "https://superhero-backend-bf70bd1ab235.herokuapp.com";

const request = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  // this is for delete method quick solve
  const responseData = response.headers.get("Content-Length") === '0' ? null : await response.json();
  return responseData as T;
};

// get all heroes
export const getHeroes = (): Promise<Hero[]> => request<Hero[]>("/heroes/all");

// get hero by id
export const getHero = (id: string): Promise<Hero> =>
  request<Hero>(`/heroes/${id}`);

// post new hero
export const addHero = (heroData: Hero): Promise<Hero> =>
  request<Hero>("/heroes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(heroData),
  });

// put update hero
export const updateHero = (
  id: string,
  heroData: Partial<Hero>
): Promise<Hero> =>
  request<Hero>(`/heroes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(heroData),
  });

// delete a hero
export const deleteHero = (id: string): Promise<void> =>
  request<void>(`/heroes/${id}`, {
    method: "DELETE",
  });
