import { gql, QueryRef, Apollo } from 'apollo-angular';
import { ApprovalFlowEntity } from './../entities/approval-flow.entity';
import { Injectable } from '@angular/core';

const findOneApprovalFlowByCode = gql`
  query($code: String) {
    findOneApprovalFlowByCode(code: $code) {
      code,
      name,
      actionFlowList {
        code,
        name
      }
    }
  }
`;
const findLastApprovalFlowRegisters = gql`
  query {
    findLastApprovalFlowRegisters {
      code, name
    }
  }
`;

const deleteApprovalFlows = gql `
  mutation($codes: [String]) {
    deleteApprovalFlows(codes: $codes)
  }
`;

const registerApprovalFlow = gql`
  mutation($approvalFlow: ApprovalFlowInput) {
    registerApprovalFlow(approvalFlow: $approvalFlow) {
      code,
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ApprovalFlowService {

  public constructor(private apollo: Apollo) { }

  public findLastApprovalFlowRegisters(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findLastApprovalFlowRegisters,
      fetchPolicy: 'network-only'
    });
  }

  public deleteApprovalFlow(approvalFlowEntityList: ApprovalFlowEntity[]) {
    const approvalFlowCodes: string[] = [];
    approvalFlowEntityList.forEach(approvalFlow => approvalFlowCodes.push(approvalFlow.code));
    return this.apollo.mutate({
      mutation: deleteApprovalFlows,
      variables: {
        codes: approvalFlowCodes
      }
    });
  }

  public registerApprovalFlow(approvalFlowInput: ApprovalFlowEntity) {
    console.log("registerApprovalFlow", approvalFlowInput);
    return this.apollo.mutate({
      mutation: registerApprovalFlow,
      variables: {approvalFlow: approvalFlowInput}
    });
  }

  public findOneApprovalFlowByCode(approvalFlowcode: string): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findOneApprovalFlowByCode,
      variables: {code: approvalFlowcode},
      fetchPolicy: 'network-only'
    });
  }
}
