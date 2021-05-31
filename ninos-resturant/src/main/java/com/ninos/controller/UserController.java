package com.ninos.controller;

import com.ninos.service.TokenService;
import com.ninos.dto.JwtLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UserController {

    private TokenService tokenService;

    @Autowired
    public UserController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/signin")
    public String logIn(@RequestBody JwtLogin jwtLogin){
      return tokenService.login(jwtLogin);
    }



}
