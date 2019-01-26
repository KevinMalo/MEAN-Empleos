import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor( private _employeeService: EmployeeService) { }

  addEmployee(form: NgForm) {
    if (form.value._id !== ' ') {
      this._employeeService.putEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Update Successfuly'});
        this.getEmployees();
      });
    } else {
    this._employeeService.postEmployee(form.value)
    .subscribe( res => {
      this.resetForm(form);
      M.toast({html: 'Save Successfuly'});
      this.getEmployees();
    } );
  }
  }

  getEmployees() {
    this._employeeService.getEmployees().
    subscribe(res => {
      this._employeeService.employees = res as Employee[];
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this._employeeService.selectedEmployee = new Employee;
    }
  }

  editEmployee(employee: Employee) {
    this._employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this._employeeService.deleteEmployee(_id)
      .subscribe( res => {
        this.getEmployees();
        M.toast({html: 'Delete successfully'});
      });
    }

  }

  ngOnInit() {
    this.getEmployees();
  }

}
