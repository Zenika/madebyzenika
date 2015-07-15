package com.zenika.mbz.authentication;

import com.google.common.base.Optional;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.GenericFilterBean;

public class AuthenticationFilter extends GenericFilterBean {
    public static final String TOKEN_SESSION_KEY = "token";
    public static final String USER_SESSION_KEY = "user";
    private AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = this.asHttp(request);
        HttpServletResponse httpResponse = this.asHttp(response);
        Optional token = Optional.fromNullable(httpRequest.getHeader("X-Auth-Token"));

        try {
            if(token.isPresent()) {
                this.processTokenAuthentication(token);
            }

            chain.doFilter(request, response);
        } catch (InternalAuthenticationServiceException var11) {
            SecurityContextHolder.clearContext();
            httpResponse.sendError(500);
        } finally {
            MDC.remove("token");
            MDC.remove("user");
        }

    }

    private void processTokenAuthentication(Optional<String> token) {
        Authentication resultOfAuthentication = this.tryToAuthenticateWithToken(token);
        SecurityContextHolder.getContext().setAuthentication(resultOfAuthentication);
    }

    private Authentication tryToAuthenticateWithToken(Optional<String> token) {
        PreAuthenticatedAuthenticationToken requestAuthentication = new PreAuthenticatedAuthenticationToken(token, (Object)null);
        return this.tryToAuthenticate(requestAuthentication);
    }

    private Authentication tryToAuthenticate(Authentication requestAuthentication) {
        Authentication responseAuthentication = this.authenticationManager.authenticate(requestAuthentication);
        if(responseAuthentication != null && responseAuthentication.isAuthenticated()) {
            return responseAuthentication;
        } else {
            throw new InternalAuthenticationServiceException("Unable to authenticate Domain User for provided credentials");
        }
    }

    private HttpServletRequest asHttp(ServletRequest request) {
        return (HttpServletRequest)request;
    }

    private HttpServletResponse asHttp(ServletResponse response) {
        return (HttpServletResponse)response;
    }
}
