import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL || 'mongotest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => {
    console.log('Database connected')
}).catch( (err) => {
    console.log('Error, ', err);
})