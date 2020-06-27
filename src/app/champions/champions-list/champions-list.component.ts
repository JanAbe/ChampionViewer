import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-champions-list',
    templateUrl: './champions-list.component.html',
    styleUrls: ['./champions-list.component.css']
})
export class ChampionsListComponent implements OnInit {
	champions: any[] = [
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
		{ name: 'Aatrox' },
	];

    constructor() { }

    ngOnInit(): void {
    }

}
