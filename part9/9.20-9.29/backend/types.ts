//eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;