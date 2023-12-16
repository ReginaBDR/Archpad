import { IContact } from 'app/shared/model/contact.model';
import { IProject } from 'app/shared/model/project.model';

export interface IProgress {
  id?: number;
  notes?: string | null;
  link?: string | null;
  contact?: IContact | null;
  project?: IProject | null;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
}

export const defaultValue: Readonly<IProgress> = {};
