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
              private cartService: CartService) { }

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
      console.log(this.checkoutParentGroup.get('data').value);
      console.log(this.checkoutParentGroup.get('fromPerson').value);
      console.log(this.checkoutParentGroup.get('toPerson').value);
      console.log(this.checkoutParentGroup.get('creditCard').value);
    }

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