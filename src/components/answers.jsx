import { useEffect , useState } from "react";
import { checkHeading, replaceHeading } from "../helper";

const Answer = ({ans , index, totalResult})=>{
    
    const [Heading , setHeading] = useState(false);
    const [answer , setAnswer] = useState(ans);

    useEffect(() =>{
        if(checkHeading(ans)){
            setHeading(true);
            setAnswer(replaceHeading(ans));
        }
    } , [ans]);

//   function checkHeading(str){
//     return /(\*)(\*)(.*)\*$/.test(str);
// }

//   function replaceHeading(str){
//     return str.replace(/^\*\s*/, '');
// }

// if (ans.startsWith("####")) {
//   return (
//     <div className="font-bold text-lg">
//       {ans.replace(/^####\s*/, "")}
//     </div>
//   );
// }

 if (ans.startsWith("#")) {
        return (
            <div className="font-bold text-lg">
                {ans.replace(/^#+\s*/, "")}
            </div>
        );
    }


    return(
        <div>
            <>{
              //index == 0 && totalResult > 1?<span className="pt-2 block text-white">{answer}</span>:
               Heading?<span className = "block text-md text-zinc-300" > {answer
                   .split(/\*\*(.*?)\*\*/)
                    .map((part, i) =>
                     i % 2 === 1
                     ? <span key={i} className="font-bold">{part}</span>
                     : part
                       )

                } </span> 
                : <span >{answer}</span>}
            </>
        </div>
    )
}


export default Answer;