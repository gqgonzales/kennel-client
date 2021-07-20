import React, { useContext, useEffect, useState } from "react";
import { AnimalContext } from "./AnimalProvider";
import "./Animals.css";

export const AnimalDetails = (props) => {
  const { releaseAnimal, getAnimalById } =
    useContext(AnimalContext);

  const [animal, setAnimal] = useState({
    location: {},
    customer: {},
  });

  useEffect(() => {
    const animal_id = parseInt(props.match.params.animal_id);
    getAnimalById(animal_id).then(setAnimal);
  }, []);

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
      <div className="animal__breed">{animal.breed}</div>
      <div className="animal__species">{animal.species}</div>
      <div className="animal__location">
        Location: {animal.location.name}
      </div>
      <div className="animal__owner">
        Customer: {animal.customer.name}
      </div>
      <div className="animal__status">
        status: {animal.status}
      </div>

      <button
        onClick={() =>
          releaseAnimal(animal.id).then(() =>
            props.history.push("/animals")
          )
        }
      >
        Release Animal
      </button>

      <button
        onClick={() => {
          props.history.push(`/animals/edit/${animal.id}`);
        }}
      >
        Edit
      </button>
    </section>
  );
};
