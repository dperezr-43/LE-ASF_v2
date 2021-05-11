_oAJAX = null;
_oAJAXCat = null;

var _Main = '#MainContent_';
var _AjaxURL = 'Registro.aspx';

$(document).ready(function () {

   

    $('#dvSiAnonima, #dvDenunciaRegistro, ' + _Main + 'dvLogFolio, ' + _Main + 'dvRespuesta, ' + _Main + 'dvListaDocumentos, ' + _Main + 'dvListaDocEv, ' + _Main + 'dvEntidadesDen, #RDGeneraPSW').hide();
    //

       

    $(document).ajaxStart(function () {
        $(_Main + "dvControlPopup-Den").height($(document).height());
        $(_Main + "dvControlPopup-Den").show();

        $("#load").dialog({
            //dialogClass: "no-close",
            resizable: false,
            height: 200,
            modal: true,
            open: function (event, ui) {                
                $(this).parent().find(".ui-dialog-titlebar-close").remove();
            },
            closeOnEscape: false
        });
    });


    $(document).ajaxStop(function () {
        $("#load").dialog("close");
    });



  

    $("body").on("click", ".fManualInfografia", function () {


        try {

            fMuestraDocumento('../../Archivos/PDF/Infograma_v1.pdf', 'Infograma', 900, 800);


        } catch (err) {

            alert("[Visualizar Manual o Infograma] \n" + err.message);
        }


    });







    $('.fToolLFRCF').prop('title', 'El ejercicio fiscal 2020 está siendo auditado por la ASF. Por disposición legal(artículo 59 de la LFRCF), dicho ejercicio no es susceptible de reportar denuncias fundamentadas en el Título Cuarto de la Ley citada.');

    $('.fToolLFRCArt61').prop('title', 'De acuerdo con la Ley de Fiscalización y Rendición de Cuentas de la Federación (artículo 61), su denuncia debe hacer referencia a alguno de los siguientes supuestos de presuntos daños o perjuicios a la Hacienda Pública Federal o al patrimonio de los entes públicos. Clic en el ícono para ver el tutorial');

   



    $("body").on("click", "input[name*='rblDenunciaAnonima']", function () {

        try {

            let _sNomControl = "#Denuncia_no_anonima";

            $(_Main + "HDLlaveTipoDenuncia").val($(this).val());

            $(this).val() == '14' ? $(_sNomControl).addClass("OcultaSeccion") : $(_sNomControl).removeClass("OcultaSeccion");
            $(_Main + "hdnPGuarda").val(0);
            $('#dvSiAnonima').show();

        } catch (err) {

            alert("[rblDenunciaAnonima.click] \n" + err.message);
        }


    });


    $("body").on("click", "input[name*='btnContinuaDenuncia']", function () {

        try {

            

            $('#otInfo').hide();
            $('#dvDenunciaRegistro').show();

            Habilitardeshabilitar2Secc(true);

        } catch (err) {

            alert("[btnContinuaDenuncia.click - (Reday)] \n" + err.message);
        }


    });



    $("body").on("click", "input[name*='btnGuardaSegSecc']", function () {

        fGuarda();


    });


    $("body").on("click", "input[name*='btnRegresaPresentacion']", function () {

        try {


            $('#otInfo').show();
            $('#dvDenunciaRegistro, #dvSiAnonima').hide();
            $('input[id*="rblDenunciaAnonima"]').prop('checked', false);


        } catch (err) {

            alert("[btnRegresaPresentacion.click - (Reday)] \n" + err.message);
        }


    });




    $(".set > a").on("click", function () {


        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".content")
                .slideUp(200);
            $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
        } else {
            $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
            $(this)
                .find("i")
                .removeClass("fa-plus")
                .addClass("fa-minus");
            $(".set > a").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(200);
            $(this)
                .siblings(".content")
                .slideDown(200);
        }
    });


    $("#aLinkRD").click(function () {

        var _NomControl = _Main + 'chbHechos';
        var _NContenedeor = _Main + 'dvchbHechos';

        _oAJAXCat = null;
        cargaCatalogo('STD1', 'chk', _NomControl, _NContenedeor, 16);


        $("#btnArchDoc").on("click", function () {

            ElegirDoc(1);

        });

        $("#btnArchEv").on("click", function () {

            ElegirDoc(2);

        });

    });
   


    $("body").on("click", "input[name*='btnSegconsulta']", function () {

        try {



            ConsultaSeguimiento();


        } catch (err) {

            alert("[btnSegconsulta.click - (Reday)] \n" + err.message);
        }


    });

    $("body").on("click", "input[name*='btnGuardaDenuncia']", function () {

        validarcamposHechosDen();

    });



    // DPR - Carga de catálogos 
      

    var NomControl = _Main + 'lbxCP';
    var NomContenedor = '';

    _oAJAXCat = null;
    cargaCatalogo('CP', 'lbx', NomControl, NomContenedor, 0);

    if (_oAJAXCat != null) {

        $.when(_oAJAXCat).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1) {

                NomControl = _Main + 'ddlOrigenRecursos';
                NomContenedor = '';

                _oAJAXCat = null;
                cargaCatalogo('STD', 'ddl', NomControl, NomContenedor, 40);

                $(_Main + 'ddlOrigenRecursos option:selected').val(1000);

                if (_oAJAXCat != null) {

                    $.when(_oAJAXCat).done(function (data, textStatus, jqXHR) {

                        if (String(data.d).indexOf("Error") == -1) {

                            NomControl = 'NG';
                            NomContenedor = '#dvNivelGobierno';

                            _oAJAXCat = null;
                            cargaCatalogo('NG', 'rbl', NomControl, NomContenedor, 9);


                        }
                    });
                }



             
            }
        });
    }




    $("body").not("input,textarea").keydown(function (event) {
        if (event.keyCode == 9) {
            event.preventDefault();
            return false;
        }
    });




}); // Fin ready

function validarcamposHechosDen() {

    var _bUnoMinSelec = false;

    $.each($("input[name*=" + _Main.replace("#","")+"chbHechos]"), function () {
        if (this.checked) {

            _bUnoMinSelec = true;
        }

    });

    if (!_bUnoMinSelec) {

        $.each($("input[name*=" + _Main.replace("#", "") +"chbHechos]"), function () {

            this.style.outline = "1px solid red";

        });

        MensajeError("Seleccione mínimo un hecho de denuncia");
        return;

    }

    $.each($("input[name*=" + _Main.replace("#", "") +"chbHechos]"), function () {

        this.style.outline  = "";

    });

    fDialogContrasena();

}

