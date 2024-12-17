import { createSlice } from '@reduxjs/toolkit';
import { MainState } from '../../types';

const mainSlice = createSlice({
  name: 'main',
  initialState: { dnnumber: null, id: null, participantId: null } as MainState,
  reducers: {
    setDnnumber(state, action) {
      state.dnnumber = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setParticipantId(state, action) {
      state.participantId = action.payload;
    },
  },
});

export const mainActions = mainSlice.actions;
export default mainSlice.reducer;
