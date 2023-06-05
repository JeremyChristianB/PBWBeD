const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { insertTeacherAccount } = require('../models/account');
const { insertUserData, getUserData } = require('../models/user');
const { getTeacherDataById } = require('../models/teacher');

const register = async (req, res) => {
    try {
        
        const { full_name, email, address, phone_number, password, role } = req.body

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        let data = {}
        data.full_name = full_name
        data.address = address,
        data.phone_number = phone_number

        let account

        if(role == 1){
            account = await insertTeacherAccount(data);
        } else {
            // account = await insertStudentAccount(data);
        }

        let userData = {}
        userData.email = email
        userData.password = hash
        userData.role_id = role
        userData.teacher_id = account.insertId

        await insertUserData(userData);

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {

        const { email, password, role } = req.body

        let user = await getUserData(email);
        
        if(user && bcrypt.compareSync(password, user[0].password)) {

            let teacher = await getTeacherDataById(user[0].teacher_id);

            const payload = {
                id: user[0].id,
                name: teacher[0].full_name
            }

            const access_token = jwt.sign(payload, process.env.SECRET_KEY);

            res.redirect(`/home?access_token=${encodeURIComponent(access_token)}`);
        } else{
            res.redirect("/");
        }


}

const logout = async (req, res) => {
    try {
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login,
    logout,
}