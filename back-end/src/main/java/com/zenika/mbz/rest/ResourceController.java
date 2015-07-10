package com.zenika.mbz.rest;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.manager.ResourceManager;
import com.zenika.mbz.model.Resource;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = {"/resources"}, produces = {"application/json"})
public class ResourceController extends MainController{

    @Inject
    ResourceManager resourceManager;

    @Inject
    DataManager<Resource> dataManager;

    @RequestMapping(method = {RequestMethod.GET})
    public List<Resource> getResources() {
        return this.dataManager.findAll();
    }

    @RequestMapping(value = {"/{id}"},method = {RequestMethod.GET})
    public Resource getResourceById(@PathVariable("id") String id) {
        return this.dataManager.findById(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = "project")
    public List<Resource> getResourcesByProject(@RequestParam("project") String id) {
        return this.resourceManager.findByProject(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = "event")
    public List<Resource> getResourcesByEvent(@RequestParam("event") String id) {
        return this.resourceManager.findByEvent(id);
    }

    @RequestMapping(consumes = {"application/json"}, method = {RequestMethod.POST})
    public Resource postResource(@Valid @RequestBody Resource resource) {
        return this.dataManager.save(resource);
    }

    @RequestMapping(value = {"/{id}"}, consumes = {"application/json"}, method = {RequestMethod.PUT})
    public Resource putResource(@PathVariable("id") String id, @Valid @RequestBody Resource resource) {
        return this.dataManager.update(id, resource);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public void deleteResource(@PathVariable("id") String id) {
        this.dataManager.delete(id);
    }
}
