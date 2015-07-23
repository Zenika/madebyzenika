package com.zenika.mbz.model;

import com.zenika.mbz.model.Entity;
import java.util.List;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.NotEmpty;

public class Project extends Entity {
    @NotEmpty(message = "The project name is required")
    @Size(min = 3, max = 80, message = "the name of a project must be between 3 and 60 characters")
    protected String name;

    @NotEmpty(message = "The project description is required")
    @Size(min = 20, max = 400,message = "The description of a project must be between 30 and 400 characters")
    protected String description;

    @NotEmpty(message = "The agency of the project is required")
    protected String agency;

    @NotEmpty(message = "The type of the project is required")
    protected String projectType;

    @NotEmpty(message = "The owner of the project is required")
    protected String owner;

    protected List<String> team;

    protected List<String> technologies;

    public Project() {
    }

    public Project(String name, String agency, String description, String projectType, String owner, List<String> team, List<String> technologies) {
        this.name = name;
        this.agency = agency;
        this.description = description;
        this.projectType = projectType;
        this.owner = owner;
        this.team = team;
        this.technologies = technologies;
    }

    public Project(String id, String name, String agency, String description, String projectType, String owner, List<String> team, List<String> technologies) {
        super(id);
        this.name = name;
        this.agency = agency;
        this.description = description;
        this.projectType = projectType;
        this.owner = owner;
        this.team = team;
        this.technologies = technologies;
    }

    public String getName() {
        return this.name;
    }

    public String getAgency() {
        return this.agency;
    }

    public String getDescription() {
        return this.description;
    }

    public String getProjectType() {
        return this.projectType;
    }

    public String getOwner() { return this.owner; }

    public List<String> getTeam() {
        return this.team;
    }

    public List<String> getTechnologies() {
        return this.technologies;
    }
}
