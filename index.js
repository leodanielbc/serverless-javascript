const config = require('config');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const USER_AGENT = JSON.stringify(event.headers['User-Agent']);
    const PLATFORM = JSON.stringify(event.headers['x-app-platform']);

    console.log(
        `PLATFORM: ${PLATFORM} - USER-AGENT: ${USER_AGENT}`
    );

    return {
        statusCode: 200,
        body: {
            message: 'Ok',
        },
    };
};