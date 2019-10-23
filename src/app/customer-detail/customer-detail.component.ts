import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from 'src/Objects/Customer';
import { InfoFetcher } from 'src/network/InfoFetcher';
import { SetPassWordRequest } from 'src/Objects/SetPasswordRequest';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {


  get RequestJson() : string 
  {
    return JSON.stringify(this.Request);
  }

  HidePassword : boolean = true;
  password : string = undefined;
  Customer : Customer = undefined;
  AdHocCustomerNumber : string;
  Request : SetPassWordRequest = new SetPassWordRequest();
  constructor( private route: ActivatedRoute) { }

  ngOnInit() 
  {

    this.AdHocCustomerNumber = this.route.snapshot.paramMap.get('id');
    this.Request.AdHocCustomerNumber = this.AdHocCustomerNumber;    
    let infoFetcher : InfoFetcher = new InfoFetcher();
    let customerPromise : Promise<Customer>  = infoFetcher.FetchCustomerAsync(this.AdHocCustomerNumber);
    customerPromise.then((cus)  =>this.onDataReceived(cus));
    customerPromise.catch(() => alert("Errore nel recupero dei dati"));

    }
  onDataReceived(cus: Customer): void {
    this.Customer = cus;
    this.Request.Enabled = this.Customer.Enabled;
    console.log(cus);
  }



}
