package login.service;

import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;

public interface LoginService {
    void googleLogin(String code, HttpSession session);
    String isExistId(String id);
    void insertUser(LoginDTO loginDTO);

    void driverUpdate(String id,boolean driverYN);
}
