var Car = require('../models/car');

exports.car_list = function(req, res) {
 res.send('NOT IMPLEMENTED: Car list');
};

exports.car_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: Car detail: ' + req.params.id);
};

exports.car_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: Car create POST');
};

exports.car_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
};

exports.car_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: Car update PUT' + req.params.id);
};

// List of all Cars
exports.car_list = async function(req, res) {
    try{
        theCars = await Car.find();
        res.send(theCars);
    }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
   };

   // VIEWS
// Handle a show all view
exports.car_view_all_Page = async function(req, res){
    try{
        theCars = await Car.find();
        res.render('cars', { title: 'Car Search Results', results: theCars });
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
   };
// Handle Costume create on POST.
exports.car_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Car();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.color = req.body.color;
    document.make = req.body.make;
    document.model = req.body.model;
    document.style = req.body.style;
    document.price = req.body.price;

    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Costume.
exports.car_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Car.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
exports.car_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Car.findById( req.params.id)
        // Do updates of properties
        if(req.body.color) toUpdate.color = req.body.color;
        if(req.body.make) toUpdate.make = req.body.make;
        if(req.body.model) toUpdate.model = req.body.model;
        if(req.body.style) toUpdate.style = req.body.style;
        if(req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Success " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
   };
   // Handle Car delete on DELETE.
exports.car_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Car.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };