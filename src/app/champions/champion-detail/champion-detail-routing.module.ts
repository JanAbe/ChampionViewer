import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChampionDetailComponent } from './champion-detail.component';

const routes: Routes = [
	{ path: 'champions/:name', component: ChampionDetailComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]	
})
export class ChampionDetailRoutingModule { }