import { UserEntity } from './../entities/user.entity';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';

const findLastUserRegisters = gql `
  query {
    findLastUserRegisters {
      code, name
    }
  }
`;

const deleteUsers = gql `
  mutation($codes: [String]) {
    deleteUsers(codes: $codes)
  }
`;

const createUser = gql`
  mutation($userInput: UserInput) {
    createUser(userInput: $userInput) {
      code, name
    }
  }
`;

const findOneUserByCode = gql`
  query($code: String) {
    findOneUserByCode(code: $code) {
      code, name
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  findOneUserByCode(userCode: string): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findOneUserByCode,
      variables: {code: userCode},
      fetchPolicy: 'no-cache',
    });
  }

  findLastUserRegisters(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findLastUserRegisters,
      fetchPolicy: 'no-cache',
    });
  }

  public deleteUsers(users: UserEntity[]) {
    const userCodes: string[] = [];
    users.forEach(userGroup => userCodes.push(userGroup.code));
    return this.apollo.mutate({
      mutation: deleteUsers,
      variables: {
        codes: userCodes
      }
    });
  }

  public createUser(user: UserEntity) {
    return this.apollo.mutate({
      mutation: createUser,
      variables: {
        userInput: user
      }
    });
  }
}
