package user.service;

import user.repository.UserProfileDAO;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileDAO userProfileDAO;


    @Override
    public Optional<LoginDTO> findById(String id) {

        return userProfileDAO.findById(id);
    }


    /**
     * 유저 프로필 아이디 찾기
     */
    @Override
    public LoginDTO getUserProfileDTOById(String user_id) {
        return userProfileDAO.findById(user_id).orElse(null);
    }

    /**
     * 유저 프로필 저장하기
     * */
    @Override
    public void saveUserProfileDTO(LoginDTO user) {
        userProfileDAO.save(user);
    }

    @Override
    public Optional<LoginDTO> findprofileById(String userId) {
        return userProfileDAO.findById(userId);
    }

    @Override
    public List<LoginDTO> findAll() {

        return userProfileDAO.findAll();
    }


}

