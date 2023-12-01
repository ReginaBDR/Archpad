import { ProjectStatus } from 'app/shared/model/enumerations/project-status.model';

export const renderStatusTag = (tag): string => {
  switch (tag) {
    case ProjectStatus.PENDING:
      return 'gold';
    case ProjectStatus.ON_PROGRESS:
      return 'green';
    case ProjectStatus.PAUSED:
      return 'orange';
    case ProjectStatus.DELAYED:
      return 'volcano';
    case ProjectStatus.FINALIZED:
      return 'geekblue';
    default:
      'geekblue';
  }
};

export const translateStatusTag = (tag): string => {
  switch (tag) {
    case ProjectStatus.PENDING:
      return 'Pending';
    case ProjectStatus.ON_PROGRESS:
      return 'In Progress';
    case ProjectStatus.PAUSED:
      return 'Paused';
    case ProjectStatus.DELAYED:
      return 'Delayed';
    case ProjectStatus.FINALIZED:
      return 'Finalized';
    default:
      'None';
  }
};
