const dom = {
  //ניווט עליון
  nav: document.querySelectorAll(".nav"),
  //ציור הפעיליות
  activities: document.getElementById("activities"),
  //מיון
  selection: document.getElementById("selection-sort"),
};

//מסובב את האייקונים ביווט העליון בעת ריחוף עם העכבר - מופיע בכל הדפים
dom.nav.forEach((element) => {
  element.onmouseover = function () {
    element.querySelector("i").classList.toggle("fa-spin");
  };

  element.onmouseleave = function () {
    element.querySelector("i").classList.remove("fa-spin");
  };
});
//מיון הפעילויות
dom.selection.onchange = () => {
 
  activities.innerHTML="";
  callActivities(drawActivities);
};
//ציור הפעילויות  לאחר קריאת שרת
const getActivity = (activity) => {
  //<div>
  const activityDiv = document.createElement("div");
  activityDiv.classList.add("activity");
  //<img>
  const img = document.createElement("img");
  img.src = `../../assets/activities/${activity.image}`;
  activityDiv.appendChild(img);
  //<div class="dataDiv">
  const dataDiv = document.createElement("div");
  dataDiv.classList.add("dataDiv");
  activityDiv.appendChild(dataDiv);
  //<h3>קהל יעד</h3>
  const h3 = document.createElement("h3");
  h3.innerHTML = activity.audience;
  dataDiv.appendChild(h3);
  //<h4>יום + תאריך</h4>
  const date = document.createElement("h4");
  date.innerHTML = activity.day + " " + activity.date;
  dataDiv.appendChild(date);
  //<p>מקום הפעילות</p>
  const place = document.createElement("p");
  place.innerHTML = activity.place;
  dataDiv.appendChild(place);
  //<p>מחיר</p>
  const price = document.createElement("p");
  price.innerHTML = "מחיר:" + activity.price + " ש''ח";
  dataDiv.appendChild(price);
  //<p>שעת פעילות + קוד פעילות</p>
  const code = document.createElement("p");
  code.innerHTML =
    "שעה:" + activity.hour + " - " + " קוד פעילות:" + activity.code;
  dataDiv.appendChild(code);
  //<div id="aroundBtn">
  //דיב המקיף את האינפוט ואת הכפתור הוספה לרשימה
  //רק בתנאי שלא נרשמו אף פעם
  if(!(localStorage.getItem(localStorage.getItem("user")+" status")=="payed")){
    const aroundBtn=document.createElement("div");
    aroundBtn.id="aroundBtn";
    dataDiv.appendChild(aroundBtn);
    //<input type="number" placeholder="הכנס כמות כרטיסים"></input>
  const amount=document.createElement("input");
  amount.type="number";
  amount.placeholder="הכנס כמות כרטיסים";
  aroundBtn.appendChild(amount);
  // מסננת קלט אם לוחצים על החיצים למעלה ולמטה באינפוט
  amount.onchange=(event)=>{
    if(!isKeynameValidOnchange(amount.value)){
    alert('מספר לא חוקי: ' + amount.value);
    amount.value=amount.value.slice(1);
    }
  }
  //מסננת קלט לאינפוט אם מקישים במקלדת
    amount.onkeydown=(event)=>{
      
        alert('יש ללחוץ בחיצים בשביל לבחור כמות');
        event.preventDefault();
     
  }
  //אינפוט כפתור הוספה לרשימת הפעילויות
  //<button id="add" placeholder="הוספה לרשימת הפעילויות"></button>
  const add=document.createElement("button");
  add.innerHTML="הוספה לרשימת הפעילויות";
  add.id="add";
  add.classList.add("btn-success");
  //הוספת אלרט האם האם אתם בטוחים שאתם רוצים להוסיף את הפעילות קורה בעת לחיצה על כפתור הוספה לרשימה
    const alertPlaceholder=document.createElement('div');
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div id="messageDiv">${message}</div>`,
        '   <button type="button" id="checkIcon" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="yes"><i class="fas fa-check" ></i></button>',
        '   <button type="button" id="timesIcon" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="no"><i class="fas fa-times" ></i></button>',
        '</div>'
      ].join('')
      alertPlaceholder.append(wrapper)
    }
    //הוספת אלרט הפעילות נוספה בהצלחה קורה בעת לחיצת כפתור וי בתוך האלרט
    const ConsfirmAlertPlaceholder=document.createElement("div");
    const ConfirmappendAlert=(message,type)=>{
      const ConfirmWrapper=document.createElement("div");
      ConfirmWrapper.innerHTML=[
        `<div class="alert alert-${type} alert-dismissile" role="alert">`,
        `<div id="orderConfirmation" >${message}</div>`,
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="forPayment">לצפיה בהזמנה/לתשלום</button>',
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="close">לסגירת החלונית</button>',
        '</div>'

      ].join('')
      ConsfirmAlertPlaceholder.append(ConfirmWrapper);
         
    }
    //בעת לחיצה על כפתור הוספת פעילות
    add.addEventListener('click', () => {
      appendAlert('? אתה בטוח שברצונך לאשר', 'success')
      const checkIcon=document.getElementById("checkIcon");
      const timesIcon=document.getElementById("timesIcon");
      checkIcon.style.color="#00ff00";
      timesIcon.style.color="#ff0000";
      //בעת לחיצה על הוי בתוך האלרט
      checkIcon.onclick=()=>{
        //שמירה בסטורג במשתנה שמורכב ממספר אשראי וקוד פעילות את הכמות שהזמינו
        if(amount.value!="")
        {
          if(localStorage.getItem(localStorage.getItem("user")+" "+activity.code)==null)
          localStorage.setItem(localStorage.getItem("user")+" "+activity.code,amount.value);
          else
          {
             const currentAmount=amount.value;
             const priviuseAmount=localStorage.getItem(localStorage.getItem("user")+" "+activity.code);
             const updateAmount=Number(currentAmount)+Number(priviuseAmount);
          localStorage.setItem(localStorage.getItem("user")+" "+activity.code,updateAmount);
          }
        }
        alertPlaceholder.innerHTML="";
        amount.value="";
        //קריאה לפונקציה היוצרת אלרט הפעילות נוספה בהצלחה
        ConfirmappendAlert('!קוד פעילות '+ activity.code+' נוסף בהצלחה','success');
        aroundBtn.appendChild(ConsfirmAlertPlaceholder);
        //אירועי הלחיצה על צפיה בתשלום או סגירת החלונית
        const forPayment=document.getElementById('forPayment');
        const close=document.getElementById('close');
           
          forPayment.onclick=() =>{
            window.location.href="../payment/payment.html";
          }
           close.onclick=()=>{
            ConsfirmAlertPlaceholder.innerHTML="";
           }
        
      }
      //אירוע הלחיצה על האיקס
      timesIcon.onclick=()=>{
        
        alertPlaceholder.innerHTML="";
        
      }
    })
    aroundBtn.appendChild(alertPlaceholder);
    aroundBtn.appendChild(add);
  }
  
  

  return activityDiv;
};
//פונקציה המקבלת רשימת פעילויות ומציירת אותם על פי המיון הנבחר
const drawActivities = (activitiesList) => {
 //מיון לפי שבוע
  if (dom.selection.value == 1) 
  {
    //כותרת שבוע 1
    const week1H1=document.createElement('h1');
    week1H1.id="H1Type";
    week1H1.innerHTML="שבוע 1";
    week1H1.classList.add("alignCenter");
    activities.appendChild(week1H1);
    const week1Div=document.createElement("div");
    activities.appendChild(week1Div);
    week1Div.id="week1";
    week1Div.classList.add("images");
    //כותרת שבוע 2
    const week2H1=document.createElement('h1');
    week2H1.id="H1Type";
    week2H1.innerHTML="שבוע 2";
    week2H1.classList.add("alignCenter");
    activities.appendChild(week2H1);
    const week2Div=document.createElement("div");
    activities.appendChild(week2Div);
    week2Div.id="week2";
    week2Div.classList.add("images");
    //כותרת שבוע 3
    const week3H1=document.createElement('h1');
    week3H1.id="H1Type";
    week3H1.innerHTML="שבוע 3";
    week3H1.classList.add("alignCenter");
    activities.appendChild(week3H1);
    const week3Div=document.createElement("div");
    activities.appendChild(week3Div);
    week3Div.id="week3";
    week3Div.classList.add("images");
    //dom
    const week1=document.getElementById("week1");
    const week2=document.getElementById("week2");
    const week3=document.getElementById("week3");
    
  }
  //מיון לפי קהל יעד -בנים/בנות
  if (dom.selection.value == 2) {
    //כותרת בנים
    const boysH1=document.createElement('h1');
    boysH1.id="H1Type";
    boysH1.innerHTML="בנים";
    boysH1.classList.add("alignCenter");
    activities.appendChild(boysH1);
    const boysDiv=document.createElement('div');
    boysDiv.id="boys";
    boysDiv.classList.add("images");
    activities.appendChild(boysDiv);
    
     //כותרת בנות
     const girlsH1=document.createElement('h1');
     girlsH1.id="H1Type";
     girlsH1.innerHTML="בנות";
     girlsH1.classList.add("alignCenter");
     activities.appendChild(girlsH1);
     const girlsDiv=document.createElement('div');
     girlsDiv.id="girls";
     girlsDiv.classList.add("images");
     activities.appendChild(girlsDiv);
     
     const boys=document.getElementById("boys");
     const girls=document.getElementById("girls");
  }
  //מיון לפי מקום הפעילות
  if(dom.selection.value==3)
  {
    //כותרת אשכול פיס
    const eshcolH1=document.createElement("h1");
    eshcolH1.id="H1Type";
    eshcolH1.innerHTML="אשכול פיס רחוב אבני נזר 59";
    eshcolH1.classList.add("alignCenter");
    activities.appendChild(eshcolH1);
    const eshcolDiv = document.createElement('div');
    eshcolDiv.id="eshcol";
    eshcolDiv.classList.add("images");
    activities.appendChild(eshcolDiv);
    //כותרת מרכז קהילתי רבי יהודה הנשיא 
    const yehudaH1=document.createElement("h1");
    yehudaH1.id="H1Type";
    yehudaH1.innerHTML="מרכז קהילתי רחוב רבי יהודה הנשיא 5";
    yehudaH1.classList.add("alignCenter");
    activities.appendChild(yehudaH1);
    const yehudaDiv = document.createElement('div');
    yehudaDiv.id="yehuda";
    yehudaDiv.classList.add("images");
    activities.appendChild(yehudaDiv);
    //כותרת מרכז קהילתי מנחת שלמה 
    const minchatH1=document.createElement("h1");
    minchatH1.id="H1Type";
    minchatH1.innerHTML="מרכז קהילתי רחוב מנחת שלמה 3";
    minchatH1.classList.add("alignCenter");
    activities.appendChild(minchatH1);
    const minchatDiv = document.createElement('div');
    minchatDiv.id="minchat";
    minchatDiv.classList.add("images");
    activities.appendChild(minchatDiv);
   //כותרת ספריה עירונית 
   const libraryH1=document.createElement("h1");
   libraryH1.id="H1Type";
   libraryH1.innerHTML="ספריה עירונית רחוב שערי תשובה 1";
   libraryH1.classList.add("alignCenter");
   activities.appendChild(libraryH1);
   const libraryDiv = document.createElement('div');
   libraryDiv.id="library";
   libraryDiv.classList.add("images");
   activities.appendChild(libraryDiv); 
   //כותרת יציאה מהעיר 
   const enteryH1=document.createElement("h1");
   enteryH1.id="H1Type";
   enteryH1.innerHTML="יציאה מהעיר";
   enteryH1.classList.add("alignCenter");
   activities.appendChild(enteryH1);
   const enteryDiv = document.createElement('div');
   enteryDiv.id="entery";
   enteryDiv.classList.add("images");
   activities.appendChild(enteryDiv); 
   //כותרת חצר תלמוד תורה דרך אמת 
   const backgroundH1=document.createElement("h1");
   backgroundH1.id="H1Type";
   backgroundH1.innerHTML="חצר תלמוד תורה דרך אמת";
   backgroundH1.classList.add("alignCenter");
   activities.appendChild(backgroundH1);
   const backgroundDiv = document.createElement('div');
   backgroundDiv.id="background";
   backgroundDiv.classList.add("images");
   activities.appendChild(backgroundDiv); 
   //dom
   const eshcol=document.getElementById("eshcol");
   const yehuda=document.getElementById("yehuda");
   const minchat = document.getElementById("minchat");
   const library =document.getElementById("library");
   const entery=document.getElementById("entery");
   const background= document.getElementById("background");
  }
  //מיון לפי יום בשבוע
  if(dom.selection.value==4){
    //כותרת יום ראשון
    const sundayH1=document.createElement("h1");
    sundayH1.id="H1Type";
    sundayH1.innerHTML="יום ראשון";
    sundayH1.classList.add("alignCenter");
    activities.appendChild(sundayH1);
    const sundayDiv=document.createElement("div");
    sundayDiv.id="sunday";
    sundayDiv.classList.add("images");
    activities.appendChild(sundayDiv);
    //כותרת יום שני
    const mondayH1=document.createElement("h1");
    mondayH1.id="H1Type";
    mondayH1.innerHTML="יום שני";
    mondayH1.classList.add("alignCenter");
    activities.appendChild(mondayH1);
    const mondayDiv=document.createElement("div");
    mondayDiv.id="monday";
    mondayDiv.classList.add("images");
    activities.appendChild(mondayDiv);
    //כותרת יום שלישי
    const tuesdayH1=document.createElement("h1");
    tuesdayH1.id="H1Type";
    tuesdayH1.innerHTML="יום שלישי";
    tuesdayH1.classList.add("alignCenter");
    activities.appendChild(tuesdayH1);
    const tuesdayDiv=document.createElement("div");
    tuesdayDiv.id="tuesday";
    tuesdayDiv.classList.add("images");
    activities.appendChild(tuesdayDiv);
     //כותרת יום רביעי
     const wednesdayH1=document.createElement("h1");
     wednesdayH1.id="H1Type";
     wednesdayH1.innerHTML="יום רביעי";
     wednesdayH1.classList.add("alignCenter");
     activities.appendChild(wednesdayH1);
     const wednesdayDiv=document.createElement("div");
     wednesdayDiv.id="wednesday";
     wednesdayDiv.classList.add("images");
     activities.appendChild(wednesdayDiv);
     //כותרת יום חמישי
     const thursdayH1=document.createElement("h1");
     thursdayH1.id="H1Type";
     thursdayH1.innerHTML="יום חמישי";
     thursdayH1.classList.add("alignCenter");
     activities.appendChild(thursdayH1);
     const thursdayDiv=document.createElement("div");
     thursdayDiv.id="thursday";
     thursdayDiv.classList.add("images");
     activities.appendChild(thursdayDiv);
     //כותרת יום שישי
     const fridayH1=document.createElement("h1");
     fridayH1.id="H1Type";
     fridayH1.innerHTML="יום שישי";
     fridayH1.classList.add("alignCenter");
     activities.appendChild(fridayH1);
     const fridayDiv=document.createElement("div");
     fridayDiv.id="friday";
     fridayDiv.classList.add("images");
     activities.appendChild(fridayDiv);
    const sunday=document.getElementById("sunday");
    const monday=document.getElementById("monday");
    const tuesday=document.getElementById("tuesday");
    const wednesday=document.getElementById("wednesday");
    const thursday=document.getElementById("thursday");
    const friday=document.getElementById("friday");
    
  }

  let previousActivity = "";

  let div = "";
  activitiesList.forEach((a) => {
    // אם יש כבר את אותה פעילות באותו יום ומקום ורק השעה שונה תוסיף עוד שורה לשליפה הקודמת ולא תשלוף את הכל מחדש
    if (
      a.audience == previousActivity.audience &&
      a.date == previousActivity.date &&
      a.day == previousActivity.day &&
      a.price == previousActivity.price &&
      a.place == previousActivity.place
    ) {
      const p = document.createElement("p");
      p.innerHTML = "שעה:" + a.hour + " - " + " קוד פעילות:" + a.code;
  const amount=document.createElement("input");
  amount.type="number";
  amount.placeholder="הכנס כמות כרטיסים";
  amount.id="amount";
 //מסננת קלט אם לוחצים על החיצים למעלה ולמטה
 amount.onchange=(event)=>{
    
  if(!isKeynameValidOnchange(amount.value)){
    
    alert('מספר לא חוקי: ' + amount.value);
   amount.value=amount.value.slice(1);
  }
  
}
//מסננת קלט אם מקישים במקלדת
  amount.onkeydown=(event)=>{
    
      alert('יש ללחוץ בחיצים בשביל לבחור כמות');
      event.preventDefault();
   
}
const add=document.createElement("button");
add.innerHTML="הוספה לרשימת הפעילויות";
add.id="add";
add.classList.add("btn-success");
//הוספת אלרט האם האם אתם בטוחים שאתם רוצים להוסיף את הפעילות קורה בעת לחיצה על כפתור הוספה לרשימה
  const alertPlaceholder=document.createElement('div');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div id="messageDiv">${message}</div>`,
      '   <button type="button" id="checkIcon" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="yes"><i class="fas fa-check"></i></button>',
      '   <button type="button"  id="timesIcon" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="no"><i class="fas fa-times"></i></button>',
      '</div>'
    ].join('')
    alertPlaceholder.append(wrapper)
  }
  //הוספת אלרט הפעילות נוספה בהצלחה קורה בעת לחיצת כפתור וי בתוך האלרט
  const ConsfirmAlertPlaceholder=document.createElement("div");
  const ConfirmappendAlert=(message,type)=>{
    const ConfirmWrapper=document.createElement("div");
    ConfirmWrapper.innerHTML=[
      `<div class="alert alert-${type} alert-dismissile" role="alert">`,
      `<div id="orderConfirmation" >${message}</div>`,
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="forPayment">לצפיה בהזמנה/לתשלום</button>',
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="close">לסגירת החלונית</button>',
      '</div>'

    ].join('')
    ConsfirmAlertPlaceholder.append(ConfirmWrapper);
       
  }
  //בעת לחיצה על כפתור הוספת פעילות
  add.addEventListener('click', () => {
    appendAlert('? אתה בטוח שברצונך לאשר', 'success')
    const checkIcon=document.getElementById("checkIcon");
    const timesIcon=document.getElementById("timesIcon");
    checkIcon.style.color="#00ff00";
    timesIcon.style.color="#ff0000";
  //בעת לחיצה על הוי בתוך האלרט  
    checkIcon.onclick=()=>{
      //שמירה בסטורג במשתנה שמורכב ממספר אשראי וקוד פעילות את הכמות שהזמינו
      if(amount.value!="")
      {
        if(localStorage.getItem(localStorage.getItem("user")+" "+a.code)==null)
        localStorage.setItem(localStorage.getItem("user")+" "+a.code,amount.value);
        else
        {
           const currentAmount=amount.value;
           const priviuseAmount=localStorage.getItem(localStorage.getItem("user")+" "+a.code);
           const updateAmount=Number(currentAmount)+Number(priviuseAmount);
        localStorage.setItem(localStorage.getItem("user")+" "+a.code,updateAmount);
        }
      }
      alertPlaceholder.innerHTML="";
      amount.value="";
      //קריאה לפונקציה היוצרת אלרט הפעילות נוספה בהצלחה
      ConfirmappendAlert('!קוד פעילות '+ a.code+' נוסף בהצלחה','success');
      
      //אירועי הלחיצה על צפיה בתשלום או סגירת החלונית
      const forPayment=document.getElementById('forPayment');
      const close=document.getElementById('close');
         
        forPayment.onclick=() =>{
          window.location.href="../payment/payment.html";
        }
         close.onclick=()=>{
          ConsfirmAlertPlaceholder.innerHTML="";
         }
    }
    //אירוע הלחיצה על האיקס
    timesIcon.onclick=()=>{
      
      alertPlaceholder.innerHTML="";
      
    }
  })
  
  
      //עובר על כל רשימת הפעילויות
      div.forEach((element) => {
      //אם כבר צוירה פעילות זהה באותו יום ובאותו מקום רק השעה והקוד שונים- להוסיף מתחת ולא לצייר מחדש
        if (
          a.audience == element.childNodes[0].innerHTML &&
          a.place == element.childNodes[2].innerHTML &&
          "מחיר:" + a.price + " ש''ח" == element.childNodes[3].innerHTML &&
          a.day + " " + a.date == element.childNodes[1].innerHTML
        ){
          element.appendChild(p);
          if(!(localStorage.getItem(localStorage.getItem("user")+" status")=="payed")){
            element.appendChild(amount);
            element.appendChild(add);
            element.appendChild(alertPlaceholder);
            element.appendChild(ConsfirmAlertPlaceholder);
          }
          
        }
          
      });
      previousActivity = a;
    }
    //אם אין את אותה פעילות באותו מקום ובאותו יום
     else {
      //אם מינו לפי שבוע
      if (dom.selection.value == 1) {
        if (a.week == 1) week1.appendChild(getActivity(a));
        if (a.week == 2) week2.appendChild(getActivity(a));
        if (a.week == 3) week3.appendChild(getActivity(a));
       
  
      }
      //אם מינו לפי קהל יעד
      if(dom.selection.value==2){
        if(a.audience.includes("בנים")||a.audience.includes("אבות"))
        boys.appendChild(getActivity(a));
        else
        girls.appendChild(getActivity(a));
      }
      //אם מינו לפי מקום פעילות
    if(dom.selection.value==3){
     
      if(a.place.includes("אשכול"))
      eshcol.appendChild(getActivity(a));
      if(a.place.includes("יהודה"))
      yehuda.appendChild(getActivity(a));
      if(a.place.includes("מנחת"))
      minchat.appendChild(getActivity(a));
      if(a.place.includes("ספריה"))
      library.appendChild(getActivity(a));
      if(a.place.includes("יציאה"))
      entery.appendChild(getActivity(a));
      if(a.place.includes("חצר"))
      background.appendChild(getActivity(a));
    }
    //אם מיינו לפי יום בשבוע
    if(dom.selection.value==4)
    {
      if(a.day.includes("ראשון"))
        sunday.appendChild(getActivity(a))
      if(a.day.includes("שני"))
      monday.appendChild(getActivity(a))
      if(a.day.includes("שלישי"))
      tuesday.appendChild(getActivity(a))
      if(a.day.includes("רביעי"))
      wednesday.appendChild(getActivity(a))
      if(a.day.includes("חמישי"))
      thursday.appendChild(getActivity(a))
      if(a.day.includes("שישי"))
      friday.appendChild(getActivity(a))
    }
      div = document.querySelectorAll(".dataDiv");
      previousActivity = a;
    }
    
  });
};
//קריאת שרת והפעלת פונקציות ציור הפעילויות
callActivities(drawActivities);
//פונקציה בשביל המסננת קלט לאינפוט לבחירת מספר פעילויות שלא יאפשר להכניס מינוס
const isKeynameValidOnchange = function(key) {
  return (key >= 1 );
      
}

