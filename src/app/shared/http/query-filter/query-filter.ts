import { StringUtil } from '../../utils/string.util';
import { QueryFilterParam } from './query-filter.interface';

export class QueryFilter {

  private static queryFilter = '';

  public static create(queryFilter: QueryFilterParam): QueryFilterParam {
    return {
      field: queryFilter.field,
      value: queryFilter.value
    };
  }

  public static createArrayFromKeyValue(object: { [key: string]: any }): Array<QueryFilterParam> {
    const queryFilters = new Array<QueryFilterParam>();

    Object.keys(object).forEach(key => {
      let value = object[key];
      if (value && value?.startsWith('R$')) {
        value = StringUtil.removeSymbolCurrencyBr(value);
        value = StringUtil.transformCurrencyEUA(value);
      }

      if (value !== NaN && (value || value === false)) {
        queryFilters.push(this.create({
          field: key,
          value
        }));
      }
    });

    return queryFilters;
  }

  public static concat(queryFilter: QueryFilterParam | Array<QueryFilterParam>, currentQuery: string): string {
    if (currentQuery) {
      this.queryFilter = currentQuery;
    }

    if (Array.isArray(queryFilter)) {
      queryFilter.forEach(queryFilterItem => this.queryFilter = this.mountQuery(queryFilterItem, this.queryFilter));
    } else {
      this.queryFilter = this.mountQuery(queryFilter, this.queryFilter);
    }

    return this.queryFilter;
  }

  private static mountQuery(queryFilter: QueryFilterParam, currentQuery: string): string {
    return currentQuery && !this.paramExist(currentQuery, queryFilter.field) ?
      `${currentQuery}&${queryFilter.field}=${queryFilter.value}` :
      `/${queryFilter.field}=${queryFilter.value}`;
  }

  private static paramExist(currentQuery: string, field: string): boolean {
    return currentQuery.includes(`${field}=`);
  }

}
