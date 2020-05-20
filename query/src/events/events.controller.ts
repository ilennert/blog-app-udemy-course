import { Controller, Post, Body, OnApplicationBootstrap} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventsService } from './services/events.service';
import { ServiceEvent } from 'src/models/service-event.model';

@Controller('events')
export class EventsController implements OnApplicationBootstrap {
    constructor(private readonly eventsSetvice: EventsService) {}
    onApplicationBootstrap() {
        console.log('Service Start - requesting unprocessed events');
        this.eventsSetvice.requestMissedEvents()
            .subscribe(events => {
                console.log(`Found ${events.length} Events to Process`);
                for (let event of events) {
                    console.log('Processing event:', event.type);
                    this.eventsSetvice.processEvent(event);
                }
            });
    }

    @Post()
    getEvent(@Body() event: ServiceEvent): Observable<any> {
        console.log('Recieved Event', event.type);
        return this.eventsSetvice.processEvent(event);
    }
}
