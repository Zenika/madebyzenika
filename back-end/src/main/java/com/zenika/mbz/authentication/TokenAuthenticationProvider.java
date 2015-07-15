package com.zenika.mbz.authentication;

import com.google.common.base.Optional;
import com.zenika.mbz.authentication.TokenService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

public class TokenAuthenticationProvider implements AuthenticationProvider {
    private TokenService tokenService;

    public TokenAuthenticationProvider(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Optional token = (Optional)authentication.getPrincipal();
        if(token.isPresent() && !((String)token.get()).isEmpty()) {
            if(!this.tokenService.contains((String)token.get())) {
                throw new BadCredentialsException("Invalid token or token expired");
            } else {
                return this.tokenService.retrieve((String)token.get());
            }
        } else {
            throw new BadCredentialsException("Invalid token");
        }
    }

    public boolean supports(Class<?> authentication) {
        return authentication.equals(PreAuthenticatedAuthenticationToken.class);
    }
}
