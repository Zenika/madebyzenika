package com.zenika.mbz.rest;

import com.zenika.mbz.manager.ResourceTypeManager;
import com.zenika.mbz.model.ResourceType;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/resourceTypes", produces = "application/json")
public class ResourceTypeController extends MainController {

    @Inject
    ResourceTypeManager resourceTypeManager;

    @RequestMapping(method = GET)
    public List<ResourceType> getResourceTypes() {
        return resourceTypeManager.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public ResourceType getResourceTypeById(@PathVariable("id") String id) {
        return resourceTypeManager.findById(id);
    }

    @RequestMapping(method = GET, params = "name")
    public List<ResourceType> getResourceTypeByName(@RequestParam("name") String name) {
        return resourceTypeManager.findByName(name);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public ResourceType postResourceType(@Valid @RequestBody ResourceType resourceType) {
        return resourceTypeManager.save(resourceType);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public ResourceType putResourceType(@PathVariable("id") String id, @Valid @RequestBody ResourceType resourceType) {
        return resourceTypeManager.update(id, resourceType);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteResourceType(@PathVariable("id") String id) {
        resourceTypeManager.delete(id);
    }
}
