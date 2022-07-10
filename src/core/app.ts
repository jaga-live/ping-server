import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify/inversify.config";
import express from 'express'

export class App {
    async start() {

        const server = new InversifyExpressServer(container)
        server.setConfig((app) => {
            app.use(express.json())
        })

        const app = server.build()
         app.listen(5000, () => {
            console.log(
            `Server is running on http://localhost:${5000}`
        )
    })
    }
}