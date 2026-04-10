import Answer from './answers';
const QuestionAns = ({item , index, result}) => {
           
              if(item.type === "q"){
                      return(
                        <li key = {index+Math.random()} 
                          className='ml-auto text-right dark:bg-zinc-700 dark:border-zinc-700 bg-red-100 border-red-100  border-4 p-2 rounded-tl-2xl rounded-br-2xl dark:text-white w-fit my-5 mr-2'>
                          <Answer ans = {item.text} totalResult = {1} index={index} type={item.type}/>
                        </li> 
                      )
                    }else{
                      return(
                        item.text.map((ansItem , ansIndex) => (
                          <li key = {ansIndex+Math.random()} className='text-justify p-2'>
                            <Answer ans = {ansItem} totalResult = {result.length} index={index} type={item.type}/>
                          </li>
                        ))
                      )
                    }
    
}


export default QuestionAns;