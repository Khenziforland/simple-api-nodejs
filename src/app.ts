import express from "express"
import cors from "cors"
import formidable from "./libraries/formidable"
import routes from "./routes"

const app = express()

// * Enable Cors
app.use(cors())
app.options("*", cors())

// * Parse Json Request Body
app.use(express.json())

// * Parse urlencoded Request Body
app.use(express.urlencoded({ extended: true }))

// * Enable Formidable
app.use(formidable({
  multiples: true,
    keepExtensions: true,
  },
  null,
))

// * Api Routes
app.use("/api", routes)

// * Error Handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ status: false, message: "url tidak ditemukan" })
})

export default app