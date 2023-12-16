import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IProgress, defaultValue } from 'app/shared/model/progress.model';

const initialState: EntityState<IProgress> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/progresses';

// Actions

export const getEntities = createAsyncThunk('progress/fetch_entity_list', async ({ page, size, sort, projectId }: IQueryParams) => {
  const requestUrl = `${apiUrl}?projectId=${projectId}&${
    sort ? `page=${page}&size=${size}&sort=${sort}&` : ''
  }cacheBuster=${new Date().getTime()}`;
  return axios.get<IProgress[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'progress/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IProgress>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'progress/create_entity',
  async (entity: IProgress, thunkAPI) => {
    const result = await axios.post<IProgress>(apiUrl, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'progress/update_entity',
  async (entity: IProgress, thunkAPI) => {
    const result = await axios.put<IProgress>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'progress/partial_update_entity',
  async (entity: IProgress, thunkAPI) => {
    const result = await axios.patch<IProgress>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'progress/delete_entity',
  async (payload: { id: string | number; projectId: string }, thunkAPI) => {
    const { id, projectId } = payload;
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IProgress>(requestUrl);
    thunkAPI.dispatch(getEntities({ projectId }));
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice

export const ProgressSlice = createEntitySlice({
  name: 'progress',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = ProgressSlice.actions;

// Reducer
export default ProgressSlice.reducer;
