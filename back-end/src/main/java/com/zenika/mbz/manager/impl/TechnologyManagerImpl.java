package com.zenika.mbz.manager.impl;

import com.arangodb.ArangoException;
import com.zenika.mbz.manager.TechnologyManager;
import com.zenika.mbz.model.Technology;
import com.zenika.mbz.repository.DataRepository;
import java.util.List;
import javax.inject.Inject;

import com.zenika.mbz.repository.TechnologyRepository;
import org.springframework.stereotype.Service;

@Service
public class TechnologyManagerImpl implements TechnologyManager {

    @Inject
    DataRepository<Technology> dataRepository;

    @Inject
    TechnologyRepository technologyRepository;

    public List<Technology> findAll() {
        return this.dataRepository.findAll();
    }

    public Technology findById(String id) {
        return this.dataRepository.findById(id);
    }

    @Override
    public List<Technology> findTechnologiesByProject(String projectId) {
        return technologyRepository.findTechnologiesByProject(projectId);
    }

    public List<Technology> save(List<Technology> t) {
        return this.dataRepository.save(t);
    }

    public Technology save(Technology technology) {
        return this.dataRepository.save(technology);
    }

    public Technology update(String id, Technology technology) {
        return this.dataRepository.update(id, technology);
    }

    public void delete(String id) {
        this.dataRepository.delete(id);
    }

    public List<Technology> deleteAll() {
        return this.dataRepository.deleteAll();
    }

}
