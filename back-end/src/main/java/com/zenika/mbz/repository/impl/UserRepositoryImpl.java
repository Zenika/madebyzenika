package com.zenika.mbz.repository.impl;

import com.arangodb.ArangoException;
import com.arangodb.entity.DocumentEntity;
import com.arangodb.util.MapBuilder;
import com.zenika.mbz.model.User;
import com.zenika.mbz.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserRepositoryImpl extends GenericRepositoryImpl<User> implements UserRepository {

    public List<User> findUsersByProject(String projectId) {
        String query = "FOR p IN Project FILTER p._key == @projectId FOR m IN p.team  FOR u IN " + collectionName + " FILTER u._key == m  RETURN u";
        Map<String, Object> bindVars = (new MapBuilder()).put("projectId", projectId).get();
        List<DocumentEntity<User>> listDocEntity = null;

        try {
            listDocEntity = driver.executeDocumentQuery(query, bindVars, null, entityClass).asList();
        } catch (ArangoException var6) {
            var6.printStackTrace();
        }

        return factoryListDocument(listDocEntity);
    }
}
