package com.ninos.service;

import com.ninos.model.State;
import com.ninos.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {


    private StateRepository stateRepository;

    @Autowired
    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }


    public List<State> getAllStates(){
        return stateRepository.findAll();
    }

    public List<State> getAllStateByCountryCode(String code){
        return stateRepository.findByCountryCountryCode(code);
    }



}
