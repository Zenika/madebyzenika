package com.zenika.mbz.manager.impl;

import com.zenika.mbz.manager.ResourceTypeManager;
import com.zenika.mbz.model.ResourceType;
import com.zenika.mbz.repository.DataRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class ResourceTypeManagerImpl implements ResourceTypeManager{

    @Inject
    DataRepository<ResourceType> dataRepository;

    @Override
    public List<ResourceType> findAll() {
        return dataRepository.findAll();
    }

    @Override
    public ResourceType findById(String id) {
        return dataRepository.findById(id);
    }

    @Override
    public List<ResourceType> save(List<ResourceType> resourceTypes) {
        return dataRepository.save(resourceTypes);
    }

    @Override
    public ResourceType save(ResourceType resourceType) {
        return dataRepository.save(resourceType);
    }

    @Override
    public ResourceType update(String id, ResourceType resourceType) {
        return dataRepository.update(id, resourceType);
    }

    @Override
    public void delete(String id) {
        dataRepository.delete(id);
    }

    @Override
    public List<ResourceType> deleteAll() {
        return dataRepository.deleteAll();
    }
}
