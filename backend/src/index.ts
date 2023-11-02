import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import router from "./routes"
import * as cors from "cors"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(cors(
        {
            origin: "*",
        }
    ))

    // register express routes from defined application rou

    // setup express app here
    // ...

    app.use("/", router)
  
    

    // start express server
    app.listen(3000)

    // insert new users for test

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
