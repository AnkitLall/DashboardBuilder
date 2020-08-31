const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Router/api/Users');
const projectRouter = require('./Router/api/Projects');
const uri = require('./keys').mongoUri;
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Mongodb connection successful'))
.catch(err => console.log(err))

app.use('/api/users',userRouter);
app.use('/api/projects',projectRouter);

app.listen(port,() => console.log(`Server running on port ${port}`));