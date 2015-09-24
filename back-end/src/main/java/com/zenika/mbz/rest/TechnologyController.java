package com.zenika.mbz.rest;

import com.zenika.mbz.manager.TechnologyManager;
import com.zenika.mbz.model.Technology;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/technologies", produces = "application/json")
public class TechnologyController extends MainController {

    @Inject
    TechnologyManager technologyManager;

    @RequestMapping(method = GET)
    public List<Technology> getTechnologies() {
        return technologyManager.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public Technology getTechnologyById(@PathVariable("id") String id) {
        return technologyManager.findById(id);
    }

    @RequestMapping(method = GET, params = "project")
    public List<Technology> getTechnologiesByProject(@RequestParam("project") String id) {
        return technologyManager.findTechnologiesByProject(id);
    }

    @RequestMapping(method = GET, params = "name")
    public List<Technology> getTechnologyByName(@RequestParam("name") String name) {
        return technologyManager.findByName(name);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public Technology postTechnology(@Valid @RequestBody Technology technology) {
        return technologyManager.save(technology);
    }

    @RequestMapping(value = "/list", consumes = "application/json", method = POST)
    public List<Technology> postTechnologies(@RequestBody List<Technology> technologies) {
        return technologyManager.save(technologies);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public Technology putTechnology(@PathVariable("id") String id, @Valid @RequestBody Technology event) {
        return technologyManager.update(id, event);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteTechnology(@PathVariable("id") String id) {
        technologyManager.delete(id);
    }
}