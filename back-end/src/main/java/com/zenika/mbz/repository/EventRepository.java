package com.zenika.mbz.repository;

import com.zenika.mbz.model.Event;

import java.util.List;

public interface EventRepository extends GenericRepository<Event> {
    List<Event> findEventsByProject(String var1);
}
