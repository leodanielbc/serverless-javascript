const AWS = require('aws-sdk');
const config = require('config');
const getEmployees = async (event) => {
    const TableName = config.get('dynamodb.table');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamoDb.scan({
        TableName
    }).promise();

    const employees = result.Items;

    return {
        status: 200,
        body: {
            employees
        }
    }
}

module.exports = {
    getEmployees
}