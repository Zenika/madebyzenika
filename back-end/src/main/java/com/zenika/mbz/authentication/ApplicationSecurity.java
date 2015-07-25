package com.zenika.mbz.authentication;

import com.zenika.mbz.authentication.AuthenticationFilter;
import com.zenika.mbz.authentication.TokenAuthenticationProvider;
import com.zenika.mbz.authentication.TokenService;
import javax.inject.Named;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer.AuthorizedUrl;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableWebSecurity
@Configuration
class ApplicationSecurity extends WebSecurityConfigurerAdapter {
    ApplicationSecurity() {
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/oauth2callback","/api/metrics","/api/health").permitAll()
                .anyRequest().authenticated().and()
                .csrf().disable();

        http.addFilterBefore(new AuthenticationFilter(this.authenticationManager()), BasicAuthenticationFilter.class);
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(this.tokenAuthenticationProvider());
    }

    @Bean
    @Named("TokenService")
    public TokenService tokenService() {
        return new TokenService();
    }

    @Bean
    public AuthenticationProvider tokenAuthenticationProvider() {
        return new TokenAuthenticationProvider(this.tokenService());
    }
}