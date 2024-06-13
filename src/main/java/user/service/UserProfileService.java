package user.service;

import login.dto.LoginDTO;


import java.util.List;
import java.util.Optional;


public interface UserProfileService {


   Optional<LoginDTO> findById(String id);

   LoginDTO getUserProfileDTOById(String user_id);

   void saveUserProfileDTO(LoginDTO user);

   Optional<LoginDTO> findprofileById(String userId);

   List<LoginDTO> findAll();
}
