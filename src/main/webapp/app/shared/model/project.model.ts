import { IContact } from 'app/shared/model/contact.model';
import { ProjectStatus } from 'app/shared/model/enumerations/project-status.model';

export interface IProject {
  id?: number;
  name?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  country?: string | null;
  startDate?: string | null;
  deadline?: string | null;
  status?: keyof typeof ProjectStatus | null;
  customer?: IContact | null;
}

export const defaultValue: Readonly<IProject> = {};
