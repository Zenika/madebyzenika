package com.zenika.mbz.repository;

import com.arangodb.ArangoException;
import com.zenika.mbz.model.Project;
import java.util.List;

public interface ProjectRepository {
    List<Project> findAll();

    List<Project> findAll(Integer skip, Integer limit);

    List<Project> findByTechnologies(Integer skip, Integer limit, String technologyId);

    List<Project> findByType(Integer skip, Integer limit, String typeId);

    List<Project> findByTypeAndTechnologies(Integer skip, Integer limit, String type, String technologyId);

    List<Project> findByUser(String userId);
}
