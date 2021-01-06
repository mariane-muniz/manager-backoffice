import { ActionFlowEntity } from './../entities/action-flow.entity';
import { gql, QueryRef, Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

const findOneActionFlowByCode = gql `
  query($code: String){
    findOneActionFlowByCode(code: $code) {
      code,
      name,
      userGroups{
        code,
        name
      },
      approvalGroups{
        code,
        name
      },
      feature{
        code
      }
    }
  }
`;

const findLastActionFlowRegisters = gql `
  query{
      findLastActionFlowRegisters {
        code,
        name
      }
    }
`;

const registerActionFlow = gql `
  mutation($actionFlow: ActionFlowInput) {
    registerActionFlow(actionFlow: $actionFlow){
      code
    }
  }
`;

const deleteActionFlow = gql `
  mutation($codes: [String]) {
    deleteActionFlow(codes: $codes)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ActionFlowService {

  constructor(private apollo: Apollo) { }

  public findOneActionFlowByCode(actionFlowCode: string): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findOneActionFlowByCode,
      variables: {code: actionFlowCode},
      fetchPolicy: 'network-only'
    });
  }

  public registerActionFlow(actionFlowInput: ActionFlowEntity) {
    return this.apollo.mutate({
      mutation: registerActionFlow,
      variables: {actionFlow: actionFlowInput}
    });
  }

  public findLastActionFlowRegisters(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findLastActionFlowRegisters,
      fetchPolicy: 'network-only'
    });
  }

  public deleteActionFlow(actionFlowList: ActionFlowEntity[]) {
    const actionFlowCodes: string[] = [];
    actionFlowList.forEach(actionFlow => actionFlowCodes.push(actionFlow.code));
    return this.apollo.mutate({
      mutation: deleteActionFlow,
      variables: {codes: actionFlowCodes}
    });
  }
}
