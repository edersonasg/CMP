/////////////   INICIO API /////////////////////////////////////
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { AwsConfig } = require('../credentials/dynamodb');
const bodyParser = require('body-parser');

const tableName = "cmp";
AWS.config.update(AwsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();


/////////////////////////////////////////////////////////////

async function criarLocacao(bodyRequest) {
    var params = {
        TableName: tableName,
        Item: bodyRequest,
    };

    try {
        await dynamodb.put(params).promise();
        return bodyRequest;
    } catch (error) {
        console.log('erro', error);
        return false;
    }
}

router.post('/', async(req, res) => {
    console.log(req.body)
    if (req.body) {
        const cadastro = await criarLocacao(req.body);
        return res.send(cadastro);
    }

    return res.status(500).json({ mensagem: "Item nao adicionado" });
});

module.exports = router;