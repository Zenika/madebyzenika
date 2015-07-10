package com.zenika.mbz.rest;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.manager.ProjectManager;
import com.zenika.mbz.model.Project;

import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/projects"}, produces = {"application/json"})
public class ProjectController extends MainController {

    @Inject
    ProjectManager projectManager;

    @Inject
    DataManager<Project> dataManager;

    @RequestMapping(method = {RequestMethod.GET})
    public List<Project> getProjects() {
        return this.dataManager.findAll();
    }

    @RequestMapping(method = {RequestMethod.GET}, params = {"skip", "limit"})
    public List<Project> getProjects(@RequestParam("skip") Integer skip, @RequestParam("limit") Integer limit) {
        return this.projectManager.findAll(skip, limit);
    }

    @RequestMapping(value = {"/{id}"},method = {RequestMethod.GET})
    public Project getProjectById(@PathVariable("id") String id) {
        return this.projectManager.findById(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = {"skip", "limit", "technologies"})
    public List<Project> getProjectsByTechnologies(
        @RequestParam("skip") Integer skip,
        @RequestParam("limit") Integer limit,
        @RequestParam("technologies") String technologies) {
        return this.projectManager.findByTechnologies(skip, limit, technologies);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = {"skip", "limit", "type"})
    public List<Project> getProjectsByTypeAndTechnologies(
            @RequestParam("skip") Integer skip,
            @RequestParam("limit") Integer limit,
            @RequestParam("type") String type) {
        return this.projectManager.findByType(skip, limit, type);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = {"skip", "limit", "type", "technologies"})
    public List<Project> getProjectsByTypeAndTechnologies(
        @RequestParam("skip") Integer skip,
        @RequestParam("limit") Integer limit,
        @RequestParam("type") String type,
        @RequestParam("technologies") String technologies) {
        return this.projectManager.findByTypeAndTechnologies(skip, limit, type, technologies);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = "user")
    public List<Project> getProjectsByUserId(@RequestParam("user") String id) {
        return this.projectManager.findByUser(id);
    }

    @RequestMapping(consumes = {"application/json"}, method = {RequestMethod.POST})
    public Project postProject(@Valid @RequestBody Project project) {
        return this.projectManager.save(project);
    }

    @RequestMapping(value = {"/{id}"}, consumes = {"application/json"}, method = {RequestMethod.PUT})
    public Project putProject(@PathVariable("id") String id, @Valid @RequestBody Project project) {
        return this.projectManager.update(id, project);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public void deleteProject(@PathVariable("id") String id) {
        this.projectManager.delete(id);
    }
}
