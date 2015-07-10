package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.arangodb.entity.DocumentEntity;
import com.arangodb.util.MapBuilder;
import com.zenika.mbz.model.Technology;
import com.zenika.mbz.repository.TechnologyRepository;
import com.zenika.mbz.repository.impl.AbstractRepository;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;
import java.util.Map;

@Repository
public class TechnologyRepositoryImpl extends AbstractRepository<Technology> implements TechnologyRepository {

    @Inject
    @Named("ArangoDriver")
    private ArangoDriver driver;

    @Override
    public List<Technology> findTechnologiesByProject(String projectId) {
        String query =  "FOR p IN Project " +
                        "FILTER p._key == @projectId " +
                        "FOR pt IN p.technologies " +
                        "FOR t IN " + this.collectionName +
                        " FILTER t._key == pt " +
                        "RETURN t";

        Map<String, Object> bindVars = new MapBuilder().put("projectId", projectId).get();

        List listDocEntity = null;
        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, null, this.className).asList();


        } catch (ArangoException e) {
            e.printStackTrace();
        }
        return this.factoryListDocument(listDocEntity);
    }
}
