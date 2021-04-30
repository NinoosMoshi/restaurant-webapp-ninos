package com.ninos.controller;

import com.ninos.model.State;
import com.ninos.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StateController {

    private StateService stateService;

    @Autowired
    public StateController(StateService stateService) {
        this.stateService = stateService;
    }


    @GetMapping("/states")
    public List<State> getStates(){
        return stateService.getAllStates();
    }

    // http://localhost:8080/api/state-code?code={value}
    @GetMapping("/state-code")
    public List<State> getStatesByCode(@RequestParam String code){
       return stateService.getAllStateByCountryCode(code);
    }

}
