const formatGroup = (group) => {
    delete group['UserPoolId']
    return group
}
module.exports = {
    formatGroup
}