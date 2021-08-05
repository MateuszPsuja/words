import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'words',
    pathMatch: 'full',
  },
  {
    path: 'words',
    loadChildren: () => import('app/modules/words/words.module').then(m => m.WordsModule),
  },
  {
    path: 'config',
    loadChildren: () => import('app/modules/config/config.module').then(m => m.ConfigModule),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
