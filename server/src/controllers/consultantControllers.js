const Consultant = require('../models/consultantModel');
const Client = require("./../models/clientModel");
const Command = require("./../models/commandModel");
const jwt = require('jsonwebtoken');
require("dotenv").config();



const consulantLogin = async (req, res) => {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        // Check if the consultant exists
        const consultant = await Consultant.findOne({ email });
        if (!consultant) {
            return res.status(404).json({ message: 'Consultant not found' });
        }

        // Check if the password is correct using comparePassword method
        const isMatch = await consultant.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const token = jwt.sign(
            { consultantId: consultant._id, fullName: consultant.fullName, email: consultant.email },
            jwtSecret
        );

        // Send the token in the response
        res.json({
            token,
            consultant: {
                id: consultant._id,
                fullName: consultant.fullName,
                email: consultant.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyConsultantIsLogin = async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, jwtSecret);

        // Check if the decoded token has the required properties
        if (!decoded.consultantId) {
            return res.status(401).json({ isAuthenticated: false });
        }

        // Find the consultant by ID
        const consultant = await Consultant.findById(decoded.consultantId);

        if (!consultant) {
            return res.status(401).json({ isAuthenticated: false });
        }

        res.status(200).json({ isAuthenticated: true });

    } catch (err) {
        res.status(401).json({ isAuthenticated: false });
    }
};

const addClient = async (req, res) => {
    try {
        // Create a new client using the request body
        const newClient = new Client(req.body);

        // Save the new client to the database
        const savedClient = await newClient.save();

        // Respond with the saved client data
        res.status(201).json({
            message: 'Client created successfully',
            client: savedClient
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: 'An error occurred while creating the client',
            error: error.message
        });
    }
};

const getClientById = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid client ID' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        // Retrieve all clients, sorted by creation date in descending order
        const clients = await Client.find().sort({ createdAt: -1 });

        // Respond with the clients data
        res.status(200).json({
            message: 'Clients retrieved successfully',
            clients: clients
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: 'An error occurred while retrieving clients',
            error: error.message
        });
    }
};

const createCommand = async (req, res) => {
    const { orderNumber, date, clientId, note, object } = req.body;
    try {
        // Check if the client exists
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Create the new command
        const newCommand = new Command({
            orderNumber,
            date,
            consultantId: req.consultant._id,  // Add the consultant ID from the authenticated user
            clientId,
            note,
            object
        });

        // Save the command
        const savedCommand = await newCommand.save();

        // Update the client's `modified` field and `commandId`
        client.beenConsulted = true;
        client.commandId = savedCommand._id;
        client.consultantId = req.consultant._id;
        await client.save();

        req.consultant.clients.push(client._id);
        await req.consultant.save();

        // Return the created command
        res.status(201).json({ savedCommand });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCommandById = async (req, res) => {
    const { id } = req.params;

    try {
        const command = await Command.findById(id);
        if (!command) {
            return res.status(404).json({ message: 'Command not found' });
        }
        res.status(200).json(command);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid command ID' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllCommands = async (req, res) => {
    try {
        // Retrieve all commands, sorted by creation date (newest first)
        const commands = await Command.find().sort({ createdAt: -1 });  // Sort by createdAt, descending order (newest first)

        // Return the list of commands
        res.status(200).json({ commands });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = { consulantLogin, addClient, getAllClients, createCommand, getClientById, getCommandById, getAllCommands, verifyConsultantIsLogin }; 