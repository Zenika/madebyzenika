package com.zenika.mbz.authentication.google;

import com.zenika.mbz.rest.AbstractController;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.inject.Inject;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
@RequestMapping(value = "/oauth2callback", produces = "application/json")
public class OAuthController extends AbstractController {

    @Inject
    private OAuthFlow flow;

    @RequestMapping(method = GET, params = "code")
    public ResponseEntity authorizationCodeFlow(@RequestParam("code") String code) {
        return this.flow.authorizationCode(code);
    }
}
