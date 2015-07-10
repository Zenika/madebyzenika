package com.zenika.mbz.rest;

import com.zenika.mbz.manager.EventManager;
import com.zenika.mbz.model.Event;
import com.zenika.mbz.rest.MainController;
import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = {"/events"}, produces = {"application/json"})
public class EventController extends MainController {

    @Inject
    EventManager eventManager;

    public EventController() {}

    @RequestMapping(method = {RequestMethod.GET})
    public List<Event> getEvents() {
        return this.eventManager.findAll();
    }

    @RequestMapping(value = {"/{id}"},method = {RequestMethod.GET})
    public Event getEventById(@PathVariable("id") String id) {
        return this.eventManager.findById(id);
    }

    @RequestMapping(method = {RequestMethod.GET}, params = "project")
    public List<Event> getEventByProjectId(@RequestParam("project") String id) {
        return this.eventManager.findEventsByProject(id);
    }

    @RequestMapping(consumes = {"application/json"},method = {RequestMethod.POST})
    public Event postEvent(@Valid @RequestBody Event event) {
        return this.eventManager.save(event);
    }

    @RequestMapping(value = {"/list"},consumes = {"application/json"},method = {RequestMethod.POST})
    public List<Event> postEvents(@Valid @RequestBody List<Event> events) {
        return this.eventManager.save(events);
    }

    @RequestMapping(value = {"/{id}"},consumes = {"application/json"},method = {RequestMethod.PUT})
    public Event putEvent(@PathVariable("id") String id, @Valid @RequestBody Event event) {
        return this.eventManager.update(id, event);
    }

    @RequestMapping(value = {"/{id}"},method = {RequestMethod.DELETE})
    public void deleteEvent(@PathVariable("id") String id) {
        this.eventManager.delete(id);
    }
}
