import { useState, ChangeEvent, FormEvent } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./stylesheets/form.css";

const firebaseConfig = {
  // Your Firebase config here

  apiKey: "AIzaSyBLK_UaPw2eg1hfwq5ySnW06A_XYyE7LwU",

  authDomain: "togetherweserve-f5686.firebaseapp.com",

  projectId: "togetherweserve-f5686",

  storageBucket: "togetherweserve-f5686.appspot.com",

  messagingSenderId: "789907691670",

  appId: "1:789907691670:web:23bc612967e7732b5a0ab7",

  measurementId: "G-GQ7N4NC4WJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const Form = () => {
  const [zipCode, setZipCode] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const [headings, setHeadings] = useState<string[]>([]);
  const [subheadings, setSubheadings] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const validZipCodes = ["32081", "32082"];

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
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
          placeholder="Ponte Vedra, FL"
        />
        <hr style={{ color: "white" }} />
        <input
          type="number"
          className="form-control custom-input"
          id="zipCode"
          placeholder="32081"
          value={zipCode}
          onChange={(e) => handleZipCodeChange(e)}
        />
        <hr style={{ color: "white" }} />
        <button type="submit" className="btn btn-primary custom-btn">
          Submit
        </button>
      </form>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            {showMap &&
              headings.map((heading, index) => (
                <div key={index} className="row-md-auto">
                  <a
                    href={
                      validZipCodes.includes(zipCode) ? links[index] : undefined
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
          </div>
          <div className="col map">
            <LoadScript googleMapsApiKey="AIzaSyD01af9HvKCo6e45nDew9vK4MvZLU8b_Hw">
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
    </div>
  );
};

export default Form;
