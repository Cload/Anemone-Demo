import { Customer } from 'src/Objects/Customer';
import { BASE_API_URL } from 'src/utils/Constants';


export class InfoFetcher
{
    
 public async FetchCustomersAsync() : Promise<Customer[]>
 {
     return new Promise<Customer[]>
     (
         (resolve, reject) => 
         {
             let request = new XMLHttpRequest();
             request.open('GET', BASE_API_URL  + 'Customers' );
             request.onload = () => 
             {
                 if (request.status == 200) 
                 {
                    let customers : Customer[] = JSON.parse(request.response);
                    if (!!customers) {
                    resolve(customers);     
                     } else
                {
                    reject();
                }                
                 }
             };
             request.send();
             
         }
     );
 }




 public async FetchCustomerAsync(Id : string) : Promise<Customer>
 {
     return new Promise<Customer>
     (
         (resolve, reject) => 
         {
             let request = new XMLHttpRequest();
             request.open('GET', BASE_API_URL  + 'Customers' + `/${Id}`);
             request.onload = () => 
             {
                 if (request.status == 200) 
                 {
                    let customer : Customer = JSON.parse(request.response);
                    if (!!customer) {
                    resolve(customer);     
                     } else
                {
                    reject();
                }                
                 }
             };
             request.send();
             
         }
     );
 }



}


 