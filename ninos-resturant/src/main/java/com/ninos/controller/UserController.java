package com.ninos.controller;

import com.ninos.dto.AccountResponse;
import com.ninos.dto.LoginResponse;
import com.ninos.dto.Mail;
import com.ninos.model.User;
import com.ninos.service.AuthoritiesService;
import com.ninos.service.EmailService;
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
    private EmailService emailService;

    @Autowired
    public UserController(TokenService tokenService, UserService userService, AuthoritiesService authoritiesService, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.authoritiesService = authoritiesService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    //http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
      return tokenService.login(jwtLogin);
    }

    //http://localhost:8080/signup
    @PostMapping("/signup")
    public AccountResponse createUser(@RequestBody JwtLogin jwtLogin){
        AccountResponse accountResponse = new AccountResponse();
        boolean result = userService.ifEmailExist(jwtLogin.getEmail());
        if(result){
           accountResponse.setResult(0);
        }else{
            User user = new User();
            user.setEmail(jwtLogin.getEmail());
            user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
            user.setActive(0);
            user.getAuthorities().add(authoritiesService.getAuthorities().get(0));
            userService.addUser(user);
            emailService.sendCodeByMail(new Mail(jwtLogin.getEmail()));
            accountResponse.setResult(1);

        }

        return accountResponse;
    }

}
