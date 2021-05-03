var _oAJAX = null;
var _oData = null;

var _oAJAXCatEst = null;
var _oDataCatEst = null;

var _lTipoFiltro = 0;

var _oArchBytesOfiProc = null;

var _bLimpiaDatos = false;

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
            //onSelect: function (dateText, inst) {

                
            //}


        })
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {

            if (_lTipoFiltro == 3) {

                var dateDe = $.datepicker.parseDate("dd/mm/yy", $("#MainContent_txtFechaInicio").val());
                var dateA = $.datepicker.parseDate("dd/mm/yy", $("#MainContent_txtFechaFinal").val());
                var dateColum = $.datepicker.parseDate("dd/mm/yy", data[3]);


                if (dateColum >= dateDe && dateColum <= dateA) 
                {
                    return true;
                }
                return false;

            }
            else {
                return true;
            }

            
        }
    );

    _oAJAXCatEst = null;

    cargaCatalogoEstadoFiltro();

    $.when(_oAJAXCatEst).done(function () {

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
                        $("#MainContent_dvCambioEstado, #MainContent_dvEnvioCorreo, #MainContent_FileUploadOficioProc, #MainContent_dvOficioProcedencia, #MainContent_dvSeccListaDocDenuncias").hide();

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

                            var valor = $("#MainContent_txtNoFolio").val();
                            if (valor == 0) { valor = ""; }
                            BuscaEnTabla('tab_gvConsDenuncias', valor, 1);

                            _lTipoFiltro = 0;
                        });

                        $("#MainContent_txtFechaInicio,#MainContent_txtFechaFinal").change(function () {

                            var _bInicio = false;
                            var _bFinal = false;
                            var valor = "";



                            if ($("#MainContent_txtFechaInicio").val().length > 0) {

                                _bInicio = true;

                            }

                            if ($("#MainContent_txtFechaFinal").val().length > 0) {

                                _bFinal = true;

                            }

                            if (!_bInicio && !_bFinal) {
                                _lTipoFiltro = 2;
                                BuscaEnTabla('tab_gvConsDenuncias', valor, 3);
                            }
                            else if (_bInicio && !_bFinal) {
                                _lTipoFiltro = 2;
                                valor = $("#MainContent_txtFechaInicio").val();
                                BuscaEnTabla('tab_gvConsDenuncias', valor, 3);
                            }
                            else if (!_bInicio && _bFinal) {
                                _lTipoFiltro = 2;
                                valor = $("#MainContent_txtFechaFinal").val();
                                BuscaEnTabla('tab_gvConsDenuncias', valor, 3);
                            }

                            else if (_bInicio && _bFinal) {

                                BuscaEnTabla('tab_gvConsDenuncias', "", 3);

                                _lTipoFiltro = 3;
                                var table = $("#tab_gvConsDenuncias").DataTable();

                                table.draw();

                            }

                            _lTipoFiltro = 0;

                        });

                        $("#MainContent_ddlTipoDenuncia").change(function () {

                            _lTipoFiltro = 4;

                            var valor = $("#MainContent_ddlTipoDenuncia").val();
                            if (valor == 1000) { valor = "";  }
                            BuscaEnTabla('tab_gvConsDenuncias', valor, 12);

                            _lTipoFiltro = 0;
                        });


                        //$("#ddlEstado").change(function () {
                        //    if ($("#ddlEstado").val() == 28) {

                        //        _oAJAX = null;
                        //        cargaCatalogoSubestadoFilt();

                        //    }
                        //    else {
                        //        $("#MainContent_ddlSubEstado").empty();
                        //        $("#MainContent_ddlSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                        //        $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                        //        $("#MainContent_ddlSubEstado").prop('disabled', true);

                        //    }
                        //    _lTipoFiltro = 5;

                        //    var valor = $("#ddlEstado").val();
                        //    if (valor == 1000) { valor = ""; BuscaEnTabla('tab_gvConsDenuncias', "", 14); }
                        //    BuscaEnTabla('tab_gvConsDenuncias', valor, 13);

                        //    _lTipoFiltro = 0;

                        //});

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

                            var valor = $("#MainContent_ddlSubEstado").val();
                            if (valor == 1000) { valor = ""; }
                            BuscaEnTabla('tab_gvConsDenuncias', valor, 14);

                            _lTipoFiltro = 0;
                        });

                        $("#MainContent_FileUploadOficioProc").on("change", function () {

                            if (!_bLimpiaDatos) {

                                var _oArchivo = $(this).prop('files')[0];

                                //$("#lblCER").text($("#fileUploadCER")[0].value);
                                $("#MainContent_lblOficioProc").text(_oArchivo.name);

                                var reader = new FileReader();
                                reader.onload = function () {

                                    var arrayBuffer = this.result;
                                    _oArchBytesOfiProc = new Uint8Array(arrayBuffer);

                                }
                                reader.readAsArrayBuffer(_oArchivo);

                            }

                        });

                        $("#btnOficio").on("click", function () {

                            $("#MainContent_FileUploadOficioProc").click();

                        });

                        reseteoFiltros();

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

                            { title: "", data: "_lLlaveTipoDenuncia" }, //12
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
                        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Sin paginado"]],

                        "destroy": _bDestroy,
                        "columnDefs":
                        [
                            {

                                "targets": [12,13,14],
                                "visible": false,
                                "searchable": true
                            },
                        ]

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

