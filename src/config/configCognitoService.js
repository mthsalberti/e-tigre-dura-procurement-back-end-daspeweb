const AWS = require('aws-sdk');
AWS.config.update(
    {
        region: process.env.aws_region,
        /**
         * Setado no deploy a accessKeyId e secretAccessKey
         * Se quiser rodar local, execute o comando abaixo
         * serverless config credentials --stage dev --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY}
         */
        // accessKeyId: "",
        // secretAccessKey: ""
    }
);
let cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
module.exports = { 
    cognitoIdentityServiceProvider
}