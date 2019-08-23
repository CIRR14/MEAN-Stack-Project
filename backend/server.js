import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';

const app = express(); // express is th emiddleware we are using
const port = 4000; // port you'd like to use
const router = express.Router(); // the router in express - router is set to what is returned from express.Router()

app.use(cors()); // attach cors middleware to express application
app.use(bodyParser.json()); // attach bodyParser to express application and use json bc what you get from request is json format

mongoose.connect('mongodb://localhost:27017/issues'); // mongoose connects to MongoDB URL

const connection = mongoose.connection; //sets mongoose connection to the connection variable
 

// connection happens once and listens for the 'open' event
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!'); // once connection is established, it prints out the string 
});




/** MONGOOSE DATA MODEL/SCHEMAS */

// GET
// Getting all issues
router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

// GET
// Getting issues by ID
router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(err) {
            console.log(err);
        } else {
            res.json(issue);
        }
    });
});

// POST
// Adding new issues to the database
router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added Successfully'});
        })
            .catch( err => {
                res.status(400).send('Failed to create new record');
            });
});

// POST
// Updating existing issues
router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue) {
            return next(new Error('Could not load document'));
        } else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

             issue.save().then(issue => {
                res.json('Update done');
             }).catch (err => {
                 res.status(400).send('Update failed');
             });
        }
    });
});

// GET
// Deleting issues by ID
router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if(err) {
            res.json(err);
        } else {
            res.json('Remove successfully');
        }
    });
});
/**  */



app.use('/', router); // middleware is attached to default router 

app.listen(port, () => console.log('Express server running on port ' + port)); // listens to the port #