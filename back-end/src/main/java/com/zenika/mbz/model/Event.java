package com.zenika.mbz.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Event extends Entity {

    @NotEmpty(message = "The event name is required")
    @Size(min = 3, max = 80, message = "the name of a, event must be between 3 and 60 characters")
    protected String name;

    @NotEmpty(message = "The project description is required")
    @Size(min = 20, max = 400, message = "The description of an event must be between 20 and 400 characters")
    protected String description;

    @NotNull(message = "The event start date is required")
    protected Long dateStart;

    protected Long dateEnd;

    @NotEmpty(message = "Project Id for the event is required")
    protected String projectId;

    @NotEmpty(message = "Event type for the event is required")
    protected String eventType;

    Event() {
    }

    Event(String name, String description, Long dateStart, Long dateEnd, String projectId, String eventType) {
        this.name = name;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.projectId = projectId;
        this.eventType = eventType;
    }

    Event(String id, String name, String description, Long dateStart, Long dateEnd, String projectId, String eventType) {
        super(id);
        this.name = name;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.projectId = projectId;
        this.eventType = eventType;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Long getDateEnd() {
        return this.dateEnd;
    }

    public Long getDateStart() {
        return this.dateStart;
    }

    public String getProjectId() {
        return this.projectId;
    }

    public String getEventType() {
        return eventType;
    }
}
