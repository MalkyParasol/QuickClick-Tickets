const dom={
    btn:document.getElementById("btn"),
    i:document.getElementById("info"),
    info:document.getElementById("info"),
}
dom.btn.onclick = () =>{
  localStorage.setItem("user",dom.i.value);
//אם זה הכניסה הראשונה או שלא בחרו שום פעילות
if(localStorage.getItem(dom.i.value)==null) 
 localStorage.setItem(dom.i.value,"");
window.location.href="../3-icon/3-icon.html";
}
//מסננת קלט לאינפוט
dom.info.onkeydown=(event)=>{
 
  if(!iskeyValid(event.key))
    event.preventDefault();
  
}
const iskeyValid = (key) =>{
  return (key>=0&&key<=9)||key=='Backspace';
}


