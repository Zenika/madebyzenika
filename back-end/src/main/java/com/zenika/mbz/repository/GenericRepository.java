package com.zenika.mbz.repository;

import java.util.List;

public interface GenericRepository<T> {
    T findById(String id);

    List<T> findAll();

    List<T> findByName(String name);

    List<T> save(List<T> ts);

    T save(T t);

    T update(String id, T t);

    void delete(String id);

    List<T> deleteAll();
}
