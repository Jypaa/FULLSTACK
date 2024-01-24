import { useState, useEffect } from 'react'

import axios from 'axios'
import React from 'react'

interface Diaries {
  id: number
  date: string
  weather: string
  visibility: string
  comment: string
}

enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([])
  const [errormessage, setError] = useState<string | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [selectedvisibility, setSelectedvisibility] = useState<string | null>(null);
 


  useEffect(() => {
    axios.get<Diaries[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    axios
    .post('http://localhost:3000/api/diaries', {
      date: data.get('date'),
      weather: selectedWeather,
      visibility: selectedvisibility,
      comment: data.get('comment'),
    })
    .then((response) => {
      setDiaries([...diaries, response.data]);
      setSelectedWeather(null);
      setSelectedvisibility(null);
    })
    .catch((error) => {
      setError(error.response ? error.response.data : 'An error occurred');
      console.error(error);
      visibility();
    });
}

  const visibility = () => {
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }

  return (
    <div className="App">
      <div>
        <h1>Add new entry</h1>
          <div className='error'>
            {visible ?(<p>ERROR: {errormessage}</p>):(<p></p>)}
          </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
          <br />
          <label htmlFor="weather">Weather</label>
          {Object.values(Weather).map((weatherOption) => (
            <React.Fragment key={weatherOption}>
              <input
                type="radio"
                id={`weather-${weatherOption}`}
                name="weather"
                value={weatherOption}
                checked={selectedWeather === weatherOption}
                onChange={() => setSelectedWeather(weatherOption)}
              />
              <label htmlFor={`weather-${weatherOption}`}>{weatherOption}</label>

            </React.Fragment>
          ))}
          <br />
          <label htmlFor="weather">Visibility</label>
          {Object.values(Visibility).map((visibilityOption) => (
            <React.Fragment key={visibilityOption}>
              <input
                type="radio"
                id={`visibility-${visibilityOption}`}
                name="visibility"
                value={visibilityOption}
                checked={selectedvisibility === visibilityOption}
                onChange={() => setSelectedvisibility(visibilityOption)}
              />
              <label htmlFor={`visibility-${visibilityOption}`}>{visibilityOption}</label>

            </React.Fragment>
          ))}
          <br />
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" name="comment" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
        <div>
          <h1>Diary entries</h1>
          {diaries.map(diary => (
            <div key={diary.id}>
              <h3>{diary.date}</h3>
              {diary.weather}
              <br />
              {diary.visibility}
              <br />
              {diary.comment}
            </div>
          ))}
        </div>
    </div>
  )
}

export default App
