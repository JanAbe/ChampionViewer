import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/data.service';

@Component({
	selector: 'app-champion-detail',
	templateUrl: './champion-detail.component.html',
	styleUrls: ['./champion-detail.component.css']
})
export class ChampionDetailComponent implements OnInit {
	champion: any;
	splash_art_urls: string[] = [];

	constructor(private dataService: DataService,
				private route: ActivatedRoute) { }

	ngOnInit(): void {
		const champion_name = this.route.snapshot.paramMap.get('name');

		this.dataService.getChampion(champion_name)
		.subscribe((observable) => {
			observable.subscribe((champion) => {
				this.champion = champion;
				this.splash_art_urls = this.getSplashArtUrls(champion);
			});
		});
	}

	getSplashArtUrls(champion: any): string[] {
		return this.dataService.getSplashArt(champion);
	}
}
