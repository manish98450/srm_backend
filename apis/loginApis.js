const User = require('../model/User')
let token = require('../token')

const userfind = async (req, res) => {
    console.log("body in userfind ",req.body.params)
    try {
        let { u_name, u_pwd } = req.body.params; // Extracting username and password from request body
        console.log('u_name u_pwd ',u_name,' ',u_pwd)
        if (!u_name || !u_pwd) {
            return res.status(400).json({ 'auth': 'failed', 'message': 'Username and password are required' });
        }

        // Adjust the query to match the database schema
        const data = await User.findOne({ u_name: u_name, u_pwd: u_pwd }).exec();

        if (data) {
            console.log('Auth Success');
            let myToken = token({ u_name }, new Date().toString());
            res.json({ 'auth': 'success', 'username': u_name, 'token': myToken });
        } else {
            console.log('Auth Failed');
            res.json({ 'auth': 'failed' });
        }
    } catch (error) {
        console.log('Fetch error :-', error);
        res.status(500).json({ 'auth': 'failed', 'error': error.message });
    }
};

module.exports = { userfind };


const insert_user = async (req, res) => {
    const user = new User({
        u_id: req.body.u_id,
        u_name: req.body.u_name,
        u_pwd: req.body.u_pwd,
        u_email: req.body.u_email,
        u_addr : req.body.u_addr,
        u_contact : req.body.u_contact

    })
    try {
        const savedUser = await user.save()
        console.log('User inserted')
        res.send(savedUser)
    }
    catch (error) {
        res.status(400).send(error)
    }
}

const update_user = async (req, res) => {
    let u_id = req.body.u_id
    const user = {
        u_name: req.body.u_name,
        u_pwd: req.body.u_pwd,
        u_email: req.body.u_email,
        u_addr : req.body.u_addr,
        u_contact : req.body.u_contact
    }
    try {
        const updateUser = await User.updateOne(
            { u_id }, user
        )
        if (updateUser.modifiedCount != 0) {
            console.log('User Updated', updateUser)
            res.send({ 'update': 'success' })
        }
        else {
            console.log('User not updated')
            res.send({ 'update': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}
//delete product
const delete_user = async (req, res) => {
    let u_id = req.body.u_id
    try {
        const deleteduser = await User.deleteOne({ u_id })
        if (deleteduser.deletedCount != 0) {
            console.log('User Deleted')
            res.send({ 'delete': 'success' })
        }
        else {
            console.log('User Not deleted')
            res.send({ 'delete': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    userfind,
    insert_user,
    update_user,
    delete_user    
}

