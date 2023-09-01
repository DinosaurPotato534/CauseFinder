import React, { useState } from "react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  GeoPoint,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Geocode from "react-geocode";
import "./stylesheets/List.css";
import "./stylesheets/form.css";

// Initialize Firebase app
const firebaseConfig = {
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

Geocode.setApiKey("");
Geocode.enableDebug();

const OrganizationForm = () => {
  const [zipCode, setZipCode] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [location, setLocation] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [Address, setAddress] = useState("");
  const [mapCenterLat, setMapCenterLat] = useState("");
  const [mapCenterLng, setMapCenterLng] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessages([]);
    setSuccessMessage("");

    if (!isValidZipCode(zipCode)) {
      setErrorMessages(["Invalid Zip Code"]);
      return;
    }

    if (!isValidLocation(location)) {
      setErrorMessages([
        "Invalid Location Format. Please use a location in the format of Street, City, State",
      ]);
      return;
    }

    if (!isValidWebsiteLink(websiteLink)) {
      setErrorMessages([
        "Invalid Website Link. Please use a link in the format of https://www.example.org",
      ]);
      return;
    }

    try {
      const response = await Geocode.fromAddress(Address);
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      setLongitude(lng);
      setLatitude(lat);

      const zipCodeDocRef = doc(db, "data", zipCode);
      const zipCodeDocSnapshot = await getDoc(zipCodeDocRef);

      if (zipCodeDocSnapshot.exists()) {
        await updateDoc(zipCodeDocRef, {
          headings: arrayUnion(organizationName),
          locations: arrayUnion(organizationName),
          subheadings: arrayUnion(location),
          links: arrayUnion(websiteLink),
          locationCoordinates: new GeoPoint(
            Number(latitude),
            Number(longitude)
          ),
          address: arrayUnion(Address),
        });
      } else {
        await setDoc(zipCodeDocRef, {
          headings: [organizationName],
          locations: [organizationName],
          subheadings: [location],
          links: [websiteLink],
          locationCoordinates: [
            new GeoPoint(Number(latitude), Number(longitude)),
          ],
          mapCenter: new GeoPoint(Number(mapCenterLat), Number(mapCenterLng)),
          zoomLevel: 10,
        });
      }

      setZipCode("");
      setOrganizationName("");
      setLocation("");
      setWebsiteLink("");
      setLongitude("");
      setLatitude("");
      setAddress("");
      setMapCenterLat("");
      setMapCenterLng("");
      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessages([
        "An error occurred while submitting the form. Please try again later.",
      ]);
    }
  };

  const isValidZipCode = (zipCode: string) => {
    // Implement your zip code validation logic here
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode);
  };

  const isValidLocation = (location: string) => {
    // Implement your location validation logic here
    return /^[a-zA-Z\s,]+$/.test(location);
  };

  const isValidWebsiteLink = (link: string) => {
    // Implement your website link validation logic here
    return /^https?:\/\/www\..+$/.test(link);
  };

  return (
    <form onSubmit={handleFormSubmit} className="custom-form">
      <div className="form-group">
        <label htmlFor="zipCode" className="form-label">
          Zip Code
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          className="form-control"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="organizationName" className="form-label">
          Organization Name
        </label>
        <input
          type="text"
          id="organizationName"
          name="organizationName"
          className="form-control"
          placeholder="Enter Organization Name"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label">
          Location (City, State)
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="form-control"
          placeholder="Enter Location (City, State)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="websiteLink" className="form-label">
          Website Link
        </label>
        <input
          type="text"
          id="websiteLink"
          name="websiteLink"
          className="form-control"
          placeholder="Enter Website Link"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control"
          placeholder="Enter Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {errorMessages.length > 0 && (
        <div className="error-message" role="alert">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="success-message" role="alert">
          {successMessage}
        </div>
      )}

      <button type="submit" className="custom-btn">
        Submit
      </button>
    </form>
  );
};

export default OrganizationForm;
