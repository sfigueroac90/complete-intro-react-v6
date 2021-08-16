/* eslint-disable no-undef */
import React from "react";
import { useEffect, useState, useContext } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds, status] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const dir = `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;
    const res = await fetch(dir);
    const json = await res.json();
    setPets(json.pets);
  }

  const isRaining = location === "Seattle, WA" ? "Raining" : "Not raining";
  return (
    <div className="my-0 mx-auto w-11/12">
      {isRaining} - {status}
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900"
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label className="search-label" htmlFor="location">
          <input
            className="search-control"
            id="location"
            // eslint-disable-next-line no-unused-vars
            onCut={(e) => console.log("Cutted")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal" className="search-label">
          Animal
          <select
            className="search-control"
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option value=""></option>
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
            /
          </select>
        </label>
        <label htmlFor="breed" className="search-label">
          Breed
          <select
            id="breed"
            className="search-control disabled:opacity-50"
            value={breed}
            disabled={!breeds.length}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option value=""></option>
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
            /
          </select>
        </label>
        <label htmlFor="theme" className="search-label">
          Theme
          <select
            value={theme}
            className="search-control"
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="red">Red</option>
            <option value="Pink">Pink</option>
            <option value="Peru">Peru</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="darkred">Dark Red</option>
            <option value="gray">Gray</option>
          </select>
        </label>
        <button
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submmit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
