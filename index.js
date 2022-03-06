(function(){
const port = 3005

const express = require('express');
const app = express()

const cors = require('cors');
app.use(cors());





// listen
app.listen(port,()=>{
    console.log(`i am listening on port ${port}`)
})
})()