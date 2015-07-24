package com.zenika.mbz.authentication.google;


import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.inject.Named;

@Component
@PropertySource("classpath:oauth.properties")
public class OAuthResources {

    @Value("${oauth.client}")
    private String client;

    @Value("${oauth.secret}")
    private String secret;

    public OAuthResources() {
    }

    @Bean
    @Named("OAuthResources")
    public HashMap<String, String> getOAuthResources() {
        HashMap<String, String> resources = new HashMap<String, String>();
        resources.put("client", this.client);
        resources.put("secret", this.secret);
        return resources;
    }

}
