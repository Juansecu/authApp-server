const { connect } = require('mongoose');

const databaseConnection = async () => {
    try {
        await connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to database!');
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = databaseConnection;
