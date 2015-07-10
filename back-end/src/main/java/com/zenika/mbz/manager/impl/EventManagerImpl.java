package com.zenika.mbz.manager.impl;

import com.arangodb.ArangoException;
import com.zenika.mbz.manager.EventManager;
import com.zenika.mbz.model.Event;
import com.zenika.mbz.repository.DataRepository;
import com.zenika.mbz.repository.EventRepository;
import java.util.List;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

@Service
public class EventManagerImpl implements EventManager {

    @Inject
    DataRepository<Event> dataRepository;
    @Inject
    EventRepository eventRepository;

    public List<Event> findAll() {
        return this.dataRepository.findAll();
    }

    public Event findById(String id) {
        return (Event)this.dataRepository.findById(id);
    }

    public List<Event> findEventsByProject(String projectId) {
        return this.eventRepository.findEventsByProject(projectId);
    }

    public List<Event> save(List<Event> events) {
        return this.dataRepository.save(events);
    }

    public Event save(Event event) {
        return (Event)this.dataRepository.save(event);
    }

    public Event update(String id, Event event) {
        return (Event)this.dataRepository.update(id, event);
    }

    public void delete(String id) {
        this.dataRepository.delete(id);
    }

    public List<Event> deleteAll() {
        return this.dataRepository.deleteAll();
    }
}
