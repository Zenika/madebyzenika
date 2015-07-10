package com.zenika.mbz.repository;

import com.arangodb.ArangoException;
import com.zenika.mbz.model.Event;
import java.util.List;

public interface EventRepository {
    List<Event> findEventsByProject(String var1);
}
