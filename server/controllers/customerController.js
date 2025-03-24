
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET
 * HomePage
 */

exports.homepage = async (req, res) => {
    const messages = req.flash('info');
    const locals = {
        title: 'NodeJs',
        description: 'Free NodeJs User Management System'
    };

    let perPage = 12;
    let page = req.query.page || 1;

    try {
        // const customers = await Customer.aggregate([{$sort:{updatedAt: -1}}])
        // .skip((perPage * page) - perPage)
        // .limit(perPage)
        // .exec();
        const count = await Customer.countDocuments();
        const customers = await Customer.find({}).limit(22);
        res.render('index', {locals, messages, customers});
        // res.render('index', {locals, customers, current: page, pages: Math.ceil(count / perPage)}, messages);
    }catch (error) {
        console.log(error);
    }
};


/**
 * GET
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer - NodeJs',
        description: 'Free NodeJs User Management System'
    };
    res.render('customer/add', locals);
};



/**
 * POST
 * Create new Customer Form
 */

exports.postCustomer = async (req, res) => {
    console.log(req.body);
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    try {
        await Customer.create(newCustomer);
        await req.flash('info', 'New Customer added');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};
/**
 * GET
 * View Customer Data
 */

exports.view = async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id});
        const locals = {
            title: 'View',
            description: 'Free NodeJs User Management System'
        };

        res.render('customer/view', {locals, customer});
    } catch (error) {
        console.log(error);
    }
}


/**
 * GET
 * Edit Customer Data
 */

exports.edit = async (req, res) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id});
        const locals = {
            title: 'EDIT',
            description: 'Free NodeJs User Management System'
        };

        res.render('customer/edit', {locals, customer});
    } catch (error) {
        console.log(error);
    }
}


/**
 * PUT
 * Update Customer Data
 */

exports.editPost = async (req, res) => {
    try {
        await Customer.findOneAndUpdate({_id: req.params.id}, req.body);
        await req.flash('info', 'Customer updated');
        res.redirect('/');  
    } catch (error) {
        console.log(error);
    }
}


/**
 * DELETE
 * DELETE Customer Data
 */

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findOneAndDelete({_id: req.params.id});
        await req.flash('info', 'Customer deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}













