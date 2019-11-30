import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public my_size: string;
  public my_weight: string;
  constructor() { 
    this.my_size = "15px";
    this.my_weight = "bold";
  }

  ngOnInit() {
  }
  
  Sauthentifier() {
    
  }
}