function fDialogContrasena() {

    $(_Main + "HDDialogCont").val(1);

    $("#RDGeneraPSW").show();
    $("#RDComplementoDenuncia, #RDHechos").hide();


}


function fMuestraDocumento(_sRuta, _sTitulo, _iBase, _iAltura) {

    try {

        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (_iBase / 2)) + dualScreenLeft;
        var top = ((height / 2) - (_iAltura / 2)) + dualScreenTop;
        var newWindow = window.open(_sRuta, _sTitulo, 'scrollbars=yes, width=' + _iBase + ', height=' + _iAltura + ', top=' + top + ', left=' + left);

        // Colocamos el cursor en la nueva ventana 
        if (window.focus) {
            newWindow.focus();
        }



    } catch (err) {

        alert("[fMuestraDocumento] \n" + err.message);
    }
}






function cargaCatalogo(_pClaveCatalogo, _pTipo, _pNomControl, _pContenedor, _pLlaveCatTipo) {

    _oData = "{ClaveCatalogo:'" + _pClaveCatalogo + "', LlaveTipoCat: " + _pLlaveCatTipo+"}";

    try {


        _oAJAXCat = $.ajax({
            type: "POST",
            url: _AjaxURL + "/AJAX_cargaCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {


                    switch (_pTipo) {

                        case 'ddl':
                        case 'lbx':

                            $(_pNomControl).empty();

                            $.each(data.d, function () {
                                $(_pNomControl).append($("<option     />").val(this.Llave).text(this.Texto));
                            });

                            break;

                        case 'rbl':

                            $(_pContenedor).empty();
                                                       

                            var table = $('<table></table>').attr({ id: 'ot' + _pNomControl, class: 'txt_az_normal' });
                            var counter = 0;
                            $(data.d).each(function () {
                                table.append($('<tr></tr>').append($('<td></td>').append($('<input>').attr({
                                    type: 'radio', name: _pNomControl, value: this.Llave, id: 'r' + _pClaveCatalogo + '-' + counter, class: 'css-' + _pClaveCatalogo
                                })).append(
                                    $('<label>').attr({
                                        for: _pNomControl + counter++
                                    }).text(this.Texto))));
                            });

                            $(_pContenedor).append(table);


                           
                            break;

                        case 'chk':
                            $(_pContenedor).empty();

                    
                            var table = $('<table></table>').attr({ id: _pNomControl.replace("#",""), class:'txt_az_normal'});
                            
                            var counter = 0;
                            $(data.d).each(function () {
                                table.append($('<tr></tr>').append($('<td></td>').append($('<input>').attr({
                                    type: 'checkbox', name: _pNomControl.replace("#", "") + "_" + counter, value: this.Llave, id: _pNomControl.replace("#", "") + "_" + counter, style:"color:black;"
                                }))).append($('<td></td>').attr({style:"width:15px;"})
                                    ).append($('<td></td>').append(
                                    $('<label>').attr({
                                        for: _pNomControl.replace("#", "") + "_" + counter++
                                    }).text("" + this.Texto)))
                                );

                                
                            });

                            $(_pContenedor).append(table);

                            break;

                    }

                }

                else {

                    MensajeError(data.d);
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_cargaCatalogo()]");
            });

    }
    catch (err) {
        alert("[cargaCatalogo] \n" + err.message);

    }

}


function ConsultaSeguimiento(_sFilio, _sPassword) {

    _oData = "{ _psFolio:'" + $(_Main + "txtSegFolio").val() + "'" +
        ", _psPassword: '" + $(_Main + "txtSegPsw").val() + "'" +
        "}";

    try {

        _oAJAX = $.ajax({
            type: "POST",
            url: "../Denuncias_IV/Seguimiento_Denuncia.aspx/AJAX_ConsultaSeguimientoDenuncia",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1) {

                //MensajeOk(data.d[0].Respuesta, 'Mensaje');

                $(_Main + 'lblRespuesta').val('');
                $(_Main + 'lblRespuesta').text(data.d[0].Respuesta);

                $(_Main + "dvRespuesta").dialog({
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

                        $(_Main + "txtSegFolio, " + _Main + "txtSegPsw").val('');
                    },

                    buttons: {
                        "1": {
                            id: 'jq_btn_adjuntar_nvo',
                            click: function () {

                                VerDocumento(data.d[0].LlaveDocumento, data.d[0].LlaveTipoDoc);

                            },
                            class: "modal_dialog_icons",
                            style: "background-image: url('../../Imagenes/guardar.png')",
                            title: "Actualizar"
                        },

                        "2": {
                            id: 'jq_btn_cancela',
                            click: function () {

                                $(_Main + "txtSegFolio, " + _Main + "txtSegPsw").val('');

                                $(this).dialog("close");

                            },

                            class: "modal_dialog_icons",
                            style: "background-image: url('../../Imagenes/cancelar.png')",
                            title: "Cerrar"
                        },

                    }
                });

                //data.d[0].LlaveDocumento == 0 ? (_Main + "jq_btn_adjuntar_nvo").hide() : (_Main + "jq_btn_adjuntar_nvo").show();
                data.d[0].LlaveDocumento == 0 ? (_Main + "jq_btn_adjuntar_nvo").hide() : (_Main + "jq_btn_adjuntar_nvo").show();
            }

            else {

                MensajeError(data.d);
            }
        })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [ConsultaSeguimiento]");
            });

    }
    catch (err) {
        alert("[ConsultaSeguimiento] \n" + err.message);

    }

}  
 



function Habilitardeshabilitar2Secc(_bDisable) {

    //let SeccionesHD = '#RDGeneraPSW, #RDComplementoDenuncia';
    let SeccionesHD = '#RDComplementoDenuncia';
    let ClassHD = 'disabledseccion';

    _bDisable == true ? $(SeccionesHD).addClass(ClassHD) : $(SeccionesHD).removeClass(ClassHD);
    
}

