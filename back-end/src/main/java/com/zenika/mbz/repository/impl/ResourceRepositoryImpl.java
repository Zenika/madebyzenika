package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoException;
import com.arangodb.util.MapBuilder;
import com.zenika.mbz.model.Resource;
import com.zenika.mbz.repository.ResourceRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ResourceRepositoryImpl extends GenericRepositoryImpl<Resource> implements ResourceRepository{

    @Override
    public List<Resource> findByProject(String projectId) {
        String query =  "FOR r IN " + this.collectionName  +
                        " FILTER r.projectId == @projectId " +
                        "RETURN r";

        Map<String, Object> bindVars = new MapBuilder().put("projectId", projectId).get();

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }

    @Override
    public List<Resource> findByEvent(String eventId) {
        String query =  "FOR r IN " + this.collectionName  +
                " FILTER r.eventId == @eventId " +
                "RETURN r";

        Map<String, Object> bindVars = new MapBuilder().put("eventId", eventId).get();

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }
}
