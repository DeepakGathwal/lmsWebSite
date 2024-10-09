import React, { useState,createContext, useReducer, useEffect } from 'react';
import { cartItemLength } from '../lib/apis';

export const AccountContext = createContext(null);

export default function AccountProvider({ children }) {
  

  var [initalState, setInitalState] = useState(0)


  const item = async () => {
      const { data } = await cartItemLength()
      if(data != 'Login First'){
      return  data && setInitalState(data[0]?.id);}
    else return setInitalState(0);
}


  const reducer = (state, action) => {
    if (action.type === 'INCR') {
      state = state + 1;
    }
    if (state > 0 && action.type === 'DECR') {
      state = state - 1;
    }

    return state
  };

  const [state, addRemove] = useReducer(reducer, item())


  return (
    <AccountContext.Provider value={{initalState,  state, addRemove }}>
      {children}
    </AccountContext.Provider>
  );
};
