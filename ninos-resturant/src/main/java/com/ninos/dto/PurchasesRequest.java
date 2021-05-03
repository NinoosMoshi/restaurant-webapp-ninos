package com.ninos.dto;

import com.ninos.model.Address;
import com.ninos.model.Client;
import com.ninos.model.Item;
import com.ninos.model.RequestOrder;
;
import lombok.Data;


import java.util.HashSet;
import java.util.List;


@Data
public class PurchasesRequest {


    private Client client;
    private RequestOrder requestOrder;
    private List<Item> items;
    private Address fromAddress;
    private Address toAddress;








}
