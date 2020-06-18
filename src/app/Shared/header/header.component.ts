import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/AuthService/auth.service';
import { HeaderService } from 'src/app/service/headerService/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ShowUser
  constructor(public service:AuthService,public _header:HeaderService) {
    this._header.ShowUser.subscribe(res=>{
      console.log(res)
      this.ShowUser=res
    })
   }

  ngOnInit(): void {
  }

  onLogOut(){
    this.service.logout()
  }

}
