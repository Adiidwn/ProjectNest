// import { Injectable } from "@nestjs/common";
// import { RmqOptions, Transport } from "@nestjs/microservices";

// @Injectable()
// export class RmqService {
//     constructor(private readonly configService: ConfigService) {

//     }
//     getOptions( queue: string, noAck = false): RmqOptions {
//         return {
//             transport: Transport.RMQ,
//             options: {
//                 urls: [this.configService.get<string>('RABBIT_MQ_URI')],
//             }
//         }
//     }
// } 