import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  public my_size: string;
  public my_weight: string;
  constructor() { 
    this.my_size = "15px";
    this.my_weight = "bold";
  }

  ngOnInit() {
  }

}
