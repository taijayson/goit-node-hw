const passport = require("passport");
const passportJwt = require("passport-jwt");
require("dotenv").config();

const { users: services } = require("../services");

const { ExtractJwt, Strategy } = passportJwt;
const { TOKEN_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_KEY,
};

passport.use(
  new Strategy(settings, async (payload, done) => {
    try {
      const user = await services.getById(payload.id);
      if (!user) {
        throw new Error("User not found");
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
