import { IProject } from 'app/shared/model/project.model';
import { IProgress } from 'app/shared/model/progress.model';

export interface IFile {
  id?: number;
  name?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  description?: string | null;
  project?: IProject | null;
  progress?: IProgress | null;
}

export const defaultValue: Readonly<IFile> = {};
