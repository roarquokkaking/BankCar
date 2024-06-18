package login.service;

import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class NaverLoginService {
    public final static String CLIENT_ID = "mscKQICkLvsytGQwlDKa";
    public final static String CLIENT_SECRET = "fLOBPrGh1w";
    public final static String SESSION_STATE = "state";
    public final static String REDIRECT_URI = "http://localhost:8080/api/user/oauth2/login";
    public final static String REDIRECT_LOGOUT_URI = "http://localhost:8080/api/user/oauth2/logout";
    public final static String PROFILE_API_URL = "https://openapi.naver.com/v1/nid/me";


    public Map<String, String> getAuthorizationUrl(HttpSession session) {
        // 보안때문에 난수를 생성
        String state = generateRandomString();

        String url = "https://nid.naver.com/oauth2.0/authorize?response_type=code" +
                "&client_id=" + CLIENT_ID +
                "&redirect_uri=" + REDIRECT_URI +
                "&state=" + state;

        Map<String, String> map = new HashMap<>();
        map.put("url", url);
        map.put("state", state);

        return map;
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString();
    }

    public OAuth2AccessToken getAccessToken(HttpSession session, String code, String state) throws IOException {
        String sessionState = (String) session.getAttribute(SESSION_STATE);

        if (StringUtils.pathEquals(sessionState, state)) {
            OAuth20Service oAuthService = new ServiceBuilder()
                    .apiKey(CLIENT_ID)
                    .apiSecret(CLIENT_SECRET)
                    .callback(REDIRECT_URI)
                    .state(state)
                    .build(NaverLoginApi.instance());

            OAuth2AccessToken accessToken = oAuthService.getAccessToken(code);

            return accessToken;
        }

        return null;
    }

    public String getUserProfile(OAuth2AccessToken oauthToken) throws IOException {
        OAuth20Service oauthService = new ServiceBuilder()
                .apiKey(CLIENT_ID)
                .apiSecret(CLIENT_SECRET)
                .callback(REDIRECT_URI)
                .build(NaverLoginApi.instance());

        OAuthRequest request = new OAuthRequest(Verb.GET, PROFILE_API_URL, oauthService);
        oauthService.signRequest(oauthToken, request);
        Response response = request.send();

        return response.getBody();  //응답 : 사용자의 정보들
    }

}