function seguimiento() {


    $(_Main + "txtLogFolio").val("");
    $(_Main + "txtLogPass").val("");

    $(_Main + "dvLogFolio").dialog({
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
                    ValidarCamposFolioLog();


                },

                class: "modal_dialog_icons",
                style: "background-image: url('../../Imagenes/buscar.png')",
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

function ValidarCamposFolioLog() {

    var _sLogFolio = $(_Main + "txtLogFolio").val();
    _sLogFolio = _sLogFolio.trim();

    var _sLogPass = $(_Main + "txtLogPass").val();
    _sLogPass = _sLogPass.trim();

    if (_sLogFolio == "") {

        var _Style = $(_Main + "txtLogFolio").attr("style");
        _Style += "border: 2px solid red;";
        $(_Main + "txtLogFolio").attr("style", _Style);
        MensajeError("Introduce el folio");
        return;
    }

    var _Style = $(_Main + "txtLogFolio").attr("style");
    _Style = _Style.replace("border: 2px solid red;", "");
    $(_Main + "txtLogFolio").attr("style", _Style);

    if (_sLogPass == "") {

        var _Style = $(_Main + "txtLogPass").attr("style");
        _Style += "border: 2px solid red;";
        $(_Main + "txtLogPass").attr("style", _Style);

        MensajeError("Introduce la contraseña");
        return;
    }

    var _Style = $(_Main + "txtLogPass").attr("style");
    _Style = _Style.replace("border: 2px solid red;", "");
    $(_Main + "txtLogPass").attr("style", _Style);
    

    $(_Main + "HDFolio").val(_sLogFolio);
    $(_Main + "HDPassword").val(_sLogPass);

    consultaFolio();

}

function consultaFolio() {

    var bEstuvoOculto = false;

    _oData = "{ _psFolio:'" + $(_Main + "HDFolio").val() + "'" +
        ", _psPassword: '" + $(_Main + "HDPassword").val() + "'" +
        ", _plLlaveDenuncia: " + $(_Main + "HDLlaveDenuncia").val() +
        "}";


    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: _AjaxURL + "/AJAX_ConsultaInfoDenunciaFP",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1 && String(data.d).indexOf("Sin datos") == -1) {

                //Primero se verifica la sección en el que se encuentra el usuario
                

                if ($("#otInfo").is(":visible")) {



                    data.d[0]._lLlaveTipoDenuncia == 14 ? $("#Denuncia_no_anonima").addClass("OcultaSeccion") : $("#Denuncia_no_anonima").removeClass("OcultaSeccion");
                    $('#otInfo').hide();
                    $('#dvDenunciaRegistro').show();
                    //$("#Denuncia_anonima").click();
                    $("#aLinkRD").click();

                    Habilitardeshabilitar2Secc(true);

                    bEstuvoOculto = true;
                }
                else if (!$("#RDHechos").is(":visible")) {

                    data.d[0]._lLlaveTipoDenuncia == 14 ? $("#Denuncia_no_anonima").addClass("OcultaSeccion") : $("#Denuncia_no_anonima").removeClass("OcultaSeccion");
                    //$("#Denuncia_anonima").click();
                    $("#aLinkRD").click();

                    Habilitardeshabilitar2Secc(true);

                    bEstuvoOculto = true;
                    
                }


                //////////////////////////////////////////////////////////////////

                $(_Main + "hdnPGuarda").val(1);
                $("#btnGuardaDenuncia").hide();
                $("#RDGeneraPSW").hide();
                $("#RDComplementoDenuncia, #RDHechos").show();
             

                $.each($("input[name*=" + _Main.replace("#", "") +"chbHechos]"), function () {

                        this.checked = false;

                });

                var _sValoresHechosDen = "";
                var _sValoresCP = "";
                var _sValoresDocIrr = "";
                var _sValoresDocEv = "";
                var _sValoresEntidad = "";
                var _sValorObjetosDen = "";
                var _iValorOrigenRec = 1000;

                var _lValorNivelGob = 0;

                $(data.d).each(function () {

                    if (this._lOrden == 1) {

                        _sValoresHechosDen += this._lLlaveGen + "#";

                    }
                    else if (this._lOrden == 2) {

                        // CP
                        /*Llave Cat es la llave_usuario*/
                        _sValoresCP += this._sTexto + "#" + this._sDescripcion + "#" + this._lLlaveGen + "$";

                    }
                    else if (this._lOrden == 3) {

                        /*Llave Cat es la llave_usuario*/
                        _sValoresDocIrr += this._sTexto + "#" + this._sDescripcion + "#" + this._lLlaveGen + "$";

                    }
                    else if (this._lOrden == 4) {

                        /*Llave Cat es la llave_usuario*/
                        _sValoresDocEv += this._sTexto + "#" + this._sDescripcion + "#" + this._lLlaveGen + "$";

                    }
                    else if (this._lOrden == 5) {

                        /*Llave Cat es la llave_usuario*/
                        _lValorNivelGob = this._lLlaveGen;

                    }
                    else if (this._lOrden == 6) {

                        /*Llave Cat es la llave_usuario*/
                        _sValoresEntidad += this._sTexto + "$";

                    }
                    else if (this._lOrden == 7) {
                        
                        _sValorObjetosDen = this._sTexto;

                    }

                    else if (this._lOrden == 8) {

                        _iValorOrigenRec = this._lLlaveGen;

                    }

                });

                if (bEstuvoOculto) {
                    $.when(_oAJAXCat).done(function (data2, textStatus, jqXHR) {

                        //Primero coloca los datos de Hechos de Denuncias

                        $.each($("input[name*=" + _Main.replace("#", "") + "chbHechos]"), function () {

                            var _sVal = this.value;

                            if (_sValoresHechosDen.indexOf(_sVal + "#") != -1) {

                                this.checked = true;

                            }

                        });



                        $(_Main + 'lbxCP option').each(function () {

                            var _sVal = this.value;
                            var _sTxt = this.text;

                            if (_sValoresCP.indexOf(_sVal + "$") != -1) {

                                $(_Main + "lbxCPSeleccionados").append($("<option     />").val(this.value).text(this.text));

                                $(_Main + "lbxCP option[value=" + this.value + "]").remove();
                            }
                        })




                        //Después los documentos de presuntos hechos irregulares

                        if (_sValoresDocIrr.length > 0) {

                            _sValoresDocIrr = _sValoresDocIrr.substr(0, _sValoresDocIrr.length - 1);

                            var _arrDocIrr = _sValoresDocIrr.split("$");
                            agregarDocumentosConsulta(0, _arrDocIrr);
                        }

                        //los documentos de evidencia

                        if (_sValoresDocEv.length > 0) {

                            _sValoresDocEv = _sValoresDocEv.substr(0, _sValoresDocEv.length - 1);

                            var _arrDocEv = _sValoresDocEv.split("$");
                            agregarDocumentosConsulta(1, _arrDocEv);
                        }

                        //Entidades Involucradas

                        $('input[id*=rNG-]').each(function () {

                            if (this.value == _lValorNivelGob) {

                                this.checked = true;

                            }

                        });

                        if (_sValoresEntidad.length > 0) {

                            _sValoresEntidad = _sValoresEntidad.substr(0, _sValoresEntidad.length - 1);

                            var _arrEntidades = _sValoresEntidad.split("$");
                            agregarDocumentosConsulta(2, _arrEntidades);
                        }


                        if (_sValorObjetosDen.length > 0) {

                            $(_Main + "txtObjetoDenunciado").val(_sValorObjetosDen);

                        }


                        $(_Main + "ddlOrigenRecursos").val(_iValorOrigenRec);



                        //$(_Main + "HDFolio").val($(_Main + "txtLogFolio").val());
                        $(_Main + "HDLlaveDenuncia").val(data.d[0]._lLlaveDenuncia);

                        $(_Main + "txtLogFolio").val("");
                        $(_Main + "txtLogPass").val("");
                        $(_Main + "dvLogFolio").dialog("close");

                        Habilitardeshabilitar2Secc(false);


                    });
                }
                else {

                    //Primero coloca los datos de Hechos de Denuncias

                    $.each($("input[name*=" + _Main.replace("#", "") + "chbHechos]"), function () {

                        var _sVal = this.value;

                        if (_sValoresHechosDen.indexOf(_sVal + "#") != -1) {

                            this.checked = true;

                        }

                    });



                    $(_Main + 'lbxCP option').each(function () {

                        var _sVal = this.value;
                        var _sTxt = this.text;

                        if (_sValoresCP.indexOf(_sVal + "$") != -1) {

                            $(_Main + "lbxCPSeleccionados").append($("<option     />").val(this.value).text(this.text));

                            $(_Main + "lbxCP option[value=" + this.value + "]").remove();
                        }
                    })




                    //Después los documentos de presuntos hechos irregulares

                    if (_sValoresDocIrr.length > 0) {

                        _sValoresDocIrr = _sValoresDocIrr.substr(0, _sValoresDocIrr.length - 1);

                        var _arrDocIrr = _sValoresDocIrr.split("$");
                        agregarDocumentosConsulta(0, _arrDocIrr);
                    }

                    //los documentos de evidencia

                    if (_sValoresDocEv.length > 0) {

                        _sValoresDocEv = _sValoresDocEv.substr(0, _sValoresDocEv.length - 1);

                        var _arrDocEv = _sValoresDocEv.split("$");
                        agregarDocumentosConsulta(1, _arrDocEv);
                    }

                    //Entidades Involucradas

                    $('input[id*=rNG-]').each(function () {

                        if (this.value == _lValorNivelGob) {

                            this.checked = true;

                        }

                    });

                    if (_sValoresEntidad.length > 0) {

                        _sValoresEntidad = _sValoresEntidad.substr(0, _sValoresEntidad.length - 1);

                        var _arrEntidades = _sValoresEntidad.split("$");
                        agregarDocumentosConsulta(2, _arrEntidades);
                    }


                    if (_sValorObjetosDen.length > 0) {

                        $(_Main + "txtObjetoDenunciado").val(_sValorObjetosDen);

                    }


                    $(_Main + "ddlOrigenRecursos").val(_iValorOrigenRec);



                    //$(_Main + "HDFolio").val($(_Main + "txtLogFolio").val());
                    $(_Main + "HDLlaveDenuncia").val(data.d[0]._lLlaveDenuncia);

                    $(_Main + "txtLogFolio").val("");
                    $(_Main + "txtLogPass").val("");
                    $(_Main + "dvLogFolio").dialog("close");

                    Habilitardeshabilitar2Secc(false);

                }

                
            }

            else {

                MensajeError(data.d);
            }
        })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [ConsultaSeguimiento]");
            });

    }
    catch (err) {
        alert("[ConsultaSeguimiento] \n" + err.message);

    }

}


