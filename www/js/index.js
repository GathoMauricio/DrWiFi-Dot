
$(document).ready(function(){
    console.log(window.localStorage.getItem("expediente"));
        if(window.localStorage.getItem("expediente") > 0)
        {
            $.post("http://dotredes.dyndns.biz:18888/dot_izzi/drwifi/load_inicio.php",{
                expediente:window.localStorage.getItem("expediente")
            },function(data){
                $("#principal").html(data);

            });
        }
});
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
        console.log(window.localStorage.getItem("expediente"));
        if(window.localStorage.getItem("expediente") > 0)
        {
            $.post("http://dotredes.dyndns.biz:18888/dot_izzi/drwifi/load_inicio.php",{
                expediente:window.localStorage.getItem("expediente")
            },function(data){
                $("#principal").html(data);
                initialize();
            });
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
app.initialize();
function validar()
{
    //if(hayConexion())
    //{

        var expediente=$("#txt_expediente").prop("value");
        var fecha=$("#txt_fecha").prop("value");
        if(expediente.length>0 && fecha.length>0)
        {
            $.post("http://dotredes.dyndns.biz:18888/dot_izzi/drwifi/validar_expediente.php",{
                expediente:expediente,fecha:fecha
            },function(data){
                if(data==0)
                {
                    swal("Expediente inválido","El expediente no existe o aún no se procesa por favor intente más tarde","warning");
                }else{

                    window.localStorage.setItem("expediente",data);
                    navigator.geolocation.getCurrentPosition(getLocation,function(e){});
                    console.log("OK "+ window.localStorage.getItem("expediente"));
                    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/drwifi/load_inicio.php",{
                    expediente:window.localStorage.getItem("expediente")
                    },function(data){
                    $("#principal").html(data);
                    });
                }
                
            });
        }else{
            swal("Campo vacio!!!","Ingrese fecha y número de expediente válido.","warning");
        }
    //}
}
function informacion()
{
    swal("Dot Redes","Información de dot redes","success");
}

function getLocation(location){
$.post("http://dotredes.dyndns.biz:18888/dot_izzi/drwifi/update_location_expediente.php",
{
expediente:window.localStorage.getItem("expediente"),
lat:location.coords.latitude,
lon:location.coords.longitude
},function(data){

});
}
function cerrarSesion()
{
    window.localStorage.clear();
    window.location="index.html";
}
function comentar()
{
    swal({
    title: "Comentar!",
    text: "Escribe algo a cerca de este servicio:",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "Ingresa el texto" },
    function(inputValue){
    if (inputValue === false) return false;
    if (inputValue === "") {
    swal.showInputError("El campo no debe estár vacio!");
    return false   }
    $.post("http://dotredes.dyndns.biz:18888/dot_izzi/drwifi/insert_comentario.php",{
        id_expediente:window.localStorage.getItem("expediente"),
        comentario:inputValue
    },function(data){
        alert(data);
        swal("OK!", "Tu comentario se ha insertado con éxito", "success"); });
       });
}