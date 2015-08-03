var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var PageTitle = require("./pageTitle.jsx");

var Dashboard = React.createClass({

  render: function() {
    return (
      <div id="page-wrapper">
        <div id="wrapper">
            <PageTitle fonticon="icon-map-streamline-user" title="mon espace (PAGE EN TRAVAUX)" />

             <div className="row">
                 <div className="col-lg-3 col-md-6">
                     <div className="panel panel-primary">
                         <div className="panel-heading">
                             <div className="row">
                                 <div className="col-xs-3">
                                   <span className="icon-short-access">
                                     <i className="icon-browser-streamline-window"></i>
                                   </span>
                                 </div>
                                 <div className="col-xs-9 text-right">
                                     <div className="huge">26</div>
                                     <div>MES PROJETS</div>
                                 </div>
                             </div>
                         </div>
                         <a href="#">
                             <div className="panel-footer">
                                 <span className="pull-left">Liste des projets</span>
                                 <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                 <div className="clearfix"></div>
                             </div>
                         </a>
                     </div>
                 </div>
                 <div className="col-lg-3 col-md-6">
                     <div className="panel panel-green">
                         <div className="panel-heading">
                             <div className="row">
                                 <div className="col-xs-3">
                                   <span className="icon-short-access">
                                     <i className="icon-book-read-streamline"></i>
                                   </span>
                                 </div>
                                 <div className="col-xs-9 text-right">
                                     <div className="huge">12</div>
                                     <div>MES RESSOURCES</div>
                                 </div>
                             </div>
                         </div>
                         <a href="#">
                             <div className="panel-footer">
                                 <span className="pull-left">Liste des ressources</span>
                                 <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                 <div className="clearfix"></div>
                             </div>
                         </a>
                     </div>
                 </div>
                 <div className="col-lg-3 col-md-6">
                     <div className="panel panel-yellow">
                         <div className="panel-heading">
                             <div className="row">
                                 <div className="col-xs-3">
                                   <span className="icon-short-access">
                                     <i className="icon-calendar"></i>
                                   </span>
                                 </div>
                                 <div className="col-xs-9 text-right">
                                     <div className="huge">124</div>
                                     <div>MES EVENEMENTS</div>
                                 </div>
                             </div>
                         </div>
                         <a href="#">
                             <div className="panel-footer">
                                 <span className="pull-left">Liste des événements</span>
                                 <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                 <div className="clearfix"></div>
                             </div>
                         </a>
                     </div>
                 </div>
                 <div className="col-lg-3 col-md-6">
                     <div className="panel panel-red">
                         <div className="panel-heading">
                             <div className="row">
                                 <div className="col-xs-3">
                                   <span className="icon-short-access">
                                     <i className="icon-man-people-streamline-user"></i>
                                   </span>
                                 </div>
                                 <div className="col-xs-9 text-right">
                                     <div className="huge">13</div>
                                     <div>MES COLLEGUES</div>
                                 </div>
                             </div>
                         </div>
                         <a href="#">
                             <div className="panel-footer">
                                 <span className="pull-left">Liste des collaborateurs</span>
                                 <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                 <div className="clearfix"></div>
                             </div>
                         </a>
                     </div>
                 </div>
             </div>

             <div className="row">
                 <div className="col-lg-8">

                     <div className="panel panel-default">
                         <div className="panel-heading">
                             <i className="fa fa-clock-o fa-fw"></i> Tous mes événements
                         </div>

                         <div className="panel-body">
                             <ul className="timeline">
                                 <li>
                                     <div className="timeline-badge"><i className="fa fa-check"></i>
                                     </div>
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                             <p><small className="text-muted"><i className="fa fa-clock-o"></i> 11 hours ago via Twitter</small>
                                             </p>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis.</p>
                                         </div>
                                     </div>
                                 </li>
                                 <li className="timeline-inverted">
                                     <div className="timeline-badge warning"><i className="fa fa-credit-card"></i>
                                     </div>
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia repellendus.</p>
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores odit qui est tempora eos, nostrum provident explicabo dignissimos debitis vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p>
                                         </div>
                                     </div>
                                 </li>
                                 <li>
                                     <div className="timeline-badge danger"><i className="fa fa-bomb"></i>
                                     </div>
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p>
                                         </div>
                                     </div>
                                 </li>
                                 <li className="timeline-inverted">
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p>
                                         </div>
                                     </div>
                                 </li>
                                 <li>
                                     <div className="timeline-badge info"><i className="fa fa-save"></i>
                                     </div>
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam debitis amet, beatae consequuntur impedit nulla qui! Laborum, atque.</p>
                                             <hr />
                                             <div className="btn-group">
                                                 <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                                                     <i className="fa fa-gear"></i>  <span className="caret"></span>
                                                 </button>
                                                 <ul className="dropdown-menu" role="menu">
                                                     <li><a href="#">Action</a>
                                                     </li>
                                                     <li><a href="#">Another action</a>
                                                     </li>
                                                     <li><a href="#">Something else here</a>
                                                     </li>
                                                     <li className="divider"></li>
                                                     <li><a href="#">Separated link</a>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </div>
                                     </div>
                                 </li>
                                 <li>
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi fuga odio quibusdam. Iure expedita, incidunt unde quis nam! Quod, quisquam. Officia quam qui adipisci quas consequuntur nostrum sequi. Consequuntur, commodi.</p>
                                         </div>
                                     </div>
                                 </li>
                                 <li className="timeline-inverted">
                                     <div className="timeline-badge success"><i className="fa fa-graduation-cap"></i>
                                     </div>
                                     <div className="timeline-panel">
                                         <div className="timeline-heading">
                                             <h4 className="timeline-title">Lorem ipsum dolor</h4>
                                         </div>
                                         <div className="timeline-body">
                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati, quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque eaque.</p>
                                         </div>
                                     </div>
                                 </li>
                             </ul>
                         </div>

                     </div>

                 </div>

                 <div className="col-lg-4">
                     <div className="chat-panel panel panel-default">
                         <div className="panel-heading">
                             <i className="fa fa-thumb-tack fa-fw"></i>
                             Les dernières ressources ajoutées
                             <div className="btn-group pull-right">
                                 <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                     <i className="fa fa-chevron-down"></i>
                                 </button>
                                 <ul className="dropdown-menu slidedown">
                                     <li>
                                         <a href="#">
                                             <i className="fa fa-refresh fa-fw"></i> Refresh
                                         </a>
                                     </li>
                                     <li>
                                         <a href="#">
                                             <i className="fa fa-check-circle fa-fw"></i> Available
                                         </a>
                                     </li>
                                     <li>
                                         <a href="#">
                                             <i className="fa fa-times fa-fw"></i> Busy
                                         </a>
                                     </li>
                                     <li>
                                         <a href="#">
                                             <i className="fa fa-clock-o fa-fw"></i> Away
                                         </a>
                                     </li>
                                     <li className="divider"></li>
                                     <li>
                                         <a href="#">
                                             <i className="fa fa-sign-out fa-fw"></i> Sign Out
                                         </a>
                                     </li>
                                 </ul>
                             </div>
                         </div>

                         <div className="panel-body">
                             <ul className="chat">
                               <li className="left clearfix">
                                   <span className="chat-img pull-left">
                                       <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" className="img-circle" />
                                   </span>
                                   <div className="chat-body clearfix">
                                       <div className="header">
                                           <strong className="primary-font">Comparatif bases NoSQL</strong>
                                           <small className="pull-right text-muted">
                                               <i className="fa fa-clock-o fa-fw"></i> 12 mins ago
                                           </small>
                                       </div>
                                       <p>
                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                       </p>
                                   </div>
                               </li>
                               <li className="left clearfix">
                                   <span className="chat-img pull-left">
                                       <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" className="img-circle" />
                                   </span>
                                   <div className="chat-body clearfix">
                                       <div className="header">
                                           <strong className="primary-font">Etude de Cassandra</strong>
                                           <small className="pull-right text-muted">
                                               <i className="fa fa-clock-o fa-fw"></i> 12 mins ago
                                           </small>
                                       </div>
                                       <p>
                                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                       </p>
                                   </div>
                               </li>
                                <li className="left clearfix">
                                     <span className="chat-img pull-left">
                                         <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" className="img-circle" />
                                     </span>
                                     <div className="chat-body clearfix">
                                         <div className="header">
                                             <strong className="primary-font">Documentation ArangoDB</strong>
                                             <small className="pull-right text-muted">
                                                 <i className="fa fa-clock-o fa-fw"></i> 12 mins ago
                                             </small>
                                         </div>
                                         <p>
                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                         </p>
                                     </div>
                                 </li>
                                 <li className="left clearfix">
                                     <span className="chat-img pull-left">
                                         <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" className="img-circle" />
                                     </span>
                                     <div className="chat-body clearfix">
                                         <div className="header">
                                             <strong className="primary-font">Documentation ReactJS</strong>
                                             <small className="pull-right text-muted">
                                                 <i className="fa fa-clock-o fa-fw"></i> 14 mins ago</small>
                                         </div>
                                         <p>
                                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                         </p>
                                     </div>
                                 </li>
                             </ul>
                         </div>

                     </div>

                 </div>

             </div>

        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
