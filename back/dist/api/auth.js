"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post("/", [
    express_validator_1.check("email", "Please include a valid email").isEmail(),
    express_validator_1.check("password", "Password is required").exists(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                errors: [{ msg: "Invalid Credentials" }],
            });
        }
        // Encrpyt password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                errors: [{ msg: "Invalid Credentials" }],
            });
        }
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
/**
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth_1.default, async function (req, res) {
    try { // 매개변수 auth 라는 middleware를 통과해야 try문 돌릴 수 있음
        console.log(req.body.user);
        const user = await User_1.default.findById(req.body.user.id).select("-password");
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Err");
    }
});
module.exports = router;
//# sourceMappingURL=auth.js.map