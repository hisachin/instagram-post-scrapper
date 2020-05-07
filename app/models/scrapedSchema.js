import mongoose from 'mongoose';

let Schema = mongoose.Schema;


const subSchemaOpts = {
    _id: true
}

const CommentsData = {
    user : {
        type : String
    },
    comment : {
        type : String
    },
    time : {
      type : Date
    }
};

const ScrapedDataSchema = new Schema({
  url: {
    type: String,
    trim: true,
    required: true
  },
  noOfLikes: {
    type: Number,
    trim: true
  },
  noOfComments : {
    type: Number,
    trim: true
  },
  commentsData : [Schema(CommentsData, subSchemaOpts)]
}, {
  timestamps: true
});

module.exports = mongoose.model('ScrapedData', ScrapedDataSchema);