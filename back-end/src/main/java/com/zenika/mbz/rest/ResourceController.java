package com.zenika.mbz.rest;

import com.zenika.mbz.model.Resource;
import com.zenika.mbz.repository.GenericRepository;
import com.zenika.mbz.repository.ResourceRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/resources", produces = "application/json")
public class ResourceController extends MainController<Resource> {

    @Inject
    ResourceRepository resourceRepository;

    @RequestMapping(method = GET, params = "project")
    public List<Resource> getResourcesByProject(@RequestParam("project") String id) {
        return resourceRepository.findByProject(id);
    }

    @RequestMapping(method = GET, params = "event")
    public List<Resource> getResourcesByEvent(@RequestParam("event") String id) {
        return resourceRepository.findByEvent(id);
    }

    @Override
    protected GenericRepository<Resource> getRepository() {
        return resourceRepository;
    }
}
