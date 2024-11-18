import mongoose from 'mongoose';
import * as argon2 from "argon2";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) next();
    this.password = await argon2.hash(this.password);
});

UserSchema.methods.VerifyPassword = async function (password) {
    return await argon2.verify(this.password, password);
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;