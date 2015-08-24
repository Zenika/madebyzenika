package com.zenika.mbz.manager;

import java.util.List;

public interface DataManager<T> {
    List<T> findAll();

    T findById(String var1);

    List<T> findByName(String name);

    List<T> save(List<T> var1);

    T save(T var1);

    T update(String var1, T var2);

    void delete(String var1);

    List<T> deleteAll();
}
