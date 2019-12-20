import {Injectable} from '@angular/core';
import {EntityServiceBase, keysToSnake, keysToCamel, PackEntityService} from './entity-service-base';
import {License} from '../entities/license';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SoftwareType} from '../entities/software-type';
import {ChartableByDate, ChartResult, DateSlice} from '../analytics/chartable-by-date';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class LicenseService extends PackEntityService<License> implements ChartableByDate {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'license');
  }

  protected prepareEntitySave(entity: License): License {
    entity.SoftwareTypeId = entity.SoftwareType.Id;
    entity.SoftwareType = undefined;

    entity.PurchasedAt = moment(entity.PurchasedAt).format('YYYY-MM-DD hh:mm:ss').toString();
    entity.ExpiredAt =  moment(entity.ExpiredAt).format('YYYY-MM-DD hh:mm:ss').toString();

    return super.prepareEntitySave(entity);
  }

  protected prepareEntityAddPack(entity: License): License {
    return super.prepareEntitySave(entity);
  }

  public getApplicable(searchString: string,
                       offset: number,
                       limit: number, type: SoftwareType): Observable<License[]> {
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('for', type.Id.toString());

    if (searchString) {
      params = params.set('search', searchString);
    }

    return this.client.get<License[]>(`api/${this.entityPrefix}/get`, {params})
      .pipe(map(x => x.map(y => this.prepareEntityGet(y))));
  }

  protected prepareEntityGet(entity: License): License {
    entity = super.prepareEntityGet(entity);
    entity.PurchasedAt = moment((entity.PurchasedAt as string)).toDate();
    entity.ExpiredAt = moment((entity.ExpiredAt as string)).toDate();
    return entity;
  }

  getChartResultByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): ChartResult {
    return undefined;
  }
}
