const model = require("../model/models");
const bcrypt = require("bcryptjs");

exports.register = async (req, res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        // console.log(`password is ${password} and cpassword is ${cpassword}`)


        if(password === cpassword){
            const addUser = new model({
                name: req.body.name,
                email: req.body.email,
                password : req.body.password
            });

            // generating tokens
            const token = await addUser.generateAuthToken();
            
            // console.log(token);
            res.cookie("jwt", token,{
                expires : new Date(Date.now()+30000),
                httpOnly : true
            });
            const registered = await addUser.save();
            res.status(201).render("index");
        }else{
            res.send("passwords are not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.login = async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const verifyMail = await model.findOne({email:email});

        const matchPassword = await bcrypt.compare(password, verifyMail.password);

        const token = await verifyMail.generateAuthToken();
        // console.log(token);
        res.cookie("jwtLogin", token,{
            expires : new Date(Date.now()+ 600000),
            httpOnly : true
        });

        if(matchPassword){
            res.status(201).send("You have logged in")
        }else{
            res.status(400).send("Invalid email or wrong password!");
        }
    } catch (error) {
        res.status(400).send("Invalid login details");
    }

}

exports.update = async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        // console.log(`password is ${password} and cpassword is ${cpassword}`)
        if(password === cpassword){
            newPassword = await bcrypt.hash(password, 10)
            const updation = await model.findOneAndUpdate({email:email}, { $set: {password:newPassword} });
            await updation.save();
            res.status(201).render("index");

        }else{
            res.send("passwords are not matching");
        }
    } catch (error) {
        res.status(400).send(error)
    }
}