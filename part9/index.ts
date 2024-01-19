import express from 'express';
import { BMICALCULATOR } from './bmiCalculator';
import { ExerciseValues } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight); 
  const bmi = BMICALCULATOR(height, weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformatted parameters" });
  }
  else {
    res.send({
      weight,
      height,
      bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" });
  }
  else {
    res.send(ExerciseValues(daily_exercises, target));
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});