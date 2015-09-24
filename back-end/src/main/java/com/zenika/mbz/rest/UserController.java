package com.zenika.mbz.rest;

import com.zenika.mbz.manager.UserManager;
import com.zenika.mbz.model.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "/users", produces = "application/json")
public class UserController extends MainController {
    @Inject
    UserManager userManager;

    @RequestMapping(method = GET)
    public List<User> getUsers() {
        return userManager.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public User getUserById(@PathVariable("id") String id) {
        return userManager.findById(id);
    }

    @RequestMapping(method = GET, params = "project")
    public List<User> getUsersByProject(@RequestParam("project") String projectId) {
        return userManager.findUsersByProject(projectId);
    }
}