function cargaCatalogoEstadoFiltro()
{
    _oDataCatEst = "{ _psClaveCatalogo:'STD', _plLlaveTipoCat: 26}";

    try {


        _oAJAXCatEst = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeCatalogo",
            data: _oDataCatEst,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#ddlEstado").empty();

                    var _iPos = 0;

                    //Para que vuelva a colocar los íconos en el DDL
                    var _sOuterHTML = $("#ddlEstado")[0].outerHTML;
                    $("#ddlEstado")[0].outerHTML = _sOuterHTML.replace("display: inline-block;", "");

                    $.each(data.d, function () {
                        $("#ddlEstado").append($("<option     />").val(this.Llave).text(this.Texto).attr('data-img-src', (_iPos == 0 ? "" : (_iPos == 1 ? "../../Imagenes/aprobar.png" : "../../Imagenes/aprobar-green3.png"))));
                        _iPos += 1;
                    });

                    $("#ddlEstado").prop('selectedIndex', 0);

                    //$(".my-select").chosen();
                    $("#ddlEstado").chosen();

                    $("#ddlEstado").change(function () {
                        if ($("#ddlEstado").val() == 28) {

                            _oAJAX = null;
                            cargaCatalogoSubestadoFilt();

                        }
                        else {
                            $("#MainContent_ddlSubEstado").empty();
                            $("#MainContent_ddlSubEstado").append($("<option     />").val(1000).text("-- Seleccione --"));
                            $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                            $("#MainContent_ddlSubEstado").prop('disabled', true);

                        }
                        _lTipoFiltro = 5;

                        var valor = $("#ddlEstado").val();
                        if (valor == 1000) { valor = ""; BuscaEnTabla('tab_gvConsDenuncias', "", 14); }
                        BuscaEnTabla('tab_gvConsDenuncias', valor, 13);

                        _lTipoFiltro = 0;

                    });
                    

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
        alert("[cargaCatalogoEstadoFiltro] \n" + err.message);

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
        alert("[cargaCatalogoEstadoDialog] \n" + err.message);

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

function CambiarEstado(_sFolio, _lLlaveDenuncia) {


    

    $("#MainContent_lblFolio").text(_sFolio);

    $("#MainContent_dvCambioEstado").dialog({
        open: function () { $(".ui-dialog-titlebar-close").hide(); },
        modal: true,
        show: {
            effect: 'fade',
            duration: 700
        },
        width: 500,
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
                    ValidarCamposCambioEstado(_lLlaveDenuncia);
                    
                    
                },

                class: "modal_dialog_icons",
                style: "background-image: url('../../Imagenes/guardar.png')",
                title: "Actualizar"
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



function OpCambiarEstatus(_lLlaveDenuncia) {

    _oData = "{ _plLlaveDenuncia:" + _lLlaveDenuncia +
             ", _plEstado: " + $("#ddlDvEstado").val() +
             ", _plSubEstado: " + $("#MainContent_ddlDvSubEstado").val() +
             ", _psLlaveUsuario: '" + $("#MainContent_HDllaveUsr").val() + "'" +
             "}";
    
    
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

                    $("#MainContent_dvCambioEstado").dialog("close");
                    MensajeOk("Estatus actualizado correctamente");
                    limpiarfiltros();
                    reseteoFiltros();
                    consultaRegDenuncias();

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

function EnvioCorreo(_sFolio,  _lLlaveDenuncia) {

    var lol = 0;

    $("#MainContent_dvEnvioCorreo").dialog({
        open: function () { $(".ui-dialog-titlebar-close").hide(); },
        modal: true,
        show: {
            effect: 'fade',
            duration: 700
        },
        width: 850,
        height: 600,


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


    var _sContent = tinymce.activeEditor.getContent();

    _sContent = _sContent.replace(/'/g,"#");

        

    _oData = "{ _psFolio:'" + _sFolio + "'" +
             ", _psPara: '" + $("#MainContent_txtPara").val() + "'" +
             ", _psCCO: '" + $("#MainContent_txtCCO").val() + "'" +
              ", _psMensaje: '" + _sContent + "'" +
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
                    $("#MainContent_dvEnvioCorreo").dialog("close");
                    limpiarfiltrosCorreo();
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

function limpiarfiltros() {
    
    $("#MainContent_txtNoFolio").val("");
    $("#MainContent_txtFechaInicio").val("");
    $("#MainContent_txtFechaFinal").val("");
    $("#MainContent_ddlTipoDenuncia").val(1000);

    $("#ddlEstado").chosen("destroy");
    cargaCatalogoEstadoFiltro();
    //$("#ddlEstado").val(1000);
    //$("#ddlEstado").chosen();
    
    $("#MainContent_ddlSubEstado").val(1000);

}

function reseteoFiltros() {

    BuscaEnTabla('tab_gvConsDenuncias', "", 1);
    BuscaEnTabla('tab_gvConsDenuncias', "", 2);
    BuscaEnTabla('tab_gvConsDenuncias', "", 3);
    BuscaEnTabla('tab_gvConsDenuncias', "", 12);
    BuscaEnTabla('tab_gvConsDenuncias', "", 13);
    BuscaEnTabla('tab_gvConsDenuncias', "", 14);

}

function limpiarfiltrosCorreo() {

    $("#MainContent_txtPara").val("");
    $("#MainContent_txtCCO").val("");
    tinymce.activeEditor.setContent('');

}

function ValidarCamposCambioEstado(_lLlaveDenuncia)
{

    if ($("#ddlDvEstado").val() == 1000) {

        var _Style = $("#ddlDvEstado_chosen").attr("style");
        _Style += "border: 2px solid red;";
        $("#ddlDvEstado_chosen").attr("style", _Style);

        MensajeError("Debe elegir el estado.");
        return;

    }

    var _Style = $("#ddlDvEstado_chosen").attr("style");
    _Style = _Style.replace("border: 2px solid red;", "");
    $("#ddlDvEstado_chosen").attr("style", _Style);

    if ($("#ddlDvEstado").val() == 28 && ($("#MainContent_ddlDvSubEstado").val() == undefined || $("#MainContent_ddlDvSubEstado").val() == 1000)) {

        $("#MainContent_ddlDvSubEstado").css("border-color", "red");
        MensajeError("Debe elegir el subestado.");
        return;

    }

    $("#MainContent_ddlDvSubEstado").css("border-color", "");


    OpCambiarEstatus(_lLlaveDenuncia);

}

function CargarOficioProc(_lLlaveDenuncia) {

    $("#MainContent_dvOficioProcedencia").dialog({
        open: function () { $(".ui-dialog-titlebar-close").hide(); },
        modal: true,
        show: {
            effect: 'fade',
            duration: 700
        },
        width: 400,
        height: 250,
        //modal: true,
        //dialogClass: "no-close",
        //autoOpen:false,

        close: function () {

            limpiaFileUploadOfic();
        },

        buttons: {
            "1": {
                id: 'jq_btn_adjuntar_nvo',
                click: function () {
                    ValidarCamposRegOficioProc(_lLlaveDenuncia);
                    

                },

                class: "modal_dialog_icons",
                style: "background-image: url('../../Imagenes/guardar.png')",
                title: "Actualizar"
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

function ValidarCamposRegOficioProc(_lLlaveDenuncia) {
    
    if ($("#MainContent_FileUploadOficioProc")[0].value == "") {
        $("#btnOficio").css("border-color", "red");
        MensajeError("Debe seleccionar el oficio de procedencia.");
        return;
    }
    $("#btnOficio").css("border-color", "");

    RegOficioProc(_lLlaveDenuncia);

}

function RegOficioProc(_lLlaveDenuncia) {

    _oData = "{ _plLlaveDenuncia:" + _lLlaveDenuncia +
        ", _psNombreArchivo: '" + $("#MainContent_lblOficioProc").text() + "'" +
        ", _pByteOfic: " + JSON.stringify(_oArchBytesOfiProc) +
        ", _psLlaveUsuario: '" + $("#MainContent_HDllaveUsr").val() + "'" +
        "}";


    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_regOficioProcedencia",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    MensajeOk("Oficio registrado correctamente");
                    $("#MainContent_dvOficioProcedencia").dialog("close");
                    limpiarfiltros();
                    reseteoFiltros();
                    consultaRegDenuncias();
                    
                }

                else {

                    MensajeError("Hubo un error al traer los datos.");
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_regOficioProcedencia]");
            });

    }
    catch (err) {
        alert("[RegOficioProc] \n" + err.message);

    }

}

function limpiaFileUploadOfic() {

    _oArchBytesOfiProc = null;

    _bLimpiaDatos = true;

    $("#FirmaElectronica_FileUploadOficioProc").empty();
    $("#FirmaElectronica_FileUploadOficioProc")[0].value = "";
    $("#MainContent_lblOficioProc").text("");
    

    _bLimpiaDatos = false;

}

function VerDocumento(_lLlaveDocumento, _lLlaveTipoDoc) {

    $("#MainContent_HDLlaveDocumento").val(_lLlaveDocumento);
    $("#MainContent_HDLlaveTipoDocumento").val(_lLlaveTipoDoc);
    

    __doPostBack('btnVerDocumento', 'CLICK');
}

function VerDocsDenuncia(_lLlaveDenuncia) {

    _oData = "{ _plLlaveDenuncia:" + _lLlaveDenuncia +"}";


    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeDocumentosDenuncia",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1) {

                $("#MainContent_dvListaDocDenuncias").empty();

                var _bFilaAlterna = true;
                var _sHTML = "";

                var _sStyloHead = 'style=\"font-size:11px; vertical-align: middle; text-align:center;"';
                var _sStyloBody = 'style=\"vertical-align: middle;text-align:';

                _sHTML = "<table  class=\"display\" cellspacing=\"0\" rules=\"cols\" border=\"1\" id=\"t_tabDocumentosDenuncia\" style=\"border-width: 1px; border-style: solid; border-collapse: collapse;\">";
                _sHTML += "<thead>";
                _sHTML += "<tr  class= \"thHead\" >" +


                    "<th scope=\"col\"" + _sStyloHead + ">Num. Reg</th>" +
                    "<th scope=\"col\"" + _sStyloHead + ">Documento</th>" +
                    "<th scope=\"col\"" + _sStyloHead + ">Fecha Actualización</th>" +
                    "<th scope=\"col\"" + _sStyloHead + ">Consultar</th>";



                _sHTML += " </tr>";
                _sHTML += " </thead>";
                _sHTML += " <tbody>";

                for (_iCont = 0; _iCont <= data.d.length - 1; _iCont++)
                {

                    if (_bFilaAlterna) {

                        _sHTML += "<tr class=\"ItemStyleClass\">";
                        _bFilaAlterna = false;
                    }
                    else {
                         _sHTML += "<tr class=\"AlternatingItemStyleClass\" >";
                        _bFilaAlterna = true;
                    }

                    _sHTML += "<td " + _sStyloBody + "center\" ><label style=\"width:40px; height:20px;\">" + data.d[_iCont]._lRowNum + "</label></td>";
                    _sHTML += "<td " + _sStyloBody + "center\" ><label style=\"width:110px; height:20px;\">" + data.d[_iCont]._sNombreDocumento + "</label></td>";
                    _sHTML += "<td " + _sStyloBody + "center\"><label style=\"width:80px; height:20px\">" + data.d[_iCont]._sFechaUltAc + "</label></td>";
                    _sHTML += "<td " + _sStyloBody + "center\"><label style=\"width:80px; height:20px\">" + data.d[_iCont]._sVerDocumento + "</label></td>";

                }

                _sHTML += "</tbody>";
                _sHTML += "</table>";

                $("#MainContent_dvListaDocDenuncias").append(_sHTML);

                visualizarDocsDenuncia();

            }

            else {

                MensajeError("Hubo un error al traer los datos.");
            }
        })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_traeDocumentosDenuncia]");
            });

    }
    catch (err) {
        alert("[VerDocsDenuncia] \n" + err.message);

    }

}


function visualizarDocsDenuncia() {

    $("#MainContent_dvSeccListaDocDenuncias").dialog({
        open: function () { $(".ui-dialog-titlebar-close").hide(); },
        modal: true,
        show: {
            effect: 'fade',
            duration: 700
        },
        width: 400,
        height: 250,
        //modal: true,
        //dialogClass: "no-close",
        //autoOpen:false,

        close: function () {

        },

        buttons: {

            "1": {
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
