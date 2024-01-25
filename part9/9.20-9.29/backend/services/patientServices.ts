import Patients from "../data/patients";
import { Patient } from "../types";

const patients: Patient[] = Patients.map(patient => ({ ...patient, entries: [] }));

const getNonSensitiveEntries = (): Patient[] => {
    return patients.map(({id,name,ssn,occupation,gender,dateOfBirth,entries}) => ({
        id,
        name,
        ssn,
        occupation,
        gender,
        dateOfBirth,
        entries}));
}


export default {
    getNonSensitiveEntries
};

