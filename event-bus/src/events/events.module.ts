import { Module, HttpModule } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './services/events.service';

@Module({
  imports: [ HttpModule ],
  controllers: [ EventsController ],
  providers: [ EventsService ]
})
export class EventsModule {}
