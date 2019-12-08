import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class AuthenticationserviceService {

  // https://dev.to/aaronksaunders/simple-ionic-tabs-app-with-child-routes-protected-routes-1k24

  public isLoggedIn: boolean = false;
  private userList = [
    {
      user: 'pepe',
      pass: 'pepe'
    },{
      user: 'juan',
      pass: 'juan'
    },{
      user: 'carlos',
      pass: 'carlos'
    }
  ];

  constructor(private router: Router) { }

  setLoggedIn(_value): void {
    this.isLoggedIn = _value;
  }
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  loginAttemp(user: string, pass: string): boolean {
    let ret: boolean = false;
    this.userList.forEach(element => {
      if(element.user == user && element.pass == pass){
        ret = true;
        this.setLoggedIn(true);
        this.router.navigateByUrl("/", { skipLocationChange: true });
      }
    });
    return ret;
  }

  logout(): void {
    this.setLoggedIn(false)
    this.router.navigateByUrl("/login", { skipLocationChange: true });
  }

}

