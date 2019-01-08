// Dependencies
import passportJwt from 'passport-jwt'
import Database from '../database/Database'
import User from '../../models/User'

const db = new Database()
const _jwtStrat = passportJwt.Strategy
const _extractJwt = passportJwt.ExtractJwt

export const jwtStrat = (passport) => {
  const opts = {}
  opts.jwtFromRequest = _extractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = db.getConnectionString().secret
  passport.use(new _jwtStrat(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.data._id, (err, user) => {
      if(err) {
        return done(err, false)
      }

      if(user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
