const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');
const { request } = require('express');

const tableName = "cmp";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function consulta(data) {
    var params = {
        TableName: tableName,
        FilterExpression: "DATA_BP = :ID",
        ExpressionAttributeValues: {
            ":ID": data,
        }
    };

    try {
        const dados = await dynamodb.scan(params).promise();
        return dados.Items;
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

router.get('/', async(req, res) => {
    let data = req.query.data;
    const dado = await consulta(data, req.body);
    //console.log(dado);
    return res.send(dado);

});

module.exports = router;