import React from "react";

const Country = ({ name, flag, population, region, capital }) => {
  return (
    <div className="country">
      <div className="img-div">
        <img src={flag} alt={`${name}'s flag`} />
      </div>
      <div className="country-details">
        <h1>{name}</h1>
        <p>
          <span>Region:</span> {region}
        </p>
        <p>
          <span>Capital:</span> {capital}
        </p>
        <p>
          <span>Population: </span>
          {population}
        </p>
      </div>
    </div>
  );
};

export default Country;
