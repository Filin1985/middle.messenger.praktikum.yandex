const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();


app.use(express.static(`${__dirname}/dist/`));
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/dist/index.html'))
})

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});