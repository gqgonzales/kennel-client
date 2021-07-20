import React from "react";
import "./Animals.css";
import { Link } from "react-router-dom";

export default ({ animal }) => (
  <section className="animal">
    <h3 className="animal__name">
      <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
    </h3>
    <div className="animal__species">{animal.species}</div>
    <div className="animal__breed">{animal.breed}</div>
    <div className="animal__status">{animal.status}</div>
  </section>
);
