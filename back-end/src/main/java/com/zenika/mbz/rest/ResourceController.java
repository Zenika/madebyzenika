package com.zenika.mbz.rest;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.manager.ResourceManager;
import com.zenika.mbz.model.Resource;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@RequestMapping(value = "/resources", produces = "application/json")
public class ResourceController extends MainController{

    @Inject
    ResourceManager resourceManager;

    @Inject
    DataManager<Resource> dataManager;

    @RequestMapping(method = GET)
    public List<Resource> getResources() {
        return dataManager.findAll();
    }

    @RequestMapping(value = "/{id}",method = GET)
    public Resource getResourceById(@PathVariable("id") String id) {
        return dataManager.findById(id);
    }

    @RequestMapping(method = GET, params = "project")
    public List<Resource> getResourcesByProject(@RequestParam("project") String id) {
        return resourceManager.findByProject(id);
    }

    @RequestMapping(method = GET, params = "event")
    public List<Resource> getResourcesByEvent(@RequestParam("event") String id) {
        return resourceManager.findByEvent(id);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public Resource postResource(@Valid @RequestBody Resource resource) {
        return dataManager.save(resource);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public Resource putResource(@PathVariable("id") String id, @Valid @RequestBody Resource resource) {
        return dataManager.update(id, resource);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteResource(@PathVariable("id") String id) {
        dataManager.delete(id);
    }
}
