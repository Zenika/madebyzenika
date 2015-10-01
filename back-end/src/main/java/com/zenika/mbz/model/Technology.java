package com.zenika.mbz.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Size;

public class Technology extends Entity {

    @NotEmpty(message = "The project type name is required")
    @Size(min = 2, max = 20, message = "the name of a technology must be between 2 and 20 characters")
    protected String name;

    Technology() {
    }

    Technology(String id, String name) {
        super(id);
        this.name = name;
    }

    Technology(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
