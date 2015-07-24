package com.zenika.mbz.authentication.google;

import com.zenika.mbz.authentication.google.OAuthFlow;
import com.zenika.mbz.rest.MainController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.inject.Inject;

@Controller
@RequestMapping(value = {"/oauth2callback"},produces = {"application/json"})
public class OAuthController extends MainController {
    public static final String OAUTH_CONTROLLER_MAPPING = "/oauth2callback";

    @Inject
    private OAuthFlow flow;

    public OAuthController() {
    }

    @RequestMapping(
            method = {RequestMethod.GET},
            params = {"code"}
    )
    public ResponseEntity authorizationCodeFlow(@RequestParam("code") String code) {
        return this.flow.authorizationCode(code);
    }
}
