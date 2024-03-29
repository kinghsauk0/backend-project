import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema({
     videoFiles: {
        type: String,
        require: true,
     },
     thumbnail: {
        type: String,
        require: true,
     },
     title: {
        type: String,
        require: true,
     },
     description: {
        type: String,
        require: true,
     },
     duration: {
        type: Number,
        require: true,
     },
     views: {
        type: Number,
        default: 0,
     },
     isPublish: {
        type: Boolean,
        default: true,
     },
     owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
     }

},{
    timestamps: true,
})

videoSchema.plugin(mongooseAggregatePaginate)
const  Video = mongoose.model("Video",videoSchema)

export default Video