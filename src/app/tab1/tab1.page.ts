import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from '../models/chauffeur';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

 id: string;
  chauff: Chauffeur;
  lesTransferts: any;
 
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    public storage: Storage
  ) {
    this.chauff = new Chauffeur();
   
  }
 
  ngOnInit() {
    this.chauff.nom = "";
    this.chauff.prenom = "";
   // this.id = this.activatedRoute.snapshot.params["id"];
    //this.id = this.activatedRoute.snapshot.parent.paramMap.get('id');
    //get chauffeur details using id
    /*this.apiService.getChauffeur(this.id).subscribe(response => {
      console.log(this.id);
      this.chauff = response;
   })*/
    this.storage.get('chauffeur').then((val) => {
      this.chauff = val;
      console.log(this.chauff);
    });
    this.storage.get('sesTransferts').then((val) => {
      this.lesTransferts = val;
      console.log(this.lesTransferts);
    });
  }
  chargerDetails(id) {
    console.log(id);
    this.router.navigateByUrl('trans-intermediaire/' + id);
  }
}
