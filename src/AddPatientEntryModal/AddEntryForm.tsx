import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { DiagnosisSelection, SelectField } from './FormField';

import { HealthCheckRating, NewEntry } from '../types';

import { useStateValue } from '../state';

export type HealthOption = {
    value: HealthCheckRating;
    label: string;
};

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

enum Types {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    Occupational = 'OccupationalHealthCare',
}

export interface TypeOption {
    value: Types;
    label: string;
}

const typesOptions: TypeOption[] = [
    { value: Types.HealthCheck, label: 'Health check' },
    { value: Types.Hospital, label: 'Hospital' },
    { value: Types.Occupational, label: 'Occupational Healthcare' },
];

export const ratingOptions: HealthOption[] = [
    { value: HealthCheckRating.CriticalRisk, label: 'critical' },
    {
        value: HealthCheckRating.Healthy,
        label: 'healthy',
    },
    { value: HealthCheckRating.HighRisk, label: 'in risk' },
    { value: HealthCheckRating.LowRisk, label: 'low risk' },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                type: 'Hospital',
                discharge: {
                    date: '',
                    criteria: '',
                },
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) errors.description = requiredError;
                if (!values.date) errors.date = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                console.log(values);
                switch (values.type) {
                    case 'Hospital':
                        if (!values.discharge.date)
                            errors.dischargeDate = requiredError;
                        if (!values.discharge.criteria)
                            errors.dischargeCriteria = requiredError;
                        return errors;
                    case 'HealthCheck':
                        if (!values.healthCheckRating)
                            errors.rating = requiredError;
                        return errors;
                    case 'OccupationalHealthcare':
                        if (!values.employerName)
                            errors.employerName = requiredError;
                        if (!values.sickLeave?.startDate)
                            errors.sickLeave = requiredError;
                        if (!values.sickLeave?.endDate)
                            errors.sickLeave = requiredError;
                        return errors;
                    default:
                        errors.type = requiredError;
                        return errors;
                }
            }}
        >
            {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="entryDate"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="specialist name"
                            name="specialist"
                            component={TextField}
                        />
                        <SelectField
                            label="Type"
                            name="type"
                            options={typesOptions}
                        />

                        <Field
                            label="discharge date"
                            placeholder="YYYY-MM-DD"
                            name="dischargeDate"
                            component={TextField}
                        />

                        <Field
                            label="criteria"
                            placeholder="criteria"
                            name="dischargeCriteria"
                            component={TextField}
                        />

                        <DiagnosisSelection
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: 'left' }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: 'right',
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
