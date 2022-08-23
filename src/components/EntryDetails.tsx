import { Entry } from '../types';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Container } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discrimination union member ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const style = {
        borderStyle: 'solid',
        borderColor: '#3f51b5',
        borderWidth: '2px',
        borderRadius: '10px',
        marginBottom: '10px',
    };
    switch (entry.type) {
        case 'Hospital':
            return (
                <Container style={style} maxWidth="sm">
                    <p>
                        {entry.date} {<LocalHospitalIcon fontSize="inherit" />}{' '}
                        <br />
                        <em>{entry.description}</em> <br />
                        discharged: {entry.discharge.date} <br />
                        criteria: {entry.discharge.criteria} <br />
                        diagnose by {entry.specialist}
                    </p>
                </Container>
            );
        case 'HealthCheck':
            return (
                <Container style={style} maxWidth="sm">
                    <p>
                        {entry.date} {<LocalHospitalIcon fontSize="inherit" />}{' '}
                        <br />
                        <em>{entry.description}</em> <br />
                        {entry.healthCheckRating === 0 ? (
                            <FavoriteIcon style={{ color: '#696969' }} />
                        ) : (
                            <FavoriteIcon style={{ color: 'orangered' }} />
                        )}{' '}
                        <br />
                        diagnose by {entry.specialist}
                    </p>
                </Container>
            );

        case 'OccupationalHealthcare':
            return (
                <Container style={style} maxWidth="sm">
                    <p>
                        {entry.date} {<LocalHospitalIcon fontSize="inherit" />}{' '}
                        <em>{entry.employerName}</em> <br />
                        <em>{entry.description}</em>
                        <br />
                        diagnose by {entry.specialist}
                    </p>
                </Container>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
