package com.zenika.mbz.manager.impl;

import com.zenika.mbz.manager.UserManager;
import com.zenika.mbz.model.User;
import com.zenika.mbz.repository.DataRepository;
import com.zenika.mbz.repository.UserRepository;
import java.util.List;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

@Service
public class UserManagerImpl implements UserManager {
    @Inject
    DataRepository<User> dataRepository;
    @Inject
    UserRepository userRepository;

    public UserManagerImpl() {
    }

    public List<User> findAll() {
        return this.dataRepository.findAll();
    }

    public User findById(String id) {
        return (User)this.dataRepository.findById(id);
    }

    public List<User> findUsersByProject(String projectId) {
        return this.userRepository.findUsersByProject(projectId);
    }

    public List<User> save(List<User> users) {
        return this.dataRepository.save(users);
    }

    @Override
    public List<User> findByName(String name) {
        return dataRepository.findByName(name);
    }

    public User save(User user) {
        return (User)this.dataRepository.save(user);
    }

    public User update(String id, User user) {
        return (User)this.dataRepository.update(id, user);
    }

    public void delete(String id) {
        this.dataRepository.delete(id);
    }

    public List<User> deleteAll() {
        return this.dataRepository.deleteAll();
    }
}
