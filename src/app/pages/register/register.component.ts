import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  });

  constructor(private location: Location,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    console.log("Register opened");
  }

  onSubmit() {
    console.log(this.signUpForm.value+this.signUpForm.get('rePassword')?.value===this.signUpForm.get('password')?.value);
    console.log(this.signUpForm.value+this.signUpForm.get('rePassword')?.value+" "+this.signUpForm.get('password')?.value);
    if(this.signUpForm.get('rePassword')?.value===this.signUpForm.get('password')?.value){
      console.log(this.signUpForm.value);
      this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
        console.log(cred);
        console.log(this.signUpForm.get('date')?.value);
        console.log(typeof this.signUpForm.get('date')?.value);
        const user: User = {
          id: cred.user?.uid as string,
          uid: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value,
          username: this.signUpForm.get('email')?.value.split('@')[0]
        };
        this.userService.create(user).then(_ => {
          console.log('User added successfully.');
          this.router.navigateByUrl("/main");
        }).catch(error => {
          console.error(error);
        })
      }).catch(error => {
        console.error(error);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
