import "./stylesheets/header.css";

function Header() {
  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="title">CauseFinder</h1>
          </div>
          <div className="col-md-auto">
            <a href="/">
              <p className="header">Home</p>
            </a>
          </div>
          <div className="col-md-auto">
            <a href="/about">
              <p className="header">About</p>
            </a>
          </div>
          <div className="col-md-auto">
            <a href="/search">
              <p className="header">Search</p>
            </a>
          </div>
          <div className="col-md-auto">
            <a href="/list">
              <p className="header">List a Non-Profit</p>
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;
