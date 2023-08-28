import { useState, ChangeEvent, FormEvent } from "react";
import "./stylesheets/form.css";

const Form = () => {
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //form submit
    console.log("Location:", location);
    console.log("Zip Code:", zipCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="location" className="form-label label">
          Location (City, State)
        </label>
        <input
          type="text"
          className="form-control"
          id="location"
          placeholder="Ponte Vedra, FL"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="zipCode" className="form-label label">
          Zip Code
        </label>
        <input
          type="number"
          className="form-control"
          id="zipCode"
          placeholder="32081"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
