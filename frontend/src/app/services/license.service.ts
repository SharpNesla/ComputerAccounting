import {Injectable} from '@angular/core';
import {EntityServiceBase, keysToSnake, keysToCamel, PackEntityService} from './entity-service-base';
import {LicenseExtension} from '../entities/license';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SoftwareTypeExtension} from '../entities/software-type';
import {ChartableByDate, ChartResult, DateSlice} from '../analytics/chartable-by-date';
import * as moment from 'moment';

export class LicenseChartResult {
  date: Date;
  value: { cost: number, count: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class LicenseService extends PackEntityService<LicenseExtension> implements ChartableByDate {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'license');
  }

  protected prepareEntitySave(entity: LicenseExtension): LicenseExtension {
    entity.SoftwareTypeId = entity.SoftwareType.Id;
    entity.SoftwareType = undefined;

    entity.PurchasedAt = moment(entity.PurchasedAt).format('YYYY-MM-DD hh:mm:ss').toString();
    entity.ExpiredAt = moment(entity.ExpiredAt).format('YYYY-MM-DD hh:mm:ss').toString();

    return super.prepareEntitySave(entity);
  }

  protected prepareEntityAddPack(entity: LicenseExtension): LicenseExtension {
    return this.prepareEntitySave(entity);
  }

  public getApplicable(searchString: string,
                       offset: number,
                       limit: number, type: SoftwareTypeExtension): Observable<LicenseExtension[]> {
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('for', type.Id.toString());

    if (searchString) {
      params = params.set('search', searchString);
    }

    return this.client.get<LicenseExtension[]>(`api/${this.entityPrefix}/get`, {params})
      .pipe(map(x => x.map(y => this.prepareEntityGet(y))));
  }

  protected prepareEntityGet(entity: LicenseExtension): LicenseExtension {
    entity = super.prepareEntityGet(entity);
    entity.PurchasedAt = moment((entity.PurchasedAt as string)).toDate();
    entity.ExpiredAt = moment((entity.ExpiredAt as string)).toDate();
    return entity;
  }

  getChartResultsByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): ChartResult {
    return undefined;
  }

  getChartRes(dateSlice: DateSlice, chartDateField: string, filterDefinition: object):
    Observable<LicenseChartResult[]> {
    const params = new HttpParams().set('date-slice', DateSlice.Month.toString());

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
