import { Component } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { EmployeeInterface } from './types/employee.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'templatedrive-jsonserver';




employees: EmployeeInterface[]=[];
newName: string = '';


constructor(private employeeService: EmployeeService) {}

ngOnInit(): void {
  this.employeeService.getUsers().subscribe(emp => 
    {
  this.employees = emp;
      console.log(this.employees)
    })
    
  }

  addEmp(name: string): void {
    this.employeeService.addUser(name).subscribe(newEmp => {
      console.log(newEmp);
      console.log(this.employees)
      this.employees.push(newEmp)
      console.log(this.employees)
      //this.employees.push(newEmp)
  
    })
  
  }

  removeEmployee(id: string): void {
    console.log(`ID of the employee to be removed: ${id}`)
    this.employeeService.removeUser(id)
       .subscribe(
         
        {
          next: () => {
             this.employees = this.employees.filter(employ => employ.id !== id)
             console.log(`The employee with ID = ${id} have been removed.`, this.employees)
             // TODO - Show the success message for the user.
          },
          error: () => {
             console.log(`An error occurred when trying to remove the employee with ID = ${id}.`)
             // TODO - Show the error message for the user.
          }
        }
        )
  }
  

}
