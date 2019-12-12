import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chauffeur } from '../models/chauffeur';
import { ApiService } from '../services/api.service'
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';

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
  email: string ;
  mp: string;
  chauff: Chauffeur;
  lesTransferts: any;
  toast: any;

constructor(public router: Router,
            public apiService: ApiService,
            private storage: Storage,
            private alertController: AlertController,
            private toastController:ToastController) { 
      this.my_size = "15px";
      this.my_weight = "bold";
      this.email = "";
      this.mp = "";
      this.date = "";
      this.chauff = new Chauffeur();

  }

  ngOnInit() {
  }
  retour() {
    this.router.navigateByUrl('/accueil');
  }
  Sauthentifier() {
    this.id = 11;
    this.date = "2019-12-12";
    //get chauffeur details using id
    this.apiService.getChauffeur(this.id).subscribe(response => {
      //console.log(this.id);
      this.chauff = response;
      this.storage.set('chauffeur', this.chauff);
      //console.log(response);
    });
    this.apiService.getSesTransferts(this.id, this.date).subscribe(response => {
      console.log(this.id);
      this.lesTransferts = response;
      this.storage.set('sesTransferts', this.lesTransferts);
      console.log(response);
    });
    this.router.navigate(['/tabs']);
  }

  Sauthentifier1(email, mp) {
    //Récupérer le login et le mot de passe
    this.email = email;
    this.mp = mp;
    //Chercher la date système
    //this.date = new Date().toISOString();
    //console.log(this.date);
    console.log("args :" + this.email + this.mp);
    /*this.apiService.getChauffeur(this.id).subscribe(response => {
      //console.log(this.id);
      this.chauff = response;
      this.storage.set('chauffeur', this.chauff);
      //console.log(response);
    });*/

    //chercher chauff par login et mp
    if (this.email != "" && this.mp != "") {
      this.apiService.getChauffeurByLogin(this.email, this.mp).subscribe(response => {
        this.chauff = response;
        console.log(this.chauff);
        if (this.chauff != null) {         
          this.storage.set('chauffeur', this.chauff).then((val) => {
            console.log("login => " + val);
            this.toastNotifier();
            this.router.navigate(['/tabs']);
          });
        }else {
          this.affichAlert();
        }
      });
    }
    else {
      this.affichAlert();
    }
   
    
    //if.. else..
    //this.id = 11;
    //this.date = '2019-12-02';
   // this.router.navigateByUrl('tabs' + '/' + this.id + '/' + this.date);
    
    
  }
  async affichAlert() {
    const alert = await this.alertController.create({
      header: 'Authentification',
      message: 'Veuillez vérifier votre email et/ou votre mot de passe',
      buttons:  [{
        text: 'Ok',
        role: 'cancel',
        handler: () => { console.log('auth non valide'); }
      }],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  toastNotifier() {
    this.toast = this.toastController.create({
      message: '   Vous êtes connecté(e) !',
      duration: 2000,
      cssClass:'toast-css'
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  }
}
