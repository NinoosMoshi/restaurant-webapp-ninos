package com.ninos.controller;

import com.ninos.dto.*;
import com.ninos.model.Code;
import com.ninos.model.User;
import com.ninos.service.AuthoritiesService;
import com.ninos.service.EmailService;
import com.ninos.service.TokenService;
import com.ninos.service.UserService;
import com.ninos.util.UserCode;
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
            String myCode = UserCode.getCode();
            User user = new User();
            user.setEmail(jwtLogin.getEmail());
            user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
            user.setActive(0);
            user.getAuthorities().add(authoritiesService.getAuthorities().get(0));
            Mail mail = new Mail(jwtLogin.getEmail(),myCode);
            emailService.sendCodeByMail(mail);
            Code code = new Code();
            code.setCode(myCode);
            user.setCode(code);
            userService.addUser(user);
            accountResponse.setResult(1);
        }
        return accountResponse;
    }


    //http://localhost:8080/active
    @PostMapping("/active")
    public UserActive getActiveUser(@RequestBody JwtLogin jwtLogin){
        String enPassword = userService.getPasswordByEmail(jwtLogin.getEmail());
        boolean result = passwordEncoder.matches(jwtLogin.getPassword(),enPassword);  // jwtLogin.getPassword() is meaning user when enter password, enPassword meaning the password encrypted in database
        UserActive userActive = new UserActive();
        if(result){
           int act = userService.getUserActive(jwtLogin.getEmail());
           userActive.setActive(act);
        }else{
           userActive.setActive(-1); // -1 meaning the password that user entered is not correct
        }
       return userActive;
    }

}
