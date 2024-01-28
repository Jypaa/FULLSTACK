import { SyntheticEvent, useState } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, OutlinedInput, Checkbox, ListItemText, FormControl,SelectChangeEvent} from '@mui/material';
import { Diagnosis, EntryFormValues } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    diagnoses: Array<Diagnosis>;

  }
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

const AddPatientEntryForm = ({ onSubmit, onCancel, diagnoses}: Props) => {
    
    const [inputTypeStart, setInputTypeStart] = useState('text');
    const [inputTypeEnd, setInputTypeEnd] = useState('text');
    const [diagnosesCodes, _setDiagnosesCodes] = useState(diagnoses);
    const [Patientdiagnoses, PatientsetDiagnoses] = useState<string[]>([]);
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


    const handleFocusStart = () => {
        setInputTypeStart('date');
      };
    
    const handleBlurStart = () => {
        setInputTypeStart('text');
    };
    const handleFocusEnd = () => {
        setInputTypeEnd('date');
    };
    const handleBlurEnd = () => {
        setInputTypeEnd('text');
    }

    const handleChange = (event: SelectChangeEvent<typeof Patientdiagnoses>) => {
        const {
          target: { value },
        } = event;
        PatientsetDiagnoses(
          typeof value === 'string' ? value.split(',') : value,
        );
      };


    const addpatientEntry = (event: SyntheticEvent) => {
        if (type === 'HealthCheck'){
            event.preventDefault();
            onSubmit({
                diagnosisCodes: Patientdiagnoses,
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
                diagnosisCodes: Patientdiagnoses,
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
                diagnosisCodes: Patientdiagnoses,
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
            console.log(diagnosesCodes)
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
                                
                                    type="date"
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
                            <FormControl sx={{ width: 1 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Codes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                              
                                        value={Patientdiagnoses}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Codes" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                    {diagnosesCodes.map((diagnosis) => (
                                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                                            <Checkbox checked={Patientdiagnoses.indexOf(diagnosis.code) > -1} />
                                            <ListItemText primary={diagnosis.code} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                    type={inputTypeStart}
                                    onFocus={handleFocusStart}
                                    onBlur={handleBlurStart}
                                    onChange={({ target }) => setSickLeaveStartDate(target.value)}
                                    />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="sickleaveEndDate"
                                    fullWidth 
                                    type={inputTypeEnd}
                                    onFocus={handleFocusEnd}
                                    onBlur={handleBlurEnd}
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
                                    
                                    fullWidth 
                                    type="date"
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
                            <FormControl sx={{ width: 1 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Codes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                              
                                        value={Patientdiagnoses}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Codes" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                    {diagnosesCodes.map((diagnosis) => (
                                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                                            <Checkbox checked={Patientdiagnoses.indexOf(diagnosis.code) > -1} />
                                            <ListItemText primary={diagnosis.code} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Grid>
                                <TextField
                                    label="DischargeDate"
                                    fullWidth 
                                    type={inputTypeStart}
                                    onFocus={handleFocusStart}
                                    onBlur={handleBlurStart}
                                    onChange={({ target }) => setDischargeDate(target.value) }
                                    />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="DischargeCriteria"
                                    fullWidth 
                                    type="text"
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
                            
                                fullWidth 
                                type="date"
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
                        <FormControl sx={{ width: 1 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Codes</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                              
                                        value={Patientdiagnoses}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Codes" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                    {diagnosesCodes.map((diagnosis) => (
                                        <MenuItem key={diagnosis.code} value={diagnosis.code}>
                                            <Checkbox checked={Patientdiagnoses.indexOf(diagnosis.code) > -1} />
                                            <ListItemText primary={diagnosis.code} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
      

    

