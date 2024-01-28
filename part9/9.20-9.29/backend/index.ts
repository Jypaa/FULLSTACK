import express from 'express';
import patients from './data/patients';
import diagnoses from './data/diagnoses';
import { v4 as uuidv4 } from 'uuid';
import patientService from './services/patientServices';
uuidv4();

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const withoutLatin = diagnoses.map(diagnoses => ({ code: diagnoses.code, name: diagnoses.name }));
  res.send(withoutLatin);
})

app.get('/api/patients', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());

})

app.get('/api/patients/:id', (req, res) => {
  const  patients = patientService.getNonSensitiveEntries();
  const patient = patients.find(patient => patient.id === req.params.id);
  res.send(patient);

} 
)

app.post('/api/patients/:id/entries', (req, res) => {
  console.log(req.body);
  const patient = patients.find((patient) => patient.id === req.params.id);
  if (!patient) {
    res.status(404).send('Patient not found');
    return;
  }
  const newEntry = {
    id: uuidv4(),
    ...req.body,
  };
  if(newEntry.type === 'HealthCheck') {
    if(!newEntry.type || !newEntry.date || !newEntry.specialist) {
      res.status(400).send('Missing parameters');
      return;
    }
    if(newEntry.healthCheckRating < 0 || newEntry.healthCheckRating > 3) {
      res.status(400).send('Invalid health check rating (0-3)');
      return;
    }
  }
  if(newEntry.type === 'OccupationalHealthcare') {
    if(!newEntry.type || !newEntry.date || !newEntry.specialist || !newEntry.employerName) {
      res.status(400).send('Missing parameters');
      return;
    }
  }
  if(newEntry.type === 'Hospital') {
    if(!newEntry.type || !newEntry.date || !newEntry.specialist || !newEntry.discharge.date || !newEntry.discharge.criteria) {
      res.status(400).send('Missing parameters');
      return;
    }
    
  }

  (patient.entries as any[]).push(newEntry);
  res.send(newEntry);
});

app.post('/api/patients', (req, res) => {
  const newPatient = {
    id: uuidv4(),
    ...req.body
  }
  patients.push(newPatient);
  const {ssn, ...rest} = req.body;
  res.send(rest);
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});