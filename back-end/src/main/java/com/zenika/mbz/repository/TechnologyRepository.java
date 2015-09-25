package com.zenika.mbz.repository;

import com.zenika.mbz.model.Technology;

import java.util.List;

public interface TechnologyRepository extends GenericRepository<Technology> {
    List<Technology> findTechnologiesByProject(String projectId);
}
