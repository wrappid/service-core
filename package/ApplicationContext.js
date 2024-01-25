let ApplicationContext = {};

const setApplicationContext = (applicationContext) => {
  try{
    console.log("-------------------------------------------");
    console.log(applicationContext);
    console.log("-------------------------------------------");
    ApplicationContext = applicationContext;
  }catch(error){
    console.log(error);
    throw error;
  }
};

module.exports = { ApplicationContext, setApplicationContext };
