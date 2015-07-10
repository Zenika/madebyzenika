
package com.zenika.mbz.manager;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.model.Project;

import java.util.List;

public interface ProjectManager extends DataManager<Project> {
    List<Project> findAll(Integer skip, Integer limit);

    List<Project> findByTechnologies(Integer skip, Integer limit, String technologyId);

    List<Project> findByTypeAndTechnologies(Integer skip, Integer limit, String type, String technologyId);

    List<Project> findByType(Integer skip, Integer limit, String typeId);

    List<Project> findByUser(String userId);
}
