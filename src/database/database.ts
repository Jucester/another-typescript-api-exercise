import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost/api_tes';

mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log('Database connected')
}).catch( (err) => {
    console.log('Error, ', err);
})