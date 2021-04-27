var _oAJAX = null;
var _oData = null;

$(document).ready(function () {

    /*$("#dvCambioEstado").hide();*/

    consultaRegDenuncias();

    $.when(_oAJAX).done(function () {

        cargaCatalogoEstado();

    });

});

function consultaRegDenuncias() {



    /*    _oData = "{_pClaveCatalogo:'" + _pClaveCatalogo + "'}";*/

    try {

        var _bDestroy = false;

        var lol2 = 0;

        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeConsultas",
            data: null,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    //$("#dvConsultaInformacion").empty();

                    var _bDestroy = false;

                    if ($.fn.DataTable.isDataTable('#tab_gvConsDenuncias')) {

                        _bDestroy = true;

                    }

                    var _bFilaAlterna = true;

                    $('#tab_gvConsDenuncias').dataTable({
                        data: data.d,
                        columns: [


                            { title: "<label style=\"font-size:10pt;width:70px;\">Calificar Estatus</label>", data: "_sCalEstatus" }, //0
                            { title: "<label style=\"font-size:10pt;width:90px;\">No. Folio</label>", data: "_sNoFolio" }, //1
                            { title: "<label style=\"font-size:10pt;width:80px;\">Tipo de Denuncia</label>", data: "_sTipoDenuncia" }, //2
                            { title: "<label style=\"font-size:10pt;width:70px;\">Fecha Denuncia</label>", data: "_sFechaDenuncia" }, //3
                            { title: "<label style=\"font-size:10pt;width:70px;\">Fecha Envío</label>", data: "_sFechaEnvio" }, //4
                            { title: "<label style=\"font-size:10pt;width:100px;\">Estatus</label>", data: "_sEstatus" }, //5
                            { title: "<label style=\"font-size:10pt;width:70px;\">Fecha Estatus</label>", data: "_sFechaEstatus" }, //6
                            { title: "<label style=\"font-size:10pt;width:90px;\">Procedencia</label>", data: "_sProcedencia" }, //7
                            { title: "<label style=\"font-size:10pt;width:90px;\">Oficio Procedencia</label>", data: "_sOficioProc" }, //8
                            { title: "<label style=\"font-size:10pt;width:100px;\">Correo</label>", data: "_sCorreo" }, //9
                            { title: "<label style=\"font-size:10pt;width:90px;\">Imprimir Denuncia</label>", data: "_sImpDenuncia" }, //10
                            { title: "<label style=\"font-size:10pt;width:90px;\">Documentos Denuncia</label>", data: "_sDocsDenuncia" }, //11


                        ],



                        "createdRow": function (row, data, index) {

                            if (_bFilaAlterna) {
                                $(row).addClass('ItemStyleClass');
                                _bFilaAlterna = false;
                            }
                            else {
                                $(row).addClass('AlternatingItemStyleClass');
                                _bFilaAlterna = true;
                            }


                            //_lPos += 1;
                        },


                        "destroy": _bDestroy,

                        "bLengthChange": true, // Paginado mediante el combo que indica cuantos registros se desean ver ***

                        "bSort": false,

                        "pageLength": 20,
                        ordering: false,
                        deferRender: true,
                        paging: true,

                        "bAutoWidth": false,

                        "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "Sin paginado"]],
                        "stripeClasses": [],

                        //scrollY: "800px",
                        //scrollX: true,
                        //scrollCollapse: true,



                    });

                    var lol = 0;


                }

                else {

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeConsultas]");
            });

    }
    catch (err) {
        alert("[cargaCP] \n" + err.message);

    }

}

function cargaCatalogoEstado()
{
    _oData = "{ _pClaveCatalogo:'A'}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeEstados",
            data: null,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#MainContent_ddlDvEstado").empty();
                    $("#MainContent_ddlEstado").empty();
                 
                    //$.each(data.d, function () {
                    //    $("#ddlDvEstado").append($("<option     />").val(this._lLlaveStatus).text(this._sDesEstatus).attr('data-img-src', this._sRutaImagen));

                    //});


                    for (var i = 0; i < 2; i++) {

                        $("#MainContent_ddlDvEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                        $("#MainContent_ddlEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                        

                        //.attr('data-img-src', "../../Imagenes/aprobar-green3.png")

                    }

                    //$("#ddlDvEstado").prop('selectedIndex', 0);

                    $(".my-select").chosen();

                }

                else {

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeEstados]");
            });

    }
    catch (err) {
        alert("[cargaCP] \n" + err.message);

    }
}

function CambiarEstado(_sFolio) {

    $("#MainContent_lblFolio").text(_sFolio);

    $("#MainContent_dvCambioEstado").dialog({
        resizable: false,
        width: 370,
        height: 400,
        modal: true,
        dialogClass: "no-close",
        //autoOpen:false,

        close: function () {


        },

        buttons: {
            "1": {
                id: 'jq_btn_adjuntar_nvo',
                click: function () {
                    OpCambiarEstatus();
                },

                class: "modal_dialog_icons",
                style: "background-image: url('../../Imagenes/guardar.png')",
                title: "Firmar"
            },

            "2": {
                id: 'jq_btn_cancela',
                click: function () {
                    $(this).dialog("close");
                },

                class: "modal_dialog_icons",
                style: "background-image: url('../../Imagenes/cancelar.png')",
                title: "Cerrar"
            },

        }


    });

}

function OpCambiarEstatus() {

}