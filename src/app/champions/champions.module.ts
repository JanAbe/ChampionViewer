import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionsComponent } from './champions.component';
import { ChampionsListComponent } from './champions-list/champions-list.component';
import { ChampionsRoutingModule } from './champions-routing.module';
import { ChampionDetailComponent } from './champion-detail/champion-detail.component';
import { ChampionDetailRoutingModule } from './champion-detail/champion-detail-routing.module';

@NgModule({
	declarations: [ ChampionsComponent, ChampionsListComponent, ChampionDetailComponent ],
	imports: [ CommonModule, ChampionsRoutingModule, ChampionDetailRoutingModule ],
	exports: [ ChampionsComponent ]
})
export class ChampionsModule{}