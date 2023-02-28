package com.supportportal.service;

import com.supportportal.domain.Users;
import com.supportportal.exception.domain.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

public interface UserService {

    Users register(String firstName, String lastName, String username, String email) throws UserNotFoundException, UsernameExistException, EmailExistException, MessagingException;

    List<Users> getUsers();

    Users findUserByUsername(String username);

    Users findUserByEmail(String email);

    Users addNewUser(String firstName, String lastName, String username, String email, String role, boolean isNonLocked, boolean isActive) throws UserNotFoundException, EmailExistException, UsernameExistException, IOException, NotAnImageFileException;

    Users updateUser(String currentUsername, String newFirstName, String newLastName, String newUsername, String NewEmail, String role, boolean isNonLocked, boolean isActive) throws UserNotFoundException, EmailExistException, UsernameExistException, IOException, NotAnImageFileException;

    void deleteUser(String username) throws IOException;

    void resetPassword(String email) throws MessagingException, EmailNotFoundException;

    Users updateProfileImage(String username, MultipartFile profileImage) throws UserNotFoundException, EmailExistException, UsernameExistException, IOException, NotAnImageFileException;
}
