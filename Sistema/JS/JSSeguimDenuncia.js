var _oAJAX = null;
var _oData = null;

var _lTipoFiltro = 0;

$(document).ready(function () {

    $(function () {
        $.datepicker.setDefaults($.datepicker.regional["es"]);
        $("#MainContent_txtFechaInicio,#MainContent_txtFechaFinal").datepicker({
            
            showAnim: "slide",
            dateFormat: "dd'/'mm'/'yy",
            //minDate: "0",
            maxDate: "+0D",
            changeYear: true,
            changeMonth: true,
            onSelect: function (dateText, inst) {

                var _bInicio = false;
                var _bFinal = false;
                var valor = "";

               

                if ($("#MainContent_txtFechaInicio").length > 0) {

                    _bInicio = true;

                }

                if ($("#MainContent_txtFechaFinal").length > 0) {

                    _bFinal = true;

                }

                if (!_bInicio && !_bFinal) {
                    _lTipoFiltro = 2;
                    BuscaEnTabla('tab_gvConsDenuncias', valor, 2);
                }
                else if (_bInicio && !_bFinal) {
                    _lTipoFiltro = 2;
                    valor = $("#MainContent_txtFechaInicio").val();
                    BuscaEnTabla('tab_gvConsDenuncias', valor, 2);
                }
                else if (!_bInicio && _bFinal) {
                    _lTipoFiltro = 2;
                    valor = $("#MainContent_txtFechaFinal").val();
                    BuscaEnTabla('tab_gvConsDenuncias', valor, 2);
                }

                else if (_bInicio && _bFinal) {
                    _lTipoFiltro = 3;
                    var table = $("#tab_gvConsDenuncias").DataTable();

                    table.draw();

                }

                _lTipoFiltro = 0;
            }


        })
    });

    //$.fn.dataTable.ext.search.push(
    //    function (settings, data, dataIndex) {

    //        if (_lTipoFiltro == 3) {

    //            var dateDe = $.datepicker.parseDate("dd/mm/yy", $("#MainContent_txtFechaInicio").val());
    //            var dateA = $.datepicker.parseDate("dd/mm/yy", $("#MainContent_txtFechaFinal").val());
    //            var dateColum = $.datepicker.parseDate("dd/mm/yy", data[3]);


    //            if (dateColum >= dateDe && dateColum <= dateA) 
    //            {
    //                return true;
    //            }
    //            return false;

    //        }
    //        else {
    //            return true;
    //        }

            
    //    }
    //);

    _oAJAX = null;

    

        cargaCatalogoEstadoFilt();

        $.when(_oAJAX).done(function () {

            _oAJAX = null;

            cargaCatalogoEstadoDialog();

            $.when(_oAJAX).done(function () {

                _oAJAX = null;

                cargaCatalogoTipoDen();

                $.when(_oAJAX).done(function () {

                    _oAJAX = null;

                    consultaRegDenuncias();

                    $.when(_oAJAX).done(function () {

                        _oAJAX = null;


                        $("#MainContent_dvCambioEstado").hide();
                        $("#MainContent_dvCambioEstado, #MainContent_dvEnvioCorreo").hide();

                        $("#MainContent_ddlDvSubEstado").empty();
                        $("#MainContent_ddlDvSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                        $("#MainContent_ddlDvSubEstado").prop('selectedIndex', 0);
                        $("#MainContent_ddlDvSubEstado").prop('disabled', true);

                        $("#MainContent_ddlSubEstado").empty();
                        $("#MainContent_ddlSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                        $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                        $("#MainContent_ddlSubEstado").prop('disabled', true);

                        $("#MainContent_txtNoFolio").change(function () {

                            _lTipoFiltro = 1;

                            var valor = this.value;
                            if (valor == 0) { valor = ""; }
                            BuscaEnTabla('tab_gvConsDenuncias', valor, 1);

                            _lTipoFiltro = 0;
                        });

                        $("#MainContent_ddlTipoDenuncia").change(function () {

                            _lTipoFiltro = 4;

                            var valor = this.options.value
                            if (valor == 0) { valor = ""; }
                            BuscaEnTabla('tab_gvConsDenuncias', valor, 12);

                            _lTipoFiltro = 0;
                        });


                        $("#ddlEstado").change(function () {
                            if ($("#ddlEstado").val() == 28) {

                                _oAJAX = null;
                                cargaCatalogoSubestadoFilt();

                                _lTipoFiltro = 5;

                                var valor = this.options.value;
                                if (valor == 0) { valor = ""; }
                                BuscaEnTabla('tab_gvConsDenuncias', valor, 13);

                                _lTipoFiltro = 0;

                            }
                            else {
                                $("#MainContent_ddlSubEstado").empty();
                                $("#MainContent_ddlSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                                $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                                $("#MainContent_ddlSubEstado").prop('disabled', true);

                            }

                        });

                        $("#ddlDvEstado").change(function () {
                            if ($("#ddlDvEstado").val() == 28) {

                                _oAJAX = null;
                                cargaCatalogoSubestadoDialog();

                            }
                            else {
                                $("#MainContent_ddlDvSubEstado").empty();
                                $("#MainContent_ddlDvSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                                $("#MainContent_ddlDvSubEstado").prop('selectedIndex', 0);
                                $("#MainContent_ddlDvSubEstado").prop('disabled', true);

                            }

                        });

                        $("#MainContent_ddlSubEstado").change(function () {

                            _lTipoFiltro = 6;

                            var valor = this.options.value;
                            if (valor == 0) { valor = ""; }
                            BuscaEnTabla('tab_gvConsDenuncias', valor, 14);

                            _lTipoFiltro = 0;
                        });

                    });

                    




                });
            });

            

            

        });



});

//function buildForumEntry() {
    
//        var titleAndType = '<div><span class="forum-title">' + 'Tiulo' + '</span>' + 'Type' + '</div>';
//        var author = "<div class=\"forum-author\">By: " + 'Autor' + " on " + '00/00/0000' + "</div>";
//        var body = "<pre>" + 'dasa' + "</pre>";
//        var comment = "<div class=\"forum-comment\"> <div class=\"btn-group\"><a class=\"btn btn-mini btn-primary\" role=\"button\" data-toggle=\"modal\" id=\"btn-forum-comment\"><i class=\"icon-comment icon-white\"></i> comment</a></div></div>";
//        var footer = "<hr style=\"border-top: 1px dotted #b0b0b0;border-bottom: 0px\">";
//        var entry = titleAndType + author + body + comment + footer;
//        return entry;
    
//}

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


                            { title: "<label class=\"letraLabel longLabel1\">Calificar Estatus</label>", data: "_sCalEstatus" }, //0
                            { title: "<label class=\"letraLabel longLabel3\">No. Folio</label>", data: "_sNoFolio" }, //1
                            { title: "<label class=\"letraLabel longLabel2\">Tipo de Denuncia</label>", data: "_sTipoDenuncia" }, //2
                            { title: "<label class=\"letraLabel longLabel1\">Fecha Denuncia</label>", data: "_sFechaDenuncia" }, //3
                            { title: "<label class=\"letraLabel longLabel1\">Fecha Envío</label>", data: "_sFechaEnvio" }, //4
                            { title: "<label class=\"letraLabel longLabel4\">Estatus</label>", data: "_sEstatus" }, //5
                            { title: "<label class=\"letraLabel longLabel1\">Fecha Estatus</label>", data: "_sFechaEstatus" }, //6
                            { title: "<label class=\"letraLabel longLabel3\">Procedencia</label>", data: "_sProcedencia" }, //7
                            { title: "<label class=\"letraLabel longLabel3\">Oficio Procedencia</label>", data: "_sOficioProc" }, //8
                            { title: "<label class=\"letraLabel longLabel4\">Correo</label>", data: "_sCorreo" }, //9
                            { title: "<label class=\"letraLabel longLabel3\">Imprimir Denuncia</label>", data: "_sImpDenuncia" }, //10
                            { title: "<label class=\"letraLabel longLabel3\">Documentos Denuncia</label>", data: "_sDocsDenuncia" }, //11

                            { title: "", data: "_lLlaveDenuncia" }, //12
                            { title: "", data: "_lLlaveEstado" }, //13
                            { title: "", data: "_lLlaveSubEstado" }, //14


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

                        "bPaginate": true,
                        "bLengthChange": true, // Paginado mediante el combo que indica cuantos registros se desean ver ***
                        //"bFilter": false,
                        "bSort": false,
                        "bInfo": true,
                        "bAutoWidth": false,
                        "bStateSave": true,
                        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Sin paginado"]]

                        //"destroy": _bDestroy,

                        //"bLengthChange": true, // Paginado mediante el combo que indica cuantos registros se desean ver ***

                        //"bSort": false,

                        //"pageLength": 20,
                        //ordering: false,
                        //deferRender: true,
                        //paging: true,

                        //"bAutoWidth": false,

                        //"lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "Sin paginado"]],
                        //"stripeClasses": [],

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
        alert("[consultaRegDenuncias] \n" + err.message);

    }

}

function cargaCatalogoEstadoFilt()
{
    _oData = "{ _psClaveCatalogo:'STD', _plLlaveTipoCat: 26}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#ddlEstado").empty();

                    var _iPos = 0;

                    $.each(data.d, function () {
                        $("#ddlEstado").append($("<option     />").val(this.Llave).text(this.Texto).attr('data-img-src', (_iPos == 0 ? "" : (_iPos == 1 ? "../../Imagenes/aprobar.png" : "../../Imagenes/aprobar-green3.png"))));
                        _iPos += 1;
                    });

                    $("#ddlEstado").prop('selectedIndex', 0);

                    //$(".my-select").chosen();
                    $("#ddlEstado").chosen();
                    

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
        alert("[cargaCatalogoEstadoFilt] \n" + err.message);

    }
}

