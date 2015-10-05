package com.zenika.mbz.rest;

import com.zenika.mbz.model.User;
import com.zenika.mbz.repository.GenericRepository;
import com.zenika.mbz.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/users", produces = "application/json")
public class UserController extends MainController<User> {
    @Inject
    UserRepository userRepository;

    @RequestMapping(method = GET, params = "project")
    public List<User> getUsersByProject(@RequestParam("project") String projectId) {
        return userRepository.findUsersByProject(projectId);
    }

    @RequestMapping(method = GET, params = "name")
    public List<User> findByName(@RequestParam("name") String name) {
        return getRepository().findByName(name);
    }

    @Override
    protected GenericRepository<User> getRepository() {
        return userRepository;
    }
}
