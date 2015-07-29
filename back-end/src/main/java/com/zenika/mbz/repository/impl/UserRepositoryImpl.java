package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.arangodb.util.AqlQueryOptions;
import com.arangodb.util.MapBuilder;
import com.zenika.mbz.model.User;
import com.zenika.mbz.repository.UserRepository;
import com.zenika.mbz.repository.impl.AbstractRepository;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.inject.Named;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl extends AbstractRepository<User> implements UserRepository {
    @Inject
    @Named("ArangoDriver")
    private ArangoDriver driver;

    public UserRepositoryImpl() {
    }

    public List<User> findUsersByProject(String projectId) {
        String query = "FOR p IN Project FILTER p._key == @projectId FOR m IN p.team  FOR u IN " + this.collectionName + " FILTER u._key == m " + "RETURN u";
        Map bindVars = (new MapBuilder()).put("projectId", projectId).get();
        List listDocEntity = null;

        try {
            listDocEntity = this.driver.executeDocumentQuery(query, bindVars, (AqlQueryOptions)null, this.className).asList();
        } catch (ArangoException var6) {
            var6.printStackTrace();
        }

        return this.factoryListDocument(listDocEntity);
    }
}