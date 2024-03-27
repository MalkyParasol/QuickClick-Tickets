const dom = {
    //ניווט עליון
     nav: document.querySelectorAll(".nav"),
     //ציור הפעיליות
     activities:document.getElementById("activitiesList"),
     body:document.querySelector(".body"),
     forPayment:document.getElementById("forPayment"),
     //מסננת קלט לאינפוטים
     formControl:document.querySelectorAll('.form-control'),

     confirm:document.getElementById("confirm"),
     form:document.getElementById("form"),
     enterDetails:document.getElementById("enterDetails"),
   };
   //מסובב את האייקונים בניווט העליון בעת ריחוף עם העכבר - מופיע בכל הדפים
   dom.nav.forEach((element) => {
     element.onmouseover = function () {
       
       element.querySelector("i").classList.toggle("fa-spin");
     };
   
     element.onmouseleave = function () {
       element.querySelector("i").classList.remove("fa-spin");
       
   
     };
   });
   
  
   //ציור הפעילויות  לאחר קריאת שרת
const getActivity = (activity) => {
  const activityDiv = document.createElement("div");
  activityDiv.classList.add("activity");

  const img = document.createElement("img");
  img.src = `../../assets/activities/${activity.image}`;

  activityDiv.appendChild(img);

  const dataDiv = document.createElement("div");
  dataDiv.classList.add("dataDiv");

  activityDiv.appendChild(dataDiv);

  const h3 = document.createElement("h3");
  h3.innerHTML = activity.audience;
  dataDiv.appendChild(h3);

  const date = document.createElement("h4");
  date.innerHTML = activity.day + " " + activity.date;
  dataDiv.appendChild(date);

  const place = document.createElement("p");
  place.innerHTML = activity.place;
  dataDiv.appendChild(place);

  const price = document.createElement("p");
  price.innerHTML = "מחיר:" + activity.price + " ש''ח";
  dataDiv.appendChild(price);

  const code = document.createElement("p");
  code.innerHTML =
    "שעה:" + activity.hour + " - " + " קוד פעילות:" + activity.code;
  dataDiv.appendChild(code);

  const amount=document.createElement("p");
  amount.innerHTML="כמות: "+localStorage.getItem(localStorage.getItem("user")+" "+activity.code);
  dataDiv.appendChild(amount);

  const previuosPrice=Number(localStorage.getItem("final price for: "+localStorage.getItem("user")));
  const currentPrice=Number(localStorage.getItem(localStorage.getItem("user")+" "+activity.code))*Number(activity.price)
  localStorage.setItem("final price for: "+localStorage.getItem("user"),previuosPrice+currentPrice);
  
  const cancelBtn = document.createElement("button");
  cancelBtn.innerHTML="ביטול";
  cancelBtn.id="cancleBtn";
  cancelBtn.classList.add("btn-danger");
  
  const alertPlaceholder=document.createElement('div');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div >${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="yes"><i class="fas fa-check" id="checkIcon"></i></button>',
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="no"><i class="fas fa-times" id="timesIcon"></i></button>',
      '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
  }
  cancelBtn.addEventListener('click', () => {
    appendAlert('? אתה בטוח שברצונך לבטל', 'success')
    const checkIcon=document.getElementById("checkIcon");
    const timesIcon=document.getElementById("timesIcon");
    checkIcon.style.color="#00ff00";
    timesIcon.style.color="#ff0000";

    checkIcon.onclick=()=>{
      alertPlaceholder.innerHTML="";
      localStorage.removeItem(localStorage.getItem("user")+" "+activity.code);
      dom.activities.innerHTML="";
      dom.forPayment.innerHTML="";
      callActivitiesAgain();
      
    }
    timesIcon.onclick=()=>{
      
      alertPlaceholder.innerHTML="";
    }
  })
  dataDiv.appendChild(alertPlaceholder);
  if(!(localStorage.getItem(localStorage.getItem("user")+" status")=="payed")){ 
dataDiv.appendChild(cancelBtn);
  }

  return activityDiv;


  }

  const drawActivities = (activitiesList) => {
    //הסכום לשלום
  
  localStorage.setItem("final price for: "+localStorage.getItem("user"),0)

    activitiesList.forEach((a) => {
      
      if(localStorage.getItem(localStorage.getItem("user")+" "+a.code)!=null)
      dom.activities.appendChild(getActivity(a));
     
    });
    const price=document.createElement('h1');
    price.innerHTML="לתשלום: "+localStorage.getItem("final price for: "+localStorage.getItem("user"))+" ש''ח ";
    price.id="h1";
    price.style.marginTop="20px"
    dom.forPayment.appendChild(price);

    const status=document.createElement('h1');
    status.innerHTML="שולם" +" , " +"מספר אסמכתא : "+ localStorage.getItem(localStorage.getItem("user")+" asmachta");
    status.id="h1";
    status.style.marginTop="20px";
    if(localStorage.getItem(localStorage.getItem("user")+" status")=="payed")
    dom.forPayment.appendChild(status);
  }
  callActivities(drawActivities);
callActivitiesAgain=()=>{
  callActivities(drawActivities);
}
//מסננת קלט לאיפוטים
dom.formControl.forEach(element => {
  
  element.onkeydown=(event)=>{
    
    if(!iskeyValid(event.key)){
      
      
      event.preventDefault();
    } 
  }
});
//מסננת קלט לאיפוטים
const iskeyValid = (key) =>{
  return (key>=0&&key<=9)||key=='Backspace';
}
//בעת תשלום החלפת סטטוס לשולם
dom.form.onsubmit=() =>{
  console.log("submited");
  localStorage.setItem(localStorage.getItem("user")+" status","payed");
  localStorage.setItem(localStorage.getItem("user")+" asmachta",localStorage.getItem("asmachta"));
  const num=Number(localStorage.getItem("asmachta"))+1;
  
  localStorage.setItem("asmachta",num);

  
  
  
}
if(localStorage.getItem(localStorage.getItem("user")+" status")=="payed")
{
  dom.form.innerHTML="";
  dom.enterDetails.innerHTML="";

  console.log("drawed");
  const coverWindow=document.createElement("div");
  coverWindow.id="coverWindow";
  dom.body.appendChild(coverWindow);
  
  const Window=document.createElement("div");
  Window.id="window";
  coverWindow.appendChild(Window);
  
  const icon=document.createElement('i');
  icon.classList.add("fas");
  icon.classList.add( "fa-times");
  icon.id="xBtn";
  icon.onclick=()=>{
    coverWindow.innerHTML="";
    coverWindow.id="";
  }
  Window.appendChild(icon);
  
  const success=document.createElement("h3");
  success.classList.add("text");
  success.innerHTML="! התשלום בוצע בהצלחה";
  Window.appendChild(success);
  
  const asmachta=document.createElement("h4");
  asmachta.classList.add("text");
  asmachta.innerHTML=": מספר אסמכתא";
  Window.appendChild(asmachta);
  
  const num=document.createElement("h4");
  num.classList.add("text");
  num.innerHTML=localStorage.getItem(localStorage.getItem("user")+" asmachta");
  Window.appendChild(num);
  
  const expect = document.createElement("h1");
  expect.classList.add("text");
  expect.innerHTML=" (: מחכים לכם כבר בפנים";
  Window.appendChild(expect);

  
}










