package com.ninos.repository;

import com.ninos.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order,Long> {

//  public List<Order> findOrderByCategoryId(Long id);
  public Page<Order> findOrderByCategoryId(Long id, Pageable pageable);


//  public List<Order> findOrderByOrderNameContaining(String orderName);
  public Page<Order> findOrderByOrderNameContaining(String orderName, Pageable pageable);

  @Query("select count (id) from Order where category.id= ?1")
  public long getOrderLengthByCategoryId(long id);

  @Query("select count (id) from Order where orderName LIKE %?1%")
  public long getOrderSizeByKey(String key);

}
