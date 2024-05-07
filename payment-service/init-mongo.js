db = db.getSiblingDB('admin');
db.auth('root', '12345');

db = db.getSiblingDB('ecommerce');
db.createUser({
    user: 'mongo',
    pwd: 'mongo123',
    roles: [
        {
            role: 'readWrite',
            db: 'ecommerce',
        },
    ],
});

db.createCollection('payment');