function VerDocumento(_lLlaveDocumento, _lLlaveTipoDoc) {

    $(_Main + "HDVerLlaveDoc").val("0");
    $(_Main + "HDVerRutaDoco").val("");

    $(_Main + "HDLlaveDocumento").val(_lLlaveDocumento);
    $(_Main + "HDLlaveTipoDocumento").val(_lLlaveTipoDoc);


    __doPostBack('btnVerDocumento', 'CLICK');
}

function ElegirDoc(_iOpc) {

    $(_Main + "HDSeleccArchivo").val(_iOpc);

    var _sRutaServer = $(_Main + "HDRutaServ").val() + "\\" + $(_Main + "HDLlaveDenuncia").val();


    var _sArchivo = $(_Main + "lblArchDoc").text();

    if (_sArchivo != "") {
        _sArchivo = _sArchivo.replace(/\\/g, "//");
        _sArchivo = _sArchivo.substr(_sArchivo.lastIndexOf("//") + 2);
    }

    var cadena_url = "../../UploadASPX.aspx?llvTipoDoc=0," + _sArchivo + "," + $(_Main + "HDLlaveDenuncia").val();


    //procesos para centrar el cuadro 

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;

    //300 y 100 son los valores del tamaño de la ventana que se va a colocar, pueden cambiarse de acuerdo a la necesidad del programador
    const left = (width - 350) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 100) / 2 / systemZoom + dualScreenTop;
    /////////////////////////////////////////////////////////////////////////////

    var objeto_window_referencia = window.open(cadena_url, "_blank", "menubar=1,resizable=1,width=350,height=100,top=" + top  + ",left=" + left ).focus();


}

//Esta función es llamada desde el JS JSUploadASPX.js
function setValue(Valores) {

    if (Valores.TipoAccion == "Guardar") {

        if ($(_Main + "HDSeleccArchivo").val() == 1) {

            $(_Main + "lblArchDoc").text(Valores.HDNombreArchivo);

        }
        else if ($(_Main + "HDSeleccArchivo").val() == 2) {

            $(_Main + "lblArchEv").text(Valores.HDNombreArchivo);

        }

        

    }

}

