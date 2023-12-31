import Header from "../components/Header";
import "../components/stylesheets/about.css";

function About() {
  return (
    <div>
      <Header />
      <br />
      <div className="custom-container">
        <h1 className="title1">About</h1>
        <hr className="hr" />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <h1 className="heading1">What?</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6 order-md-2">
              <img
                src="../../public/K9sforwarriors.jpg"
                className="image"
                alt="K9s for Warriors"
              />
              <p className="paragraph-1">K9's for Warriors*</p>
            </div>
            <div className="col-md-6 order-md-1">
              <p className="paragraph1">
                I made this website as a demo. The predominant goal of this
                website was to show the feasibility of this unique solution for
                non-profits. As a high schooler, with all my responsibilities, I
                don't think I could do this concept justice alone.
                <br />
                <br />
                My Goal for this project is not to continue it long term, but to
                raise awareness about the issue of recognition for local
                non-profits.
                <br />
                <br />
                My hope is that someone will develop a similar or better
                solution for this issue.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <h1 className="heading1">Why?</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6 order-md-2">
              <div className="center">
                <img
                  src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/553/273/datas/gallery.jpg"
                  className="image"
                  alt="SustainaTrek"
                />
                <p className="paragraph-1">SustainaTrek</p>
              </div>
            </div>
            <div className="col-md-6 order-md-1">
              <p className="paragraph1">
                One of my inspirations for this project was someone I met in a
                previous Hackathon.
                <br />
                <br />
                In a previous Hackathon, I made a project entitled
                "SustainaTrek."
                <br />
                <br />
                During the development of the aforementioned project, one of my
                teammates told me about how she interned at a local non-profit
                in Sweden, and how they were struggling with outreach and were
                running out of funding to continue.
                <br />
                <br />I was devastated to find out about this, especially with
                all the good they did for their community.
                <br />
                <br />I was then inspiried by that story to create this project,
                to help solve that issue and allow Non-Profits to focus what
                they do best.
              </p>
            </div>
          </div>
        </div>
        <p className="footer">
          *Beaches Go Green, Birdies for Warriors, Wounded Warrior Project and
          any other shown groups are 501(c) Non-Profit Groups and are in no way
          affiliated with this demo.*
        </p>
      </div>
    </div>
  );
}

export default About;
