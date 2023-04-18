import mongoose, { now } from "mongoose";
let Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
},
    {
        versionKey: false
    });

BookSchema.pre("save", function (next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export default mongoose.model("book", BookSchema);