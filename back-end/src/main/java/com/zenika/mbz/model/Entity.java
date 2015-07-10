package com.zenika.mbz.model;

public class Entity {
    protected String id;

    protected Entity() {
    }

    protected Entity(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
