import { Request, Response } from 'express';
import md5 from 'md5';
import User from '../models/user.model';
// const ForgotPassword = require("../models/forgot-password.model");
import { generateRandomString } from "../../../helper/generate";
import { generateRandomNumber } from "../../../helper/generate";
// const sendMailHelper = require("../../../helper/sendMail");

// [POST]/api/v1/users/register
export const register = async (req: Request, res: Response) => {

    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        })
    } else {
        req.body.password = md5(req.body.password);
        req.body.token = generateRandomString(30);
        const user = new User(req.body);
        user.save();
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Đăng ký thành công",
            token: token
        })
    }
};

// [POST]/api/v1/users/login
export const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
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

    if (md5(password) !== user.password) {
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
};

// [GET]/api/v1/users/detail
export const detail = async (req: Request, res: Response) => {
    res.json({
        code: 200,
        message: "Thành công",
        infor: req["user"]
    });
};

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