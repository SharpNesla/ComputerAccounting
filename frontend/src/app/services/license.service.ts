import {Injectable} from '@angular/core';
import {EntityServiceBase, keysToSnake, keysToCamel, PackEntityService} from "./entity-service-base";
import {License} from "../entities/license";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChartableByDate, ChartResult, DateSlice} from "../analytics/countable-by-subsidiary";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LicenseService extends PackEntityService<License> implements ChartableByDate {
  constructor(httpClient: HttpClient) {
    super(httpClient, "license");
  }

  protected prepareEntity(entity: License): License {
    entity.ApplySoftwareTypeId = entity.ApplySoftwareType.Id;

    entity.ApplySoftwareType = undefined;

    return super.prepareEntity(entity);
  }

  protected prepareEntityRange(entity: License): License {
    return super.prepareEntity(entity);
  }

  public getApplicable(searchString: string,
                       offset: number,
                       limit: number,
                       filterDefinition: object): Observable<License[]> {
    let params = new HttpParams()
      .set("offset", offset.toString())
      .set("limit", limit.toString())
      .set("filter", JSON.stringify(keysToSnake(filterDefinition)));

    if (searchString) {
      params = params.set('search', searchString);
    }

    return this.client.get<License[]>(`api/${this.entityPrefix}/get`, {params})
      .pipe(map(x => x.map(y => keysToCamel(y))));
  }

  getChartResultByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): ChartResult {
    return undefined;
  }
}
