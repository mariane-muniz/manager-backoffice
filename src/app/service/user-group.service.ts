import { UserGroupEntity } from 'src/app/entities/user-group.entity';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

const findOneUserGroupByCode = gql`
  query($code: String) {
    findOneUserGroupByCode(code: $code) {
      code,
      name,
      active,
      users{
        code,
        name
      }
    }
}
`;

const findLastRegisters = gql`
  query {
    findLastUserGroupRegisters {
      code, name, active,
    }
  }
`;

const deleteUserGroups = gql `
  mutation($codes: [String]) {
    deleteGroups(codes: $codes)
  }
`;

const createUserGroup = gql`
    mutation($userGroupInput: UserGroupInput) {
    createGroup(userGroupInput: $userGroupInput) {
      code, name
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private apollo: Apollo) { }

  public findOneUserGroupByCode(usercode: string): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findOneUserGroupByCode,
      variables: {code: usercode},
      fetchPolicy: 'no-cache',
    });
  }

  public findLastRegisters(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findLastRegisters,
      fetchPolicy: 'no-cache',
    });
  }

  public deleteUserGroups(userGroups: UserGroupEntity[]) {
    const userGroupCodes: string[] = [];
    userGroups.forEach(userGroup => userGroupCodes.push(userGroup.code));
    return this.apollo.mutate({
      mutation: deleteUserGroups,
      variables: {
        codes: userGroupCodes
      }
    });
  }

  public createUserGroup(userGroup: UserGroupEntity) {
    return this.apollo.mutate({
      mutation: createUserGroup,
      variables: {userGroupInput: userGroup}
    });
  }
}
