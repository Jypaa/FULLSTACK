import express from 'express';
import patients from './data/patients';
import diagnoses from './data/diagnoses';


const app = express();

// Enable CORS for all routes

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
  const withoutSSN = patients.map(patient => {
    const {ssn, ...rest} = patient;
    return rest;
  })
  res.send(withoutSSN);
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});