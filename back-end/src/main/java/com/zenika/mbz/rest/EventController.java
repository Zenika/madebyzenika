package com.zenika.mbz.rest;

import com.zenika.mbz.model.Event;
import com.zenika.mbz.repository.EventRepository;
import com.zenika.mbz.repository.GenericRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/events", produces = "application/json")
public class EventController extends MainController<Event> {

    @Inject
    EventRepository eventRepository;

    @RequestMapping(method = GET, params = "project")
    public List<Event> getEventByProjectId(@RequestParam("project") String id) {
        return eventRepository.findEventsByProject(id);
    }

    @Override
    protected GenericRepository<Event> getRepository() {
        return eventRepository;
    }
}
