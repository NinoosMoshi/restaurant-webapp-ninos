package com.ninos.service;

import com.ninos.dto.PurchaseResponse;
import com.ninos.dto.PurchasesRequest;
import com.ninos.model.Item;
import com.ninos.model.RequestOrder;
import com.ninos.repository.ClientRepository;
import com.ninos.util.UserCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PurchaseServiceImp implements PurchaseService{

    private ClientRepository clientRepository;



    @Autowired
    public PurchaseServiceImp(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse addRequestOrder(PurchasesRequest purchase) {

        RequestOrder requestOrder = purchase.getRequestOrder();

        String myCode = UserCode.getCode();
        requestOrder.setCode(myCode);

//      requestOrder.setItems(purchase.getItems());
//      purchase.getItems().forEach(item -> item.setRequestOrder(requestOrder));
        List<Item> items = purchase.getItems();
        items.forEach(item -> requestOrder.addItem(item));

        requestOrder.setFromAddress(purchase.getFromAddress());
        requestOrder.setToAddress(purchase.getToAddress());

//        Set<RequestOrder> requestOrders = new HashSet<>();
//        requestOrders.add(requestOrder);
//        purchase.getClient().setRequestOrders(requestOrders);
//        requestOrder.setClient(purchase.getClient());
         purchase.getClient().addRequestOrder(requestOrder);

        clientRepository.save(purchase.getClient());

        return new PurchaseResponse(purchase.getClient().getFullName(),myCode);
    }




}
