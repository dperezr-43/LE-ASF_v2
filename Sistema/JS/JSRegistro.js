_oAJAX = null;

var _Main = '#MainContent_';

$(document).ready(function () {

    MensajeOk("Hola", "ss");

    $('#dvSiAnonima, #dvDenunciaRegistro, #MainContent_dvLogFolio').hide();

    $("body").on("click", ".fManualInfografia", function () {


        try {

            fMuestraDocumento('../../Archivos/PDF/Infograma_v1.pdf', 'Infograma', 900, 800);


        } catch (err) {

            alert("[Visualizar Manual o Infograma] \n" + err.message);
        }


    });







    $('.fToolLFRCF').prop('title', 'El ejercicio fiscal 2020 está siendo auditado por la ASF. Por disposición legal(artículo 59 de la LFRCF), dicho ejercicio no es susceptible de reportar denuncias fundamentadas en el Título Cuarto de la Ley citada.');

    $('.fToolLFRCArt61').prop('title', 'De acuerdo con la Ley de Fiscalización y Rendición de Cuentas de la Federación (artículo 61), su denuncia debe hacer referencia a alguno de los siguientes supuestos de presuntos daños o perjuicios a la Hacienda Pública Federal o al patrimonio de los entes públicos. Clic en el ícono para ver el tutorial');

    setTimeout(function () {
        $('[data-toggle="tooltip"]').tooltip();
    }, 3000);



    $("body").on("click", "input[name*='rblDenunciaAnonima']", function () {

        try {

            let _sNomControl = "#Denuncia_no_anonima";

            $("#MainContent_HDLlaveTipoDenuncia").val($(this).val());

            $(this).val() == '1' ? $(_sNomControl).addClass("OcultaSeccion") : $(_sNomControl).removeClass("OcultaSeccion");
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



    //var _NomControl = _Main + 'chbHechos';
    //var _NContenedeor = _Main + 'dvchbHechos';

    //_oAJAX = null;
    //cargaCatalogo('STD1', 'chk', _NomControl, _NContenedeor, 16);

    //if (_oAJAX != null) {

    //    $.when(_oAJAX).done(function (data, textStatus, jqXHR) {

    //        if (String(data.d).indexOf("Error") == -1) {

    //            _NomControl = 'NivelGobierno';
    //            _NContenedeor = '#NivelGobierno';

    //            _oAJAX = null;
    //            cargaCatalogo('NG', 'rbl', _NomControl, _NContenedeor, 0);

    //            if (_oAJAX != null) {

    //                $.when(_oAJAX).done(function (data, textStatus, jqXHR) {

    //                    _NContenedeor = _Main + 'ddlCP';
    //                    _NomControl = '';

    //                    _oAJAX = null;
    //                    cargaCatalogo('CP', 'ddl', _NomControl, _NContenedeor, 0);

    //                });
    //            }

    //            cargaCatalogoHechos();


    //        }
    //    });
    //}

    $("#aLinkRD").click(function () {

        var _NomControl = _Main + 'chbHechos';
        var _NContenedeor = _Main + 'dvchbHechos';

        _oAJAX = null;
        cargaCatalogo('STD1', 'chk', _NomControl, _NContenedeor, 16);

    });

    $("body").on("click", "input[name*='btnSegconsulta']", function () {

        try {

            ConsultaSeguimiento();


        } catch (err) {

            alert("[btnSegconsulta.click - (Reday)] \n" + err.message);
        }


    });

    $("body").on("click", "input[name*='btnGuardaDenuncia']", function () {

        try {

            var _sValores = "";

            $('input[id*=MainContent_chbHechos]').each(function () {
                _sValores += (this.checked ? $(this).val() + "," : "");
            });

            if (_sValores == "") {
                MensajeError("Debe seleccionar mínimo un hecho.");
                return;
            }

            _sValores = _sValores.substr(0, _sValores.length - 1);

            var _aValores = _sValores.split(",");
            var _aHechos = new Array();

            for (var i = 0; i < _aValores.length; i++) {

                _aHechos[i] = _aValores[i];

            }

            

            _oData = "{ _plLlaveDenuncia: " + $("#MainContent_HDLlaveDenuncia").val() +
                ", _plLlaveTipoDenuncia: " + $("#MainContent_HDLlaveTipoDenuncia").val() +
                ", _poArrLlavesHechos:" + (_aHechos.length == 0 ? null : JSON.stringify(_aHechos) ) +
                     "}";



            _oAJAX = $.ajax({
                type: "POST",
                url: "Registro.aspx/AJAX_RegistraHechos",
                data: _oData,
                contentType: "application/json; charset=utf-8",
                dataType: "json"

            })

                .done(function (data, textStatus, jqXHR) {

                    if (String(data.d).indexOf("Error") == -1) {


                        var _aResp = String(data.d).split(",");

                        if (_aResp[0] == 1) {


                            MensajeOk("El folio es: " + _aResp[1]);
                            $("#HDFolio").val(_aResp[0]);
                            Habilitardeshabilitar2Secc(false);

                        }
                        else {
                            MensajeError(_aResp[1]);

                        }

                    }

                    else {

                        MensajeError("Hubo un error al traer los datos.")
                    }
                })

                .fail(function (jqXHR, textStatus, errorThrown) {

                    MensajeError("Error al traer los datos [AJAX.AJAX_RegistraHechos]");
                });



        } catch (err) {

            alert("[btnGuardaDenuncia.click - (Reday)] \n" + err.message);
        }


    });


}); // Fin ready



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


var onloadCallback = function () {
    grecaptcha.render(document.getElementById('ckCaptcha'), {
        'sitekey': $("#hdnCvePublicaReCaptcha").val()
    });
};




function cargaCatalogo(_pClaveCatalogo, _pTipo, _pNomControl, _pContenedor, _pLlaveCatTipo) {

    _oData = "{_psClaveCatalogo:'" + _pClaveCatalogo + "', _plLlaveTipoCat: " + _pLlaveCatTipo+"}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            //url: "Denuncias_IV.aspx/AJAX_cargaCP",
            url: "Registro.aspx/AJAX_traeCatalogo",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {


                    switch (_pTipo) {

                        case 'ddl':

                            $(_pNomControl).empty();

                            $.each(data.d, function () {
                                $(_pNomControl).append($("<option     />").val(this.Llave).text(this.Texto));
                            });

                            break;

                        case 'rbl':


                            var table = $('<table></table>');
                            var counter = 0;
                            $(data.d).each(function () {
                                table.append($('<tr></tr>').append($('<td></td>').append($('<input>').attr({
                                    type: 'radio', name: 'rb' + _pNomControl, value: this.Llave, id: 'r' + _pClaveCatalogo + '-' + counter, class: 'css-' + _pClaveCatalogo
                                })).append(
                                    $('<label>').attr({
                                        for: 'rb' + _pNomControl + counter++
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
                                    type: 'checkbox', name: _pNomControl.replace("#", "") + "_" + counter, value: this.Llave, id: _pNomControl.replace("#", "") + "_" + counter
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

                    MensajeError("Hubo un error al traer los datos.")
                }
            })

            .fail(function (jqXHR, textStatus, errorThrown) {

                MensajeError("Error al traer los datos [AJAX.cargaCP()]");
            });

    }
    catch (err) {
        alert("[cargaCP] \n" + err.message);

    }

}



function ConsultaSeguimiento(_sFilio, _sPassword) {

    _oData = "{ _psFolio:'" + $("#MainContent_txtSegFolio").val() + "'" +
        ", _psPassword: '" + $("#MainContent_txtSegPsw").val() + "'" +
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

                MensajeOk(data.d);
                //$("#MainContent_dvOficioProcedencia").dialog("close");
                //limpiarfiltros();
                //reseteoFiltros();
                //consultaRegDenuncias();

            }

            else {

                MensajeError("Hubo un error al traer los datos.");
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

    $("#MainContent_ddlCP,#MainContent_txtRegDescArchivo,#imgRegDescArchivo,#MainContent_txtDescArchivo,#imgDescArchivo,#MainContent_txtCargarArchivo,#imgCargarArchivo,#MainContent_txtDescCargaArchivo,#imgDescCargaArchivo,#MainContent_ddlEntidadInvolucrada,#imAddEntInv,#imgElimEntInv,#MainContent_txtObjetoDenunciado,#MainContent_ddlOrigenRecursos").prop("disabled", _bDisable);

}

function seguimiento() {


    $("#MainContent_txtLogFolio").val("");
    $("#MainContent_txtLogPass").val("");

    $("#MainContent_dvLogFolio").dialog({
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

    var _sLogFolio = $("#MainContent_txtLogFolio").val();
    _sLogFolio = _sLogFolio.trim();

    var _sLogPass = $("#MainContent_txtLogPass").val();
    _sLogPass = _sLogPass.trim();

    if (_sLogFolio == "") {

        var _Style = $("#MainContent_txtLogFolio").attr("style");
        _Style += "border: 2px solid red;";
        $("#MainContent_txtLogFolio").attr("style", _Style);
        MensajeError("Introduce el folio");
        return;
    }

    var _Style = $("#MainContent_txtLogFolio").attr("style");
    _Style = _Style.replace("border: 2px solid red;", "");
    $("#MainContent_txtLogFolio").attr("style", _Style);

    if (_sLogPass == "") {

        var _Style = $("#MainContent_txtLogPass").attr("style");
        _Style += "border: 2px solid red;";
        $("#MainContent_txtLogPass").attr("style", _Style);

        MensajeError("Introduce la contraseña");
        return;
    }

    var _Style = $("#MainContent_txtLogPass").attr("style");
    _Style = _Style.replace("border: 2px solid red;", "");
    $("#MainContent_txtLogPass").attr("style", _Style);
    

    consultaFolio();

}

function consultaFolio() {

    _oData = "{ _psFolio:'" + $("#MainContent_txtLogFolio").val() + "'" +
        ", _psPassword: '" + $("#MainContent_txtLogPass").val() + "'" +
        "}";


    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Registro.aspx/AJAX_ConsultaInfoDenunciaFP",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1) {

                //MensajeOk(data.d);
                //$("#MainContent_dvOficioProcedencia").dialog("close");
                //limpiarfiltros();
                //reseteoFiltros();
                //consultaRegDenuncias();
                //Primero almacena los datos de Hechos de Denuncias


                var _sValoresHechosDen = "";

                $(data.d).each(function () {

                    if (this._lOrden == 1) {

                        _sValoresHechosDen += this._lLlaveCat + "#";

                    }

                });


                $.each($("input[name*=MainContent_chbHechos]"), function () {

                    var _sVal = this.value;

                    if (_sValoresHechosDen.indexOf(_sVal + "#") != -1) {

                        this.checked = true;

                    }

                });


                $("#MainContent_HDFolio").val($("#MainContent_txtLogFolio").val());
                $("#MainContent_HDLlaveDenuncia").val(data.d[0]._lLlaveDenuncia);

                $("#MainContent_txtLogFolio").val("");
                $("#MainContent_txtLogPass").val("");
                $("#MainContent_dvLogFolio").dialog("close");

            }

            else {

                MensajeError("Hubo un error al traer los datos.");
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
