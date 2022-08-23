import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue } from '../state';
import EntryDetails from '../components/EntryDetails';
import { Button } from '@material-ui/core';
import { NewEntry } from '../types';
import AddEntryModal from '../AddPatientEntryModal';

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    if (!id) return null;

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/patients/${id}`)
            .then(({ data }: { data: Patient }) =>
                dispatch({ type: 'GET_PATIENT', payload: { patient: data } })
            )
            .catch((error) => console.error(error));
    }, [dispatch]);

    if (!patient) return null;

    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: newEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/${patient.id}/entries`,
                values
            );
            console.log(newEntry);
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || 'Unrecognized axios error');
                setError(
                    String(e?.response?.data?.error) ||
                        'Unrecognized axios error'
                );
            } else {
                console.error('Unknown error', e);
                setError('Unknown Error');
            }
        }
    };

    return (
        <div>
            <h3>
                {patient.name} {patient.gender}
            </h3>
            <p>
                ssn: {patient.ssn} <br />
                occupation: {patient.occupation}
            </p>

            <h3>entries</h3>
            {patient.entries.map((entry) => (
                <EntryDetails key={entry.id} entry={entry} />
            ))}
            <AddEntryModal
                modalOpen={modalOpen}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={submitNewEntry}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                error={error}
                onClose={closeModal}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => openModal()}
            >
                Add new entry
            </Button>
        </div>
    );
};

export default PatientPage;
