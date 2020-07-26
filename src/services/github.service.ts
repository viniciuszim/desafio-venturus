import { NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { create, all } from 'mathjs';

import {
  DateAndTime,
  daysBetweenDates,
  getZuluDateAndTime,
} from 'helpers/dates';
import { LibDTO } from 'dtos/lib.dto';
import { IssueDTO } from 'dtos/issue.dto';
import githubApi from './external.api';

export class GithubService {
  public async findByRepository(repository: string): Promise<LibDTO> {
    try {
      const { data } = await githubApi.get(`/repos/${repository}`, {
        headers: {
          Authorization: 'token cb5d6647847be48d4f59b14953bc97ca1b039c43',
        },
      });

      const {
        id,
        name,
        full_name,
        url,
        description,
        stargazers_count,
        forks_count,
        open_issues,
        created_at,
        updated_at,
      } = data;

      const lib = plainToClass(LibDTO, {
        id,
        name,
        fullName: full_name,
        url,
        description,
        issuesUrl: `${url}/issues`,
        labelsUrl: `${url}/labels`,
        contributorsUrl: `${url}/contributors`,
        stargazersCount: stargazers_count,
        forksCount: forks_count,
        openIssues: open_issues,
        createdAt: created_at,
        updatedAt: updated_at,
        avgAge: 0,
        stdAge: 0,
      });

      lib.issues = await this.findIssues(lib);

      const now = getZuluDateAndTime(new Date());

      const avgAge = this.calculateAvgAge(now, lib.issues);
      lib.avgAge = avgAge;

      const stdAge = this.calculateStdAge(now, lib.issues);
      lib.stdAge = stdAge;

      return plainToClass(LibDTO, lib);
    } catch (error) {
      throw new NotFoundException(`Github repo '${repository}' was not found`);
    }
  }

  private async findIssues(lib: LibDTO): Promise<IssueDTO[]> {
    try {
      let page = 1;
      const perPage = 100;

      let githubIssues = [];
      const issues = [] as IssueDTO[];

      while (page === 1 || (page > 1 && githubIssues.length > 0)) {
        const { data } = await githubApi.get(
          `${lib.issuesUrl}?page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: 'token cb5d6647847be48d4f59b14953bc97ca1b039c43',
            },
          },
        );

        githubIssues = data;
        githubIssues.forEach(issue => {
          issues.push(
            plainToClass(IssueDTO, {
              ...issue,
              createdAt: issue.created_at,
              updatedAt: issue.updated_at,
              lib,
            }),
          );
        });

        page += 1;
      }

      return issues;
    } catch (error) {
      throw new NotFoundException(`Issues '${lib.issuesUrl}' was not found`);
    }
  }

  private calculateAvgAge(now: DateAndTime, issues: Array<any>): number {
    let daysOpened = 0;

    issues.forEach(element => {
      const createdAt = getZuluDateAndTime(element.createdAt);
      const days = daysBetweenDates(createdAt.dateTime, now.dateTime);
      daysOpened += days;
    });

    return parseInt(`${daysOpened / issues.length}`, 10);
  }

  private calculateStdAge(now: DateAndTime, issues: Array<any>): number {
    const dayArray = [];

    issues.forEach(element => {
      const createdAt = getZuluDateAndTime(element.createdAt);
      const days = daysBetweenDates(createdAt.dateTime, now.dateTime);
      dayArray.push(days);
    });

    const config = {};
    const math = create(all, config);

    return parseInt(`${math.std(dayArray)}`, 10);
  }
}
