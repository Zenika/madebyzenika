package com.zenika.mbz.manager.impl;

import com.zenika.mbz.manager.EventTypeManager;
import com.zenika.mbz.model.EventType;
import com.zenika.mbz.repository.DataRepository;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class EventTypeManagerImpl implements EventTypeManager{

    @Inject
    DataRepository<EventType> dataRepository;

    @Override
    public List<EventType> findAll() {
        return dataRepository.findAll();
    }

    @Override
    public EventType findById(String id) {
        return dataRepository.findById(id);
    }

    @Override
    public List<EventType> save(List<EventType> eventTypes) {
        return dataRepository.save(eventTypes);
    }

    @Override
    public EventType save(EventType eventType) {
        return dataRepository.save(eventType);
    }

    @Override
    public EventType update(String id, EventType eventType) {
        return dataRepository.update(id, eventType);
    }

    @Override
    public void delete(String id) {
        dataRepository.delete(id);
    }

    @Override
    public List<EventType> deleteAll() {
        return dataRepository.deleteAll();
    }
}
