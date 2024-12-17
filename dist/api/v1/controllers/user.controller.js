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
exports.detail = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
// const ForgotPassword = require("../models/forgot-password.model");
const generate_1 = require("../../../helper/generate");
// const sendMailHelper = require("../../../helper/sendMail");
// [POST]/api/v1/users/register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        });
    }
    else {
        req.body.password = (0, md5_1.default)(req.body.password);
        req.body.token = (0, generate_1.generateRandomString)(30);
        const user = new user_model_1.default(req.body);
        user.save();
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Đăng ký thành công",
            token: token
        });
    }
});
exports.register = register;
// [POST]/api/v1/users/login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại"
        });
        return;
    }
    if ((0, md5_1.default)(password) !== user.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu!"
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token);
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token
    });
});
exports.login = login;
// [GET]/api/v1/users/detail
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        code: 200,
        message: "Thành công",
        infor: req["user"]
    });
});
exports.detail = detail;
// // [POST]/api/v1/users/password/forgot
// module.exports.forgotPassword = async (req, res) => {
//     const email = req.body.email;
//     const user = await User.findOne({
//         email: email,
//         deleted: false
//     });
//     if (!user) {
//         res.json({
//             code: 400,
//             message: "Email không tồn tại"
//         });
//         return;
//     }
//     const otp = generateRandomNumber(6);
//     const objForgotPassword = {
//         email: email,
//         otp: otp,
//         expireAt: Date.now()
//     };
//     const forgotPassword = new ForgotPassword(objForgotPassword);
//     await forgotPassword.save();
//     // gửi otp qua email user
//     const subject = "Mã OTP để lấy lại mật khẩu";
//     const html = `
//     Mã OTP để lấy lại mật khẩu của bạn là <b>${otp}</b>.
//     Vui lòng không chia sẻ mã OTP này với bất kỳ ai.
//     `;
//     sendMailHelper.sendMail(email, subject, html);
//     res.json({
//         code: 200,
//         message: "Đã gửi mã OTP qua email"
//     });
// };
// // [POST]/api/v1/users/password/otp
// module.exports.otpPassword = async (req, res) => {
//     const email = req.body.email;
//     const otp = req.body.otp;
//     const result = await ForgotPassword.findOne({
//         email: email,
//         otp: otp
//     });
//     if (!result) {
//         res.json({
//             code: 400,
//             message: "Mã OTP không đúng"
//         });
//         return;
//     }
//     const user = await User.findOne({
//         email: email
//     });
//     const token = user.token;
//     res.cookie("token", token);
//     res.json({
//         code: 200,
//         message: "Xác thực thành công!",
//         token: token
//     });
// };
// // [POST]/api/v1/users/password/reset
// module.exports.resetPassword = async (req, res) => {
//     const token = req.body.token;
//     const password = req.body.password;
//     const user = await User.findOne({
//         token: token
//     });
//     if (md5(password) === user.password) {
//         res.json({
//             code: 400,
//             message: "Mật khẩu đã tồn tại"
//         });
//         return;
//     }
//     await User.updateOne({
//         token: token
//     }, {
//         password: md5(password)
//     });
//     res.json({
//         code: 200,
//         message: "Đặt lại mật khẩu thành công"
//     });
// };
// // [GET]/api/v1/users/list
// module.exports.list = async (req, res) => {
//     const users = await User.find({ deleted: false }).select("fullName email");
//     res.json({
//         code: 200,
//         message: "Thành công",
//         users: users
//     });
// };
