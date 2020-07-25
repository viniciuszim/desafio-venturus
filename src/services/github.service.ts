import { NotFoundException } from '@nestjs/common';
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

  public async findEvents(eventsUrl: string, lib: Lib): Promise<Lib> {
    try {
      const { data } = await githubApi.get(eventsUrl);

      console.log(data.length);

      return {
        ...lib,
        avgAge: '1d',
        stdAge: '2d',
      } as Lib;
    } catch (error) {
      throw new NotFoundException(`Event '${eventsUrl}' was not found`);
    }
  }
}
