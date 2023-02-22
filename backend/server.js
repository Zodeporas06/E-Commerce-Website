const app = require("./app.js");
const dotenv = require("dotenv");

dotenv.config({path:"backend/configurations/files.env"});

const port = process.env.PORT;

app.listen(port, () => {

    console.log("Server is working on http://localhost:" + port);
})