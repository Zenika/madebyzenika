package com.zenika.mbz.model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class ResourceType extends Entity {

    @NotEmpty(message = "The resource type name is required")
    @Size(min = 3, max = 60, message = "the name of a resource type must be between 3 and 60 characters")
    protected String name;

    @NotEmpty(message = "The resource type color is required")
    @Pattern(regexp = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message = "the color of a resource type must be an hexadecimal value")
    protected String color;

    @NotEmpty(message = "The resource type classicon is required")
    @Size(min = 2, max = 25, message = "the classicon of a resource type must be between 2 and 25 characters")
    protected String classicon;

    ResourceType() {
    }

    ResourceType(String name, String color, String classicon) {
        this.name = name;
        this.color = color;
        this.classicon = classicon;

    }

    public String getName() {
        return this.name;
    }

    public String getColor() {
        return color;
    }

    public String getClassicon() {
        return classicon;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setClassicon(String classicon) {
        this.classicon = classicon;
    }

    public void setName(String name) {
        this.name = name;
    }
}
