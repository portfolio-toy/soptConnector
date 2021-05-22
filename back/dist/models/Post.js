"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    comments: [
        {
            user: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=Post.js.map