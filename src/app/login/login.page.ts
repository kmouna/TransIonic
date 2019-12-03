import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public my_size: string;
  public my_weight: string;
  id: number;
  date: string;

  constructor(public router: Router) { 
    this.my_size = "15px";
    this.my_weight = "bold";
  }

  ngOnInit() {
  }
  
  Sauthentifier() {
    //if.. else..
    this.id = 11;
    this.date = '2019-12-02';
    this.router.navigateByUrl('tabs' + '/' + this.id + '/' + this.date);
  }
}
