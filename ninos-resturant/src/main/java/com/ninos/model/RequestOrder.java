package com.ninos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "request_order")
public class RequestOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Lob
    @Column(name = "note")
    private String note;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @CreationTimestamp
    @Column(name = "date_create")
    private Date dateCreated;

    @UpdateTimestamp
    @Column(name = "date_update")
    private Date dateUpdated;

    @EqualsAndHashCode.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "requestOrder")
    private List<Item> items = new ArrayList<>();

    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client = new Client();


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "to_address_id", referencedColumnName = "id")
    private Address toAddress = new Address();


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "from_address_id", referencedColumnName = "id")
    private Address fromAddress = new Address();


    public void addItem(Item item){
        items.add(item);
        item.setRequestOrder(this);
    }
















}
