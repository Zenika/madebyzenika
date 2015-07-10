package com.zenika.mbz.rest;

import com.zenika.mbz.manager.ResourceTypeManager;
import com.zenika.mbz.model.ResourceType;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = {"/resourceTypes"}, produces = {"application/json"})
public class ResourceTypeController extends MainController {

    @Inject
    ResourceTypeManager resourceTypeManager;

    @RequestMapping(method = {RequestMethod.GET})
    public List<ResourceType> getResourceTypes() {
        return this.resourceTypeManager.findAll();
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.GET})
    public ResourceType getResourceTypeById(@PathVariable("id") String id) {
        return this.resourceTypeManager.findById(id);
    }

    @RequestMapping(consumes = {"application/json"}, method = {RequestMethod.POST})
    public ResourceType postResourceType(@Valid @RequestBody ResourceType resourceType) {
        return this.resourceTypeManager.save(resourceType);
    }

    @RequestMapping(value = {"/{id}"}, consumes = {"application/json"}, method = {RequestMethod.PUT})
    public ResourceType putResourceType(@PathVariable("id") String id, @Valid @RequestBody ResourceType resourceType) {
        return this.resourceTypeManager.update(id, resourceType);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public void deleteResourceType(@PathVariable("id") String id) {
        this.resourceTypeManager.delete(id);
    }
}
