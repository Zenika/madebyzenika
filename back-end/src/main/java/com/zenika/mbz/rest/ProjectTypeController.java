package com.zenika.mbz.rest;

import com.zenika.mbz.model.ProjectType;
import com.zenika.mbz.repository.GenericRepository;
import com.zenika.mbz.repository.ProjectTypeRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping(value = "/projectTypes", produces = "application/json")
public class ProjectTypeController extends MainController<ProjectType> {

    @Inject
    ProjectTypeRepository projectTypeRepository;

    @Override
    protected GenericRepository<ProjectType> getRepository() {
        return projectTypeRepository;
    }
}
