package com.zenika.mbz.rest;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.manager.ProjectManager;
import com.zenika.mbz.model.Project;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/projects", produces = "application/json")
public class ProjectController extends MainController {

    @Inject
    ProjectManager projectManager;

    @Inject
    DataManager<Project> dataManager;

    @RequestMapping(method = GET)
    public List<Project> getProjects() {
        return dataManager.findAll();
    }

    @RequestMapping(method = GET, params = {"skip", "limit"})
    public List<Project> getProjects(@RequestParam("skip") Integer skip, @RequestParam("limit") Integer limit) {
        return projectManager.findAll(skip, limit);
    }

    @RequestMapping(value = "/{id}",method = GET)
    public Project getProjectById(@PathVariable("id") String id) {
        return projectManager.findById(id);
    }

    @RequestMapping(method = GET, params = {"skip", "limit", "technologies"})
    public List<Project> getProjectsByTechnologies(
        @RequestParam("skip") Integer skip,
        @RequestParam("limit") Integer limit,
        @RequestParam("technologies") String technologies) {
        return projectManager.findByTechnologies(skip, limit, technologies);
    }

    @RequestMapping(method = GET, params = {"skip", "limit", "type"})
    public List<Project> getProjectsByTypeAndTechnologies(
            @RequestParam("skip") Integer skip,
            @RequestParam("limit") Integer limit,
            @RequestParam("type") String type) {
        return projectManager.findByType(skip, limit, type);
    }

    @RequestMapping(method = GET, params = {"skip", "limit", "type", "technologies"})
    public List<Project> getProjectsByTypeAndTechnologies(
        @RequestParam("skip") Integer skip,
        @RequestParam("limit") Integer limit,
        @RequestParam("type") String type,
        @RequestParam("technologies") String technologies) {
        return projectManager.findByTypeAndTechnologies(skip, limit, type, technologies);
    }

    @RequestMapping(method = GET, params = "user")
    public List<Project> getProjectsByUserId(@RequestParam("user") String id) {
        return projectManager.findByUser(id);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public Project postProject(@Valid @RequestBody Project project) {
        return projectManager.save(project);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public Project putProject(@PathVariable("id") String id, @Valid @RequestBody Project project) {
        return projectManager.update(id, project);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteProject(@PathVariable("id") String id) {
        projectManager.delete(id);
    }
}
