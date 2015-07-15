//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.zenika.mbz.model;

import com.zenika.mbz.model.Entity;

public class User extends Entity {
    protected String familyName;
    protected String givenName;
    protected String profileUrl;
    protected String imageUrl;
    protected String accessToken;
    protected String email;

    protected User() {
    }

    public User(String id, String familyName, String givenName, String profileUrl, String imageUrl, String accessToken, String email) {
        super(id);
        this.familyName = familyName;
        this.givenName = givenName;
        this.profileUrl = profileUrl;
        this.imageUrl = imageUrl;
        this.accessToken = accessToken;
        this.email = email;
    }

    public User(String familyName, String givenName, String profileUrl, String imageUrl, String accessToken, String email) {
        this.familyName = familyName;
        this.givenName = givenName;
        this.profileUrl = profileUrl;
        this.imageUrl = imageUrl;
        this.accessToken = accessToken;
        this.email = email;
    }

    public String getProfileUrl() {
        return this.profileUrl;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public String getAccessToken() {
        return this.accessToken;
    }

    public String getFamilyName() {
        return this.familyName;
    }

    public String getGivenName() {
        return this.givenName;
    }

    public String getEmail() {
        return this.email;
    }
}
