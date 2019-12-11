import { Injectable } from '@angular/core';
import {EntityRepository, PackEntityRepository} from "./entity-repository";
import {License} from "../entities/license";
import {HttpClient} from "@angular/common/http";
import {ChartableByDate, ChartResult, DateSlice} from "../analytics/countable-by-subsidiary";

@Injectable({
  providedIn: 'root'
})
export class LicensesService extends PackEntityRepository<License> implements ChartableByDate{
  constructor(httpClient : HttpClient){
    super(httpClient, "license");
  }

  protected prepareEntity(entity: License): License {
    return super.prepareEntity(entity);
  }

  protected prepareEntityRange(entity: License): License {
    return super.prepareEntityRange(entity);
  }

  getChartResultByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): ChartResult {
    return undefined;
  }
}
