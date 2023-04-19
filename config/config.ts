// create env for development, staging and production and test
const config = {
    development: {
        "DBHost": "mongodb://localhost:27017/book",
        "PORT": 9000
    },
    test: {
        "DBHost": "mongodb://localhost:27017/test-book",
        "PORT": 8000
    },
    default: {
        "DBHost": "mongodb://localhost:27017/book",
        "PORT": 9000
    }
}

// export dbhost = 

//get NODE_ENV from the environment variablE AND THEN EXPORT IT

const env = process.env.NODE_ENV || 'development';

export default config[env] || config.default;

