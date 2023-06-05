const authentication = require("../middlewares/authentication");
const { getRoleData } = require("../models/role");

const index = async (req, res) => {
    try {
        let roles = await getRoleData()

        res.render('homepage', { roles : roles });

    } catch (error) {   
        console.log(error);
    }
}

const home = async (req, res) => {
    try {
        const { access_token } = req.query

        if(!access_token){
            res.redirect("/");
        }

        let auth = await authentication(access_token)

        res.render('home', {full_name : auth.name})
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    index,
    home
}