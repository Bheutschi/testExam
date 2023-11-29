import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ParamMap, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public form: FormGroup<any> = new FormGroup<any>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public showError = false;

  private subscriptions: Subscription[] = [];

  constructor(
      private usersService: UsersService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
        this.form.valueChanges.subscribe(() => this.showError = false)
    );
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public onLoginClicked(): void {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    if (this.usersService.login(email, password)) {
      this.router.navigate(['/']);
      return;
    }

    this.showError = true;
  }

}
