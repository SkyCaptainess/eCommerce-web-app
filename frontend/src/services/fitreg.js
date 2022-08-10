export function fitreg(title){
    let s=title
    if(title.indexOf("(")!==-1 ||title.indexOf(")")!==-1||title.indexOf(".")!==-1||title.indexOf("+")!==-1||title.indexOf("*")!==-1){
        s=s.split('(').join("\\(")
        s=s.split(')').join("\\)")
        s=s.split('.').join("\\.")
        s=s.split('+').join("\\+")
        s=s.split('*').join("\\*")
    }
    return s
}