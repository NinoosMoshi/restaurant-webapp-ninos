package com.ninos.service;

import com.auth0.jwt.JWT;
import com.ninos.dto.JwtLogin;
import com.ninos.dto.JwtProperties;
import com.ninos.dto.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Service
public class TokenService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public TokenService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    private String generateToken(Authentication authResult) {   // 1- authResult holds your credential(username,password,active,...) when you login

        // Grab principal
        UserPrincipal principal = (UserPrincipal) authResult.getPrincipal(); // 2- put credential into principal container
        System.out.println(principal.getUsername());

        // Create JWT Token
        String token = JWT.create()  // 3- create a token
                .withSubject(principal.getUsername())   // 4- inside UserPrincipal class there is a method getUsername() and we put in it getEmail
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME)) // 5- new Date(System.currentTimeMillis() it will get local date in your machine and it will add EXPIRATION_TIME
                .sign(HMAC512(JwtProperties.SECRET.getBytes()));  // 6- HMAC512 is type of encode and it will take a SECRET and encode it by type HMAC512
        return token;
    }
    public String login(JwtLogin jwtLogin) {  // 1- jwtLogin contain email and password
        // 2-Authentication will check (email and password) from login and database
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtLogin.getEmail(),
                jwtLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate); // 3- put (email and password) that authenticated in SecurityContextHolder
        String token = generateToken(authenticate);  // 4- generateToken is a method that generate a token based on (email and password) authenticated
        return token;  // 5- return token
    }
}
