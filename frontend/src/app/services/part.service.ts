import {Injectable} from '@angular/core';
import {PackEntityService} from './entity-service-base';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PartExtension, PartState} from '../entities/part';
import {CountableBySubsidiaries, CountBySubsidiaryResult} from '../analytics/countable-by-subsidiary';
import {ChartableByDate, ChartResult, DateSlice} from '../analytics/chartable-by-date';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {Observable} from 'rxjs';

export class PartChartResult {
  date: Date;
  value: { state: PartState, count: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class PartService extends PackEntityService<PartExtension> implements CountableBySubsidiaries, ChartableByDate {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'part');
  }

  protected prepareEntityAddPack(entity: PartExtension): PartExtension {

    entity.State = PartState.InStore;

    if (entity.Subsidiary) {
      entity.SubsidiaryId = entity.Subsidiary.Id;
      entity.ComputerId = null;
    }

    entity.PartTypeId = entity.PartType.Id;

    entity.ComputerId = undefined;
    entity.Computer = undefined;
    entity.PartType = undefined;
    entity.Subsidiary = undefined;

    return super.prepareEntityAddPack(entity);
  }

  protected prepareEntitySave(entity: PartExtension): PartExtension {
    if (entity.State == PartState.InComputer) {
      entity.ComputerId = entity.Computer.Id;
      entity.SubsidiaryId = null;
    } else {
      if (entity.Subsidiary) {
        entity.SubsidiaryId = entity.Subsidiary.Id;
        entity.ComputerId = null;
      }
    }

    entity.PartTypeId = entity.PartType.Id;

    entity.Computer = undefined;
    entity.PartType = undefined;
    entity.Subsidiary = undefined;

    return super.prepareEntitySave(entity);
  }

  getCountBySubsidiaries(filterDefinition: object): CountBySubsidiaryResult[] {
    return undefined;
  }

  getChartResultsByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): ChartResult {
    return undefined;
  }

  getChartRes(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): Observable<PartChartResult[]> {
    const params = new HttpParams().set('date-slice',dateSlice.toString());

    return this.client.get<any[]>(`/api/${this.entityPrefix}/get-count-by-date`, {params})
      .pipe(map(x => {
        const date = Object.keys(x);

        return date.map(object => {
          return {
            date: moment(object).toDate(),
            value: x[object]
          };
        });
      }));
  }
}