function cargaCatalogoEstadoDialog() {
    _oData = "{ _psClaveCatalogo:'STD', _plLlaveTipoCat: 26}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#ddlDvEstado").empty();

                    var _iPos = 0;

                    $.each(data.d, function () {
                        $("#ddlDvEstado").append($("<option     />").val(this.Llave).text(this.Texto).attr('data-img-src', (_iPos == 0 ? "" : (_iPos == 1 ? "../../Imagenes/aprobar.png" : "../../Imagenes/aprobar-green3.png"))));
                        _iPos += 1;
                    });

                    $("#ddlDvEstado").prop('selectedIndex', 0);

                    $("#ddlDvEstado").chosen();

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
        alert("[cargaCatalogoEstadoFilt] \n" + err.message);

    }
}

function cargaCatalogoTipoDen() {

    _oData = "{ _psClaveCatalogo:'STD', _plLlaveTipoCat: 13}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#MainContent_ddlTipoDenuncia").empty();

                    $.each(data.d, function () {
                        $("#MainContent_ddlTipoDenuncia").append($("<option     />").val(this.Llave).text(this.Texto));

                    });

                    $("#MainContent_ddlTipoDenuncia").prop('selectedIndex', 0);
                }

                else {

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeTipoDenuncias]");
            });

    }
    catch (err) {
        alert("[cargaCatalogoTipoDen] \n" + err.message);

    }

}

