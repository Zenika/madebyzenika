package com.zenika.mbz.rest;

import com.zenika.mbz.manager.ProjectTypeManager;
import com.zenika.mbz.model.ProjectType;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/projectTypes", produces = "application/json")
public class ProjectTypeController {

    @Inject
    ProjectTypeManager projectTypeManager;

    public ProjectTypeController() {}

    @RequestMapping(method = GET)
    public List<ProjectType> getProjects() {
        return projectTypeManager.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public ProjectType getProjectById(@PathVariable("id") String id) {
        return projectTypeManager.findById(id);
    }

    @RequestMapping(method = GET, params = "name")
    public List<ProjectType> getResourceTypeByName(@RequestParam("name") String name) {
        return projectTypeManager.findByName(name);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public ProjectType postProject(@Valid @RequestBody ProjectType projectType) {
        return projectTypeManager.save(projectType);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public ProjectType putProject(@PathVariable("id") String id, @Valid @RequestBody ProjectType projectType) {
        return projectTypeManager.update(id, projectType);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteProject(@PathVariable("id") String id) {
        projectTypeManager.delete(id);
    }
}
