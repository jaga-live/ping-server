import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'


import { di_container } from './inversify/inversify.di'
import { MongooseService } from '../database/mongo'

// import '../api/users/users.controller'
/////Configure Express Server
export class App  {
  async setup() {
    const _db = di_container.get(MongooseService)

    await _db.connect()

    const server = new InversifyExpressServer(di_container)

    server.setConfig((app) => {
      app.use(express.json())
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT}`
      )
    })
  }
}