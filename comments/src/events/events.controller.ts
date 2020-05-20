import { Controller, Post, Body } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { ServiceEvent } from 'src/comments/models/service-event.model';
import { EventsService } from 'src/comments/services/events.service';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post()
    getEvent(@Body() event: ServiceEvent): Observable<ServiceEvent> {
        console.log('Recieved Event', event.type);
        return this.eventsService.processEvent(event);
    }
}
