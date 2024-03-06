import { hashSync } from "bcrypt";

export function benchmarkServerHashCost(targetTime: number): number {
	let cost = 8, startTime, endTime, timeCost;
	do {
		cost++;
		
		startTime = new Date().getTime();
		hashSync("benchmark", cost);
		endTime = new Date().getTime();
		
		timeCost = endTime - startTime;
	} while(timeCost < targetTime);
	cost -= 1;

	console.log(
		`Your server's benchmarked affordable hash cost for a delay of ${targetTime}ms is ${cost}.\n` +
		"To prevent this message from showing up again (and also getting rid of an unnecessary start-up delay), add this entry to your .env file:\n" +
		`BCRYPT_HASH_COST=${cost}`);
	return cost;
}