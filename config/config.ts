// create env for development, staging and production and test
const config = {
    development: {
        "DBHost": "mongodb://localhost:27017/book"
    },
    test: {
        "DBHost": "mongodb://localhost:27017/test-book"
    },
    default: {
        "DBHost": "mongodb://localhost:27017/book"
    }
}

// export dbhost = 

//get NODE_ENV from the environment variablE AND THEN EXPORT IT

const env = process.env.NODE_ENV || 'development';

export default config[env] || config.default;

