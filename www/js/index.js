var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
app.initialize();
function validar()
{
    var expediente=$("#txt_expediente").prop("value");
    if(expediente.length>0)
    {
        $.post("",{

        },function(data){

        });
    }else{
        swal("Campo vacio!!!","Ingrese un número de expediente válido.","warning");
    }
}
function informacion()
{
    swal("Dot Redes","Información de dot redes","success");
}
