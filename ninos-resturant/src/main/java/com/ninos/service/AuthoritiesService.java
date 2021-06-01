package com.ninos.service;

import com.ninos.model.Authorities;
import com.ninos.repository.AuthoritiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthoritiesService {

    private AuthoritiesRepository authoritiesRepository;

    @Autowired
    public AuthoritiesService(AuthoritiesRepository authoritiesRepository) {
        this.authoritiesRepository = authoritiesRepository;
    }


    @Transactional(readOnly = true)
    public List<Authorities> getAuthorities(){
        return authoritiesRepository.findAll();
    }


}
