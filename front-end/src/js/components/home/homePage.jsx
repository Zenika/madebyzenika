var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Home = React.createClass({

  render: function() {
    return (
      <div className="landing-body">
        <div className="landing-photo">
          <div className="landing-content">
            <h2>Made By Zenika</h2>
            <h4>Découvrez l'ensemble de vos projets et leurs moyens de mise en oeuvre.</h4>
            <div className="discover-project">
              <Link to="projects" >découvrir les projets <i className="fa fa-angle-right"></i></Link>
            </div>
          </div>

        </div>
        <div className="sublanding">
              <div className="col-md-3 entity">
                <div className="project-entity resources" onMouseOver={this.overImage}>
                  <h3>Les ressources</h3>
                  <div className="discover-entity">
                    <Link to="projects" >découvrir <i className="fa fa-angle-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-md-3 entity">
                <div className="project-entity team">
                  <h3>Les équipes</h3>
                <div className="discover-entity">
                  <Link to="projects" >découvrir <i className="fa fa-angle-right"></i></Link>
                </div>
                </div>
              </div>
              <div className="col-md-3 entity">
                <div className="project-entity techniques">
                  <h3>Les moyens techniques</h3>
                <div className="discover-entity">
                  <Link to="projects" >découvrir <i className="fa fa-angle-right"></i></Link>
                </div>
                </div>
              </div>
              <div className="col-md-3 entity">
                <div className="project-entity events">
                  <h3>Les événements</h3>
                <div className="discover-entity">
                  <Link to="projects" >découvrir <i className="fa fa-angle-right"></i></Link>
                </div>
                </div>
              </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
