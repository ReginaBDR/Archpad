import { IContact } from 'app/shared/model/contact.model';
import { IProject } from 'app/shared/model/project.model';

export interface IProgress {
  id?: number;
  notes?: string | null;
  link?: string | null;
  contact?: IContact | null;
  project?: IProject | null;
}

export const defaultValue: Readonly<IProgress> = {};
