import { createConnection } from 'mysql2';
var connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'A1b2c3d4e5f6@',
    database: 'college'
})
 connection.connect((err)=>{
    if(err){
        console.log('error in db connection');
    }else{
       console.log('connected to mysql database');
    }
})

export default connection;

