import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ServiceEvent } from '../models/service-event.model';

@Injectable()
export class EventsService {
  private events: ServiceEvent[] = [];

  constructor(private httpService: HttpService) {}

  sendEvent(event: ServiceEvent): Observable<ServiceEvent> {
    this.events = [ ...this.events, event ];

    const postUrl = 'http://posts-clusterip-srv:4000/events';
    const commentUrl = 'http://comments-srv:4001/events';
    const queryUrl = 'http://query-srv:4002/events';
    const moderationUrl = 'http://moderation-srv:4003/events';
    this.httpService
      .post(postUrl, event)
      .pipe(catchError(err => of([])))
      .subscribe();
    this.httpService
      .post(commentUrl, event)
      .pipe(catchError(err => of([])))
      .subscribe();
    this.httpService
      .post(queryUrl, event)
      .pipe(catchError(err => of([])))
      .subscribe();
    this.httpService
      .post(moderationUrl, event)
      .pipe(catchError(err => of([])))
      .subscribe();
    return of(event);
  }

  getEvents(): Observable<ServiceEvent[]> {
    return of(this.events);
  }
}
