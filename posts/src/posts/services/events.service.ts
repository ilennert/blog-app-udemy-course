import { Injectable, HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServiceEvent } from '../models/service-event.model';

@Injectable()
export class EventsService {
    constructor(private httpService: HttpService) {}

    sendEvent(event: ServiceEvent): void {
        const eventUrl = 'http://event-bus-srv:4005/events';
        this.httpService.post(eventUrl, event)
            .pipe(catchError(err => of([])))
            .subscribe();
    }
}
