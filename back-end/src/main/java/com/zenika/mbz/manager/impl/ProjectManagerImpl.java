package com.zenika.mbz.manager.impl;

import com.zenika.mbz.manager.ProjectManager;
import com.zenika.mbz.model.Project;
import com.zenika.mbz.repository.DataRepository;
import com.zenika.mbz.repository.ProjectRepository;
import java.util.List;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

@Service
public class ProjectManagerImpl implements ProjectManager {

    @Inject
    DataRepository<Project> dataRepository;
    @Inject
    ProjectRepository projectRepository;

    public List<Project> findAll() {
        return this.dataRepository.findAll();
    }

    public List<Project> findAll(Integer skip, Integer limit) {
        return this.projectRepository.findAll(skip, limit);
    }

    public Project findById(String id) {
        return this.dataRepository.findById(id);
    }

    @Override
    public List<Project> findByName(String name) {
        return dataRepository.findByName(name);
    }

    @Override
    public List<Project> findByType(Integer skip, Integer limit, String typeId) {
        return projectRepository.findByType(skip, limit, typeId);
    }

    @Override
    public List<Project> findByTechnologies(Integer skip, Integer limit, String technologyId) {
        return projectRepository.findByTechnologies(skip, limit, technologyId);
    }

    @Override
    public List<Project> findByTypeAndTechnologies(Integer skip, Integer limit, String type, String technologyId) {
        return projectRepository.findByTypeAndTechnologies(skip, limit, type, technologyId);
    }

    @Override
    public List<Project> findByUser(String userId) {
        return projectRepository.findByUser(userId);
    }

    public List<Project> save(List<Project> projects) {
        return this.dataRepository.save(projects);
    }

    public Project save(Project project) {
        return this.dataRepository.save(project);
    }

    public Project update(String id, Project project) {
        return this.dataRepository.update(id, project);
    }

    public void delete(String id) {
        this.dataRepository.delete(id);
    }

    public List<Project> deleteAll() {
        return this.dataRepository.deleteAll();
    }
}
