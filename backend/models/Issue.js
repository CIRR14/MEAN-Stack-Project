import mongoose from 'mongoose';

const Schema = mongoose.Schema; // Mongoose Schema


/** SCHEMA OF ISSUE (What an issue should contain) */
let Issue = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default:  'Open'
    }
});
/** */

export default mongoose.model('Issue', Issue); // Creates a model out of the schema with name = 'Issue' and attaches the 'Issue' Schema