import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    dateOfBirth: new FormControl(''),
  });

  constructor(private location: Location, private authService: AuthService) { }

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
      }).catch(error => {
        console.error(error);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
