import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/AuthService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service:AuthService) { }

  ngOnInit(): void {
  }

  onLogOut(){
    this.service.logout()
  }

}