function cargaCatalogoSubestadoFilt() {

    _oData = "{ _psClaveCatalogo:'STD', _plLlaveTipoCat: " + $("#ddlEstado").val()+"}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#MainContent_ddlSubEstado").empty();
                    

                    $.each(data.d, function () {
                        $("#MainContent_ddlSubEstado").append($("<option     />").val(this.Llave).text(this.Texto));

                    });

                    $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                    $("#MainContent_ddlSubEstado").prop('disabled', false);

                }

                else {

                    $("#MainContent_ddlSubEstado").empty();
                    $("#MainContent_ddlSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                    $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                    $("#MainContent_ddlSubEstado").prop('disabled', true);

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeSubEstados]");
            });

    }
    catch (err) {
        alert("[cargaCatalogoSubestadoFilt] \n" + err.message);

    }

}

function cargaCatalogoSubestadoDialog() {

    _oData = "{ _psClaveCatalogo:'STD', _plLlaveTipoCat: " + $("#ddlDvEstado").val() + "}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#MainContent_ddlDvSubEstado").empty();


                    $.each(data.d, function () {
                        $("#MainContent_ddlDvSubEstado").append($("<option     />").val(this.Llave).text(this.Texto));

                    });

                    $("#MainContent_ddlDvSubEstado").prop('selectedIndex', 0);
                    $("#MainContent_ddlDvSubEstado").prop('disabled', false);

                }

                else {

                    $("#MainContent_ddlDvSubEstado").empty();
                    $("#MainContent_ddlDvSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                    $("#MainContent_ddlDvSubEstado").prop('selectedIndex', 0);
                    $("#MainContent_ddlDvSubEstado").prop('disabled', true);

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeSubEstados]");
            });

    }
    catch (err) {
        alert("[cargaCatalogoSubestadoDialog] \n" + err.message);

    }

}

