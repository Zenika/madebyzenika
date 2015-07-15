package com.zenika.mbz.authentication;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;

public class TokenService {
    private static final Cache restApiAuthTokenCache = CacheManager.getInstance().getCache("restApiAuthTokenCache");
    public static final int HALF_AN_HOUR_IN_MILLISECONDS = 1800000;

    public TokenService() {
    }

    @Scheduled(
            fixedRate = 1800000L
    )
    public void evictExpiredTokens() {
        restApiAuthTokenCache.evictExpiredElements();
    }

    public void store(String token, Authentication authentication) {
        restApiAuthTokenCache.put(new Element(token, authentication));
    }

    public boolean contains(String token) {
        return restApiAuthTokenCache.get(token) != null;
    }

    public Authentication retrieve(String token) {
        return (Authentication)restApiAuthTokenCache.get(token).getObjectValue();
    }
}
