package com.ninos.controller;

import com.ninos.dto.LoginResponse;
import com.ninos.model.User;
import com.ninos.service.AuthoritiesService;
import com.ninos.service.TokenService;
import com.ninos.dto.JwtLogin;
import com.ninos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UserController {

    private TokenService tokenService;
    private UserService userService;
    private AuthoritiesService authoritiesService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(TokenService tokenService, UserService userService, AuthoritiesService authoritiesService, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.authoritiesService = authoritiesService;
        this.passwordEncoder = passwordEncoder;
    }

    //http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
      return tokenService.login(jwtLogin);
    }

    //http://localhost:8080/signup
    @PostMapping("/signup")
    public void createUser(@RequestBody JwtLogin jwtLogin){
        User user = new User();
        user.setEmail(jwtLogin.getEmail());
        user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
        user.setActive(1);
        user.getAuthorities().add(authoritiesService.getAuthorities().get(0));
        userService.addUser(user);
    }

}