function agregarDocumento(_iOpcion) {

    var con_filas = 0;
    var nombre_tabla = "";
    var nombre_dv = "";
    var nombre_desc = "";
    var nombre_id_fila = "";
    var nombre_elim_reg = "";
    var nombre_doc = "";
    var nombre_ruta = "";

    var nombre_ver_doc = "";

    var _sEstiloFilaAlterna = "ItemStyleClass";

    switch (_iOpcion) {
        case 0:
            nombre_dv = _Main + "dvListaDocumentos";
            nombre_tabla = "#Tdocumentos";
            nombre_desc = _Main + "txtDescArchivo";
            nombre_id_fila = "trNivelDoc";
            nombre_elim_reg = "btnElimDoc";
            nombre_doc = _Main + "lblArchDoc";
            nombre_ruta = "inRutaDoc";
            nombre_ver_doc = "btnVerDoc";

            break;

        case 1:
            nombre_dv = _Main + "dvListaDocEv";
            nombre_tabla = "#TdocEv";
            nombre_desc = _Main + "txtDescArchEv";
            nombre_id_fila = "trNivelEv";
            nombre_elim_reg = "btnEliEv";
            nombre_doc = _Main + "lblArchEv";
            nombre_ruta = "inRutaEv";
            nombre_ver_doc = "btnVerEv";

            break;

        case 2:
            nombre_dv = _Main + "dvEntidadesDen";
            nombre_tabla = "#TEntidades";
            nombre_desc = _Main + "txtEntInvolucrada";
            nombre_id_fila = "trNivelEnt";
            nombre_elim_reg = "btnEliEnt";
            break;
    }

    if (_iOpcion == 0 || _iOpcion == 1) {

        var _sNomDoc = $(nombre_doc).text();
        _sNomDoc = _sNomDoc.trim();

        var _sDescDoc = $(nombre_desc).val();
        _sDescDoc = _sDescDoc.trim();

        if (_sDescDoc == "") {

            var _Style = $(nombre_desc).attr("style");
            _Style += "border: 2px solid red;";
            $(nombre_desc).attr("style", _Style);
            MensajeError("Introduzca la descripción del documento.");
            return;
        }
        var _Style = $(nombre_desc).attr("style");
        _Style = _Style.replace("border: 2px solid red;", "");
        $(nombre_desc).attr("style", _Style);

        if (_sNomDoc == "") {

            var _Style = $(nombre_doc).attr("style");
            _Style += "border: 2px solid red;";
            $(nombre_doc).attr("style", _Style);
            MensajeError("Seleccione un documento.");
            return;
        }
        var _Style = $(nombre_doc).attr("style");
        _Style = _Style.replace("border: 2px solid red;", "");
        $(nombre_doc).attr("style", _Style);



        //Ver ID de la tabla, cambiarla
        con_filas = $(nombre_tabla + "> tbody > tr").length;

        var nom_id_completo = nombre_id_fila + (con_filas + 1);
        var nom_id_eli_comp = nombre_elim_reg + (con_filas + 1);
        var nom_id_ver_comp = nombre_ver_doc + (con_filas + 1);

        var existe_nombre_docIrr = $("#Tdocumentos tr > td:contains('" + _sNomDoc + "')").length;
        var existe_nombre_docEv = $("#TdocEv tr > td:contains('" + _sNomDoc + "')").length;

        $(nombre_tabla + " > tbody > tr > td").css("background", "white");

        if (existe_nombre_docIrr == 0 && existe_nombre_docEv == 0) {

            var _sHTML = "<tr id=\"" + nom_id_completo + "\"  class=\"" + _sEstiloFilaAlterna + "\" style=\"font-size:11px;\">" +
                "<td style=\"display:none;\">" + $(_Main + "HDRutaServ").val() + "\\" + $(_Main + "HDLlaveDenuncia").val() + "\\" + _sNomDoc + "</td>" +
                "<td>" + _sNomDoc + "</td>" +
                "<td>" + _sDescDoc + "<input type=\"hidden\" id=\"" + nombre_ruta + (con_filas + 1) + "\" value=\"" + $(_Main + "HDRutaServ").val() + "\\" + $(_Main + "HDLlaveDenuncia").val() + "\\" + _sNomDoc + "\" ></td>" +
                "<td align=\"center\"> <button id=\"" + nom_id_eli_comp + "\" onclick=\"javascript: EliminarDocTabla('#" + nom_id_completo + "','" + nombre_tabla + "','" + nombre_dv + "'); return false;\"  ></button></td>" +
                "<td align=\"center\"> <button id=\"" + nom_id_ver_comp + "\" onclick=\"javascript: VerDocumentoTab(0,'" + ($(_Main + "HDRutaServ").val() + "\\" + $(_Main + "HDLlaveDenuncia").val() + "\\" + _sNomDoc).replace(/\\/g, "#") + "'); return false;\"  ></button></td>" +
                "</tr>";

            $(nombre_tabla + " tbody").append(_sHTML);
            $(nombre_desc).val("");
            $(nombre_doc).text("");

            $("#" + nom_id_eli_comp).button({
                icons: {
                    primary: 'ui-icon-trash'
                }

            }).css("height", '28px').css("width", "30px");

            $("#" + nom_id_ver_comp).button({
                icons: {
                    primary: ' ui-icon-search'
                }

            }).css("height", '28px').css("width", "30px");


            con_filas = $(nombre_tabla + "> tbody > tr").length;
            if (con_filas > 0) {
                $(nombre_dv).show();
            }
        }
        else {

            if (existe_nombre_docIrr != 0) {
                $("#Tdocumentos tr > td:contains('" + _sNomDoc + "')").css("background", "#FFE8E8");
            }

            if (existe_nombre_docEv != 0) {
                $("#TdocEv tr > td:contains('" + _sNomDoc + "')").css("background", "#FFE8E8");
            }




        }

    }
    else if (_iOpcion  == 2) {

        var _sDescDoc = $(nombre_desc).val();
        _sDescDoc = _sDescDoc.trim();

        if (_sDescDoc == "") {

            var _Style = $(nombre_desc).attr("style");
            _Style += "border: 2px solid red;";
            $(nombre_desc).attr("style", _Style);
            MensajeError("Introduzca la descripción del documento.");
            return;
        }
        var _Style = $(nombre_desc).attr("style");
        _Style = _Style.replace("border: 2px solid red;", "");
        $(nombre_desc).attr("style", _Style);

        con_filas = $(nombre_tabla + "> tbody > tr").length;

        var nom_id_completo = nombre_id_fila + (con_filas + 1);
        var nom_id_eli_comp = nombre_elim_reg + (con_filas + 1);

        $(nombre_tabla + " > tbody > tr > td").css("background", "white");

        var existe_entidad = $(nombre_tabla + " tr > td:contains('" + _sNomDoc + "')").length;

        if (existe_entidad == 0) {

            var _sHTML = "<tr id=\"" + nom_id_completo + "\"  class=\"" + _sEstiloFilaAlterna + "\" style=\"font-size:11px;\">" +
                "<td>" + _sDescDoc + "</td>" +
                "<td align=\"center\"> <button id=\"" + nom_id_eli_comp + "\" onclick=\"javascript: EliminarDocTabla('#" + nom_id_completo + "','" + nombre_tabla + "','" + nombre_dv + "'); return false;\"  ></button></td>" +
                "</tr>";

            $(nombre_tabla + " tbody").append(_sHTML);
            $(nombre_desc).val("");
            $(nombre_doc).text("");

            $("#" + nom_id_eli_comp).button({
                icons: {
                    primary: 'ui-icon-trash'
                }

            }).css("height", '28px').css("width", "30px");

            con_filas = $(nombre_tabla + "> tbody > tr").length;
            if (con_filas > 0) {
                $(nombre_dv).show();
            }
        }
        else
        {

            $(nombre_tabla + " tr > td:contains('" + _sNomDoc + "')").css("background", "#FFE8E8");

        }
    }

    
    
    //limpiarCamposDoc(_iOpcion);

}


