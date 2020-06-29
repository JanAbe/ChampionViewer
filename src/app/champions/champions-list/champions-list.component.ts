import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';

@Component({
    selector: 'app-champions-list',
    templateUrl: './champions-list.component.html',
    styleUrls: ['./champions-list.component.css']
})
export class ChampionsListComponent implements OnInit {
	champions: any[] = []; // maybe later change to any to Champion class or something.

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
		this.dataService.getChampions()
		.subscribe((observable) => {
			observable.subscribe((champions) => this.champions = champions);
		});
    }
}
