// Dependencies
import passportJwt from 'passport-jwt';
import Database from '../database/Database';
import User from '../../models/User';
import passport = require('passport');
import {
    JwtStrategyOptions
} from 'definitions';

const db: Database = new Database();
const _jwtStrat = passportJwt.Strategy;
const _extractJwt = passportJwt.ExtractJwt;

export const jwtStrat = (passport: passport.Authenticator) => {
    const opts: JwtStrategyOptions = {} as JwtStrategyOptions;
    opts.jwtFromRequest = _extractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = db.getConnectionString().secret as string;
    passport.use(new _jwtStrat(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.data._id, (err, user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
