const db = firebase.firestore();


var lockButtons=false;


function loadPage(){
      loadAdminValues()
  }

async function loadAdminValues(){

  try {
  await db.collection("Admin_Values").doc("system_values").get().then((querySnapshot) => {
          console.log(querySnapshot.data())
         setValuesData(querySnapshot);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            let htmlErrorCard = "";
            const mainContainer = document.getElementById("mainContainer");
            htmlErrorCard+=`
            <!--Grid row-->
            <div class="row d-flex justify-content-center">
              <!--Grid column-->
              <div class="col-md-9 pt-4">
                <section class="content">
                  <div class="container-fluid">
                    <div class="card text-center">
                      <div class="card-body">
                      <h3>Lo sentimos, no hay contenido para mostrar en este <br> momento :(</h3>
                      </div><!-- /.card-body -->
                    </div>
                  </div><!-- /.container-fluid -->
                </section>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
            `;
            mainContainer.innerHTML=htmlErrorCard;
        
            showPage();
      });
  } catch (error) {
      console.error(error);
  }

 }

function setValuesData(returnedValues){
  //Si la petición no devuelve nada,  indica que no hay contenido
  if(returnedValues.data==undefined){
    let htmlErrorCard = "";
    const mainContainer = document.getElementById("mainContainer");
    htmlErrorCard+=`
    <!--Grid row-->
    <div class="row d-flex justify-content-center">
      <!--Grid column-->
      <div class="col-md-9 pt-4">
        <section class="content">
          <div class="container-fluid">
            <div class="card text-center">
              <div class="card-body">
              <h3>Lo sentimos, no hay contenido para mostrar en este <br> momento :(</h3>
              </div><!-- /.card-body -->
            </div>
          </div><!-- /.container-fluid -->
        </section>
      </div>
      <!--Grid column-->
    </div>
    <!--Grid row-->
    `;
    mainContainer.innerHTML=htmlErrorCard;

    showPage();
    }
    else{
    document.getElementById("inpuTravelStimatedTime").value = returnedValues.data().travel_estimated_time
    document.getElementById("inputLimitPunishTime").value = returnedValues.data().limit_punish_time
    document.getElementById("inpuTotalTravelPunish").value = returnedValues.data().total_travel_punish
    showPage();
  }
}


function showAConfirmationlert(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Un momento...',
        text: "Por favor, revise que la infomación sea correcta antes de confirmar.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          updateSystemValuesInfo();
        } 
      })
  }

async function updateSystemValuesInfo() {
    value1 = parseInt(document.getElementById('inpuTravelStimatedTime').value);
    value2 = parseInt(document.getElementById('inputLimitPunishTime').value);
    value3 = parseInt(document.getElementById('inpuTotalTravelPunish').value);

      //Genera objeto de los datos del atributo
    updateItem = {
        travel_estimated_time: value1,
        limit_punish_time: value2,
        total_travel_punish: value3
    };
    //Actualiza los datos del atributo
    await db.collection("Admin_Values").doc("system_values").update(updateItem)

    launchToast("Valores establecidos correctamente")
   setTimeout(function () {
   window.location.reload()
   }, 1300);
  }



function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("contentView").style.display = "block";
  }

function launchToast(message) {
    var Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 10000
    });
  
    Toast.fire({
    icon: 'success',
    title: 'Éxito',
    text: message,
    //footer: '<a href="">Recargando...</a>'
    })
  }







