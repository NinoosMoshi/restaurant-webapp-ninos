package com.ninos.dto;

import com.ninos.model.Address;
import com.ninos.model.Client;
import com.ninos.model.Item;
import com.ninos.model.RequestOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchasesRequest {


    private Client client;
    private RequestOrder requestOrder;
    private Set<Item> items;
    private Address fromAddress;
    private Address toAddress;








}
