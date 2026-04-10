import { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants';
// import Answer from './components/answers';
import RecentSearch from './components/RecentSearch';
import QuestionAns from './components/QuestionAns';
//const URL = import.meta.env.VITE_API_KEY;

function App() {
  const[question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem("history")));
  const [selectedHistory , setSelectedHistory] = useState('');
  const scrollToLast = useRef();                //scroll to last answer
  const [loader ,setLoader] = useState(false);
  //const id = userID();

 

  const askQuestion = async() => {

    if(!question && !selectedHistory){
     return false;
  }

    if(loading)return; // Prevent multiple requests while one is in progress
    setLoading(true); // Set loading state to true when the request starts

  

    if(localStorage.getItem("history")){
      let history = JSON.parse(localStorage.getItem("history"));
      history = [question , ...history]
      localStorage.setItem('history' , JSON.stringify(history))
      setRecentHistory(history);
    }else{
      localStorage.setItem('history' , JSON.stringify([question]))
      setRecentHistory([question]);
    }

const payloadData  = question ? question: selectedHistory

     const payload = {
    "contents" :[
      {
      "parts" : [{"text" : payloadData}]
     }
   ]
  };

setLoader(true);


    let response = await fetch(URL, {
        method:"POST" ,
        headers:{
          "Content-Type" : "application/json"
        } ,
       body : JSON.stringify(payload)
    });

    response = await response.json();

    // if(!response.candidates){
    //   setResult((prev) => [...prev,  "limit reached . Try again later"]);
    //   setLoading(false);
    //   return;
    // }


    if(!response.candidates){
  setResult((prev) => [
    ...prev,
    { type: "a", text: ["Limit reached. Try again later"] }
  ]);
  setLoading(false);
  return;
}

    let data = response.candidates[0].content.parts[0].text;
    data = data.split("\n");
    data = data.map((item) =>
      item.trim()
    )

    //console.log(data);
    setResult([...result ,{type:"q", text: question? question : selectedHistory}, {type:"a", text: data}]);
    setLoading(false);
    setQuestion('');


   setTimeout(() =>{
     scrollToLast.current.scrollTop = scrollToLast.current.scrollHeight;
   },500)

   setLoader(false);
  }

console.log(result);
//console.log(recentHistory);



const isEnter = (event) => {
  //console.log(event.key);
  if(event.key == "Enter"){
    askQuestion();
  }
}

useEffect(() =>{
   console.log(selectedHistory);
   askQuestion();
},[selectedHistory])

// dark mode
const[darkMode , setDarkMode] = useState('dark');
useEffect(() =>{
    console.log(darkMode);
    if(darkMode == 'dark'){
       document.documentElement.classList.add('dark');
    }else{
       document.documentElement.classList.remove('dark');
    }
}, [darkMode])
// 

  return (

    <>
    <div className={darkMode == 'dark'? 'dark' : 'light'}>
      <div className='grid grid-cols-5 h-screen text-center'>

        <select onChange ={(event) => setDarkMode(event.target.value)} className='fixed dark:text-white bottom-0 p-3 dark:bg-zinc-800 border-tborder-zinc-700'>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

        <RecentSearch recentHistory = {recentHistory} 
                      setRecentHistory = {setRecentHistory} 
                      setSelectedHistory={setSelectedHistory}/>
        {/* <div className='col-span-1 bg-zinc-800 pt-4 '>
          <h1 className='text-xl text-white flex text-center justify-center'>
            <span >Recent Search</span>
           <button onClick={clearHistory} className='cursor-pointer pl-5'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#f3f3f3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
          </h1>
           <ul className='text-left overflow-auto mt-2'>
            {
              recentHistory && recentHistory.map((item) =>(
                <li onClick= {() => setSelectedHistory(item)} className='pl-6 truncate text-zinc-300 border-zinc-600 cursor-pointer hover:bg-zinc-700 hover:text-zinc-100'>
                  {item}
                </li>
              ))
            }
           </ul>
        </div> */}


        <div className='col-span-4 p-10 mx-10'>
            <h1 className='text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-violet-700'>
              Hello user , Ask me Question</h1>
         {/* <div class="w-8 h-8 border-3 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div> */}
         {
          loader?
           <div role="status">
       <svg aria-hidden="true" className="inline w-8 h-8 text-grey-300 animate-spin fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
       </svg>
        <span className="sr-only">Loading...</span>
</div>:null
         }
       
         

            <div ref = {scrollToLast} className='container h-130 overflow-auto'>
              <div className=' dark:text-zinc-300 text-zinc-900 break-words list-none'>
                {
                  result && result.map((item , index) => {
                    return(
                     <QuestionAns key = {index} item ={item} index = {index} result={result}/>
                     )
                 })
                }




                {/* <div className='text-zinc-300 break-words list-none'>
                {
                  result && result.map((item , index) => {
                    <div key={index+Math.random()} className={item.type === "q" ? 'flex justify-end' : 'flex justify-start'}>
                     {
                    item.type === "q"?
                      
                        <li key = {index+Math.random()} 
                          className='ml-auto text-right border-zinc-700 bg-zinc-700 p-3 rounded-tl-2xl text-white w-fit mb-2 mr-2'>
                          <Answer ans = {item.text} totalResult = {1} index={index}/>
                        </li> 
                      :
                      
                        item.text.map((ansItem , ansIndex) => (
                          <li key = {ansIndex+Math.random()} className='text-justify p-2'>
                            <Answer ans = {ansItem} totalResult = {result.length} index={index}/>
                          </li>
                        )
                      
                      )
                   } 
                 </div>
                }
              )}
               */}


        
              </div>
            </div>
            <div className='dark:bg-zinc-800 bg-red-100 w-[90%] dark:text-zinc-200 text-zinc-800 p-2 pr-5 m-auto rounded-4xl border border-zinc-700 items-center flex mt-5 px-8'>
                <input type='text'value= {question} 
                onKeyDown={isEnter}
                onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-2 outline-none' placeholder='ask me anything...' />
                <button onClick={askQuestion} disabled={loading}>
                  {loading ? "Loading..." : "Send"}
                </button>
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App;

