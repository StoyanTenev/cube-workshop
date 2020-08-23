module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@test.p5a42.mongodb.net/cubes?retryWrites=true&w=majority`
    },
    production: {}
};