function CambiarEstado(_sFolio) {


    

    $("#MainContent_lblFolio").text(_sFolio);

    $("#MainContent_dvCambioEstado").dialog({
        open: function () { $(".ui-dialog-titlebar-close").hide(); },
        modal: true,
        show: {
            effect: 'fade',
            duration: 700
        },
        width: 450,
        height: 400,
        //modal: true,
        //dialogClass: "no-close",
        //autoOpen:false,

        //close: function () {


        //},

        buttons: {
            "1": {
                id: 'jq_btn_adjuntar_nvo',
                click: function () {
                    OpCambiarEstatus(_sFolio);
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


    

    //var lol = 0;
}



function OpCambiarEstatus(_sFolio) {

    _oData = "{ _psFolio:'" + _sFolio + "'" +
             ", _plEstado: " + $("#ddlDvEstado").val() +
             ", _plSubEstado: " + $("#MainContent_ddlDvSubEstado").val() +
             "'}";
    
    
    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_cambioEstado",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                  

                }

                else {

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeSubEstados]");
            });

    }
    catch (err) {
        alert("[cargaCatalogoSubestado] \n" + err.message);

    }

}

function EnvioCorreo(_sFolio) {

    

    $("#MainContent_dvEnvioCorreo").dialog({
        open: function () { $(".ui-dialog-titlebar-close").hide(); },
        modal: true,
        show: {
            effect: 'fade',
            duration: 700
        },
        width: 850,
        height: 600,
        //modal: true,
        //dialogClass: "no-close",
        //autoOpen:false,

        //close: function () {


        //},

        buttons: {
            "1": {
                id: 'jq_btn_adjuntar_nvo',
                click: function () {
                    EnviarCorreoDen(_sFolio);
                },

                class: "modal_dialog_icons",
                style: "background-image: url('../../Imagenes/enviar_correo.png')",
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

    tinymce.init({
        selector: '#txtEmail',
        language: "es_MX",
        //language_url: "../JS/tinymce/js/langs/es_MX.js",
        height: 500,
        menubar: false,
        elementpath: false,
        resize: false,
        statusbar: false,
        //plugins: 'link',
        toolbar: "undo redo | bold italic underline  | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect | cut copy paste | bullist numlist | outdent | indent"
        //,
        //setup: function ( ed )
        //{
        //    ed.on( 'keydown', function ( ed, evt )
        //    {
        //        var chars_without_html = $.trim( tinyMCE.activeEditor.getContent().replace( /(<([^>]+)>)/ig, "" ) ).length;
        //        if ( chars_without_html > 15 )
        //        {
        //            tinyMCE.activeEditor.setContent( tinyMCE.activeEditor.getContent().replace( /<br\s*\/>/gi, "<br />" ) );
        //            ed.stopPropagation();
        //            ed.preventDefault();

        //        }
        //    } );
        //}
    });

    //var lol = 0;
}

function EnviarCorreoDen(_sFolio) {

    _oData = "{ _psFolio:'" + _sFolio + "'" +
             ", _psPara: '" + $("#MainContent_txtPara").val() + "'" +
             ", _psCCO: '" + $("#MainContent_txtCCO").val() + "'" +
             ", _psMensaje: '" + tinymce.activeEditor.getContent() + "'" +
             "}";


    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_enviarCorreo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    MensajeOk("Correo enviado correctamente");
                }

                else {

                    MensajeError("Hubo un error al traer los datos.");
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_enviarCorreo]");
            });

    }
    catch (err) {
        alert("[EnviarCorreoDen] \n" + err.message);

    }


}