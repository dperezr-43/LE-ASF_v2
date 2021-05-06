$(document).ready(function () {


    document.title = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Elegir Archivo\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
    //pVerDoc

    $(function () {
        $(document).tooltip();
    });

    $("#HDEvent_Boton").val(0);
    $("#HDRefresh").val(0);
    $("#diag-load").hide();

    //$("#btnRegresar_2").button({
    //    icons: {
    //        primary: "ui-icon ui-icon-folder-open"
    //    }
    //});

    //$("#imb_regresar").click(function () {
    //    Regresar();
    //});

    $("#HDActivo_Regresar").val(0);


    $("#fileselected").on("change", function (e) {



        $("#HDRefresh").val(1);

        $("#divControlPopupFondo").height($(document).height());
        $("#divControlPopupFondo").show();
        //$("#diag-load").dialog({
        //    dialogClass: "no-close",
        //    resizable: false,
        //    height: "auto",
        //    modal: true
        //});

        var _oFecha = this.files[0].lastModifiedDate;

        var _sDia = (_oFecha.getDate() <= 9 ? "0" + _oFecha.getDate() : _oFecha.getDate());
        var _sMes = ((_oFecha.getMonth() + 1) <= 9 ? "0" + (_oFecha.getMonth() + 1) : (_oFecha.getMonth() + 1));

        $("#HDFechaModificacion").val(_sDia + "/" + _sMes + "/" + _oFecha.getFullYear());

        __doPostBack('btnPostBack', '');
    }
    );

    $(document).ajaxStart(function () {
        $("#divControlPopupFondo").height($(document).height());
        $("#divControlPopupFondo").show();
    });



    $(document).ajaxStop(function () {
        $("#divControlPopupFondo").hide();
    });


    window.onbeforeunload = function (event) {

        var vReturnValue = new Object();
        //var Id_Disp = $("#HDDisposicion").val();

        if ($("#HDRefresh").val() == 0) {

            if ($("#HDActivo_Guardar").val() == 0) {

                vReturnValue.lblRutaDocumento = "";
                vReturnValue.HDTipo_Archivo = $("#HDTipo_Archivo").val();
                vReturnValue.HDNombreArchivo = "";
                vReturnValue.TipoAccion = "Cerrar";
                vReturnValue.FechaModificacion = $("#HDFechaModificacion").val();

                window.opener.setValue(vReturnValue);

                window.close();
            }
            else {


                vReturnValue.lblRutaDocumento = $("#lblRutaDocumento").text();
                vReturnValue.HDTipo_Archivo = $("#HDTipo_Archivo").val();
                vReturnValue.HDNombreArchivo = $("#HDNombreArchivo").val();
                vReturnValue.TipoAccion = "Guardar";
                vReturnValue.FechaModificacion = $("#HDFechaModificacion").val();

                window.opener.setValue(vReturnValue);

                window.close();
            }

        }

    };

    //$("#fileselected").click();

});


function Regresar(Opc) {

    var vReturnValue = new Object();
    if (Opc == 1) {

     /*   $("#HDEvent_Boton").val(1);*/

        vReturnValue.lblRutaDocumento = $("#lblRutaDocumento").text();
        vReturnValue.HDTipo_Archivo = $("#HDTipo_Archivo").val();
        vReturnValue.HDNombreArchivo = $("#HDNombreArchivo").val();
        vReturnValue.TipoAccion = "Guardar";
        vReturnValue.FechaModificacion = $("#HDFechaModificacion").val();

        window.opener.setValue(vReturnValue);

        window.close();


    }
    else {

        vReturnValue.lblRutaDocumento = "";
        vReturnValue.HDTipo_Archivo = $("#HDTipo_Archivo").val();
        vReturnValue.HDNombreArchivo = "";
        vReturnValue.TipoAccion = "Cerrar";
        vReturnValue.FechaModificacion = $("#HDFechaModificacion").val();

        window.opener.setValue(vReturnValue);

        window.close();

    }
    
}



