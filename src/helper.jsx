export function checkHeading(str){
    return /\*\*(.*)\*\*/.test(str);
}

export function replaceHeading(str){
    if (typeof str !== "string") return "";

    //return str.replace(/^(\*)(\*)|(\*)\$/g ,'');
    return str.replace(/^\*\s*/, '');
}