export type UserLike = {
	name?: string;
}

export class User {
	name: string;

	static fromJSON = (json: UserLike) => {
		if(json.name != undefined) {
			return new User(json.name);
		} else {
			throw new Error("Invalid JSON passed to User constructor.");
		}
	};

	constructor(name: string) {
		this.name = name;
	}
}