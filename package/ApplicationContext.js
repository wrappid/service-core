const ApplicationContext = {};

const setApplicationContext = (applicationContext) => {
    console.log(`-------------------------------------------`);
    console.log(applicationContext);
    console.log(`-------------------------------------------`);
    ApplicationContext = applicationContext;
}

module.exports = {ApplicationContext, setApplicationContext};