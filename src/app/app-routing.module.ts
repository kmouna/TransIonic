import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 // { path: '', loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)},
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)},
  { path: 'tabs/:id', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)}
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
