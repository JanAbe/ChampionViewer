import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/champions'},
	// { path: '**', pathMatch: 'full', redirectTo: '/champions'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
