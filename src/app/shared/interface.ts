
export interface Champion {
	name: string,
	lore: string,
	stats: object,
	spells: object[],
	passive: object,
	skins: Skin[],
}

export interface Skin {
	name: string,
	num: number,
	url: string,
	xd: string
}