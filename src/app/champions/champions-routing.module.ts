import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionsComponent } from './champions.component';

const routes: Routes = [
	{ path: 'champions', component: ChampionsComponent }
]

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ChampionsRoutingModule { }