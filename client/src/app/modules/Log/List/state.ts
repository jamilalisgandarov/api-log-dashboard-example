import { logService } from './service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILog } from './models';
import { RootState } from '../../../store';

interface ILogState {
    status: 'idle' | 'loading' | 'failed';
    list: ILog[];
}

const initialState:ILogState = {
    status:'idle',
    list: []
};

export const fetchLogs = createAsyncThunk(
    'logs/fetchLogs',
    async () => {
      const response = await logService.getLogs();

      return response.data;
    }
  );

export const logSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchLogs.pending,(state)=>{
            state.status ='loading';
        }).addCase(fetchLogs.fulfilled,(state,action)=>{
            state.list = action.payload;
            state.status = 'idle';
        }).addCase(fetchLogs.rejected,(state)=>{
            state.status ='failed';
        });
    }
});

export const selectLogs = (state: RootState) => state.logs;

export const logsReducer = logSlice.reducer;
