package com.zenika.mbz.rest;

import com.zenika.mbz.model.Project;
import com.zenika.mbz.repository.GenericRepository;
import com.zenika.mbz.repository.ProjectRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/projects", produces = "application/json")
public class ProjectController extends MainController<Project> {

    @Inject
    ProjectRepository projectRepository;

    @RequestMapping(method = GET, params = {"skip", "limit"})
    public List<Project> getProjects(@RequestParam("skip") Integer skip, @RequestParam("limit") Integer limit) {
        return projectRepository.findAll(skip, limit);
    }

    @RequestMapping(method = GET, params = {"skip", "limit", "technologies"})
    public List<Project> getProjectsByTechnologies(
        @RequestParam("skip") Integer skip,
        @RequestParam("limit") Integer limit,
        @RequestParam("technologies") String technologies) {
        return projectRepository.findByTechnologies(skip, limit, technologies);
    }

    @RequestMapping(method = GET, params = {"skip", "limit", "type"})
    public List<Project> getProjectsByTypeAndTechnologies(
            @RequestParam("skip") Integer skip,
            @RequestParam("limit") Integer limit,
            @RequestParam("type") String type) {
        return projectRepository.findByType(skip, limit, type);
    }

    @RequestMapping(method = GET, params = {"skip", "limit", "type", "technologies"})
    public List<Project> getProjectsByTypeAndTechnologies(
        @RequestParam("skip") Integer skip,
        @RequestParam("limit") Integer limit,
        @RequestParam("type") String type,
        @RequestParam("technologies") String technologies) {
        return projectRepository.findByTypeAndTechnologies(skip, limit, type, technologies);
    }

    @RequestMapping(method = GET, params = "user")
    public List<Project> getProjectsByUserId(@RequestParam("user") String id) {
        return projectRepository.findByUser(id);
    }

    @Override
    protected GenericRepository<Project> getRepository() {
        return projectRepository;
    }
}
