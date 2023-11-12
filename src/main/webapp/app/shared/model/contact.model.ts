import { IProject } from 'app/shared/model/project.model';
import { IProgress } from 'app/shared/model/progress.model';

export interface IContact {
  id?: number;
  name?: string | null;
  lastName?: string | null;
  company?: string | null;
  address?: string | null;
  phone?: number | null;
  email?: string | null;
  role?: string | null;
  notes?: string | null;
  project?: IProject | null;
  progress?: IProgress | null;
}

export const defaultValue: Readonly<IContact> = {};
