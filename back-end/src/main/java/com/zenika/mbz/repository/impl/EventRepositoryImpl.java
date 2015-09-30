package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoException;
import com.arangodb.entity.DocumentEntity;
import com.zenika.mbz.model.Event;
import com.zenika.mbz.repository.EventRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class EventRepositoryImpl extends GenericRepositoryImpl<Event> implements EventRepository {

    public List<Event> findEventsByProject(String projectId) {
        String query = "FOR e IN " + collectionName + " FILTER e.projectId == @projectId SORT e.dateStart RETURN e";
        Map<String, Object> bindVars = new HashMap<String, Object>();
        bindVars.put("projectId", projectId);
        List<DocumentEntity<Event>> listDocEntity = null;
        try {
            listDocEntity = driver.executeDocumentQuery(query, bindVars, null, entityClass).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryListDocument(listDocEntity);
    }
}
