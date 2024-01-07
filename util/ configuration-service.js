import * as dotenv from 'dotenv';
dotenv.config();

const configurationService = {
    CHECK_STATUS: process.env.CHECK_STATUS,
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
};

export default configurationService;
