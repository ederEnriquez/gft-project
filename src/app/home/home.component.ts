import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../model/user.model';
import { AuthModel } from '../model/auth.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: UserModel = new UserModel();
  auth: AuthModel = new AuthModel();
  activeForm = 'auth';
  constructor(private userService: UserService, private router: Router) {}

  createUser() {
    if (this.user.valid()) {
      this.userService.create(this.user).subscribe(
        res => {
          alert(res.hasOwnProperty('success') ? res.success : res.message);
        },
        error => {
          alert('Error:' + error);
        }
      );
    } else {
      alert('Completa el formulario');
    }
  }

  authUser() {
    if (this.auth.valid()) {
      this.userService.authenticate(this.auth).subscribe(
        res => {
          if (res.hasOwnProperty('token')) {
            sessionStorage.setItem('token', res.token);
            this.parseJwt(sessionStorage.getItem('token'));
            this.router.navigate(['account']);
          } else {
            alert('Error al autenticarse');
          }
        },
        error => {
          alert('Error:' + error);
        }
      );
    } else {
      alert('Completa el formulario');
    }
  }

  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const obj = JSON.parse(window.atob(base64));
    // tslint:disable-next-line:forin
    for (const prop in obj) {
      sessionStorage.setItem(prop, obj[prop]);
    }
  }
}
