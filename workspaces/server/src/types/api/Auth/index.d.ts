import { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
	user: {
		name: string
	}
}