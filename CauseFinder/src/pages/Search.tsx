import "../components/stylesheets/landing.css";
import Header from "../components/Header";
import Form from "../components/Form";

function Search() {
  return (
    <div>
      <Header />
      <br />

      <div className="custom-container">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="heading1">Search For...</h1>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
