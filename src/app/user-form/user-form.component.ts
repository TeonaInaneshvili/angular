import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { NewUser } from '../model/newUser.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  providers: [UsersService],
})
export class UserFormComponent implements OnDestroy {
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

  public addUser(regForm: any): void {
    this.usersService
      .getUserService()
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data.some((el) => el.username === regForm.value.username)) {
            return;
          }
          this.usersService
            .addUserService({
              name: regForm.value.name,
              surname: regForm.value.surname,
              username: regForm.value.username,
              email: regForm.value.email,
              country: regForm.value.country,
              password: regForm.value.password,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe();
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
    this.addUser(regForm);
  }
}
