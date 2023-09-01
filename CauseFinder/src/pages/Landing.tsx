import "../components/stylesheets/landing.css";
import Header from "../components/Header";
import Form from "../components/Form";

function Landing() {
  return (
    <div>
      <Header />
      <br />

      <div className="custom-container">
        <br />
        <br />
        <div className="container">
          <div className="row">
            <h1 className="heading2">
              <span className="heading2-1">The Platform</span> For...
            </h1>
          </div>
          <div className="row">
            <h1 className="heading3">NON-PROFITS</h1>
          </div>
          <br />
          <br />
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="heading1">Search For...</h1>
              <Form />
            </div>
          </div>
        </div>
      </div>

      <div className="custom-container">
        <hr />
        <br />
        <div className="container">
          <div className="row">
            <h1 className="heading2-3">
              Connecting <span className="heading3">Volunteers</span> with
              <br />
              <span className="heading4">A Good Cause</span>
            </h1>
          </div>
          <div className="row">
            <img src="./Wounded-Warrior.jpg" className="img" />
            <p className="subtitle1 mt-2">Wounded Warrior Project*</p>
          </div>
          <div className="row-md-auto">
            <a href="/search">
              <div className="button">
                <p className="button-text p-2 px-5">Get Started...</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="custom-container">
        <hr />
        <br />
        <div className="container">
          <div className="row">
            <h1 className="heading2-3">
              Allowing <span className="heading3">Non-Profits</span> to focus
              <br />
              <span>on </span>
              <span className="heading4">What They Do Best</span>
            </h1>
          </div>
          <div className="row">
            <img src="./Birdies-for-the-Brave.png" className="img" />
            <p className="subtitle1 mt-2">Birdies For The Brave*</p>
          </div>
          <div className="row-md-auto">
            <a href="/search">
              <div className="button">
                <p className="button-text p-2 px-5">Learn More...</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="custom-container">
        <hr />
        <br />
        <div className="container">
          <div className="row">
            <h1 className="heading2-3">
              Helping <span className="heading3">Local Causes</span>
              <br />
              <span className="heading4">Prosper</span>
            </h1>
          </div>
          <div className="row">
            <img src="./Beaches-Go-Green.jpg" className="img" />
            <p className="subtitle1 mt-2">Beaches Go Green*</p>
          </div>
          <div className="row-md-auto">
            <a href="/search">
              <div className="button">
                <p className="button-text p-2 px-5">Learn More...</p>
              </div>
            </a>
          </div>
        </div>
        <p className="footer">
          *Beaches Go Green, Birdies for Warriors, Wounded Warrior Project, and
          any other show groups are 501(c) Non-Profit Groups and are in no way
          affiliated with this demo.*
        </p>
      </div>
    </div>
  );
}

export default Landing;
