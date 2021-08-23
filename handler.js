'use strict';

module.exports.hello = async (event) => {
 // return {
 //   statusCode: 200,
 //   body: JSON.stringify(
//    {
//        message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//      },
//      null,
//      2
//    ),
//  };
let body, statusCode;
let { responseCross } = require('./src/helpers/utils');
try {
    let { cognitoIdentityServiceProvider } = require('./src/config/configCognitoService')
    let { formatGroup } = require('./src/helpers/formatGroup')
    let { userPoolId, groupName } = event.pathParameters;
    var params = {
        UserPoolId: userPoolId,
        GroupName: groupName
    };
    let data = await cognitoIdentityServiceProvider.getGroup(params).promise();
    data = data?.Group || {}
    data = formatGroup(data)
    body = {
        data
    }
    statusCode = 200;
} catch (error) {
    body = { error: error.message };
    statusCode = 500;
}
return responseCross({
    statusCode,
    body: JSON.stringify(body),
});

};
