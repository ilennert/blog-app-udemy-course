import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller('events')
export class EventsController {

    @Post()
    getEvent(@Body() event): Observable<any> {
        console.log('Recieved Event', event.type);
        return event;
    }
}
