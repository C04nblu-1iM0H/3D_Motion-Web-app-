export default function splittingTheName(fullname){
    const str = fullname.split(" ").slice(0, 2);
    const obj = {
        usname: str[0],
        surname: str[1]
    }
    return obj;
}