package com.zenika.mbz.rest;

import com.arangodb.ArangoException;
import com.zenika.mbz.manager.ProjectTypeManager;
import com.zenika.mbz.model.ProjectType;
import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/projectTypes"}, produces = {"application/json"})
public class ProjectTypeController {

    @Inject
    ProjectTypeManager projectTypeManager;

    public ProjectTypeController() {}

    @RequestMapping(method = {RequestMethod.GET})
    public List<ProjectType> getProjects() {
        return this.projectTypeManager.findAll();
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.GET})
    public ProjectType getProjectById(@PathVariable("id") String id) {
        return this.projectTypeManager.findById(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = {"name"})
    public List<ProjectType> getResourceTypeByName(@RequestParam("name") String name) {
        return this.projectTypeManager.findByName(name);
    }

    @RequestMapping(consumes = {"application/json"}, method = {RequestMethod.POST})
    public ProjectType postProject(@Valid @RequestBody ProjectType projectType) {
        return this.projectTypeManager.save(projectType);
    }

    @RequestMapping(value = {"/{id}"}, consumes = {"application/json"}, method = {RequestMethod.PUT})
    public ProjectType putProject(@PathVariable("id") String id, @Valid @RequestBody ProjectType projectType) {
        return this.projectTypeManager.update(id, projectType);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public void deleteProject(@PathVariable("id") String id) {
        this.projectTypeManager.delete(id);
    }
}
