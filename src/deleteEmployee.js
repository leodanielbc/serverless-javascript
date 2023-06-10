const AWS = require('aws-sdk');
const config = require('config');
const deleteEmployee = async (event) => {
    const TableName = config.get('dynamodb.table');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const { employee_id } = event.pathParameters;

    await dynamoDb.delete({
        TableName,
        Key: {
            employee_id,
        },
    }).promise();


    return {
        status: 200,
        body: {
            message: 'Resource deleted successfully'
        }
    }
}

module.exports = {
    deleteEmployee
}