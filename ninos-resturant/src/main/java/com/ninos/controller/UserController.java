package com.ninos.controller;

import com.ninos.config.springsecurity.jwt.JwtAuthenticationFilter;
import com.ninos.config.springsecurity.jwt.JwtAuthorizationFilter;
import com.ninos.dto.JwtLogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class UserController {

    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public UserController(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @PostMapping("/login")
    public String logIn(@RequestBody JwtLogin jwtLogin){
      return jwtAuthenticationFilter.login(jwtLogin);
    }



}
