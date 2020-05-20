import { Body, Controller, Post, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { EventsService } from './services/events.service';
import { ServiceEvent } from './models/service-event.model';

@Controller('events')
export class EventsController {

    constructor(private readonly eventsService: EventsService) {}

    @Post()
    eventRecieve(@Body() event: ServiceEvent): Observable<ServiceEvent> {
        return this.eventsService.sendEvent(event);
    }

    @Get()
    get(): Observable<ServiceEvent[]> {
        return this.eventsService.getEvents();
    }
}
