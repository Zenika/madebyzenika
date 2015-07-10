package com.zenika.mbz.rest;

import com.arangodb.ArangoException;
import com.zenika.mbz.manager.EventTypeManager;
import com.zenika.mbz.manager.ProjectTypeManager;
import com.zenika.mbz.model.EventType;
import com.zenika.mbz.model.ProjectType;
import java.util.List;
import javax.inject.Inject;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = {"/eventTypes"}, produces = {"application/json"})
public class EventTypeController extends MainController{

    @Inject
    EventTypeManager eventTypeManager;

    public EventTypeController() {
    }

    @RequestMapping(method = {RequestMethod.GET})
    public List<EventType> getEventTypes() {
        return this.eventTypeManager.findAll();
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.GET})
    public EventType getEventTypeById(@PathVariable("id") String id) {
        return this.eventTypeManager.findById(id);
    }

    @RequestMapping(consumes = {"application/json"}, method = {RequestMethod.POST})
    public EventType postEventType(@Valid @RequestBody EventType projectType) {
        return this.eventTypeManager.save(projectType);
    }

    @RequestMapping(value = {"/{id}"}, consumes = {"application/json"},method = {RequestMethod.PUT})
    public EventType putEventType(@PathVariable("id") String id, @Valid @RequestBody EventType projectType) {
        return this.eventTypeManager.update(id, projectType);
    }

    @RequestMapping(value = {"/{id}"}, method = {RequestMethod.DELETE})
    public void deleteEventType(@PathVariable("id") String id) {
        this.eventTypeManager.delete(id);
    }
}
