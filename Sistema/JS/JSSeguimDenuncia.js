var _oAJAX = null;
var _oData = null;

$(document).ready(function () {

    $(function () {
        $.datepicker.setDefaults($.datepicker.regional["es"]);
        $("#MainContent_txtFechaInicio,#MainContent_txtFechaFinal").datepicker({
            
            showAnim: "slide",
            dateFormat: "dd'/'mm'/'yy",
            //minDate: "0",
            maxDate: "+0D",
            changeYear: true,
            changeMonth: true

        })
    });

    _oAJAX = null;

    consultaRegDenuncias();

    $.when(_oAJAX).done(function () {

        _oAJAX = null;

        cargaCatalogoEstado();

        $.when(_oAJAX).done(function () {

            _oAJAX = null;

            cargaCatalogoTipoDen();

            $.when(_oAJAX).done(function () {

                _oAJAX = null;

                cargaCatalogoSubestado();

                $.when(_oAJAX).done(function () {

                    _oAJAX = null;

                    $("#MainContent_dvCambioEstado").hide();
                    $("#RichText").richText(
                        {
                        // text formatting
                          bold: true,
                          italic: true,
                          underline: true,

                          // text alignment
                          leftAlign: true,
                          centerAlign: true,
                          rightAlign: true,
                          justify: true,

                          // lists
                          ol: true,                        
                          ul: true,

                          // title
                          heading: true,
                        
                          // fonts
                          fonts: true,
                          fontList: ["Arial",
                            "Arial Black",
                            "Comic Sans MS",
                            "Courier New",
                            "Geneva",
                            "Georgia",
                            "Helvetica",
                            "Impact",
                            "Lucida Console",
                            "Tahoma",
                            "Times New Roman",
                            "Verdana"
                           ],

                          fontColor: true,
                          fontSize: true,

                          // uploads
                          imageUpload: true,
                          fileUpload: true,

                          // link
                          urls: true,

                          // tables
                          table: true,
                          // code
                          removeStyles: true,
                          code: true,

                          // colors

                          colors: [],
                          // dropdowns
                          fileHTML: '',
                          imageHTML: '',
                          // translations
                          translations: {
                            'title': 'Title',
                            'white': 'White',
                            'black': 'Black',
                            'brown': 'Brown',
                            'beige': 'Beige',
                            'darkBlue': 'Dark Blue',
                            'blue': 'Blue',
                            'lightBlue': 'Light Blue',
                            'darkRed': 'Dark Red',
                            'red': 'Red',
                            'darkGreen': 'Dark Green',
                            'green': 'Green',
                            'purple': 'Purple',
                            'darkTurquois': 'Dark Turquois',
                            'turquois': 'Turquois',
                            'darkOrange': 'Dark Orange',
                            'orange': 'Orange',
                            'yellow': 'Yellow',
                            'imageURL': 'Image URL',
                            'fileURL': 'File URL',
                            'linkText': 'Link text',
                            'url': 'URL',
                            'size': 'Size',
                            'responsive': '<a href="https://www.jqueryscript.net/tags.php?/Responsive/">Responsive</a>',
                            'text': 'Text',
                            'openIn': 'Open in',
                            'sameTab': 'Same tab',
                            'newTab': 'New tab',
                            'align': 'Align',
                            'left': 'Left',
                            'justify': 'Justify',
                            'center': 'Center',
                            'right': 'Right',
                            'rows': 'Rows',
                            'columns': 'Columns',
                            'add': 'Add',
                            'pleaseEnterURL': 'Please enter an URL',
                            'videoURLnotSupported': 'Video URL not supported',
                            'pleaseSelectImage': 'Please select an image',
                            'pleaseSelectFile': 'Please select a file',
                            'bold': 'Bold',
                            'italic': 'Italic',
                            'underline': 'Underline',
                            'alignLeft': 'Align left',
                            'alignCenter': 'Align centered',
                            'alignRight': 'Align right',
                            'addOrderedList': 'Add ordered list',
                            'addUnorderedList': 'Add unordered list',
                            'addHeading': 'Add Heading/title',
                            'addFont': 'Add font',
                            'addFontColor': 'Add font color',
                            'addFontSize': 'Add font size',
                            'addImage': 'Add image',
                            'addVideo': 'Add video',
                            'addFile': 'Add file',
                            'addURL': 'Add URL',
                            'addTable': 'Add table',
                            'removeStyles': 'Remove styles',
                            'code': 'Show HTML code',
                            'undo': 'Undo',
                            'redo': 'Redo',
                            'close': 'Close'
                                            },

                          // privacy
                          youtubeCookies: false,

                          // dev settings

                          useSingleQuotes: false,
                          height: 0,
                          heightPercentage: 0,
                          id: "",                        
                          class: "",               
                          useParagraph: false,            
                          maxlength: 0,
                          // callback function after init

                          callback: undefined



                        }

                    );

                    var lol = 0;
                    //$("#MainContent_dvCuerpo").append(buildForumEntry());

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
                        "bFilter": false,
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

function cargaCatalogoEstado()
{
    _oData = "{ _pClaveCatalogo:'A'}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeEstados",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#ddlDvEstado").empty();
                    $("#ddlEstado").empty();
                 
                    //$.each(data.d, function () {
                    //    $("#ddlDvEstado").append($("<option     />").val(this._lLlaveStatus).text(this._sDesEstatus).attr('data-img-src', this._sRutaImagen));

                    //});

                    for (var i = 0; i < 2; i++) {

                        $("#ddlEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                        $("#ddlDvEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                    }
                    $("#ddlEstado").prop('selectedIndex', 0);
                    $("#ddlDvEstado").prop('selectedIndex', 0);

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
        alert("[cargaCatalogoEstado] \n" + err.message);

    }
}

function cargaCatalogoTipoDen() {

    _oData = "{ _pClaveCatalogo:'B'}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeTipoDenuncias",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#MainContent_ddlTipoDenuncia").empty();

                    //$.each(data.d, function () {
                    //    $("#ddlDvEstado").append($("<option     />").val(this._lLlaveStatus).text(this._sDesEstatus).attr('data-img-src', this._sRutaImagen));

                    //});

                    for (var i = 0; i < 2; i++) {

                        $("#MainContent_ddlTipoDenuncia").append($("<option     />").val(i).text("Prueba " + i));
                    }
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

function cargaCatalogoSubestado() {

    _oData = "{ _pClaveCatalogo:'B'}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Seguimiento_Denuncia.aspx/AJAX_traeSubEstados",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    $("#MainContent_ddlSubEstado").empty();
                    $("#MainContent_ddlDvSubEstado").empty();

                    //$.each(data.d, function () {
                    //    $("#ddlDvEstado").append($("<option     />").val(this._lLlaveStatus).text(this._sDesEstatus).attr('data-img-src', this._sRutaImagen));

                    //});

                    for (var i = 0; i < 2; i++) {

                        $("#MainContent_ddlSubEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                        $("#MainContent_ddlDvSubEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                    }
                    $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                    $("#MainContent_ddlDvSubEstado").prop('selectedIndex', 0);

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
        height: 300,
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

    _oData = "{ _psFolio:'" + _sFolio +
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

                    $("#MainContent_ddlSubEstado").empty();
                    $("#MainContent_ddlDvSubEstado").empty();

                    //$.each(data.d, function () {
                    //    $("#ddlDvEstado").append($("<option     />").val(this._lLlaveStatus).text(this._sDesEstatus).attr('data-img-src', this._sRutaImagen));

                    //});

                    for (var i = 0; i < 2; i++) {

                        $("#MainContent_ddlSubEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                        $("#MainContent_ddlDvSubEstado").append($("<option     />").val(i).text("Prueba " + i).attr('data-img-src', "../../Imagenes/aprobar-green3.png"));
                    }
                    $("#MainContent_ddlSubEstado").prop('selectedIndex', 0);
                    $("#MainContent_ddlDvSubEstado").prop('selectedIndex', 0);

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

