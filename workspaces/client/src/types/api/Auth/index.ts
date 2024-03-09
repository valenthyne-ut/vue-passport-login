import type { User } from "@/classes/api/User/User";

export interface SuccessfulLoginResponse {
	jwt: string;
	user: User;
}