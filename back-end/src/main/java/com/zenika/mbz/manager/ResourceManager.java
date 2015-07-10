package com.zenika.mbz.manager;

import com.zenika.mbz.model.Resource;

import java.util.List;

public interface ResourceManager extends DataManager<Resource>{

    List<Resource> findByProject(String projectId);

    List<Resource> findByEvent(String eventId);
}
