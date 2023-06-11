const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user_model');

const imagePath = path.join('./uploads/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
        cb(null, imagePath);
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('image'), async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);

        const oldUser = await User.findOne({ email: email });

        if (oldUser) throw Error('User already exists');

        let salt = await bcrypt.genSalt(12);
        let hashPassword = await bcrypt.hash(password, salt);


        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            image: 'uploads/images/' + req.file.filename,
        });

        await user.save();

        res.json({
            status: 200,
            message: "Registration success",
        });

    } catch (error) {
        res.json({
            status: 401,
            message: error.message,
        });
    }


});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) throw Error('User not found');


        if (!await bcrypt.compare(password, user.password))
            throw Error('User not found');

        res.json(user);

    } catch (error) {
        res.json({
            status: 404,
            message: error.message,
        });
    }



});


router.get('/', (req, res) => {
    res.send('Hi im user');
});



module.exports = router;