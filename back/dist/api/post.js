"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const router = express_1.Router();
/**
 *  @route POST api/posts
 *  @desc Create a post
 *  @access Private
 */
router.post("/", auth_1.default, [express_validator_1.check("text", "Text is required").not().isEmpty()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.body;
    try {
        const user = yield User_1.default.findById(req.body.user.id).select("-password");
        const newPost = new Post_1.default({
            text: text,
            name: user.name,
            avatar: user.avatar,
            user: user.id,
        });
        const post = yield newPost.save();
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route GET api/posts
 *  @desc Get all posts
 *  @access Private
 */
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().sort({ date: -1 });
        res.json(posts);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route GET api/posts/:id
 *  @desc Get post by ID
 *  @access Private
 */
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route DELETE api/posts/:id
 *  @desc Delete a post
 *  @access Private
 */
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.user.toString() !== req.body.user.id) {
            return res.status(401).json({ msg: "User not Authorized" });
        }
        yield post.remove();
        res.json({ msg: "Post Removed" });
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route PUT api/posts/like/:id
 *  @desc Like a post
 *  @access Private
 */
router.put("/like/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.likes.filter((like) => like.user.toString() === req.body.user.id)
            .length > 0) {
            return res.status(400).json({ msg: "Post already liked" });
        }
        yield post.likes.unshift({ user: req.body.user.id });
        yield post.save();
        res.json(post.likes);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route PUT api/posts/unlike/:id
 *  @desc Unlike a post
 *  @access Private
 */
router.put("/unlike/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (post.likes.filter((like) => like.user.toString() === req.body.user.id)
            .length === 0) {
            return res.status(400).json({ msg: "Post has not yet been liked" });
        }
        const removeIndex = post.likes
            .map((like) => like.user)
            .indexOf(req.body.user.id);
        post.likes.splice(removeIndex, 1);
        yield post.save();
        res.json(post.likes);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route POST api/posts/comment/:id
 *  @desc Comment a post
 *  @access Private
 */
router.post("/comment/:id", auth_1.default, [express_validator_1.check("text", "Text is required").not().isEmpty()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield User_1.default.findById(req.body.user.id).select("-password");
        const post = yield Post_1.default.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.body.user.id,
        };
        post.comments.unshift(newComment);
        yield post.save();
        res.json(post.comments);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
/**
 *  @route DELETE api/posts/comment/:id/:comment_id
 *  @desc Delete comment
 *  @access Private
 */
router.delete("/comment/:id/:comment_id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        const comment = post.comments.find((comment) => comment._id.toString() === req.params.comment_id);
        if (!comment) {
            return res.status(400).json({ msg: " Comment does not exist" });
        }
        if (comment.user.toString() !== req.body.user.id) {
            return res.status(401).json({ msg: "User not Authorized" });
        }
        const removeIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.body.user.id);
        post.comments.splice(removeIndex, 1);
        yield post.save();
        res.json(post.comments);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
module.exports = router;
//# sourceMappingURL=post.js.map