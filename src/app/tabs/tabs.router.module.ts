import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
 
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
     {
        path: '',
        redirectTo: 'tab1'
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
