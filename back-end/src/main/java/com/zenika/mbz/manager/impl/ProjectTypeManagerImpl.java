package com.zenika.mbz.manager.impl;

import com.arangodb.ArangoException;
import com.zenika.mbz.manager.ProjectTypeManager;
import com.zenika.mbz.model.ProjectType;
import com.zenika.mbz.repository.DataRepository;
import java.util.List;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

@Service
public class ProjectTypeManagerImpl implements ProjectTypeManager {
    @Inject
    DataRepository<ProjectType> dataRepository;

    public List<ProjectType> findAll() {
        return this.dataRepository.findAll();
    }

    public ProjectType findById(String id) {
        return this.dataRepository.findById(id);
    }

    @Override
    public List<ProjectType> findByName(String name) {
        return dataRepository.findByName(name);
    }

    public List<ProjectType> save(List<ProjectType> projectTypes) {
        return this.dataRepository.save(projectTypes);
    }

    public ProjectType save(ProjectType projectType) {
        return this.dataRepository.save(projectType);
    }

    public ProjectType update(String id, ProjectType projectType) {
        return this.dataRepository.update(id, projectType);
    }

    public void delete(String id) {
        this.dataRepository.delete(id);
    }

    public List<ProjectType> deleteAll() {
        return this.dataRepository.deleteAll();
    }
}