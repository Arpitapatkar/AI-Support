import { useEffect , useState } from "react";
import { checkHeading, replaceHeading } from "../helper";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from "react-markdown";

const Answer = ({ans , index, totalResult , type})=>{
    
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



 if (typeof ans === "string" && ans.startsWith("#")) {
        return (
            <div className="font-bold text-lg">
                {ans.replace(/^#+\s*/, "")}
            </div>
        );
    }

const renderer = {
    code({node , inline , className , children , ...props}){
         const match =  /language-(\w+)/.exec(className || '');
         return !inline && match ?(
            <SyntaxHighlighter
            {...props}
            children = {String(children).replace(/\n$/ , '')} 
            language = {match[1]}
            style={dark}
            preTag = "div"
            />
         ):(
             <code {...props} className={className}>
                {children}
             </code>
         )
    }
}

    return(
        <div>
            <>{
              //index == 0 && totalResult > 1?<span className="pt-2 block text-white">{answer}</span>:
               Heading?<span className = "block text-md dark:text-zinc-300" > {answer
                   .split(/\*\*(.*?)\*\*/)
                    .map((part, i) =>
                     i % 2 === 1
                     ? <span key={i} className="font-bold">{part}</span>
                     : part
                       )

                } </span> 
                : <span >
                   <reactMarkdown components={renderer}> {answer}</reactMarkdown></span>}
            </>
        </div>
    )
}


export default Answer;