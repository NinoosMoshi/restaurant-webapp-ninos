package com.ninos.service;

import com.ninos.dto.PurchaseResponse;
import com.ninos.dto.PurchasesRequest;

public interface PurchaseService {

    public PurchaseResponse addRequestOrder(PurchasesRequest purchase);

}
