import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-trans-intermediaire',
  templateUrl: './trans-intermediaire.page.html',
  styleUrls: ['./trans-intermediaire.page.scss'],
})
export class TransIntermediairePage implements OnInit {
  idtrans: number;
  transIntermediaires: any;
  unTransfert: any;//pour avoir le transfert sélectionné

  constructor(private activatedRoute: ActivatedRoute,
              private apiService : ApiService,
              private storage: Storage,
              )
  { }

  ngOnInit() {
    this.idtrans = this.activatedRoute.snapshot.params["idtrans"];
    //get transfert by using ID
    this.apiService.getTransfert(this.idtrans).subscribe(response => {
      this.unTransfert = response;
      this.storage.set('Transfert', this.unTransfert);  
      //this.chauff = response;
    });
    //get transIntermediaires of transfert using idtrans
    this.apiService.getTransIntermediaires(this.idtrans).subscribe(response => {
      this.transIntermediaires = response;
      this.storage.set('TransIntermediaires', this.transIntermediaires);  
      //this.chauff = response;
    });
  }

}
