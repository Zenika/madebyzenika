
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class MadeByZenikaSimulation extends Simulation {

  val numberOfUsers = 20
  val duration = 2 minutes

	val httpProtocol = http
		.baseURL("http://23.251.139.129:8080/api/")
    .header("Content-Type", "application/json")
		.inferHtmlResources()


  val entities = List("events", "eventTypes", "projects", "projectTypes", "resources", "resourceTypes", "technologies")

  val crudScenario = scenario("crudScenario")
    .foreach(entities, "entity") {
      exec(http("POST ${entity}")
        .post("${entity}")
        .body(RawFileBody("${entity}-post.json"))
        .check(jsonPath("$.id").saveAs("id")))
      .exec(http("GET ${entity}")
        .get("${entity}"))
      .exec(http("GET ${entity} by id")
        .get("${entity}/${id}")
        .check(jsonPath("$.name").saveAs("name"), jsonPath("$..id").is("${id}")))
      .exec(http("GET ${entity} by name")
        .get("${entity}")
        .queryParam("name", "${name}")
        .check(jsonPath("$..name").is("${name}")))
      .exec(http("PUT ${entity}")
        .put("${entity}/${id}")
        .body(RawFileBody("${entity}-put.json"))
        .check(jsonPath("$..id").is("${id}")))
      .exec(http("DELETE ${entity}")
        .delete("${entity}/${id}"))
    }

	val eventScenario = scenario("eventScenario")
    .exec(http("POST events")
      .post("events")
      .body(RawFileBody("events-post.json"))
      .check(jsonPath("$.id").saveAs("id"), jsonPath("$.projectId").saveAs("projectId"), jsonPath("$.name").saveAs("name")))
    .exec(http("GET event by project")
      .get("events?project=${projectId}")
      .check(jsonPath("$..name").is("${name}")))
    .exec(http("DELETE events")
      .delete("events/${id}"))

  val projectScenario = scenario("projectScenario")
    .exec(http("POST projects")
      .post("projects/list")
      .body(RawFileBody("projects-posts.json"))
      .check(jsonPath("$[*].id").findAll.saveAs("ids"),
        jsonPath("$[0].projectType").saveAs("projectType"),
        jsonPath("$[0].technologies[0]").saveAs("technology"),
        jsonPath("$[0].team[0]").saveAs("user")
      ))
    .exec(http("GET pagined projects")
      .get("projects?skip=0&limit=2"))
    .exec(http("GET projects by type")
      .get("projects?skip=0&limit=2&type=${projectType}"))
    .exec(http("GET projects by technology")
      .get("projects?skip=0&limit=2&technologies=${technology}"))
    .exec(http("GET projects by type and technology")
      .get("projects?skip=0&limit=2&type=${projectType}&technologies=${technology}"))
    .exec(http("GET projects by user")
      .get("projects?user=${user}"))
    .foreach("${ids}", "id") {
        exec(http("DELETE project")
        .delete("projects/${id}"))
    }

  val resourceScenario = scenario("resourceScenario")
    .exec(http("POST resources")
      .post("resources")
      .body(RawFileBody("resources-post.json"))
      .check(jsonPath("$.id").saveAs("id"), jsonPath("$.projectId").saveAs("projectId"), jsonPath("$.eventId").saveAs("eventId")))
    .exec(http("GET resources by project")
      .get("resources?project=${projectId}"))
    .exec(http("GET resources by event")
      .get("resources?event=${eventId}"))
    .exec(http("DELETE resources")
      .delete("resources/${id}"))

  val findByProjectEntities = List("technologies", "users")


  val findByProjectScenario = scenario("findByProjectScenario")
    .foreach(findByProjectEntities, "entity") {
      exec(http("POST ${entity}")
        .post("${entity}")
        .body(RawFileBody("${entity}-post.json"))
        .check(jsonPath("$.id").saveAs("id")))
        .exec(http("POST project for search by project")
          .post("projects")
          .body(ELFileBody("${entity}-project-post.json"))
          .check(jsonPath("$.id").saveAs("projectId")))
        .exec(http("GET ${entity} by project")
          .get("${entity}?project=${projectId}"))
        .exec(http("DELETE project after search by project")
          .delete("projects/${projectId}"))
        .exec(http("DELETE ${entity}")
          .delete("${entity}/${id}"))
    }

  setUp(
    crudScenario.inject(constantUsersPerSec(1) during duration),
    eventScenario.inject(constantUsersPerSec(1) during duration),
    projectScenario.inject(constantUsersPerSec(1) during duration),
    resourceScenario.inject(constantUsersPerSec(1) during duration),
    findByProjectScenario.inject(constantUsersPerSec(1) during duration)
  ).protocols(httpProtocol)
}