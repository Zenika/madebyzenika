var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require("./components/app.jsx");
var AppPrivate = require("./components/appPrivate.jsx");

var NotFound = require("./components/notFound.jsx");

var Home = require("./components/home/homePage.jsx");

var Admin = require("./components/admin/admin.jsx");
var Dashboard = require("./components/admin/dashboard.jsx");

var PageFormProject = require("./components/admin/project/pageFormProject.jsx");
var PageFormEvent = require("./components/admin/event/pageFormEvent.jsx");
var PageFormEventType = require("./components/admin/eventType/pageFormEventType.jsx");
var PageFormResource = require("./components/admin/resource/pageFormResource.jsx");
var PageFormResourceType = require("./components/admin/resourceType/pageFormResourceType.jsx");

var PageAdminProjects = require("./components/admin/project/list/pageProjectsList.jsx");
var PageAdminEventsByProject = require("./components/admin/event/list/pageProjectEventsList.jsx");
var PageAdminEventTypes = require("./components/admin/eventType/list/pageEventTypeList.jsx");
var PageAdminResourcesByProject = require("./components/admin/resource/list/pageProjectResourcesList.jsx");
var PageAdminUsersByProject = require("./components/admin/user/list/pageProjectUsersList.jsx");
var PageAdminResourceTypes = require("./components/admin/resourceType/list/pageResourceTypeList.jsx");

var PageProjects = require("./components/project/list/pageProjectsList.jsx");
var PageProjectsByTechnology = require("./components/technology/projectsListByTechnology.jsx");
var ProjectDetail = require("./components/project/detail/projectDetail.jsx");

var routes = (
  <Route handler={App}>

    <Route handler={Home} name="home" path="/" />

    <Route handler={AppPrivate}>

      <Route handler={Admin} path="/admin/">

        <Route handler={Dashboard} name="dashboard" path="dashboard" />

        <Route handler={PageAdminProjects} name="AdminProjects" path="projects" />

        <Route handler={PageAdminEventsByProject} name="AdminEventsByProjects" path="events/project/:projectId" />

        <Route handler={PageAdminEventTypes} name="AdminEventTypes" path="eventTypes" />

        <Route handler={PageAdminResourcesByProject} name="AdminResourcesByProjects" path="resources/project/:projectId" />

        <Route handler={PageAdminResourceTypes} name="AdminResourceTypes" path="resourceTypes" />

        <Route handler={PageAdminUsersByProject} name="PageAdminUsersByProject" path="users/project/:projectId" />

        <Route handler={PageFormProject}>
          <Route name="addProject" path="addProject" />
          <Route name="updateProject" path="updateProject/:projectId" />
        </Route>

        <Route handler={PageFormResource}>
          <Route name="addResourceToProject" path="addResource/project/:projectId" />
          <Route name="updateResource" path="updateResource/:resourceId/project/:projectId" />
        </Route>

        <Route handler={PageFormEvent}>
          <Route name="addEvent" path="addEvent/project/:projectId" />
          <Route name="updateEvent" path="updateEvent/:eventId" />
        </Route>

        <Route handler={PageFormEventType}>
          <Route name="addEventType" path="addEventType" />
          <Route name="updateEventType" path="updateEventType/:eventTypeId" />
        </Route>

        <Route handler={PageFormResourceType}>
          <Route name="addResourceType" path="addResourceType" />
          <Route name="updateResourceType" path="updateResourceType/:resourceTypeId" />
        </Route>

      </Route>

      <Route handler={PageProjects} name="projects" />

      <Route handler={PageProjectsByTechnology} name="projectsByTechnology" path="/projects/technology/:technologyId" />

      <Route handler={ProjectDetail} name="projectDetail" path="/project/:projectId" />

    </Route>

    <Route path="*" handler={NotFound} />
  </Route>
);

module.exports = routes;
