import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfigComponent} from './config.component';
import {ConfigRoutesModule} from './configRoutes.module';

@NgModule({
            imports: [
              ConfigRoutesModule,
              CommonModule,
            ],
            declarations: [ConfigComponent],
          })
export class ConfigModule {
}
