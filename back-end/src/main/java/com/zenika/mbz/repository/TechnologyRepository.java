package com.zenika.mbz.repository;

import com.zenika.mbz.model.Technology;

import java.util.List;

public interface TechnologyRepository {
    List<Technology> findTechnologiesByProject(String projectId);
}
