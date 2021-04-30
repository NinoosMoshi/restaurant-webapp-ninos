package com.ninos.service;

import com.ninos.model.Order;
import com.ninos.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private OrderRepo orderRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

//    public List<Order> getAllOrders(){
//        return orderRepo.findAll();
//    }
    public List<Order> getAllOrders(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderRepo.findAll(pageable).getContent();
    }




    public List<Order> getAllOrdersByCategoryId(Long id,int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderRepo.findOrderByCategoryId(id,pageable).getContent();
    }


    public List<Order> getAllOrdersByOrderName(String orderName,int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return orderRepo.findOrderByOrderNameContaining(orderName,pageable).getContent();
    }

    public Order getOrder(Long id){
        return orderRepo.findById(id).get();
    }


    public long getAllOrderSize(){
        return orderRepo.count();
    }


    public long getOrdersByCategoryIdLength(long id){
        return orderRepo.getOrderLengthByCategoryId(id);
    }


    public long getOrderSizeByKey(String key){
        return orderRepo.getOrderSizeByKey(key);
    }




}
