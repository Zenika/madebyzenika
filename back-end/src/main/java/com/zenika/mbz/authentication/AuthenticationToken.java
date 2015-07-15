package com.zenika.mbz.authentication;

import java.util.Collection;
import org.springframework.security.authentication.AbstractAuthenticationToken;

public class AuthenticationToken extends AbstractAuthenticationToken {
    private final Object principal;
    private Object details;

    public AuthenticationToken(Object principal) {
        super((Collection)null);
        this.principal = principal;
        super.setAuthenticated(true);
    }

    public Object getCredentials() {
        return "";
    }

    public Object getPrincipal() {
        return this.principal;
    }
}
