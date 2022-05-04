import { QueryFilterParam } from './query-filter.interface';

export class QueryFilter {

  public static create(queryFilter: QueryFilterParam): QueryFilterParam {
    return {
      field: queryFilter.field,
      value: queryFilter.value
    };
  }

  public static createArrayFromKeyValue(object: { [key: string]: any }): Array<QueryFilterParam> {
    const queryFilters = new Array<QueryFilterParam>();

    Object.keys(object).forEach(key => {
      if (object[key] || object[key] === false) {
        queryFilters.push(this.create({
          field: key,
          value: object[key]
        }));
      }
    });

    return queryFilters;
  }

  public static concat(queryFilter: QueryFilterParam | Array<QueryFilterParam>, currentQuery: string): string {
    let newQuery = '';

    if (Array.isArray(queryFilter)) {
      queryFilter.forEach(queryFilterItem => newQuery = this.mountQuery(queryFilterItem, currentQuery));
    } else {
      newQuery = this.mountQuery(queryFilter, currentQuery);
    }

    return newQuery;
  }

  private static mountQuery(queryFilter: QueryFilterParam, query: string): string {
    return query && !this.paramExist(query, queryFilter.field) ? `${query}&${queryFilter.field}=${queryFilter.value}` : `/${queryFilter.field}=${queryFilter.value}`;
  }

  private static paramExist(query: string, field: string): boolean {
    return query.includes(`${field}=`);
  }

}
