import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from '../models/chauffeur';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 id: string;
 chauff: Chauffeur;
 
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.chauff = new Chauffeur();
  }
 
  ngOnInit(){
   // this.id = this.activatedRoute.snapshot.params["id"];
    this.id = this.activatedRoute.snapshot.parent.paramMap.get('id');
    //get chauffeur details using id
    this.apiService.getChauffeur(this.id).subscribe(response => {
      console.log(this.id);
      this.chauff = response;
   })
  }

}
