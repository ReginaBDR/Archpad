import project from 'app/entities/project/project.reducer';
import contact from 'app/entities/contact/contact.reducer';
import file from 'app/entities/file/file.reducer';
import progress from 'app/entities/progress/progress.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  project,
  contact,
  file,
  progress,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
