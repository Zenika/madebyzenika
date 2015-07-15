package com.zenika.mbz.manager;

import com.zenika.mbz.manager.DataManager;
import com.zenika.mbz.model.User;
import java.util.List;

public interface UserManager extends DataManager<User> {
    List<User> findUsersByProject(String var1);
}
