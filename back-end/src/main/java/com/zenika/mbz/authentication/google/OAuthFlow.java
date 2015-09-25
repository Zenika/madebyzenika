package com.zenika.mbz.authentication.google;

import com.arangodb.ArangoDriver;
import com.arangodb.ArangoException;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.oauth2.Oauth2;
import com.google.api.services.oauth2.Oauth2.Builder;
import com.google.api.services.oauth2.model.Userinfoplus;
import com.google.gson.Gson;
import com.zenika.mbz.authentication.AuthenticationToken;
import com.zenika.mbz.authentication.TokenService;
import com.zenika.mbz.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Component
public class OAuthFlow {

    @Inject
    @Named("OAuthResources")
    private HashMap<String, String> resources;

    @Inject
    @Named("TokenService")
    private TokenService tokenService;

    @Inject
    @Named("ArangoDriver")
    private ArangoDriver driver;

    private static final HttpTransport TRANSPORT = new NetHttpTransport();
    private static final JacksonFactory JSON_FACTORY = new JacksonFactory();
    private static final String USER_COLLECTION = "User";
    private static final String RESTRICT_DOMAIN = "zenika.com";
    private static final List<String> SCOPE = Arrays.asList("openid", "email");
    private static final Gson GSON = new Gson();

    public OAuthFlow() {
    }

    public ResponseEntity authorizationCode(String code) {
        new HashMap();
        ResponseEntity response = new ResponseEntity(HttpStatus.OK);

        try {
            GoogleTokenResponse e = (new GoogleAuthorizationCodeTokenRequest(TRANSPORT, JSON_FACTORY,
                                                                             this.resources.get("client"),
                                                                             this.resources.get("secret"),
                                                                              code, "postmessage"))
                                    .setScopes(SCOPE)
                                    .execute();
            GoogleCredential credential = this.getCredentialFromTokenResponse(e);
            Oauth2 oauth2 = (new Builder(TRANSPORT, JSON_FACTORY, credential)).build();
            Userinfoplus userInfo = this.getUserInfo(oauth2);
            Boolean userDomain = Boolean.valueOf(userInfo.getEmail().split("@")[1].equals("zenika.com"));
            this.handleUserInDatabase(userInfo, credential);
            this.storeToken(credential.getAccessToken(), new AuthenticationToken(userInfo));
            return new ResponseEntity(this.connectionInfoFactory(credential.getAccessToken(), userInfo), HttpStatus.OK);
        } catch (TokenResponseException var9) {
            var9.getDetails();
        } catch (IOException var10) {
            var10.getMessage();
        }

        return response;
    }

    public GoogleCredential getCredentialFromTokenResponse(GoogleTokenResponse tokenResponse) {
        return (new com.google.api.client.googleapis.auth.oauth2.GoogleCredential.Builder()).setJsonFactory(JSON_FACTORY).setTransport(TRANSPORT).setClientSecrets(this.resources.get("client"), this.resources.get("secret")).build().setFromTokenResponse(tokenResponse);
    }

    public Userinfoplus getUserInfo(Oauth2 oauth2) throws IOException {
        return (Userinfoplus)oauth2.userinfo().get().execute();
    }

    public HashMap<String, Object> connectionInfoFactory(String accessToken, Userinfoplus userInfo) {
        HashMap connectionInfo = new HashMap();
        connectionInfo.put("access_token", accessToken);
        connectionInfo.put("userInfo", userInfo);
        return connectionInfo;
    }

    public void storeToken(String token, Authentication authentication) {
        this.tokenService.store(token, authentication);
    }

    public boolean userIsPresentInDataBase(String userId) {
        try {
            this.driver.getDocument("User", userId, User.class);
            return true;
        } catch (ArangoException var3) {
            return false;
        }
    }

    public void storeUserInDatabase(String userId, User user) {
        try {
            this.driver.createDocument("User", userId, user);
        } catch (ArangoException var4) {
            var4.printStackTrace();
        }

    }

    public void updateUserInDatabase(String userId, User user) {
        try {
            this.driver.updateDocument("User", userId, user);
        } catch (ArangoException var4) {
            var4.printStackTrace();
        }

    }

    public User factoryUserFromUserInfo(Userinfoplus userInfo, String accessToken) {
        return new User(userInfo.getFamilyName(), userInfo.getGivenName(), userInfo.getLink(), userInfo.getPicture(), accessToken, userInfo.getEmail());
    }

    public void handleUserInDatabase(Userinfoplus userInfo, GoogleCredential credential) {
        String userId = userInfo.getId();
        User currentUser = this.factoryUserFromUserInfo(userInfo, credential.getAccessToken());
        if(this.userIsPresentInDataBase(userId)) {
            this.updateUserInDatabase(userId, currentUser);
        } else {
            this.storeUserInDatabase(userInfo.getId(), currentUser);
        }

    }
}
