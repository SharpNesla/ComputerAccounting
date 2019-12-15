import {Injectable} from '@angular/core';
import {PackEntityService} from "./entity-service-base";
import {HttpClient} from "@angular/common/http";
import {Part, PartState} from "../entities/part";
import {CountableBySubsidiaries, CountBySubsidiaryResult} from "../analytics/chartable-by-date";
import {ChartableByDate, ChartResult, DateSlice} from "../analytics/countable-by-subsidiary";


@Injectable({
  providedIn: 'root'
})
export class PartService extends PackEntityService<Part> implements CountableBySubsidiaries, ChartableByDate {
  constructor(httpClient: HttpClient) {
    super(httpClient, "part")
  }

  protected prepareEntityRange(entity: Part): Part {

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

    return super.prepareEntityRange(entity);
  }

  protected prepareEntity(entity: Part): Part {
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

    return super.prepareEntity(entity);
  }

  getCountBySubsidiaries(filterDefinition: object): CountBySubsidiaryResult[] {
    return undefined;
  }

  getChartResultByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object): ChartResult {
    return undefined;
  }
}


