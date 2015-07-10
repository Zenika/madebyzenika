package com.zenika.mbz.manager.impl;

import com.zenika.mbz.manager.ResourceManager;
import com.zenika.mbz.model.Resource;
import com.zenika.mbz.repository.DataRepository;
import com.zenika.mbz.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class ResourceManagerImpl implements ResourceManager {

    @Inject
    DataRepository<Resource> dataRepository;

    @Inject
    ResourceRepository resourceRepository;

    @Override
    public List<Resource> findAll() {
        return dataRepository.findAll();
    }

    @Override
    public Resource findById(String id) {
        return dataRepository.findById(id);
    }

    @Override
    public List<Resource> findByProject(String projectId) {
        return resourceRepository.findByProject(projectId);
    }

    @Override
    public List<Resource> findByEvent(String eventId) {
        return resourceRepository.findByEvent(eventId);
    }

    @Override
    public List<Resource> save(List<Resource> resources) {
        return dataRepository.save(resources);
    }

    @Override
    public Resource save(Resource resource) {
        return dataRepository.save(resource);
    }

    @Override
    public Resource update(String id, Resource resource) {
        return dataRepository.update(id, resource);
    }

    @Override
    public void delete(String id) {
        dataRepository.delete(id);
    }

    @Override
    public List<Resource> deleteAll() {
        return dataRepository.deleteAll();
    }

}
