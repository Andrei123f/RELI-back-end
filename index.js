const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3200;
const usersRouter = require('./src/routes/users.route');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json
  (
    {
      result: "SUCCESS",
      message: 'Hello World 🌎!'
    }
  )
})

app.use('/user', usersRouter);

app.get('*', function(req, res){
  res.status(404).json
  (
    {
      result: "ERROR",
      message: "Resource could not be found in the server 😔."
    }
  );
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json
  (
    {
    result: "ERROR",
    message: "An unexpected error occured ❌. Error Message: " + err.message
    }
  );
  
  return;
});



app.listen(port || process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${port|| process.env.PORT}`)
});
