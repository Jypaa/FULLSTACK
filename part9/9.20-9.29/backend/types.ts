
export type Entry =
    | HospitalEntry
    | OcuupationalHealthcareEntry
    | HealthCheckEntry;


export enum Gender  {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}


export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries?: Entry[];
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export type OcuupationalHealthcareEntry = BaseEntry & {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
};

export type HospitalEntry = BaseEntry & {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
};

export type NonSensitivePatient = Omit<Patient, 'ssn'>;