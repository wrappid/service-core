const ControllersRegistry = {
    "checkLoginOrRegister": (req, res)=>{return res.status(200).json({message:"Check login or register API called."})},
    "loginWithPassword": (req, res)=>{return res.status(200).json({message:"Login with password API called."})}
};

module.exports = ControllersRegistry;