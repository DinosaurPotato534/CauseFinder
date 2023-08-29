import "../components/stylesheets/landing.css";
import Header from "../components/Header";
import Form from "../components/Form";

function Landing() {
  return (
    <div>
      <Header />
      <br />

      <div className="custom-container">
        <Form />
      </div>
    </div>
  );
}

export default Landing;