function agregarDocumentosConsulta(_iOpcion, aDatos) {

    var con_filas = 0;
    var nombre_tabla = "";
    var nombre_dv = "";
    var nombre_id_fila = "";
    var nombre_elim_reg = "";
    var nombre_ruta = "";

    var _sEstiloFilaAlterna = "ItemStyleClass";

    switch (_iOpcion) {

        case 0:
            nombre_dv = _Main + "dvListaDocumentos";
            nombre_tabla = "#Tdocumentos";
            nombre_id_fila = "trNivelDoc";
            nombre_elim_reg = "btnElimDoc";
            nombre_ruta = "inRutaDoc";
            nombre_ver_doc = "btnVerDoc";

            break;

        case 1:
            nombre_dv = _Main + "dvListaDocEv";
            nombre_tabla = "#TdocEv";
            nombre_id_fila = "trNivelEv";
            nombre_elim_reg = "btnEliEv";
            nombre_ruta = "inRutaEv";
            nombre_ver_doc = "btnVerEv";
            break;

        case 2:
            nombre_dv = _Main + "dvEntidadesDen";
            nombre_tabla = "#TEntidades";
            nombre_desc = _Main + "txtEntInvolucrada";
            nombre_id_fila = "trNivelEnt";
            nombre_elim_reg = "btnEliEnt";

            break;
    }

    $(nombre_tabla + " tbody").empty();

    for (var i = 0; i < aDatos.length; i++) {

        if (_iOpcion == 0 || _iOpcion == 1) {

            var sDatosA = aDatos[i].split("#");

            var _sNomDoc = sDatosA[0];
            var _sDescDoc = sDatosA[1];

            //Ver ID de la tabla, cambiarla
            con_filas = $(nombre_tabla + "> tbody > tr").length;

            var nom_id_completo = nombre_id_fila + (con_filas + 1);
            var nom_id_eli_comp = nombre_elim_reg + (con_filas + 1);
            var nom_id_ver_comp = nombre_ver_doc + (con_filas + 1);

            $(nombre_tabla + " > tbody > tr > td").css("background", "white");

            var _sHTML = "<tr id=\"" + nom_id_completo + "\"  class=\"" + _sEstiloFilaAlterna + "\" style=\"font-size:11px;\">" +
                "<td style=\"display:none;\"></td>" +
                "<td>" + _sNomDoc + "</td>" +
                "<td>" + _sDescDoc + "</td>" +
                "<td align=\"center\"> <button id=\"" + nom_id_eli_comp + "\" onclick=\"javascript: EliminarDocTabla('#" + nom_id_completo + "','" + nombre_tabla + "','" + nombre_dv + "'); return false;\"  ></button></td>" +
                "<td align=\"center\"> <button id=\"" + nom_id_ver_comp + "\" onclick=\"javascript: VerDocumentoTab(" + sDatosA[2] + ",''); return false;\"  ></button></td>" +
                "</tr>";

            $(nombre_tabla + " tbody").append(_sHTML);

            $("#" + nom_id_eli_comp).button({
                icons: {
                    primary: 'ui-icon-trash'
                }

            }).css("height", '28px').css("width", "30px");

            $("#" + nom_id_ver_comp).button({
                icons: {
                    primary: ' ui-icon-search'
                }

            }).css("height", '28px').css("width", "30px");

            con_filas = $(nombre_tabla + "> tbody > tr").length;
            if (con_filas > 0) {
                $(nombre_dv).show();
            }

        }
        else if (_iOpcion == 2) {

            //Ver ID de la tabla, cambiarla
            con_filas = $(nombre_tabla + "> tbody > tr").length;

            var nom_id_completo = nombre_id_fila + (con_filas + 1);
            var nom_id_eli_comp = nombre_elim_reg + (con_filas + 1);

            $(nombre_tabla + " > tbody > tr > td").css("background", "white");

            var _sHTML = "<tr id=\"" + nom_id_completo + "\"  class=\"" + _sEstiloFilaAlterna + "\" style=\"font-size:11px;\">" +
                "<td>" + aDatos[i] + "</td>" +
                "<td align=\"center\"> <button id=\"" + nom_id_eli_comp + "\" onclick=\"javascript: EliminarDocTabla('#" + nom_id_completo + "','" + nombre_tabla + "','" + nombre_dv + "'); return false;\"  ></button></td>" +
                "</tr>";

            $(nombre_tabla + " tbody").append(_sHTML);

            $("#" + nom_id_eli_comp).button({
                icons: {
                    primary: 'ui-icon-trash'
                }

            }).css("height", '28px').css("width", "30px");

            con_filas = $(nombre_tabla + "> tbody > tr").length;
            if (con_filas > 0) {
                $(nombre_dv).show();
            }

        }

        
        
        

    }

    


}

function EliminarDocTabla(_sIdFilaRemover, _sTabla, _dvTabla) {
    var con_filas = 0;

    $(_sIdFilaRemover).remove();
    con_filas = $(_sTabla + "> tbody > tr").length;

    if (con_filas == 0) {
        $(_dvTabla).hide();
    }

}

