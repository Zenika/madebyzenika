package com.zenika.mbz.rest;

import com.zenika.mbz.manager.EventManager;
import com.zenika.mbz.model.Event;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/events", produces = "application/json")
public class EventController extends MainController {

    @Inject
    EventManager eventManager;

    @RequestMapping(method = GET)
    public List<Event> getEvents() {
        return eventManager.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public Event getEventById(@PathVariable("id") String id) {
        return eventManager.findById(id);
    }

    @RequestMapping(method = GET, params = "project")
    public List<Event> getEventByProjectId(@RequestParam("project") String id) {
        return eventManager.findEventsByProject(id);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public Event postEvent(@Valid @RequestBody Event event) {
        return eventManager.save(event);
    }

    @RequestMapping(value = "/list", consumes = "application/json", method = POST)
    public List<Event> postEvents(@Valid @RequestBody List<Event> events) {
        return eventManager.save(events);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public Event putEvent(@PathVariable("id") String id, @Valid @RequestBody Event event) {
        return eventManager.update(id, event);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteEvent(@PathVariable("id") String id) {
        eventManager.delete(id);
    }
}
