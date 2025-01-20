import React, { useReducer, createContext, ReactNode, Dispatch } from 'react';


// Define the Appointment interface to specify the structure of an appointment object

export interface Appointment {
    date: string | null;
    slot: number | null;
    name: string;
    email: string;
    phone: string;
}


// Define the AppState interface to specify the structure of the application's state
// This interface includes a single property:
// appointment: an object of type Appointment representing the current appointment details
interface AppState {
    appointment: Appointment;
}

// Define the Action type to specify the possible actions that can be dispatched to the reducer
// This type is a union of two possible action objects:
// - An action with type "SET_APPOINTMENT" and a payload containing a partial Appointment object
// - An action with type "RESET_APPOINTMENT" with no payload

type Action = 
    | { type: "SET_APPOINTMENT", payload: Partial<Appointment>}
    | { type: "RESET_APPOINTMENT"};


const initialState: AppState = {
    appointment: {
        date: null,
        slot: null,
        name: "",
        email: "",
        phone: ""
    },
};

const AppStateContext = createContext<{
    state: AppState;
    dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () =>  null});

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "SET_APPOINTMENT":
            return {
                ...state, appointment: { ...state.appointment, ...action.payload }
            };
        case "RESET_APPOINTMENT":
            return initialState;
    }
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppStateContext.Provider value = {{ state, dispatch}}>
         {children}
        </AppStateContext.Provider>
    );
    };


export const useAppState = () => React.useContext(AppStateContext);