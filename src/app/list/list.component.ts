import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/Objects/Customer';
import { InfoFetcher } from 'src/network/InfoFetcher';
import {MatTableModule, MatTable, MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor( private router: Router,) { }
  @ViewChild('customerstable', {static: false}  ) table: MatTable<Customer>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns = 
  [
     'Description',
     'Email',
     'Enabled',
     'Address',
     'Edit'
  ];
  customers : Customer[] = [];
  customersDataSource : MatTableDataSource<Customer> ;
  onDataReceived(customers : Customer[])
  {
    console.log(customers);
    this.customers = customers;
    this.customersDataSource = new MatTableDataSource<Customer>(this.customers);
    this.customersDataSource.sort = this.sort;
    this.table.renderRows();
    
  }
  applyFilter(filterValue: string) {
    this.customersDataSource.filter = filterValue.trim().toLowerCase();
  }
  goToDetails(customer : Customer)
  {
    this.router.navigate(['/customer', customer.AdHocCustomerNumber]);
    console.log(customer);
  }
  ngOnInit()
  {
    this.customersDataSource = new MatTableDataSource<Customer>(this.customers);
    let infoFetcher : InfoFetcher = new InfoFetcher();
    let customerPromise : Promise<Customer[]>  = infoFetcher.FetchCustomersAsync();
    customerPromise.then((cus)  =>this.onDataReceived(cus));
    customerPromise.catch(() => alert("Errore nel recupero dei dati"));
  }

}
