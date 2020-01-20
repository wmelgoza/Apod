var apod = {
    //Create a random date
randomDate: function(start, end) {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();
  
    //Change the month and day strings so that they match the documented format.
    if(m < 10){
      m = '0'+m
    }
  
    if(d < 10){
      d = '0'+d
    }
  
    return `${y}-${m}-${d}`;
  },
    // Application Constructor
  //Injects the results of the API call into the DOM
buildDOM: function(result) {
console.log(result)
 document.querySelector("#apodTitle").innerText = result.title;

  if(result.media_type === 'video') {
   let img = document.querySelector("#apodImage");
   img.style.display = 'none';

   let vid = document.querySelector("#apodVideo > iframe");
   vid.src = result.url;
   img.style.display = 'block';
   //.attr("src", result.url)
   //.show();
  }else{
   let vid = document.querySelector("#apodVideo");
   vid.style.display = 'none' 
   
   let img = document.querySelector("#apodImage");
   img.src = result.url;
   img.style.display = 'block';
  }

  let copy = document.querySelector("#apodCopyright");
  copy.innerText = "Copyright: " + result.copyright;

  let apodDate = document.querySelector("#apodDate");
  apodDate.innerText = "Date: " + result.date;

  let desc = document.querySelector("#apodDesc");
  desc.innerText = result.explanation;
},

//Executes an AJAX call to an API.
getRequest: function() {
  let _this = this;
  let date = this.randomDate(new Date(1995, 5, 16), new Date());
  let url = "https://api.nasa.gov/planetary/apod?api_key=Ygsqgv5DQvcBlavdrJYcosQRilJVC8pWuMO0vB9g&date=" + date;

  var oReq = new XMLHttpRequest();

  oReq.addEventListener("load", ()=>{

 // console.log(oReq.response);
 let result = JSON.parse(oReq.response);

 console.log(result);
 _this.buildDOM(result);

  });

oReq.open("GET", url);
oReq.send();
  /*$.ajax({
      url: url
  }).done(function(result){
      _this.buildDOM(result);
  }).fail(function(result){
    console.log(result);
  });*/
},

// Initialization method.
init: function() {
  this.getRequest();
},
};
apod.init();

/* https://learn.jquery.com/using-jquery-core/document-ready/ */

  document.querySelector('#btnRandApod')
  .addEventListener('click',function(){
      apod.getRequest();
});