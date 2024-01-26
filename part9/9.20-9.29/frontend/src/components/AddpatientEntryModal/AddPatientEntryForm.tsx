import { SyntheticEvent, useState } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button} from '@mui/material';
import { EntryFormValues } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;

  }


const AddPatientEntryForm = ({ onSubmit, onCancel}: Props) => {
    const [diagnoses, setDiagnoses] = useState<string[]>([]);
    const [type, setType] = useState('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(Number);

    const [criteria, setCriteria] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [startDate, setSickLeaveStartDate] = useState('');
    const [endDate, setSickLeaveEndDate] = useState('');



    const addpatientEntry = (event: SyntheticEvent) => {
        if (type === 'HealthCheck'){
            event.preventDefault();
            onSubmit({
                diagnosisCodes: diagnoses,
                description,
                date,
                specialist,
                type: 'HealthCheck',
                healthCheckRating: healthCheckRating || 0
            
                });
        }
        if (type === 'Hospital'){
            event.preventDefault();
            onSubmit({
                diagnosisCodes: diagnoses,
                description,
                date,
                specialist,
                type: 'Hospital',
                discharge: {
                    date: dischargeDate,
                    criteria
                }
                });
            };
        if (type === 'OccupationalHealthcare'){
            event.preventDefault();
            onSubmit({
                diagnosisCodes: diagnoses,
                description,
                date,
                specialist,
                type: 'OccupationalHealthcare',
                employerName,
                sickLeave: {
                    startDate,
                    endDate
                }
                });
            }
        }
        if(type === 'OccupationalHealthcare'){
            return(
                <div>
                    <form onSubmit={addpatientEntry}>
                        <Grid container>
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type"
                                    onChange={({ target }) => setType(target.value)}
                                >
                                    <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
                                    <MenuItem value={'Hospital'}>Hospital</MenuItem>
                                    <MenuItem value={'OccupationalHealthcare'}>OccupationalHealthcare</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth 
                                    value={description}
                                    onChange={({ target }) => setDescription(target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date"
                                    fullWidth 
                                    value={date}
                                    onChange={({ target }) => setDate(target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Specialist"
                                    fullWidth 
                                    value={specialist}
                                    onChange={({ target }) => setSpecialist(target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Diagnoses codes"
                                    fullWidth 
                                    
                                    onChange={({ target }) => setDiagnoses(target.value.split(','))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="EmployerName"
                                    fullWidth 
                                    value={employerName}
                                    onChange={({ target }) => setEmployerName(target.value)}
                                    />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="sickleaveStartDate"
                                    fullWidth 
                                    
                                    onChange={({ target }) => setSickLeaveStartDate(target.value)}
                                    />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="sickleaveEndDate"
                                    fullWidth 
                                    
                                    onChange={({ target }) => setSickLeaveEndDate(target.value)}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">Submit</Button>
                                <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            )
        }
        if(type === 'Hospital'){
            return(
                <div>
                    <form onSubmit={addpatientEntry}>
                        <Grid container>
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type"
                                    onChange={({ target }) => setType(target.value)}
                                >
                                    <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
                                    <MenuItem value={'Hospital'}>Hospital</MenuItem>
                                    <MenuItem value={'OccupationalHealthcare'}>OccupationalHealthcare</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth 
                                    value={description}
                                    onChange={({ target }) => setDescription(target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date"
                                    fullWidth 
                                    value={date}
                                    onChange={({ target }) => setDate(target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Specialist"
                                    fullWidth 
                                    value={specialist}
                                    onChange={({ target }) => setSpecialist(target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Codes"
                                    fullWidth 
                                    
                                    onChange={({ target }) => setDiagnoses(target.value.split(','))}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="DischargeDate"
                                    fullWidth 
             
                                    onChange={({ target }) => setDischargeDate(target.value) }
                                    />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="DischargeCriteria"
                                    fullWidth 
                                 
                                    onChange={({ target }) => setCriteria(target.value)}
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">Submit</Button>
                                <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            )
        }

        if(type === 'HealthCheck'){
        return(
            <div>
                <form onSubmit={addpatientEntry}>
                    <Grid container>
                        <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={({ target }) => setType(target.value)}
                            >
                                <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
                                <MenuItem value={'Hospital'}>Hospital</MenuItem>
                                <MenuItem value={'OccupationalHealthcare'}>OccupationalHealthcare</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth 
                                value={description}
                                onChange={({ target }) => setDescription(target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                fullWidth 
                                value={date}
                                onChange={({ target }) => setDate(target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Specialist"
                                fullWidth 
                                value={specialist}
                                onChange={({ target }) => setSpecialist(target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Codes"
                                fullWidth 
                                
                                onChange={({ target }) => setDiagnoses(target.value.split(','))}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                label="HealthCheckRating"
                                fullWidth 
                                onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                            <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
        }
    
        
    
}

export default AddPatientEntryForm;
      

    

