const User = require('./models/User');
const bcrypt = require('bcryptjs');
const sequelize = require('./conexion/db');

async function testRegister() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');

        // Test direct creation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('test123', salt);

        const user = await User.create({
            username: 'testdirect',
            email: 'testdirect@test.com',
            password: hashedPassword,
            tipo: 'admin'
        });

        console.log('User created directly:', user.toJSON());

        // Test with explicit values
        const user2 = await User.create({
            username: 'testdirect2',
            email: 'testdirect2@test.com',
            password: hashedPassword,
            tipo: 'cliente'
        });

        console.log('User created directly (cliente):', user2.toJSON());

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

testRegister();