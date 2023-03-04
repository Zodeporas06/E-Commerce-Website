const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./configurations/database.js");

dotenv.config({path:"backend/configurations/files.env"});

connectDatabase();

//bjfsbjbjfhj
const port = process.env.PORT;

app.listen(port, () => {

    console.log("Server is working on http://localhost:" + port);
})