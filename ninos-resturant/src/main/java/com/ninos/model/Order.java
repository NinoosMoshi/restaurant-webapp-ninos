package com.ninos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_name")
    private String orderName;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "image")
    private String image;

    @Lob
    @Column(name = "description")
    private String description;

    @CreationTimestamp
    @Column(name = "date_create")
    private Date dateCreated;

    @UpdateTimestamp
    @Column(name = "date_update")
    private Date dateUpdated;


    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;


}
