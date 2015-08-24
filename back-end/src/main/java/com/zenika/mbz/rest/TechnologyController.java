package com.zenika.mbz.rest;

import com.zenika.mbz.manager.TechnologyManager;
import com.zenika.mbz.model.Technology;

import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/technologies"}, produces = {"application/json"})
public class TechnologyController extends MainController {

    @Inject
    TechnologyManager technologyManager;

    @RequestMapping(method = {RequestMethod.GET})
    public List<Technology> getTechnologies() {
        return this.technologyManager.findAll();
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.GET})
    public Technology getTechnologyById(@PathVariable("id") String id) {
        return this.technologyManager.findById(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = "project")
    public List<Technology> getTechnologiesByProject(@RequestParam("project") String id) {
        return this.technologyManager.findTechnologiesByProject(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = {"name"})
    public List<Technology> getTechnologyByName(@RequestParam("name") String name) {
        return this.technologyManager.findByName(name);
    }

    @RequestMapping(consumes = {"application/json"},method = {RequestMethod.POST})
    public Technology postTechnology(@Valid @RequestBody Technology technology) {
        return this.technologyManager.save(technology);
    }

    @RequestMapping(value = {"/list"}, consumes = {"application/json"}, method = {RequestMethod.POST})
    public List<Technology> postTechnologies(@RequestBody List<Technology> technologies) {
        return this.technologyManager.save(technologies);
    }

    @RequestMapping(value = {"/{id}"}, consumes = {"application/json"}, method = {RequestMethod.PUT})
    public Technology putTechnology(@PathVariable("id") String id, @Valid @RequestBody Technology event) {
        return this.technologyManager.update(id, event);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public void deleteTechnology(@PathVariable("id") String id) {
        this.technologyManager.delete(id);
    }
}