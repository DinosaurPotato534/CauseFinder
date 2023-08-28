import "./stylesheets/landing.css";
import Header from "./Header";
import Form from "./Form";

function Landing() {
  return (
    <div>
      <Header />
      <div className="custom-container">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="heading text-center">Search For:</h1>
            </div>
          </div>
          <div className="row mobile-search">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
