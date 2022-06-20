import 'reflect-metadata'
import 'dotenv/config'

import { App } from './core/app';


//////Bootstrap
export async function start() {
    new App().setup()
}

start()