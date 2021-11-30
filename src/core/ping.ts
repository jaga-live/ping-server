import { Controller, Get } from "@nestjs/common";


@Controller()
export class Ping{


    @Get()
    ping() {
        return {
            name: "Ping",
            Version: "1.0",
            Description : "Chat App"
        }
    }


}