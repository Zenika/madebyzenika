package com.zenika.mbz.repository;

import com.arangodb.ArangoException;
import com.zenika.mbz.model.Project;

import java.util.List;

public interface DataRepository<T> {
    T findById(String id);

    List<T> findAll();

    List<T> findByName(String name);

    List<T> save(List<T> ts);

    T save(T t);

    T update(String id, T t);

    void delete(String id);

    List<T> deleteAll();
}
