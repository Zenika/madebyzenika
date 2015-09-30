package com.zenika.mbz.repository.impl;

import com.zenika.mbz.model.Resource;
import com.zenika.mbz.repository.ResourceRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ResourceRepositoryImpl extends GenericRepositoryImpl<Resource> implements ResourceRepository{

    @Override
    public List<Resource> findByProject(String projectId) {
        return findByCriterion("projectId", projectId);
    }

    @Override
    public List<Resource> findByEvent(String eventId) {
        return findByCriterion("eventId", eventId);
    }
}
