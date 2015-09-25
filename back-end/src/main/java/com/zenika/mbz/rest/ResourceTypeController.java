package com.zenika.mbz.rest;

import com.zenika.mbz.model.ResourceType;
import com.zenika.mbz.repository.GenericRepository;
import com.zenika.mbz.repository.ResourceTypeRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping(value = "/resourceTypes", produces = "application/json")
public class ResourceTypeController extends MainController<ResourceType> {

    @Inject
    ResourceTypeRepository resourceTypeRepository;

    @Override
    protected GenericRepository<ResourceType> getRepository() {
        return resourceTypeRepository;
    }
}

