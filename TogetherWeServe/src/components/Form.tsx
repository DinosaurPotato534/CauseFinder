import { useState, ChangeEvent, FormEvent } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./stylesheets/form.css";

const Form = () => {
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showMap, setShowMap] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapCenter, setMapCenter] = useState({
    lat: 30.105431071967487,
    lng: -81.47486454331496,
  });
  const [headings, setHeadings] = useState([
    "K9s for Warriors",
    "Beaches Go Green",
    "Rotary of Ponte Vedra Beach",
  ]);
  const [subheadings, setSubheadings] = useState([
    "Ponte Vedra, FL",
    "Ponte Vedra Beach, FL",
    "Ponte Vedra, FL",
  ]);

  // List of valid zip codes
  const validZipCodes = ["32081", "32082"]; // Add more as needed

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validZipCodes.includes(zipCode)) {
      setShowMap(true);
      setZoomLevel(10);
      setMapCenter({ lat: 30.105431071967487, lng: -81.47486454331496 });
      setHeadings([
        "K9s for Warriors",
        "Beaches Go Green",
        "Rotary of Ponte Vedra Beach",
      ]);
      setSubheadings([
        "Ponte Vedra, FL",
        "Ponte Vedra Beach, FL",
        "Ponte Vedra, FL",
      ]);
      console.log("Location:", location);
      console.log("Zip Code:", zipCode);
    } else {
      setShowMap(false);
      setZoomLevel(4);
      setMapCenter({ lat: 37.0902, lng: -95.7129 });
      setHeadings(["No Results Found", "No Results Found", "No Results Found"]);
      setSubheadings(["", "", ""]);
      console.log("No Results Found");
    }
  };

  const mapStyles = {
    width: "100%",
    height: "55vh",
  };

  const locations = [
    {
      title: "K9s for Warriors",
      position: { lat: 30.105431071967487, lng: -81.47486454331496 },
    },
    {
      title: "Beaches Go Green",
      position: { lat: 30.239825055362463, lng: -81.3776131360963 },
    },
    {
      title: "Rotary of Ponte Vedra Beach",
      position: { lat: 30.241368569798947, lng: -81.40719710414436 },
    },
  ];

  return (
    <div>
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
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            {headings.map((heading, index) => (
              <div key={index} className="row-md-auto">
                <a
                  href={validZipCodes.includes(zipCode) ? "#" : undefined}
                  target="_blank"
                  className={`col col text-decoration-none ${
                    validZipCodes.includes(zipCode) ? "" : "disabled"
                  }`}
                >
                  <div className="col">
                    <div className="row">
                      <h1 className="heading">{heading}</h1>
                    </div>
                    <div className="row">
                      <p className="subheading">
                        {validZipCodes.includes(zipCode)
                          ? subheadings[index]
                          : ""}
                      </p>
                    </div>
                    <hr />
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="col map">
            <LoadScript googleMapsApiKey="AIzaSyD01af9HvKCo6e45nDew9vK4MvZLU8b_Hw">
              <GoogleMap
                mapContainerStyle={mapStyles}
                center={mapCenter}
                zoom={zoomLevel}
                mapTypeId="satellite"
              >
                {showMap &&
                  validZipCodes.includes(zipCode) &&
                  locations.map((location) => (
                    <Marker
                      key={location.title}
                      position={location.position}
                      title={location.title}
                    />
                  ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
