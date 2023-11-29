import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: UserModel[] = [
    { id: 1, firstName: 'Gregory', lastName: 'House', email: 'g.house@ppth.com' },
    { id: 2, firstName: 'Lisa', lastName: 'Cuddy', email: 'l.cuddy@ppth.com' },
    { id: 3, firstName: 'Eric', lastName: 'Foreman', email: 'e.foreman@ppth.com' },
    { id: 4, firstName: 'Numéro 13', lastName: '', email: 'n.13@ppth.com' }
  ];

  private currentUser?: UserModel;

  constructor() {}

  public getUsers(): UserModel[] {
    return this.users;
  }

  public getCurrentUser(): UserModel|undefined {
    return this.currentUser;
  }

  public isLoggedIn(): boolean {
    return this.getCurrentUser() != undefined;
  }

  public login(email: string, password: string): boolean {
    if (password === 'salut') {
      this.currentUser = this.users.find((user) => user.email == email);
      return this.currentUser != undefined;
    }

    return false;
  }

  public logout(): void {
    this.currentUser = undefined;
  }
}
