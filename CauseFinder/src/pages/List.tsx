import Header from "../components/Header";
import OrganizationForm from "../components/OrganizationForm";
import "../components/stylesheets/landing.css";

function List() {
  return (
    <div>
      <Header />
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="heading-list">Add New Organization:</h2>
            <br />
            <OrganizationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
