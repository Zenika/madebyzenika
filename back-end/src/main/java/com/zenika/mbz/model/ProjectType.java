package com.zenika.mbz.model;

import com.zenika.mbz.model.Entity;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.NotEmpty;

public class ProjectType extends Entity {

    @NotEmpty(message = "The project type name is required")
    @Size(min = 2,max = 20,message = "the name of a project type must be between 2 and 20 characters")
    protected String name;

    ProjectType() {}

    ProjectType(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
