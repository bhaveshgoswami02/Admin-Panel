import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(public auth:AuthService,public router:Router) { 
    
  }

  ngOnInit(): void {
  }

  onSignin(data:NgForm){
    console.log(data.value)
    this.auth.OnSignIn(data.value)
    data.resetForm()
  }
}
