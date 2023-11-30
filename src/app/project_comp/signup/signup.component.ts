import { Component } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private http: HttpClient, private router: Router) {}
  SignupUser = new User('', '', '', '', '');
  token: any;

  Rejectiration(user: any) {
    console.log(user);
    this.http.post('http://127.0.0.1:8000/api/v1/auth/signup', user).subscribe(
      (res: any) => {
        console.log(user);
        alert('Rejestered successfully');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log('error happened');
      }
    );
  }
}
