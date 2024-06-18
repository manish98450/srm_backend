const User = require('../model/User')
let token = require('../token')
const userfind = async(req,res)=>{
    try{
        let obj = req.body
        const data = await User.find(obj).exec()
        .then(array => {
            if (array.length > 0) {
                console.log('Auth Success');
                let myToken = token(obj, new Date().toString());
                res.json({ 'auth': 'success', token: myToken });
            } else {
                console.log('Auth Failed');
                res.json({ 'auth': 'failed' });
            }
        })
        .catch(err => {
            console.log('Error:', err);
            res.status(500).json({ 'auth': 'failed', 'error': err.message });
        });
        }
    catch(error){
        console.log('Fetch error :-',error)
        res.json({'message':error})
    }
}
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

