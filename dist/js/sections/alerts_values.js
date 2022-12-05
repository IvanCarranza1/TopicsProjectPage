
var idAlerts = [];
getAlerts()

sizeNotifications = 0;

async function getAlerts() {
  try {
    const response = await db.collection("Alerts").onSnapshot((querySnapshot) => {
      setNumAlerts(querySnapshot);
    })

  } catch (error) {
    console.error(error);
  }
}

function setNumAlerts(alertsDocs) {
  dropdownNotification = document.getElementById("dropdownNotifications");

  var sizeAlerts = 0;
  let html = `<span class="dropdown-item dropdown-header">Nuevas alertas</span>`

  var date;

  alertsDocs.forEach((currentDocument) => {
    if (currentDocument.data().checked == false) {
      idAlerts.push(currentDocument.id);
      sizeAlerts++;
      const dtFormat = new Intl.DateTimeFormat('es-MX', {
        timeStyle: 'medium',
        timeStyle: 'medium'
      });

      date = dtFormat.format(new Date(currentDocument.data().time_alert_trigger * 1e3));
      html += `
      <div class="dropdown-divider"></div>
      <a class="dropdown-item">
      <div class="info-box">
      <span class="info-box-icon"><i class="fas fa-exclamation-circle"></i></span>
  
      <div class="info-box-content">
        <span class="info-box-number">${currentDocument.data().driver_name}</span>
        <span class="info-box-text">${currentDocument.data().message}</span>
        <span class="info-box-text">unidad ${currentDocument.data().unity_id}</span>
        
        <span class="progress-description">
        ${date}
        </span>
      </div>
    </div>
      </a>
            `
    }
    document.getElementById("spanNotificactions").innerHTML = sizeAlerts;
  });
  html += `<button type="button" class="btn btn-outline-info btn-block btn-flat" onclick="checkAlerts()"><i class="fa fa-trash"></i> Borrar alertas</button>`

  dropdownNotification.innerHTML = html;
}

function checkAlerts() {
  idAlerts.forEach((document) => {
    updateItem = {
      checked: true,
    };
    updateAlert(updateItem, document)
  });
}


async function updateAlert(updateItem, document){
  try {
      await db.collection("Alerts").doc(document).update(updateItem);  
  } catch (error) {
      throw new Error(error);
  }
}




