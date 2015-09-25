package com.zenika.mbz.rest;

import com.zenika.mbz.model.Technology;
import com.zenika.mbz.repository.GenericRepository;
import com.zenika.mbz.repository.TechnologyRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/technologies", produces = "application/json")
public class TechnologyController extends MainController<Technology> {

    @Inject
    TechnologyRepository technologyRepository;

    @RequestMapping(method = GET, params = "project")
    public List<Technology> getTechnologiesByProject(@RequestParam("project") String id) {
        return technologyRepository.findTechnologiesByProject(id);
    }

    @Override
    protected GenericRepository<Technology> getRepository() {
        return technologyRepository;
    }
}