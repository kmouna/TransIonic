import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from '../models/chauffeur';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  //id: number;
  //chauff: Chauffeur;

  constructor( //public activatedRoute: ActivatedRoute,
    //public router: Router,
    //public apiService: ApiService
  ) {
    //this.chauff = new Chauffeur();
  }
 
  ngOnInit(){
    /*this.id = this.activatedRoute.snapshot.params["id"];
    //get chauffeur details using id
    this.apiService.getChauffeur(this.id).subscribe(response => {
      console.log(this.id);
      this.chauff = response;
      console.log(response);
    })*/
  }

}
