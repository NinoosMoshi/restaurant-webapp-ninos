import { Router } from '@angular/router';
import { Address } from './../../model/address';
import { PurchaseService } from './../../services/purchase.service';
import { PurchaseRequest } from './../../model/purchase-request';
import { CartOrder } from './../../model/cart-order';
import { Item } from './../../model/item';
import { RequestOrder } from './../../model/request-order';
import { Client } from './../../model/client';
import { CartService } from './../../services/cart.service';
import { CountryStateService } from './../../services/country-state.service';
import { State } from './../../model/state';
import { Country } from './../../model/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceValidator } from 'src/app/model/space-validator';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  checkoutParentGroup: FormGroup
  countries: Country[] = [];
  //states: State[] = [];
  statesFromPerson: State[] = [];
  statesToPerson: State[] = [];
  totalSize: number = 0;
  totalPrice: number = 0;

  constructor(private formChildGroup: FormBuilder,
              private countryStateService:CountryStateService,
              private cartService: CartService,
              private purchaseService:PurchaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.myForm();
    this.getAllContries();
   // this.getAllStates();
  // this.getStatesByCode();
    this.getTotal();
  }


  private myForm() {
    this.checkoutParentGroup = this.formChildGroup.group({
      data: this.formChildGroup.group({
        fullName: new FormControl('',[Validators.required,
                                      SpaceValidator.onlyContainSpace,
                                      Validators.minLength(6)]),
        gmail: new FormControl('',[Validators.required,
                                   Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ]),

        phone: new FormControl('',[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$')
        ])
      }),
      fromPerson: this.formChildGroup.group({
        country: [''],
        state: [''],
        zipCode: ['']
      }),
      toPerson: this.formChildGroup.group({
        country: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formChildGroup.group({
        cardType: [''],
        cardNumber: [''],
        code: ['']
      })
    });
  }


  get fullName(){
    return this.checkoutParentGroup.get('data.fullName')
  }

  get email(){
    return this.checkoutParentGroup.get('data.gmail')
  }

  get phone(){
    return this.checkoutParentGroup.get('data.phone')
  }




  done(){
    if(this.checkoutParentGroup.invalid){
      this.checkoutParentGroup.markAllAsTouched();
    }else{
      // console.log(this.checkoutParentGroup.get('data').value);
      // console.log(this.checkoutParentGroup.get('fromPerson').value);
      // console.log(this.checkoutParentGroup.get('toPerson').value);
      // console.log(this.checkoutParentGroup.get('creditCard').value);
      let client: Client = new Client();
      client.fullName = this.checkoutParentGroup.controls['data'].value.fullName;
      client.email = this.checkoutParentGroup.controls['data'].value.gmail;
      client.phoneNumber = this.checkoutParentGroup.controls['data'].value.phone;

      let fromAddress: Address = this.checkoutParentGroup.controls['fromPerson'].value;
          fromAddress.state = fromAddress.state['stateName']



      let toAddress: Address = this.checkoutParentGroup.controls['toPerson'].value;
          toAddress.state = toAddress.state['stateName']


      let requestOrder = new RequestOrder();
      requestOrder.totalPrice = this.totalPrice;
      requestOrder.totalQuantity = this.totalSize;
     // let items: Item[] = [];
      let orders: CartOrder[] = this.cartService.orders;
      // for(let i=0; i < orders.length; i++){
      //    items[i] = new Item(this.cartService.orders[i]);
      // }
      let items: Item[] = orders.map(order => new Item(order));

      let purchaseRequest = new PurchaseRequest();
      purchaseRequest.client = client;
      purchaseRequest.fromAddress = fromAddress;
      purchaseRequest.toAddress = toAddress;
      purchaseRequest.requestOrder = requestOrder;
      purchaseRequest.items = items;



      this.purchaseService.getOrder(purchaseRequest).subscribe({

        next: response =>{
          alert("Your name is: "+ response.clientName + "\nYour code is: "+ response.code);
          this.clean();
        },
        error: error =>{
          console.log("error is : " + error.message);
        }
      })

    }

  }


  clean(){
    this.cartService.orders = [];
    this.cartService.totalOrders.next(0);
    this.cartService.totalPrice.next(0);
    this.checkoutParentGroup.reset();
    this.router.navigateByUrl('/orders')

  }






  similarGroup(event: Event){
     if( (<HTMLInputElement>event.target).checked){
       this.checkoutParentGroup.controls.toPerson.setValue(this.checkoutParentGroup.controls.fromPerson.value);
       this.statesToPerson = this.statesFromPerson
     }else{
       this.checkoutParentGroup.controls.toPerson.reset();
     }
  }


 getAllContries(){
   this.countryStateService.getAllCountries().subscribe(
     data =>{
        this.countries = data
     }
   )
 }


//  getAllStates(){
//    this.countryStateService.getAllStates().subscribe(
//      data =>{
//        this.states = data
//      }
//    )
//  }


  getStatesByCode(typeForm: any){
    const code = this.checkoutParentGroup.get(`${typeForm}.country`).value;
    this.countryStateService.getStatesByCode(code).subscribe(
      data =>{
        if(typeForm === 'fromPerson'){
          this.statesFromPerson = data
        }else{
          this.statesToPerson = data
        }
        this.checkoutParentGroup.get(`${typeForm}.state`).setValue(data[0]);
      }
    )
  }


  getTotal(){
    this.cartService.totalOrders.subscribe(
      data =>{
        this.totalSize = data
      }
    ),
    this.cartService.totalPrice.subscribe(
      data =>{
        this.totalPrice = data
      }
    )
  }




}
