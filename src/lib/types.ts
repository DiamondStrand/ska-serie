export interface Page {
	id: number;
	imageUrl: string;
	caption: string;
}

export interface Serie {
	id: number;
	title: string;
	description: string;
	status: string;
	imageUrl: string;
	pages: Page[];
}
