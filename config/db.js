const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');



const ConnectDB = async ()=>{


    try {
        
 await mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false} );

 console.log('Mongodb Connectd');

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }

}


module.exports =ConnectDB;
