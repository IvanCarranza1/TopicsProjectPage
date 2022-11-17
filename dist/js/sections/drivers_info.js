const db = firebase.firestore();


var lockButtons=false;


function loadPage(){
      getDrivers()
  }

  function getDrivers() {
    return  firebase.database().ref('/drivers_position/').once("value").then((snapshot) => {
    renderDrivers(snapshot)
    });
  }

  function renderDrivers(snapshot){
    var table = document.getElementById("tableBody");
    var rows = ``;
    var travel_sense="Ida"
    snapshot.forEach((questionSnapshot) => {
     if(questionSnapshot.val().travel_sense==0){
      travel_sense="Ida"
     }
     else{
      travel_sense="Vuelta"
     }

     var TST = new Date(questionSnapshot.val().time_start_travel)
     var TET = new Date(questionSnapshot.val().time_end_travel)
     rows+=`
     <tr>
     <td>${questionSnapshot.val().unityID}</td>
     <td>${questionSnapshot.val().driver_name}</td>
     <td>${TST.getHours() + ":" + TST.getMinutes()}</td>
     <td>${TET.getHours() + ":" + TET.getMinutes()}</td>
     <td>${travel_sense}</td>
   </tr>
     `
    });
    table.innerHTML=rows
    showPage()
  }



function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("contentView").style.display = "block";
  }






