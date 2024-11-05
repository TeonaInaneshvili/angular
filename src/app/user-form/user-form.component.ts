import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { NewUser } from '../model/newUser.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  providers: [UsersService],
})
export class UserFormComponent implements OnInit, OnDestroy{
  public name = '';
  public surname = '';
  public username = '';
  public email = '';
  public country = '';
  public password = '';
  public hasError = false;
  public invalidPassword = false;

  public hasErrors: boolean = false;
  public destroyed$ = new Subject();
  
  public usersService = inject(UsersService);


  ngOnInit() {
    this.addUser() ;
  }

  public addUser(): void {
    this.usersService
      .addUserService({
        name: "",
        surname: "",
        username: "",
        email: "",
        country: "",
        password: ""
      })
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.onSubmit;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next;
    this.destroyed$.complete();
  }


  public onSubmit(regForm: NgForm): void {
    if (
      (regForm.value.password.length && regForm.value.password.length < 6) ||
      regForm.value.password.length > 20
    ) {
      this.invalidPassword = true;
      return;
    }
    if (regForm.invalid) {
      this.hasError = true;
      return;
    }

    this.invalidPassword = false;
    this.hasError = false;
    console.log(regForm.value);
    this.addUser();
  }

}
