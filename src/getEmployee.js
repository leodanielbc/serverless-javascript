const AWS = require('aws-sdk');
const config = require('config');
const getEmployee = async (event) => {
    const TableName = config.get('dynamodb.table');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const { employee_id } = event.pathParameters;

    const result = await dynamoDb.get({
        TableName,
        Key: {
            employee_id,
        }
    }).promise();

    const employee = result.Item;

    return {
        status: 200,
        body: employee
    }
}

module.exports = {
    getEmployee
}