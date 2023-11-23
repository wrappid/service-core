/**
 * @todo 
 * must get it from application context
 * and
 * merge core specific config here
 * and
 * environment must comes from env
 */
const path = require("path");

const wrappidConfig = require(path.resolve("./config.json"));

const configProvider = wrappidConfig;
console.log("###########################################");
console.log("configProvider found");
console.log("###########################################");

module.exports = configProvider;