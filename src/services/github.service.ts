import { NotFoundException } from '@nestjs/common';

import {
  DateAndTime,
  daysBetweenDates,
  getZuluDateAndTime,
} from 'helpers/dates';
import { Lib } from 'entities/lib.entity';
import githubApi from './external.api';

export class GithubService {
  public async findByRepository(repository: string): Promise<Lib> {
    try {
      const { data } = await githubApi.get(`/repos/${repository}`);

      const { full_name, description, open_issues, events_url } = data;

      const lib = {
        name: full_name,
        description,
        issues: open_issues,
      } as Lib;

      return await this.findEvents(events_url, lib);
    } catch (error) {
      throw new NotFoundException(`Repository '${repository}' was not found`);
    }
  }

  private async findEvents(eventsUrl: string, lib: Lib): Promise<Lib> {
    try {
      const { data } = await githubApi.get(eventsUrl);

      const now = getZuluDateAndTime(new Date());

      const avgAge = this.calculateAvgAge(now, data);

      return {
        ...lib,
        avgAge,
        stdAge: 0,
      } as Lib;
    } catch (error) {
      throw new NotFoundException(`Event '${eventsUrl}' was not found`);
    }
  }

  private calculateAvgAge(now: DateAndTime, data: Array<any>): number {
    let daysOpened = 0;

    data.forEach(element => {
      const createdAt = getZuluDateAndTime(element.created_at);
      const days = daysBetweenDates(createdAt.dateTime, now.dateTime);
      daysOpened += days;
    });

    return daysOpened / data.length;
  }
}
