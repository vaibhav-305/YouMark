const mongoose = require('mongoose')

const subSchema = mongoose.Schema({
    // your subschema content
    timestamp: {
        type: Number,
        unique: true
    },
    noteContent: {
        type: String,
        trim: true
    }
}, { _id: false });

var schema = mongoose.Schema({
    // schema content
    userID: {
        type: String,
        required: true,
    },
    videoID: {
        type: String,
        required: true,
        trim: true
    },
    contents: [subSchema]
},{_id:false});

module.exports = mongoose.model('Notes', schema);

/*{
    userID1:
    videoID1:
    contents: [
        {
            timestamp1:
            title1:
            notecontent1:
        },
        {
            timestamp2:
            title2:
            notecontent2:
        }
        ...
	]
}*/