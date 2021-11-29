import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeInterface } from '../types/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<EmployeeInterface[]> {
    return this.http.get<EmployeeInterface[]>('http://localhost:3000/employees')
  }

  addUser(name: string) {
    const uniqueId = Math.random().toString(16)
    const employee = {
      id: uniqueId,
      name,
      //surname,
      hired: true
    }

    return this.http.post<EmployeeInterface>('http://localhost:3000/employees', employee)
  
  }


  removeUser(id: string): Observable<{}> {
    return this.http.delete(`http://localhost:3000/employees/${id}`)
  }

} 
