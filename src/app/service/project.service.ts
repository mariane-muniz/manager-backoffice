import { ProjectEntity } from './../entities/project.entity';
import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

const findOneByCode = gql `
  query ($code: String) {
    findOneProjectByCode(code: $code) {
      code
      name
      jiraID
      status
      priority
      approvalFlow {
        code
        name
      }
      users {
        code
        name
      }
    }
  }
`;

const deleteProjects = gql `
  mutation($codes: [String]) {
    deleteProjects(codes: $codes)
  }
`;

const createProject = gql`
  mutation($projectInput: ProjectInput) {
    createProject(projectInput: $projectInput) {
      code
    }
  }
`;

const findLastProjectRegisters = gql`
  query {
    findLastProjectRegisters {
      code,
      name,
      status,
      priority
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apollo: Apollo) { }

  public delete(projects: ProjectEntity[]) {
    const projectCodes: string[] = [];
    projects.forEach(project => projectCodes.push(project.code));
    return this.apollo.mutate({
      mutation: deleteProjects,
      variables: {
        codes: projectCodes
      }
    });
  }

  public create(project: ProjectEntity) {
    return this.apollo.mutate({
      mutation: createProject,
      variables: {projectInput: project}
    });
  }

  public findOneByCode(projectCode: string): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findOneByCode,
      variables: {code: projectCode},
      fetchPolicy: 'no-cache'
    });
  }

  public findLastProjectRegisters(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: findLastProjectRegisters,
      fetchPolicy: 'no-cache'
    });
  }
}
