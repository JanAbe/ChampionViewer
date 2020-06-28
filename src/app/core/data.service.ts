import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	base_url: string = 'https://ddragon.leagueoflegends.com';

	constructor(private httpClient: HttpClient) { }

	// Gets a list of all LoL champion by querying 
	// https://ddragon.leagueoflegends.com/cdn/10.13.1/data/en_US/champion.json.
	// Each champion name can later be used to request more specific
	// champion data.
	getChampions(): Observable<any> {
		let version = '10.13.1';
		// does version ever get updated with the latest version? i don't think so actually :(
		this.getLatestVersion().subscribe((v) => {
			version = v;
		});

		let champions = [];
		const champions_url: string = `${this.base_url}/cdn/${version}/data/en_US/champion.json`;
		
		// this feels really hacky :(
		return this.httpClient.get<Object>(champions_url)
		.pipe(
			map(response => {
				for (let key of Object.keys(response['data'])) {
					champions.push(response['data'][key]);
				}
				return champions;
			}),
			catchError(this.handleError)
		);
	}

	// Gets all the splash art the provided champion (name) has.
	getSplashArt(champion: string): Observable<string[]> {
		return null;	
	}
	
	// Gets the latest version of the accessible data by querying
	// https://ddragon.leagueoflegends.com/api/versions.json and taking
	// the latest version of it. This version can be used by other requests
	// made to the Riot Games LoL api.
	private getLatestVersion(): Observable<string> {
		const versions_url: string = `${this.base_url}/api/versions.json`;
		return this.httpClient.get<string>(versions_url)
		.pipe(
			take(1), // take the first entry of the data, as this is the latest version
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
}
