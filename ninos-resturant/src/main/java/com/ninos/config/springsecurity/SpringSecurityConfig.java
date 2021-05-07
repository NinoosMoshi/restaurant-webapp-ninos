package com.ninos.config.springsecurity;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration      // tell spring this class it's configuration
@EnableWebSecurity  // tell this configuration file has a spring security configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .csrf().disable()
                .authorizeRequests()
                .anyRequest()
                .permitAll()
                .and()
                .httpBasic();

    }
}
