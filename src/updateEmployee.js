const AWS = require('aws-sdk');
const config = require('config');
const updateEmployee = async (event) => {
    const TableName = config.get('dynamodb.table');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const { employee_id } = event.pathParameters;

    const { name, age, newPosition } = JSON.parse(event.body);

    await dynamoDb.update({
        TableName,
        Key: {
            employee_id,
        },
        UpdateExpression: "SET #p = :newPosition, #n = :name, #a = :age, #u = :updatedAt",
        ExpressionAttributeNames: {
            "#p": "position",
            "#n": "name",
            "#a": "age",
            "#u": "updatedAt"
        },
        ExpressionAttributeValues: {
            ":newPosition": newPosition,
            ":name": name,
            ":age": age,
            ":updatedAt": new Date().toISOString()
        },
        ReturnValues: "ALL_NEW",
    }).promise();


    return {
        status: 200,
        body: {
            message: 'Resource updated successfully'
        }
    }
}

module.exports = {
    updateEmployee
}