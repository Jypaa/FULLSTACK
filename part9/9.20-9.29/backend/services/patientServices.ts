
import Patients from "../data/patients";
import { NonSensitivePatient, Patient } from "../types";


const patients: Patient[] = Patients.map(patient => ({ ...patient  }));

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({id,name,ssn,occupation,gender,dateOfBirth,entries}) => ({
        id,
        name,
        ssn,
        occupation,
        gender,
        dateOfBirth,
        entries
        }));
}


export default {
    getNonSensitiveEntries
};

