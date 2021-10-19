import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ConfigComponent} from './config.component';

export const configRoutes: Routes = [
  {
    path: '',
    component: ConfigComponent,
  },
];

@NgModule({
            imports: [RouterModule.forChild(configRoutes)],
            exports: [RouterModule],
          })
export class ConfigRoutesModule {
}
