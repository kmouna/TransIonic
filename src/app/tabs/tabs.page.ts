import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from '../models/chauffeur';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  id: number;
  chauff: Chauffeur;
  sesTransferts: any;

  constructor( public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    public storage: Storage
  ) {
    this.chauff = new Chauffeur();
  }
 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get chauffeur details using id
    this.apiService.getChauffeur(this.id).subscribe(response => {
      //console.log(this.id);
      this.chauff = response;
      this.storage.set('chauffeur', this.chauff);
      //console.log(response);
    });
    this.apiService.getSesTransferts(this.id).subscribe(response => {
      console.log(this.id);
      this.sesTransferts = response;
      this.storage.set('sesTransferts', this.sesTransferts);
      console.log(response);
    });
  }
}
