package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.arangodb.util.AqlQueryOptions;
import com.arangodb.util.MapBuilder;
import com.zenika.mbz.model.Project;
import com.zenika.mbz.repository.ProjectRepository;
import com.zenika.mbz.repository.impl.AbstractRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.inject.Named;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectRepositoryImpl extends AbstractRepository<Project> implements ProjectRepository {

    @Inject
    @Named("ArangoDriver")
    private ArangoDriver driver;

    public ProjectRepositoryImpl() {}

    public List<Project> findAll(Integer skip, Integer limit) {
        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeSimpleAllDocuments(this.collectionName, skip, limit, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }

    @Override
    public List<Project> findByTechnologies(Integer skip, Integer limit, String technologyId) {
        String query = "FOR p IN " + this.collectionName +
                       " FOR t IN p.technologies " +
                       "FILTER t == @technologyId "+
                       " LIMIT @skip, @limit "+
                       "RETURN p";

        Map<String, Object> bindVars = new HashMap<String, Object>();
        bindVars.put("technologyId", technologyId);
        bindVars.put("skip", skip);
        bindVars.put("limit", limit);

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }

    @Override
    public List<Project> findByType(Integer skip, Integer limit, String typeId) {
        String query = "FOR p IN " + this.collectionName +
                " FILTER p.projectType == @typeId "+
                "LIMIT @skip, @limit "+
                "RETURN p";

        Map<String, Object> bindVars = new HashMap<String, Object>();
        bindVars.put("typeId", typeId);
        bindVars.put("skip", skip);
        bindVars.put("limit", limit);

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }

    @Override
    public List<Project> findByTypeAndTechnologies(Integer skip, Integer limit, String type, String technologyId) {
        String query = "FOR p IN " + this.collectionName +
                " FILTER p.projectType == @typeId "+
                " FOR t IN p.technologies " +
                "FILTER t == @technologyId "+
                "LIMIT @skip, @limit "+
                "RETURN p";

        Map<String, Object> bindVars = new HashMap<String, Object>();
        bindVars.put("typeId", type);
        bindVars.put("technologyId", technologyId);
        bindVars.put("skip", skip);
        bindVars.put("limit", limit);

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }

    @Override
    public List<Project> findByUser(String userId) {
        String query = "FOR p IN " + this.collectionName +
                       " FOR u IN p.team " +
                       "FILTER u == @userId "+
                       "RETURN p";

        Map<String, Object> bindVars = new MapBuilder().put("userId", userId).get();

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();
        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }
}
