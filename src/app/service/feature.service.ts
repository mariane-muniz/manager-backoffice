import { gql, QueryRef, Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

const findLastFeatureRegisters = gql`
  query{
    findLastFeatureRegisters{
      code,
      name
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private apollo: Apollo) { }

  findLastFeatureRegisters(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findLastFeatureRegisters,
    });
  }
}