function fGuardaDenuncia() {

    try {


        var _sValoresHechos = "";
        var _sValoresDocPres = "";
        var _sValoresDocEv = "";
        var _sValoresEntidades = "";
        var _sPSWDenunciante = "";

        $(_Main + "hdnPGuarda").val(0);

        //Obtener información de los hechos de denuncias

        $('input[id*=' + _Main.replace("#", "") +'chbHechos]').each(function () {
            _sValoresHechos += (this.checked ? $(this).val() + "," : "");
        });

        if (_sValoresHechos == "") {
            MensajeError("Debe seleccionar mínimo un hecho.");
            return;
        }

        _sValoresHechos = _sValoresHechos.substr(0, _sValoresHechos.length - 1);

        var _aValoresHechos = _sValoresHechos.split(",");
        var _aHechos = new Array();

        for (var i = 0; i < _aValoresHechos.length; i++) {

            _aHechos[i] = _aValoresHechos[i];

        }



        // Cuentas Publicas

        var _aLlaveCP = new Array;

        for (i = 0; i < $(_Main + "lbxCPSeleccionados option").length; i++) {

            _aLlaveCP[i] = $(_Main + "lbxCPSeleccionados option")[i].value;           
        }




        //Obtener información de Documentos de presuntos hechos irregulares 
        $("#Tdocumentos > tbody  > tr").each(function (index, data) {
            _sValoresDocPres += data.cells[0].innerText.replace(/\\/g, "//") + "#" + data.cells[1].innerText + "#" + data.cells[2].innerText + "$";
        });

        var _aDocPres = new Array();

        if (_sValoresDocPres.length > 0) {
            _sValoresDocPres = _sValoresDocPres.substr(0, _sValoresDocPres.length - 1);

            var _aValoresDocPres = _sValoresDocPres.split("$");

            for (var i = 0; i < _aValoresDocPres.length; i++) {

                _aDocPres[i] = _aValoresDocPres[i];

            }
        }

        //Obtener información de Documentos de Evidencia 
        $("#TdocEv > tbody  > tr").each(function (index, data) {
            _sValoresDocEv += data.cells[0].innerText.replace(/\\/g, "//") + "#" + data.cells[1].innerText + "#" + data.cells[2].innerText + "$";
        });

        var _aDocEv = new Array();

        if (_sValoresDocEv.length > 0) {
            _sValoresDocEv = _sValoresDocEv.substr(0, _sValoresDocEv.length - 1);

            var _aValoresDocEv = _sValoresDocEv.split("$");

            for (var i = 0; i < _aValoresDocEv.length; i++) {

                _aDocEv[i] = _aValoresDocEv[i];

            }
        }

        //Obtener información de Entidades Involucradas

        var _lValorNivelGobierno = 0;

        $('input[id*=rNG-]').each(function () {

            if (this.checked) {

                _lValorNivelGobierno = this.value;

            }

        });

        $("#TEntidades > tbody  > tr").each(function (index, data) {
            _sValoresEntidades +=  data.cells[0].innerText + "$";
        });

        var _aEntidades = new Array();

        if (_sValoresEntidades.length > 0) {
            _sValoresEntidades = _sValoresEntidades.substr(0, _sValoresEntidades.length - 1);

            var _aValoresEntidades = _sValoresEntidades.split("$");

            for (var i = 0; i < _aValoresEntidades.length; i++) {

                _aEntidades[i] = _aValoresEntidades[i];

            }
        }


        
        _sPSWDenunciante = $(_Main + "txtPSW").val();

        _oData = "{ _plLlaveDenuncia: " + $(_Main + "HDLlaveDenuncia").val() +
            ", _plLlaveTipoDenuncia: " + $(_Main + "HDLlaveTipoDenuncia").val() +
            ", _plNivelGobierno:" + _lValorNivelGobierno +  
            ", _poArrLlavesHechos:" + (_aHechos.length == 0 ? null : JSON.stringify(_aHechos)) +
            ", _poArrLlavesCP:" + (_aLlaveCP.length == 0 ? null : JSON.stringify(_aLlaveCP)) +
            ", _poArrDocPres:" + (_aDocPres.length == 0 ? null : JSON.stringify(_aDocPres)) +
            ", _poArrDocEv:" + (_aDocEv.length == 0 ? null : JSON.stringify(_aDocEv)) +
            ", _poArrEntidades:" + (_aEntidades.length == 0 ? null : JSON.stringify(_aEntidades)) +
            ", _psObjetosDenunciados: '" + $(_Main + "txtObjetoDenunciado").val() + "'" +
            ", _piOrigenRecursos: " + $(_Main + "ddlOrigenRecursos").val() + 
            ", _psPSWDenunciante: '" + _sPSWDenunciante + "'" +
            "}";
        
        

        _oAJAX = $.ajax({
            type: "POST",
            url: _AjaxURL + "/AJAX_RegistraDatosDenun",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1)
            {
                

                var ADatos = data.d.split("ß");

                if ($(_Main + "HDLlaveDenuncia").val() == 0) {

                   // MensajeOk("El folio es: " + ADatos[1]);

                    MensajeRegistroOK(ADatos[1], ADatos[3]);

                    Habilitardeshabilitar2Secc(false);

                }
                else {
                    MensajeOk("Datos registrados correctamente");
                }

                $(_Main + "HDLlaveDenuncia").val(ADatos[2]);

                

                consultaFolio();

                    //$("#Tdocumentos > tbody  > tr").each(function (index, data) {
                    //    data.cells[0].innerText= "";
                    //});

                    //$("#TdocEv > tbody  > tr").each(function (index, data) {
                    //    data.cells[0].innerText = "";
                    //});

               
                

            }

            else {

                MensajeError(data.d);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {

            MensajeError("Error al traer los datos [AJAX_RegistraDatosDenun]");
        });
      
        



    } catch (err) {

        alert("[guardaSegSeccion.click - (Reday)] \n" + err.message);
    }


}

// DPR - Control de la selección de las CP

function AgregaRemueveCP(_iOperacion) {

    switch (_iOperacion) {
        case 0:

            if ($(_Main + "lbxCP option:selected").val() == undefined || $(_Main + "lbxCP option:selected").val() == "") {
                $(_Main + "lbxCP").css("border-color", "red");
                return false;
            }

            $(_Main + "lbxCP").css("border-color", "");


            var val_cp = $(_Main + "lbxCP option:selected").val();
            var txt_cp = $(_Main + "lbxCP option:selected").text();

            $(_Main + "lbxCP option:selected").remove();

            if ($(_Main + "lbxCPSeleccionados option[value='" + val_cp + "']").length == 0) {
                $(_Main + "lbxCPSeleccionados").append($("<option     />").val(val_cp).text(txt_cp));

                var $selectlbxOptions = $(_Main + "lbxCPSeleccionados option");
                $selectlbxOptions.sort(function (a, b) {
                    if (a.text > b.text) return -1;
                    if (a.text == b.text) return 0;
                    return 1;
                });
                $($selectlbxOptions).remove();
                $(_Main + "lbxCPSeleccionados").append($($selectlbxOptions));

            }

            break;



        case 1:

            if ($(_Main + "lbxCPSeleccionados option:selected").val() == undefined || $(_Main + "lbxCPSeleccionados option:selected").val() == "") {
                $(_Main + "lbxCPSeleccionados").css("border-color", "red");
                return false;
            }

            $(_Main + "lbxCPSeleccionados").css("border-color", "");


            var val_cp = $(_Main + "lbxCPSeleccionados option:selected").val();
            var txt_cp = $(_Main + "lbxCPSeleccionados option:selected").text();

            $(_Main + "lbxCPSeleccionados option:selected").remove();

            if ($(_Main + "lbxCP option[value='" + val_cp + "']").length == 0) {
                $(_Main + "lbxCP").append($("<option     />").val(val_cp).text(txt_cp));

                var $selectlbxOptions = $(_Main + "lbxCP option");
                $selectlbxOptions.sort(function (a, b) {
                    if (a.text > b.text) return -1;
                    if (a.text == b.text) return 0;
                    return 1;
                });
                $($selectlbxOptions).remove();
                $(_Main + "lbxCP").append($($selectlbxOptions));
            }

            break;

        case 2:

            for (i = 0; i < $(_Main + "lbxCP option").length; i++) {

                var val_cp = $(_Main + "lbxCP option")[i].value;
                var txt_cp = $(_Main + "lbxCP option")[i].text;

                if ($(_Main + "lbxCPSeleccionados option[value='" + val_cp + "']").length == 0) {
                    $(_Main + "lbxCPSeleccionados").append($("<option     />").val(val_cp).text(txt_cp));

                    var $selectlbxOptions = $(_Main + "lbxCPSeleccionados option");
                    $selectlbxOptions.sort(function (a, b) {
                        if (a.text > b.text) return -1;
                        if (a.text == b.text) return 0;
                        return 1;
                    });
                    $($selectlbxOptions).remove();
                    $(_Main + "lbxCPSeleccionados").append($($selectlbxOptions));

                }

            }

            $(_Main + "lbxCP").empty();

            break;

        case 3:

            for (i = 0; i < $(_Main + "lbxCPSeleccionados option").length; i++) {

                var val_cp = $(_Main + "lbxCPSeleccionados option")[i].value;
                var txt_cp = $(_Main + "lbxCPSeleccionados option")[i].text;

                if ($(_Main + "lbxCP option[value='" + val_cp + "']").length == 0) {
                    $(_Main + "lbxCP").append($("<option     />").val(val_cp).text(txt_cp));

                    var $selectlbxOptions = $("#lbxCP option");
                    $selectlbxOptions.sort(function (a, b) {
                        if (a.text > b.text) return -1;
                        if (a.text == b.text) return 0;
                        return 1;
                    });
                    $($selectlbxOptions).remove();
                    $(_Main + "lbxCP").append($($selectlbxOptions));

                }

            }

            $(_Main + "lbxCPSeleccionados").empty();

            break;
    }



}

function VerDocumentoTab(_lLlaveDocumento, _sRutaDocumento) {

    $(_Main + "HDLlaveDocumento").val("0");

    $(_Main + "HDVerLlaveDoc").val(_lLlaveDocumento);
    $(_Main + "HDVerRutaDoc").val(_sRutaDocumento.replace(/#/g,"\\"));


    __doPostBack('btnVerDocumento', 'CLICK');

}

function fVerificaReCaptcha() {

    try {



        _oData = null;
        _oData = "{ _sResponse: '" + grecaptcha.getResponse() + "', _psCvePrivada: '" + $(_Main + "hdnCvePrivadaReCaptcha").val() + "' }";


        _oAJAX = $.ajax({
            type: "POST",
            url: _AjaxURL + "/AJAX_verificaReCaptcha",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

            let _aResp2 = JSON.parse(data.d);

            if (_aResp2.success) {

                fGuardaDenuncia();

            } else {

                MensajeError("[fVerificaReCaptcha] - \n Captcha incorrecto, intente de nuevo.");

            }

        }).fail(function (jqXHR, textStatus, errorThrown) {

            MensajeError("[fVerificaReCaptcha] - \n Error al verificar el Captcha");
        });



    } catch (err) {

        alert("[guardaSegSeccion.click - (Reday)] \n" + err.message);
    }


}


function fGuarda() {

    try {


        if ($(_Main + "hdnPGuarda").val() == 0) {

            fVerificaReCaptcha();

        }
        else {
            fGuardaDenuncia();
        }


    } catch (err) {

        alert("[fGuarda] \n" + err.message);
    }


}


var onloadCallback = function () {
    grecaptcha.render(document.getElementById('ckCaptcha'), {
        'sitekey': $(_Main + "hdnCvePublicaReCaptcha").val()
    });
};

function fValidarDenuncia() {

    _oData = "{ plLlaveDenuncia: " + $(_Main + "HDLlaveDenuncia").val() + "}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: _AjaxURL + "/AJAX_validacionDenuncia",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    envioDenuncia();

                }

                else {

                    MensajeError(data.d);
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_cargaCatalogo()]");
            });

    }
    catch (err) {
        alert("[cargaCatalogo] \n" + err.message);

    }

}

