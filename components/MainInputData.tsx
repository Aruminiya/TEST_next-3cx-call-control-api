'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { mainActions } from '../store/slices/mainSlice';

export default function MainInputData() {
  const mainState = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();
  
  return (
    <div>
     <input 
        type="text" 
        placeholder="Dnnumber" 
        value={mainState.dnnumber || ''} 
        onChange={(e) => dispatch(mainActions.setDnnumber(e.target.value))} 
      />
      <input 
        type="text" 
        placeholder="Destination" 
        value={mainState.id || ''} 
        onChange={(e) => dispatch(mainActions.setId(e.target.value))} 
      />
      <br/>
      <p>ParticipantId: {mainState.participantId}</p>
    </div>
  );
}