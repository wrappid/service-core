/**
 * @todo 
 * must get it from application context
 * and
 * merge core specific config here
 * and
 * environment must comes from env
 */
const path = require("path");

const env = process.env.NODE_ENV || "dev";
const wrappidConfig = require(path.resolve("./wrappid.conf.json"));

const configProvider = wrappidConfig[env];
console.log("###########################################");
console.log("configProvider found");
console.log("###########################################");

module.exports = configProvider;