const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const avatar = require("./avatar");
const verify = require("./verify");
const resend = require("./resendVerifyEmail");

module.exports = { signup, login, getCurrent, logout, avatar, verify, resend };
