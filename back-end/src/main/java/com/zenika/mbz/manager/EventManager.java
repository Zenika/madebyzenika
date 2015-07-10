package com.zenika.mbz.manager;

import com.arangodb.ArangoException;
import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.model.Event;
import java.util.List;

public interface EventManager extends DataManager<Event> {
    List<Event> findEventsByProject(String var1);
}
