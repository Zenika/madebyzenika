package com.zenika.mbz.repository;

import com.arangodb.ArangoException;
import com.zenika.mbz.model.Project;

import java.util.List;

public interface DataRepository<T> {
    T findById(String var1);

    List<T> findAll();

    List<T> save(List<T> var1);

    T save(T var1);

    T update(String var1, T var2);

    void delete(String var1);

    List<T> deleteAll();
}
