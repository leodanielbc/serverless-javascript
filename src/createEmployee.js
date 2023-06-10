const config = require('config');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4 } = require('uuid');

module.exports.create = async (event) => {

    const TableName = config.get('dynamodb.table');

    const { name, age, position } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const employee_id = v4();

    const newEmployee = {
      employee_id,
      name,
      age,
      position,
      createdAt,
    }

    await dynamoDb.put({
      TableName,
      Item: newEmployee,
    }).promise();

    return {
        status: 200,
        body: {
          message: 'Resource created successfully'
        }
    };
};