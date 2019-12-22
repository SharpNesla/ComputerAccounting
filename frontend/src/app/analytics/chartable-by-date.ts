export class ChartResult{
  Cost: number;
  Count : number;
  Date: string;
}

export enum DateSlice {
  Day,
  Week,
  Month,
  Year
}

export interface ChartableByDate {
  getChartResultsByDate(dateSlice: DateSlice, chartDateField: string, filterDefinition: object) : ChartResult;
}