function envioDenuncia() {

    _oData = "{ plLlaveDenuncia: " + $(_Main + "HDLlaveDenuncia").val() + "}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: _AjaxURL + "/AJAX_envioDenuncia",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    MensajeOk("Denuncia enviada correctamente");

                }

                else {

                    MensajeError(data.d);
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX_cargaCatalogo()]");
            });

    }
    catch (err) {
        alert("[cargaCatalogo] \n" + err.message);

    }

}

function MensajeRegistroOK(_psFolio, _psVencimiento) {

    
    try {

        //$("#dvControlPopup-Den").height($(document).height());
        //$("#dvControlPopup-Den").show();
               

        $(_Main + "dvRegistroDen").attr("title", "Folio de Registro de la Denuncia");
        $(_Main + "lblRDFolio").text(_psFolio);
        $(_Main + "lblRDVencimiento").text("El plazo para concluir el registro de su denuncia vence el " + _psVencimiento);
        $("#load").dialog("close");

        $(_Main + "dvRegistroDen").dialog({
            open: function () { $(".ui-dialog-titlebar-close").hide(); },
            resizable: false,
            width: 700,
            height: 200,            
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Aceptar": function () {
                    $(_Main + "dvRegistroDen").dialog("close");                    
                    //$(_Main + "dvControlPopup-Den").hide();
                }
            },
            close: function () {
                $(_Main + "dvRegistroDen").dialog("close");
                //$("#dvControlPopup-Den").hide();
            }
        });
    }
    catch (err) {
        alert("[MensajeRegistroOK] \n" + err.message);
    }

}