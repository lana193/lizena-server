import { Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import keys from './../../config/keys';
import { getUserService } from './../services/userService';

export const initializeStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = keys.secretOrKey;
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      const user = await getUserService({_id: jwt_payload.id});
          if (user) {
           return done(null, user);
          }
          return done(null, false);
          // or you could create a new account
    })
  );
}