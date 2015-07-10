package com.zenika.mbz.manager;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.model.Technology;

import java.util.List;

public interface TechnologyManager extends DataManager<Technology> {
    List<Technology> findTechnologiesByProject(String projectId);
}