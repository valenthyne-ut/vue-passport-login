import config from "@/config";
import { User } from "@/db/models/User";
import { JWTPayload } from "@/types/api/Auth";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

passport.use("jwt", new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET
}, async (payload: JWTPayload, done) => {
	const user = await User.findOne({ where: { username: payload.user.name } });

	if(!user) { return done(new Error("No user with provided name found."), false); }

	return done(null, user);
}));