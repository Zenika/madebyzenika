package com.zenika.mbz.repository;

import com.zenika.mbz.model.Resource;

import java.util.List;

public interface ResourceRepository {
    List<Resource> findByProject(String projectId);

    List<Resource> findByEvent(String eventId);
}
