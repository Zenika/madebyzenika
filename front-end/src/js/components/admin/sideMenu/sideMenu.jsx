var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var SideMenu = React.createClass({
  render: function() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar">
          <li className="sidebar-list"><Link to="dashboard">Tableau de bord<span className="pull-right hidden-xs showopacity"></span></Link></li>
          <li className="sidebar-list"><Link to="AdminProjects">Mes projets<span className="pull-right hidden-xs showopacity"></span></Link></li>
          <li className="sidebar-list"><Link to="AdminEventTypes">Types d'événements<span className="pull-right hidden-xs showopacity"></span></Link></li>
          <li className="sidebar-list"><Link to="AdminResourceTypes">Type de ressources<span className="pull-right hidden-xs showopacity"></span></Link></li>
          <li className="sidebar-list"><Link to="AdminTechnologies">Stack techniques<span className="pull-right hidden-xs showopacity"></span></Link></li>
        </ul>
      </div>
    );
  }
});

module.exports = SideMenu;



// <nav className="navbar navbar-default sidebar" role="navigation">
//     <div className="container-fluid">
//     <div className="navbar-header">
//       <button className="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
//         <span className="sr-only">Toggle navigation</span>
//         <span className="icon-bar"></span>
//         <span className="icon-bar"></span>
//         <span className="icon-bar"></span>
//       </button>
//     </div>
//     <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
//       <ul className="nav navbar-nav">
//         <li className="active">
//           <a href="#">Home<span style="font-size:16px;" className="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a>
//
//         </li>
//         <li className="dropdown">
//           <a href="#" class="dropdown-toggle" data-toggle="dropdown">Usuarios <span className="caret"></span><span style="font-size:16px;" className="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></a>
//           <ul className="dropdown-menu forAnimate" role="menu">
//             <li><a href="{{URL::to('createusuario')}}">Crear</a></li>
//             <li><a href="#">Modificar</a></li>
//             <li><a href="#">Reportar</a></li>
//             <li class="divider"></li>
//             <li><a href="#">Separated link</a></li>
//             <li class="divider"></li>
//             <li><a href="#">Informes</a></li>
//           </ul>
//         </li>
//         <li ><a href="#">Libros<span style="font-size:16px;" className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></a></li>
//         <li ><a href="#">Tags<span style="font-size:16px;" className="pull-right hidden-xs showopacity glyphicon glyphicon-tags"></span></a></li>
//       </ul>
//     </div>
//   </div>
// </nav>
