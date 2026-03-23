import { useState } from 'react'
import './App.css'
import { URL } from './constants';
import Answer from './components/answers';

function App() {
  const[question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents" :[
      {
      "parts" : [{"text" : question}]
     }
   ]
  };

  const askQuestion = async() => {
    let response = await fetch(URL, {
        method:"POST" , 
       body : JSON.stringify(payload)
    });

    response = await response.json();

    if(!response.candidates){
      setResult(["limit reached . Try again later"]);
      return;
    }

    let data = response.candidates[0].content.parts[0].text;
    data = data.split("\n");
    data = data.map((item) =>
      item.trim()
    )

    console.log(data);
    setResult(data);
  }

  return (

    <>
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-zinc-800 text-white p-4'>
           <h1>hello</h1>
        </div>
        <div className='col-span-4 p-10 mx-15'>
            <div className='container h-140 overflow-y-auto overflow-x-hidden'>
              <div className='text-zinc-300 break-words'>
             
                {
                  result && result.map((item , index) => {
                    return(
                   <li key = {index} className='text-justify p-2'>
                    <Answer ans = {item} totalResult = {result.length} index={index}/>
                    </li> 
                    )
                 })
            }  
        
              </div>
            </div>
            <div className='bg-zinc-800 w-[90%] text-white p-2 pr-5 m-auto rounded-4xl border border-zinc-700 items-center flex mt-5 px-8'>
                <input type='text'value= {question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-2 outline-none' placeholder='ask me anything...' />
                <button onClick={askQuestion}>send</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default App;
