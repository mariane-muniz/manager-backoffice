import { Feature } from './feature.entity';
import { UserGroupEntity } from './user-group.entity';

export class ActionFlowEntity {
  name: string;
  code: string;
  featureCode: string;
  userGroupCodes: string[];
  userGroups: UserGroupEntity[];
  approvalGroupCodes: string[];
  approvalGroups: UserGroupEntity[];
}
