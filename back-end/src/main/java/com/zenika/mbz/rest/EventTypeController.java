package com.zenika.mbz.rest;

import com.zenika.mbz.model.EventType;
import com.zenika.mbz.repository.EventTypeRepository;
import com.zenika.mbz.repository.GenericRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping(value = "/eventTypes", produces = "application/json")
public class EventTypeController extends MainController<EventType> {

    @Inject
    EventTypeRepository eventRepository;

    @Override
    protected GenericRepository<EventType> getRepository() {
        return eventRepository;
    }
}
