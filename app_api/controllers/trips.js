const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //require the Trip model
const Model = mongoose.model('trips');

// GET request for list of all Trip items
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripList = async (req, res) => {
    const q = await Model
        .find({}) // empty object returns all documents
        .exec();

        //Uncomment the following line to show results of querey
        //on the console
        //console.log(q);

    if(!q) 
    {
        return res
            .status(404)
            .json({err});
    } else {
        return res
            .status(200)
            .json(q);
    }
};
//Get /trips/tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({code: req.params.tripCode})
        .exec();

        //Uncomment the following line to show results of querey
        //on the console
        //console.log(q);
    if(!q) 
    {
        return res
            .status(404)
            .json({err});
    } else {
        return res
            .status(200)
            .json(q);
    }
};
module.exports = {
    tripList,
    tripsFindByCode

};