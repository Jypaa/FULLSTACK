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