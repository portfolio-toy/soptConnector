"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProfileSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
    },
    company: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    social: [
        {
            youtube: {
                type: String,
            },
            twitter: {
                type: String,
            },
            facebook: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            instagram: {
                type: String,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Profile", ProfileSchema);
//# sourceMappingURL=Profile.js.map