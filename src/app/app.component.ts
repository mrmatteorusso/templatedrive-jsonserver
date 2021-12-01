import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from './service/employee.service';
import { EmployeeInterface } from './types/employee.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('employeeForm') employeeForm: NgForm = new NgForm([], []);
  title = 'templatedrive-jsonserver';
  employees: EmployeeInterface[]=[];
  newName: string = '';
  editId = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getUsers().subscribe(emp => {
      this.employees = emp;
      console.log(this.employees)
    })
  }

  addEmp(form: NgForm): void {    
    if (this.editId === '') {
      this.employeeService.addUser(form.value).subscribe(newEmp => {
        this.employees.push(newEmp);
      })
    } else {
      // TODO: do the put / patch
      console.log(form.value);
      console.log(this.editId);
      this.editId = '';
    }
    this.employeeForm.resetForm();
  }

  onShowEdit(employee: EmployeeInterface) {
    this.editId = employee.id;
    this.employeeForm.setValue(employee.name);
  }

  removeEmployee(id: string): void {
    console.log(`ID of the employee to be removed: ${id}`)
    this.employeeService.removeUser(id).subscribe({
      next: () => {
          this.employees = this.employees.filter(employ => employ.id !== id)
          console.log(`The employee with ID = ${id} have been removed.`, this.employees)
          // TODO - Show the success message for the user.
      },
      error: () => {
          console.log(`An error occurred when trying to remove the employee with ID = ${id}.`)
          // TODO - Show the error message for the user.
      }
    })
  }
}
