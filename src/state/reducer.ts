import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | {
          type: 'GET_PATIENT';
          payload: {
              patient: Patient;
          };
      }
    | {
          type: 'SET_DIAGNOSIS_LIST';
          payload: Diagnosis[];
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'GET_PATIENT':
            const patient: Patient = action.payload.patient;
            if (state.patient?.id === patient.id) {
                return {
                    ...state,
                };
            }
            return { ...state, patient: { ...action.payload.patient } };
        case 'SET_DIAGNOSIS_LIST':
            return { ...state, diagnoses: [...action.payload] };

        default:
            return state;
    }
};
