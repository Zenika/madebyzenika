package com.zenika.mbz.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Size;

public class Resource extends Entity {

    @NotEmpty(message = "The resource name is required")
    @Size(min = 3, max = 80, message = "the name of a resource must be between 3 and 60 characters")
    protected String name;

    @NotEmpty(message = "The resource link is required")
    @Size(min = 3, max = 200, message = "the link of a resource must be between 3 and 60 characters")
    protected String link;

    @NotEmpty(message = "The resource type is required")
    protected String resourceType;

    @NotEmpty(message = "The project Id is required")
    protected String projectId;

    protected String eventId;

    protected Long lastModified;

    Resource() {}

    Resource(String name, String link, String resourceType, String projectId, String eventId, Long lastModified) {
        this.name = name;
        this.link = link;
        this.resourceType = resourceType;
        this.projectId = projectId;
        this.eventId = eventId;

        this.lastModified = lastModified;
    }

    public String getName() {
        return name;
    }

    public String getLink() {
        return link;
    }

    public String getResourceType() {
        return resourceType;
    }

    public String getProjectId() {
        return projectId;
    }

    public String getEventId() {
        return eventId;
    }

    public Long getLastModified() {
        return lastModified;
    }
}
