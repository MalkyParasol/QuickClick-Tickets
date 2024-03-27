const dom = {
    //ניווט עליון
     nav: document.querySelectorAll(".nav"),
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
   