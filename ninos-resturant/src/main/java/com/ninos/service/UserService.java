package com.ninos.service;

import com.ninos.dto.JwtLogin;
import com.ninos.dto.UserPrincipal;
import com.ninos.model.User;
import com.ninos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email);
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }

    @Transactional
    public void addUser(User user){
        userRepository.save(user);
    }

    public boolean ifEmailExist(String email){
        return userRepository.existsByEmail(email);
    }

    @Transactional  // we add @Transactional to manage our session
    public int getUserActive(String email){
      return userRepository.getActive(email);
    }

    @Transactional
    public String getPasswordByEmail(String email){
        return userRepository.getPasswordByEmail(email);
    }


    public User getUserByMail(String mail){
        return this.userRepository.findUserByEmail(mail);
    }

    public void editUser(User user){
        this.userRepository.save(user);
    }


}
