import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { Transfert } from '../models/transfert';
import { TransfertIntermediaire } from '../models/transfert-intermediaire';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-trans-intermediaire',
  templateUrl: './trans-intermediaire.page.html',
  styleUrls: ['./trans-intermediaire.page.scss'],
})
export class TransIntermediairePage implements OnInit {
  idtrans: number;
  id_transinter: number;
  transIntermediaires: any; // pour récuperer tous les trans inters
  unTransfert: Transfert; //pour Afficher les dées transfert sélectionné au header de la page
  unTransfertIntermediaire: TransfertIntermediaire; // pour l'update => transfert confirmé
  leTransIntermediaire:TransfertIntermediaire; // pour afficher le détail
  toast: any;
  input: any;
  indice: number;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private storage: Storage,
              private alertController: AlertController,
              private toastController:ToastController
              )
  {
    this.unTransfert = new Transfert();
    this.unTransfertIntermediaire = new TransfertIntermediaire();
    this.leTransIntermediaire = new TransfertIntermediaire();
    //this.transIntermediaires = [];
  }

  ngOnInit() {
    this.idtrans = this.activatedRoute.snapshot.params["idtrans"];
    //get transfert by using ID
    this.apiService.getTransfert(this.idtrans).subscribe(response => {
      this.unTransfert = response;
      console.log("Console1 " + this.unTransfert);
      this.storage.set('Transfert', this.unTransfert);  
      
    });
    //get transIntermediaires of transfert using idtrans
    this.apiService.getTransIntermediaires(this.idtrans).subscribe(response => {
      this.transIntermediaires = response;
      this.storage.set('TransIntermediaires', this.transIntermediaires);  
     
    });
  }
  retour() {
    this.router.navigateByUrl('tabs');
  }
  async affichAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation Transfert',
      message: 'Vous êtes sûr(e) de vouloir confirmer ce transfert ?',
      buttons:  [{
        text: 'Non',
        role: 'cancel',
        //cssClass: 'tertiary',
        handler: () => {
          console.log('Annule Confirm');
        }
      }, {
          text: 'Oui',
        handler: () => {
          //console.log('Confirm transfert');
          //this.disableConfirm = true;

          //on n'a pas besoin => getTransIntermediaire (nouvelle)

         this.storage.get('TransIntermediaires').then((val) => {
            this.transIntermediaires = val;
            for (let t of this.transIntermediaires) {
              if (t.id == this.id_transinter) {
                this.unTransfertIntermediaire = t; break;
              }
            }
           // à refaire

            //mettre à jour le storage (set)
           /* this.unTransfertIntermediaire.etat = "Réalisée";
            this.apiService.updateTransfertIntermediaire(this.id_transinter,this.unTransfertIntermediaire)._subscribe;
            document.getElementById('confirm_' + this.indice).setAttribute('disabled', 'true');
            this.showToast();*/
          });
          

        }
      }],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  showToast() {
    this.toast = this.toastController.create({
      message: '      Transfert Confirmé !',
      duration: 2000,
      cssClass:'toast-css'
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
  confirmer(indice, id) {
    this.indice = indice;
    this.id_transinter = id;
    this.affichAlertConfirm();
  }
  afficherDetails(id) {
    this.apiService.getTransIntermediaire(id).subscribe(response => {
      this.leTransIntermediaire = response;  
      let mess = "<strong>Hôtel  : </strong>" + this.leTransIntermediaire.nom_hotel  + "<br /><br />" +
                 "<strong>Agence : </strong>" + this.leTransIntermediaire.nom_agence + "<br /><br />" +
                 "<strong>N°Vol  : </strong>" + this.leTransIntermediaire.id_vol + "<br /><br /><strong>" +
                 this.leTransIntermediaire.nbperso + "</strong> Personne(s)"   ;
    this.affichAlertDetails(mess);
    });
   
   
  }
  async affichAlertDetails(mess) {
      const alert = await this.alertController.create({
        header: 'Détails du Transfert',
        message:mess,
        buttons: [{
          text: 'Ok',
          role: 'cancel',
          //cssClass: 'tertiary',
          handler: () => {
          }
        }],
      });
    
      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }
 
}
