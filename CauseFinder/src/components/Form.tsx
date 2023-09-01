import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./stylesheets/form.css";

const firebaseConfig = {
  // Your Firebase config here
  // ...
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const fetchValidZipCodes = async () => {
  const dataCollection = collection(db, "data");
  const dataSnapshot = await getDocs(dataCollection);
  const validZipCodes = dataSnapshot.docs.map((doc) => doc.id);
  return validZipCodes;
};

const Form = () => {
  const [zipCode, setZipCode] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const [headings, setHeadings] = useState<string[]>([]);
  const [subheadings, setSubheadings] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [validZipCodes, setValidZipCodes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    async function loadValidZipCodes() {
      try {
        const zipCodes = await fetchValidZipCodes();
        setValidZipCodes(zipCodes);
      } catch (error) {
        console.error("Error fetching valid zip codes:", error);
      }
    }

    loadValidZipCodes();
  }, []);

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    setCurrentIndex(0);
    setNoResults(false); // Reset noResults state when changing zip code
  };

  const handleNextResults = () => {
    const nextIndex = currentIndex + 3;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousResults = () => {
    const prevIndex = currentIndex - 3;
    setCurrentIndex(prevIndex < 0 ? 0 : prevIndex);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validZipCodes.includes(zipCode)) {
      setShowMap(true);
      setZoomLevel(10);
      setMapCenter({ lat: 30.105431071967487, lng: -81.47486454331496 });

      try {
        const docRef = doc(db, "data", zipCode);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeadings(data.headings || []);
          setSubheadings(data.subheadings || []);
          setLinks(data.links || []);
          setMarkers(data.locationCoordinates || []);

          if (data.mapCenter) {
            const { latitude, longitude } = data.mapCenter;
            setMapCenter({ lat: latitude, lng: longitude });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setNoResults(true);
      setShowMap(false);
      setZoomLevel(4);
      setMapCenter({ lat: 37.0902, lng: -95.7129 });
      setHeadings([]);
      setSubheadings([]);
      setLinks([]);
      setMarkers([]);
    }
  };

  const mapStyles = {
    width: "100%",
    height: "55vh",
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="custom-form">
        <input
          type="text"
          className="form-control custom-input"
          id="city+state"
          placeholder="Jacksonville, FL"
        />
        <hr style={{ color: "white" }} />
        <input
          type="number"
          className="form-control custom-input"
          id="zipCode"
          placeholder="32202"
          value={zipCode}
          onChange={(e) => handleZipCodeChange(e)}
        />
        <hr style={{ color: "white" }} />
        <button type="submit" className="btn btn-primary custom-btn">
          Submit
        </button>
      </form>
      <hr className="hr" />
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            {showMap &&
              headings
                .slice(currentIndex, currentIndex + 3)
                .map((heading, index) => (
                  <div key={index} className="row-md-auto">
                    <a
                      href={
                        validZipCodes.includes(zipCode)
                          ? links[index]
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`col col text-decoration-none ${
                        validZipCodes.includes(zipCode) ? "" : "disabled"
                      }`}
                    >
                      <div className="col">
                        <div className="row">
                          <h1 className="heading">{heading}</h1>
                        </div>
                        <div className="row">
                          <p className="subheading">{subheadings[index]}</p>
                        </div>
                        <hr />
                      </div>
                    </a>
                  </div>
                ))}
            <div className="row justify-content-center mt-3">
              {currentIndex > 0 && (
                <button
                  className="btn btn-primary mr-2"
                  onClick={handlePreviousResults}
                >
                  Previous
                </button>
              )}
              {currentIndex + 3 < headings.length && (
                <button className="btn btn-primary" onClick={handleNextResults}>
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="col map">
            <LoadScript googleMapsApiKey="">
              {showMap && (
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  center={mapCenter}
                  zoom={zoomLevel}
                  mapTypeId="satellite"
                >
                  {markers.map((marker, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: marker.latitude,
                        lng: marker.longitude,
                      }}
                    />
                  ))}
                </GoogleMap>
              )}
            </LoadScript>
          </div>
        </div>
      </div>
      {noResults && (
        <div className="alert alert-danger mt-3" role="alert">
          No results found for the entered zip code.
        </div>
      )}
    </div>
  );
};

export default Form;
