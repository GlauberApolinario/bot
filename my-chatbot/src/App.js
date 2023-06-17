import "./App.css"
import axios from "axios"
import { useState } from "react";

function App() {
  const [answer, setAnswer] = useState(" ");
  
  const client = axios.create({headers: {Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}`}});

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {

      const params = {
        model: "text-davinci-003",
        prompt: e.target.value,
        max_tokens: 56,
        temperature: 0,
      }
      client
        .post("https://api.openai.com/v1/completions", params)
        .then((result) => setAnswer(result.data.choices[0].text))
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="App">
      {/* <h1>Olá Mundo</h1> */}
      
      <textarea className="answer-box" id="answer-box" value={answer}></textarea>
      <textarea className="text-box" id="text-box" placeholder="Digite a pergunta" onKeyDown={(e) => handleSubmit(e)}></textarea>
    </div>
  );
}

export default App;
