package com.ninos.controller;

import com.ninos.dto.PurchaseResponse;
import com.ninos.dto.PurchasesRequest;
import com.ninos.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/buy")
public class PurchaseController {

    private PurchaseService purchaseService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    // http://localhost:8080/api/buy/purchase
    @PostMapping("/purchase")
    public PurchaseResponse addRequestOrder(@RequestBody PurchasesRequest purchasesRequest){
        return purchaseService.addRequestOrder(purchasesRequest);
    }





}
