package com.zenika.mbz.repository;

import com.zenika.mbz.model.User;
import java.util.List;

public interface UserRepository {
    List<User> findUsersByProject(String var1);
}
