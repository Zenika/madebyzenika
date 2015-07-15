package com.zenika.mbz.authentication.google;

import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class OAuthResources {
    private String clientId = "1083777438685-kjrgndua0oiqhlhpl67qdjvjqn4okkoo.apps.googleusercontent.com";
    private String clientSecret = "6DsmY0wP6wWzXMGf54ymzkRv";
    private final String oauthUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
    public final List<String> scope = Arrays.asList(new String[]{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/plus.login"});

    public OAuthResources() {
    }

    public String getClientId() {
        return this.clientId;
    }

    public String getClientSecret() {
        return this.clientSecret;
    }

    public String getOauthUrl() {
        return "https://www.googleapis.com/oauth2/v1/userinfo";
    }

    public List<String> getScope() {
        return this.scope;
    }
}
