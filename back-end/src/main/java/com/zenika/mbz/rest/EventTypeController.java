package com.zenika.mbz.rest;

import com.zenika.mbz.manager.EventTypeManager;
import com.zenika.mbz.model.EventType;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "/eventTypes", produces = "application/json")
public class EventTypeController extends MainController {

    @Inject
    EventTypeManager eventTypeManager;

    public EventTypeController() {
    }

    @RequestMapping(method = GET)
    public List<EventType> getEventTypes() {
        return eventTypeManager.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public EventType getEventTypeById(@PathVariable("id") String id) {
        return eventTypeManager.findById(id);
    }

    @RequestMapping(method = GET, params = "name")
    public List<EventType> getResourceTypeByName(@RequestParam("name") String name) {
        return eventTypeManager.findByName(name);
    }

    @RequestMapping(consumes = "application/json", method = POST)
    public EventType postEventType(@Valid @RequestBody EventType projectType) {
        return eventTypeManager.save(projectType);
    }

    @RequestMapping(value = "/{id}", consumes = "application/json", method = PUT)
    public EventType putEventType(@PathVariable("id") String id, @Valid @RequestBody EventType projectType) {
        return eventTypeManager.update(id, projectType);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public void deleteEventType(@PathVariable("id") String id) {
        eventTypeManager.delete(id);
    }
}
