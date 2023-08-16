/**
 * @todo must get it from application context
 */

const { ApplicationContext } = require("../ApplicationContext");

const configProvider = ApplicationContext["config"]["dev"];

module.exports = configProvider;