package com.ninos.controller;

import com.ninos.model.Order;
import com.ninos.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // http://localhost:8080/api/allOrders
//    @GetMapping("/allOrders")
//    public List<Order> getOrders(){
//        return orderService.getAllOrders();
//    }

    // http://localhost:8080/api/allOrders?page={value}&size={value}
    @GetMapping("/allOrders")
    public List<Order> getOrders(@RequestParam int page, @RequestParam int size){
        return orderService.getAllOrders(page, size);
    }



    // http://localhost:8080/api/category?id={value}
//    @GetMapping("/category")
//    public List<Order> getOrdersByCategoryId(@RequestParam Long id){
//      return orderService.getAllOrdersByCategoryId(id);
//    }

    // http://localhost:8080/api/category?id={value}&page={value}&size={value}
    @GetMapping("/category")
    public List<Order> getOrdersByCategoryId(@RequestParam Long id,@RequestParam int page, @RequestParam int size){
        return orderService.getAllOrdersByCategoryId(id,page,size);
    }



    // http://localhost:8080/api/orderkey?keyword={value}&page={value}&size={value}
    @GetMapping("/orderkey")
    public List<Order> getOrdersByKeyword(@RequestParam String keyword,@RequestParam int page, @RequestParam int size){
        return orderService.getAllOrdersByOrderName(keyword,page,size);
    }

    // http://localhost:8080/api/order?id={value}
    @GetMapping("/order")
    public Order getOrderById(@RequestParam Long id){
        return orderService.getOrder(id);
    }

    // http://localhost:8080/api/orderSize
    @GetMapping("/orderSize")
    public long getOrderSize(){
      return orderService.getAllOrderSize();
    }


    // http://localhost:8080/api/categoryidsize?id={value}
    @GetMapping("/categoryidsize")
    public long getOrdersByCategorySize(@RequestParam Long id){
        return orderService.getOrdersByCategoryIdLength(id);
    }

    // http://localhost:8080/api/keysize?key={value}
    @GetMapping("/keysize")
    public long sizeOfOrderByKey(@RequestParam String key){
        return orderService.getOrderSizeByKey(key);
    }




}
