const formatUser = (user, nameAttributes = 'Attributes') => {
    user[nameAttributes].forEach(element => {
        user[element.Name] = element.Value
    });
    delete user[nameAttributes]
    user['custom'] = {}
    for (let key in user) {
        if (key.indexOf('custom:') !== -1) {
            let key2 = key.split(':');
            key2 = key2[1]
            user.custom[key2] = user[key]
            delete user[key]
        }
    }
    return user;
}
module.exports = {
    formatUser
}