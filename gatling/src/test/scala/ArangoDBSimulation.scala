import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class ArangoDBSimulation extends Simulation {

  val numberOfUsers = 20
  val duration = 2 minutes

	val httpProtocol = http
		.baseURL("http://146.148.31.238:8529/_db/madebyzenika/_api/")
    .header("Content-Type", "application/json")
    .basicAuth("zenika", "zenika")
		.inferHtmlResources()


  val entities = List("Event", "EventType", "Project", "ProjectType", "Resource", "ResourceType", "Technology")

  val crudScenario = scenario("crudScenario")
    .foreach(entities, "entity") {
      exec(http("POST ${entity}")
        .post("document?collection=${entity}")
        .body(RawFileBody("arangodb/${entity}-post.json"))
        .check(jsonPath("$._id").saveAs("id")))
      .exec(http("GET ${entity}")
        .get("document?collection=${entity}"))
      .exec(http("GET ${entity} by id")
        .get("document/${id}")
        .check(jsonPath("$.name").saveAs("name"), jsonPath("$._id").is("${id}")))
      .exec(http("GET ${entity} by name")
        .post("cursor")
        .body(StringBody("""{ "query" : "FOR t IN ${entity}
         FILTER LIKE(t.name, '${name}', true)
       RETURN t" }"""))
        .check(jsonPath("$.result[0].name").is("${name}")))
      .exec(http("PUT ${entity}")
        .put("document/${id}")
        .body(RawFileBody("arangodb/${entity}-post.json")))
      .exec(http("DELETE ${entity}")
        .delete("document/${id}"))
    }

  val eventScenario = scenario("eventScenario")
    .exec(http("POST events")
      .post("document?collection=Event")
      .body(RawFileBody("arangodb/Event-post.json"))
      .check(jsonPath("$._id").saveAs("id")))
    .exec(http("GET events by id")
      .get("document/${id}")
      .check(jsonPath("$._id").is("${id}"), jsonPath("$.projectId").saveAs("projectId"), jsonPath("$.name").saveAs("name")))
    .exec(http("GET event by project")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR e IN Event FILTER e.projectId == '${projectId}' SORT e.dateStart RETURN e" }"""))
      .check(jsonPath("$.result[0].name").is("${name}")))
    .exec(http("DELETE events")
      .delete("document/${id}"))

  val projectScenario = scenario("projectScenario")
    .exec(http("POST projects")
      .post("document?collection=Project")
      .body(RawFileBody("arangodb/Project-post.json"))
      .check(jsonPath("$._id").saveAs("id")))
    .exec(http("GET projects by id")
      .get("document/${id}")
      .check(jsonPath("$._id").is("${id}"), jsonPath("$.projectType").saveAs("projectType"), jsonPath("$.technologies[0]").saveAs("technology"),jsonPath("$.team[0]").saveAs("user")))
    .exec(http("GET project by type")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR p IN Project
                          FILTER p.projectType == '${projectType}'
                          RETURN p" }"""))
      .check(jsonPath("$.result[0].projectType").is("${projectType}")))
    .exec(http("GET project by technology")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR p IN Project
                          FOR t IN p.technologies
                          FILTER t == '${technology}'
                          RETURN p" }"""))
      .check(jsonPath("$.result[0].technologies[0]").is("${technology}")))
    .exec(http("GET project by type and technology")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR p IN Project
                          FILTER p.projectType == '${projectType}'
                          FOR t IN p.technologies
                          FILTER t == '${technology}'
                          RETURN p" }"""))
      .check(jsonPath("$.result[0].projectType").is("${projectType}"),jsonPath("$.result[0].technologies[0]").is("${technology}")))
    .exec(http("GET project by user")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR p IN Project
                          FOR u IN p.team
                          FILTER u == '${user}'
                          RETURN p" }"""))
      .check(jsonPath("$.result[0].team[0]").is("${user}")))
      .exec(http("DELETE project")
        .delete("document/${id}"))

  val resourceScenario = scenario("resourceScenario")
    .exec(http("POST resources")
      .post("document?collection=Resource")
      .body(RawFileBody("arangodb/Resource-post.json"))
      .check(jsonPath("$._id").saveAs("id")))
    .exec(http("GET resources by id")
      .get("document/${id}")
      .check(jsonPath("$._id").is("${id}"), jsonPath("$.projectId").saveAs("projectId"), jsonPath("$.eventId").saveAs("eventId"), jsonPath("$.name").saveAs("name")))
    .exec(http("GET resource by project")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR e IN Resource FILTER e.projectId == '${projectId}' SORT e.dateStart RETURN e" }"""))
      .check(jsonPath("$.result[0].name").is("${name}")))
    .exec(http("GET resource by event")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR e IN Resource FILTER e.eventId == '${eventId}' SORT e.dateStart RETURN e" }"""))
      .check(jsonPath("$.result[0].name").is("${name}")))
    .exec(http("DELETE resources")
      .delete("document/${id}"))

  val findUserByProjectScenario = scenario("findUserByProjectScenario")
    .exec(http("POST User")
      .post("document?collection=User")
      .body(RawFileBody("arangodb/User-post.json"))
      .check(jsonPath("$._id").saveAs("id")))
    .exec(http("POST project for search by project")
      .post("document?collection=Project")
      .body(ELFileBody("arangodb/User-project-post.json"))
      .check(jsonPath("$._id").saveAs("projectId")))
    .exec(http("GET User by project")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR p IN Project FILTER p._key == '${projectId}' FOR m IN p.team  FOR u IN User FILTER u._key == m  RETURN u"}""")))
    .exec(http("DELETE project after search by project")
      .delete("document/${projectId}"))
    .exec(http("DELETE User")
      .delete("document/${id}"))

  val findTechnologyByProjectScenario = scenario("findTechnologyByProjectScenario")
    .exec(http("POST Technology")
      .post("document?collection=Technology")
      .body(RawFileBody("arangodb/Technology-post.json"))
      .check(jsonPath("$._id").saveAs("id")))
    .exec(http("POST project for search by project")
      .post("document?collection=Project")
      .body(ELFileBody("arangodb/Technology-project-post.json"))
      .check(jsonPath("$._id").saveAs("projectId")))
    .exec(http("GET Technology by project")
      .post("cursor")
      .body(StringBody("""{ "query" : "FOR p IN Project FILTER p._key == '${projectId}' FOR pt IN p.technologies FOR t IN Technology FILTER t._key == pt RETURN t"}""")))
    .exec(http("DELETE project after search by project")
      .delete("document/${projectId}"))
    .exec(http("DELETE Technology")
      .delete("document/${id}"))


  setUp(
    crudScenario.inject(constantUsersPerSec(1) during duration),
    eventScenario.inject(constantUsersPerSec(1) during duration),
    projectScenario.inject(constantUsersPerSec(1) during duration),
    resourceScenario.inject(constantUsersPerSec(1) during duration),
    findUserByProjectScenario.inject(constantUsersPerSec(1) during duration),
    findTechnologyByProjectScenario.inject(constantUsersPerSec(1) during duration)
  ).protocols(httpProtocol)
}