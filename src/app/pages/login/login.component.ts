import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email=new FormControl('');
  password=new FormControl('');

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    console.log("Login opened");

  }

  login(){
    this.auth.login(this.email.value,this.password.value).then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        console.log("Logged in: " + data);
        this.router.navigateByUrl('/main');
      }).catch(err =>{
        console.log(err);
    });
  }

}
