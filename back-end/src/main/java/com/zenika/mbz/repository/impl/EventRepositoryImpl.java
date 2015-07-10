package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.arangodb.util.AqlQueryOptions;
import com.arangodb.util.MapBuilder;
import com.zenika.mbz.model.Event;
import com.zenika.mbz.repository.EventRepository;
import com.zenika.mbz.repository.impl.AbstractRepository;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.inject.Named;
import org.springframework.stereotype.Repository;

@Repository
public class EventRepositoryImpl extends AbstractRepository<Event> implements EventRepository {
    @Inject
    @Named("ArangoDriver")
    private ArangoDriver driver;

    public EventRepositoryImpl() {
    }

    public List<Event> findEventsByProject(String projectId) {
        String query = "FOR e IN " + this.collectionName + " FILTER e.projectId == @projectId " + "SORT e.dateStart " + "RETURN e";
        Map bindVars = (new MapBuilder()).put("projectId", projectId).get();
        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, (AqlQueryOptions)null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }
}
