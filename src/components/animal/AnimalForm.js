import React, { useContext, useState, useEffect } from "react";
import { AnimalContext } from "./AnimalProvider";
import { LocationContext } from "../location/LocationProvider";

export const AnimalForm = (props) => {
  // Use the required context providers for data
  const { locations, getLocations } =
    useContext(LocationContext);
  const { addAnimal, animals, updateAnimal, getAnimals } =
    useContext(AnimalContext);

  // Component state
  const [animal, setAnimal] = useState({});

  // Is there a a URL parameter??
  const editMode =
    props.match.params.hasOwnProperty("animal_id"); // true or false

  const handleControlledInputChange = (event) => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
    const newAnimal = Object.assign({}, animal); // Create copy
    newAnimal[event.target.name] = event.target.value; // Modify copy
    setAnimal(newAnimal); // Set copy as new state
  };

  /*
        If there is a URL parameter, then the user has chosen to
        edit an animal.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the animal.
            3. Update component state variable.
    */
  const getAnimalInEditMode = () => {
    if (editMode) {
      const animal_id = parseInt(props.match.params.animal_id);
      const selectedAnimal =
        animals.find((a) => a.id === animal_id) || {};
      setAnimal(selectedAnimal);
    }
  };

  // Get animals from API when component initializes
  useEffect(() => {
    getAnimals();
    getLocations();
  }, []);

  // Once provider state is updated, determine the animal (if edit)
  useEffect(() => {
    getAnimalInEditMode();
  }, [animals]);

  const constructNewAnimal = () => {
    const location_id = parseInt(animal.location_id);

    if (location_id === 0) {
      window.alert("Please select a location");
    } else {
      if (editMode) {
        // PUT
        updateAnimal({
          id: animal.id,
          name: animal.name,
          breed: animal.breed,
          species: animal.species,
          location_id: location_id,
          status: animal.status,
          customer_id: parseInt(
            localStorage.getItem("kennel_customer")
          ),
        }).then(() => props.history.push("/animals"));
      } else {
        // POST
        addAnimal({
          name: animal.name,
          breed: animal.breed,
          species: animal.species,
          location_id: location_id,
          status: animal.status,
          customer_id: parseInt(
            localStorage.getItem("kennel_customer")
          ),
        }).then(() => props.history.push("/animals"));
      }
    }
  };

  return (
    <form className="animalForm">
      <h2 className="animalForm__title">
        {editMode ? "Update Animal" : "Admit Animal"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            placeholder="Animal name"
            defaultValue={animal.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="breed">Animal breed: </label>
          <input
            type="text"
            name="breed"
            required
            className="form-control"
            placeholder="Animal breed"
            defaultValue={animal.breed}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="species">Animal species: </label>
          <input
            type="text"
            name="species"
            required
            className="form-control"
            placeholder="Animal species"
            defaultValue={animal.species}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location_id">Location: </label>
          <select
            name="location_id"
            className="form-control"
            value={animal.location_id}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a location</option>
            {locations.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="status">Status: </label>
          <textarea
            type="text"
            name="status"
            className="form-control"
            value={animal.status}
            onChange={handleControlledInputChange}
          ></textarea>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          constructNewAnimal();
        }}
        className="btn btn-primary"
      >
        {editMode ? "Save Updates" : "Make Reservation"}
      </button>
    </form>
  );
};
