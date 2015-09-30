package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.arangodb.entity.DocumentEntity;
import com.zenika.mbz.model.Entity;
import com.zenika.mbz.repository.GenericRepository;

import javax.inject.Inject;
import javax.inject.Named;
import java.lang.reflect.ParameterizedType;
import java.util.*;

public abstract class GenericRepositoryImpl<T extends Entity> implements GenericRepository<T> {

    @Inject
    @Named("ArangoDriver")
    protected ArangoDriver driver;

    protected Class<T> entityClass = (Class) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    protected String collectionName;

    protected GenericRepositoryImpl() {
        collectionName = entityClass.getSimpleName();
    }

    public T findById(String id) {
        DocumentEntity<T> docEntity = null;
        try {
            docEntity = driver.getDocument(collectionName, id, entityClass);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryDocument(docEntity);
    }

    @Override
    public List<T> findByName(String name) {
        return findByCriterion("name", name);
    }


    protected List<T> findByCriterion(String key, Object criterion) {
        String query = "FOR t IN " + collectionName +
                " FILTER LIKE(t." + key + ", @" + key + ", true)" +
                " RETURN t";

        Map<String, Object> bindVars = new HashMap<String, Object>();
        bindVars.put(key, criterion);

        List<DocumentEntity<T>> listDocEntity = null;
        try {
            listDocEntity = driver.executeDocumentQuery(query, bindVars, null, entityClass).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryListDocument(listDocEntity);
    }

    public List<T> findAll() {
        return findAll(0, 0);
    }

    public List<T> findAll(Integer skip, Integer limit) {
        List<DocumentEntity<T>> listDocEntity = null;
        try {
            listDocEntity = driver.executeSimpleAllDocuments(collectionName, skip, limit, entityClass).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryListDocument(listDocEntity);
    }


    public List<T> save(List<T> ts) {
        Iterator<T> iteratorOfT = ts.iterator();
        List<DocumentEntity<T>> listDocEntity = new ArrayList<DocumentEntity<T>>();

        while (iteratorOfT.hasNext()) {
            T t = iteratorOfT.next();
            DocumentEntity<T> docEntity = null;
            try {
                docEntity = driver.createDocument(collectionName, t);
            } catch (ArangoException e) {
                e.printStackTrace();
            }
            listDocEntity.add(docEntity);
        }

        return factoryListDocument(listDocEntity);
    }

    public T save(T t) {
        DocumentEntity<T> docEntity = null;
        try {
            docEntity = driver.createDocument(collectionName, t);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryDocument(docEntity);
    }

    public T update(String id, T t) {
        DocumentEntity<T> doc = null;
        try {
            doc = driver.replaceDocument(collectionName, id, t);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return findById(doc.getDocumentKey());
    }

    public void delete(String id) {
        try {
            driver.deleteDocument(collectionName, id);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
    }

    public List<T> deleteAll() {
        String query = "FOR t IN " + collectionName + " REMOVE t IN " + collectionName;
        List<DocumentEntity<T>> listDocEntity = null;
        try {
            listDocEntity = driver.executeDocumentQuery(query, null, null, entityClass).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryListDocument(listDocEntity);
    }

    protected T factoryDocument(DocumentEntity<T> docEntity) {
        T entity = docEntity.getEntity();
        entity.setId(docEntity.getDocumentKey());
        return entity;
    }

    protected List<T> factoryListDocument(List<DocumentEntity<T>> listDocEntity) {
        List<T> listEntity = new ArrayList<T>();
        T e;
        for (Iterator<DocumentEntity<T>> var3 = listDocEntity.iterator(); var3.hasNext(); listEntity.add(e)) {
            DocumentEntity<T> docEntity = var3.next();
            e = docEntity.getEntity();
            if (e.getId() == null) {
                e.setId(docEntity.getDocumentKey());
            }
        }

        return listEntity;
    }

    public void setDriver(ArangoDriver driver) {
        this.driver = driver;
    }
}
