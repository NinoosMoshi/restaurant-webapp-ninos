package com.ninos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

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
    private int totalPrice;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @CreationTimestamp
    @Column(name = "date_create")
    private Date dateCreated;

    @UpdateTimestamp
    @Column(name = "date_update")
    private Date dateUpdated;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "requestOrder")
    private Set<Item> items;


    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "to_address_id", referencedColumnName = "id")
    private Address toAddress;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "from_address_id", referencedColumnName = "id")
    private Address fromAddress;


}
