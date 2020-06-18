import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/AuthService/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  onSignUp(data:NgForm){
    console.log(data.value);
    this.auth.OnSignUp(data.value);
    data.resetForm();
  }
}
