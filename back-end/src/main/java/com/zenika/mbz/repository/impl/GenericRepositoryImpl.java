package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.arangodb.entity.DocumentEntity;
import com.arangodb.util.AqlQueryOptions;
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

    protected Class<T> className = (Class)((ParameterizedType)this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    protected String collectionName;

    protected GenericRepositoryImpl() {
        this.collectionName = this.className.getSimpleName();
    }

    public T findById(String id){
        DocumentEntity docEntity = null;
        try {
            docEntity = this.driver.getDocument(this.collectionName, id, this.className);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return (T) this.factoryDocument(docEntity);
    }

    @Override
    public List<T> findByName(String name) {
        String query = "FOR t IN " + this.collectionName +
                       " FILTER LIKE(t.name, @name, true)" +
                       " RETURN t";

        Map<String, Object> bindVars = new HashMap<String, Object>();
        bindVars.put("name", name);

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }
    public List<T> findAll() {
        List<DocumentEntity<T>> listDocEntity = null;
        try {
            listDocEntity = this.driver.executeSimpleAllDocuments(this.collectionName, 0, 0, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return factoryListDocument(listDocEntity);
    }


    public List<T> save(List<T> ts) {
        Iterator<T> iteratorOfT = ts.iterator();
        List<DocumentEntity<T>> listDocEntity = new ArrayList<DocumentEntity<T>>();

        while(iteratorOfT.hasNext()) {
            T t = iteratorOfT.next();
            DocumentEntity<T> docEntity = null;
            try {
                docEntity = this.driver.createDocument(this.collectionName, t);
            } catch (ArangoException e) {
                e.printStackTrace();
            }
            listDocEntity.add(docEntity);
        }

        return this.factoryListDocument(listDocEntity);
    }

    public T save(T t) {
        DocumentEntity docEntity = null;
        try {
            docEntity = this.driver.createDocument(this.collectionName, t);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return (T) this.factoryDocument(docEntity);
    }

    public T update(String id, T t) {
        DocumentEntity doc = null;
        try {
            doc = this.driver.replaceDocument(this.collectionName, id, t);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.findById(doc.getDocumentKey());
    }

    public void delete(String id) {
        try {
            this.driver.deleteDocument(this.collectionName, id);
        } catch (ArangoException e) {
            e.printStackTrace();
        }
    }

    public List<T> deleteAll() {
        String query = "FOR t IN " + this.collectionName + " REMOVE t IN " + this.collectionName;
        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, (Map)null, (AqlQueryOptions)null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }

    protected T factoryDocument(DocumentEntity<T> docEntity) {
        Entity e = (Entity)docEntity.getEntity();
        e.setId(docEntity.getDocumentKey());
        return (T) e;
    }

    protected List<T> factoryListDocument(List<DocumentEntity<T>> listDocEntity) {
        ArrayList listEntity = new ArrayList();
        Entity e;
        for(Iterator var3 = listDocEntity.iterator(); var3.hasNext(); listEntity.add(e)) {
            DocumentEntity docEntity = (DocumentEntity)var3.next();
            e = (Entity)docEntity.getEntity();
            if(e.getId() == null) {
                e.setId(docEntity.getDocumentKey());
            }
        }

        return listEntity;
    }

    protected List<T> factoryListIDDocument(List<DocumentEntity<T>> listDocEntity) {
        ArrayList listEntityID = new ArrayList();
        Entity e;
        for(DocumentEntity entity : listDocEntity) {
            String id = entity.getDocumentKey();

            listEntityID.add(id);
        }

        return listEntityID;
    }

    protected HashSet<T> factoryListIDDocument(HashSet<DocumentEntity<T>> listDocEntity) {
        HashSet listEntityID = new HashSet();
        Entity e;
        for(DocumentEntity entity : listDocEntity) {
            String id = entity.getDocumentKey();

            listEntityID.add(id);
        }

        return listEntityID;
    }
}
