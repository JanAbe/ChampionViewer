import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	base_url: string = 'https://ddragon.leagueoflegends.com';

	constructor(private httpClient: HttpClient) { }

	// Gets a list of all LoL champions by querying 
	// https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json.
	// Each champion name can later be used to request more specific
	// champion data.
	getChampions(): Observable<Observable<object[]>> {
		// why does this work? this feels really hacky :(
		return this.getLatestVersion().pipe(
			map(version => {
				// array of objects containing simple/basic champion data
				let champions: object[] = [];
				const champions_url: string = `${this.base_url}/cdn/${version}/data/en_US/champion.json`;

				return this.httpClient.get<Object>(champions_url)
				.pipe(
					map(response => {
						// iterate through each champion, where the key is the champion name
						// and add that data point to a new array
						for (let champion_name of Object.keys(response['data'])) {
							response['data'][champion_name]['defaultSplashArt'] = this.getDefaultSplashArt(champion_name);
							champions.push(response['data'][champion_name]);
						}

						return champions;
					}),
					catchError(this.handleError)
				);
			})
		)
	}

	getChampion(champion_name: string): Observable<Observable<object>> {
		return this.getLatestVersion().pipe(
			map(version => {
				const prepared_champion_name: string = this.transformChampionName(champion_name);

				const champion_url: string = `${this.base_url}/cdn/${version}/data/en_US/champion/${prepared_champion_name}.json`;

				return this.httpClient.get<Object>(champion_url)
				.pipe(
					map(response => {
						return response['data'][prepared_champion_name];
					}),
					catchError(this.handleError)
				)
			})
		)
	}

	// Gets all the splash art the provided champion has.
	getSplashArt(champion: any): object[] {
		let splash_art: object[] = [];
		for (let skin of champion.skins) {
			const prepared_champion_name: string = this.transformChampionName(champion.name);
			const url = `${this.base_url}/cdn/img/champion/splash/${prepared_champion_name}_${skin.num}.jpg`;
			splash_art.push({url: url, name: skin.name});
		}

		return splash_art;
	}

	// Gets the default splash art of the provided champion (name).
	getDefaultSplashArt(champion_name: string): string {
		const prepared_champion_name: string = this.transformChampionName(champion_name);
		const splash_art_url: string = `${this.base_url}/cdn/img/champion/splash/${prepared_champion_name}_0.jpg`;
		return splash_art_url;
	}

	// Get the urls that point to the art of the spells of the provided champion.
	getSpellsArt(champion: any): Observable<string[]> {
		return this.getLatestVersion().pipe(
			map(version => {
				let spells_art: string[] = [];
				const passive_url = `${this.base_url}/cdn/${version}/img/passive/${champion.passive.image.full}`;
				const q_url = `${this.base_url}/cdn/${version}/img/spell/${champion.spells[0].image.full}`;
				const w_url = `${this.base_url}/cdn/${version}/img/spell/${champion.spells[1].image.full}`;
				const e_url = `${this.base_url}/cdn/${version}/img/spell/${champion.spells[2].image.full}`;
				const r_url = `${this.base_url}/cdn/${version}/img/spell/${champion.spells[3].image.full}`;
				spells_art.push(passive_url);
				spells_art.push(q_url);
				spells_art.push(w_url);
				spells_art.push(e_url);
				spells_art.push(r_url);
				return spells_art;
			})
		)
	}
	
	// Gets the latest version of the accessible data by querying
	// https://ddragon.leagueoflegends.com/api/versions.json and taking
	// the latest version of it. This version can be used by other requests
	// made to the Riot Games LoL api.
	private getLatestVersion(): Observable<string> {
		const versions_url: string = `${this.base_url}/api/versions.json`;
		return this.httpClient.get<string>(versions_url)
		.pipe(
			map(versions => { return versions[0] }),
			catchError(this.handleError)
		);
	}

	private handleError(error: any) {
		console.error('sever error: ', error);
		if (error.error instanceof Error) {
			const errMessage = error.error.message;
			return Observable.throw(errMessage);
		}

		return Observable.throw(error || 'Node.js server error');
	}

	// transform champion name so it can be used in subsequent requests 
	// e.g Rek'Sai -> RekSai, Miss Fortune -> MissFortune
	// It does expect passed in champion names to be capitalized correctly.
	private transformChampionName(champion_name: string): string {
		if (champion_name === 'Kai\'Sa') {
			return 'Kaisa'; // Riot why isn't it just KaiSa :(
		} else if (champion_name === 'Nunu & Willump') {
			return 'Nunu';
		}

		let transformed_name: string;
		transformed_name = champion_name.replace('\'', '');
		transformed_name = transformed_name.replace('.', '');
		transformed_name = transformed_name.replace(' ', '');
		return transformed_name;
	}
}
