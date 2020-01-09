module.exports = {
    db: {
        host: '172.29.57.206',
        port: 3306,
        user: 'root',
        password: 'mind',
        database: 'ssodb'
    },
    redis: {
        host: '172.29.57.206',
        port: 6379,
        password: 'mind',
        db: 0,
        key_prefix: 'ssoapi'
    }
};