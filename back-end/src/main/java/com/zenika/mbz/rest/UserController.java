package com.zenika.mbz.rest;

import com.zenika.mbz.manager.UserManager;
import com.zenika.mbz.model.User;
import com.zenika.mbz.rest.MainController;
import java.util.List;
import javax.inject.Inject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(
        value = {"/users"},
        produces = {"application/json"}
)
public class UserController extends MainController {
    @Inject
    UserManager userManager;

    public UserController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET}
    )
    public List<User> getUsers() {
        return this.userManager.findAll();
    }

    @RequestMapping(
            value = {"/{id}"},
            method = {RequestMethod.GET}
    )
    public User getUserById(@PathVariable("id") String id) {
        return (User)this.userManager.findById(id);
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            params = {"project"}
    )
    public List<User> getUsersByProject(@RequestParam("project") String projectId) {
        return this.userManager.findUsersByProject(projectId);
    }
}
