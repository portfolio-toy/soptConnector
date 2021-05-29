"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gravatar_1 = __importDefault(require("gravatar")); // [1]
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // [2]
const bcryptjs_1 = __importDefault(require("bcryptjs")); // [3]
const config_1 = __importDefault(require("../config"));
const express_validator_1 = require("express-validator"); // [4]
const router = express_1.default.Router();
const User_1 = __importDefault(require("../models/User"));
/**
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 */
router.post("/", [
    express_validator_1.check("name", "Name is required").not().isEmpty(),
    express_validator_1.check("email", "Please include a valid email").isEmail(),
    express_validator_1.check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body; // [5]
    try { // [6]
        // See if  user exists
        let user = await User_1.default.findOne({ email }); // [7]
        if (user) {
            res.status(400).json({
                errors: [{ msg: "User already exists" }],
            });
        }
        // Get users gravatar
        const avatar = gravatar_1.default.url(email, {
            s: "200",
            r: "pq",
            d: "mm",
        });
        user = new User_1.default({
            name,
            email,
            avatar,
            password,
        });
        // Encrpyt password
        const salt = await bcryptjs_1.default.genSalt(10);
        user.password = await bcryptjs_1.default.hash(password, salt);
        await user.save();
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
//# sourceMappingURL=users.js.map