_oAJAX = null;

var _Main = '#MainContent_';

$(document).ready(function () {

    $('#dvSiAnonima, #dvDenunciaRegistro').hide();

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

    // para llenar lista de checks con HECHOS DE LA DENUNCIA
    var _NomControlCHB = _Main + 'chbHechosD';
    var _NContenedeorCHB = '';

    _oAJAX = null;
    cargaCatalogo('STD1', 'chb', _NomControlCHB, _NContenedeorCHB, 16);

    if (_oAJAX != null) {

        $.when(_oAJAX).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1) {

                let _NomControl = _Main + 'chbHechosD';
                _NContenedeor = '';
            }
        });
    }

    // para llenar combo de EJERCICIOS FICALES
    var _NomControl = _Main + 'ddlCP';
    var _NContenedeor = '';

    _oAJAX = null;
    cargaCatalogo('CP', 'ddl', _NomControl, _NContenedeor, 0);

    if (_oAJAX != null) {

        $.when(_oAJAX).done(function (data, textStatus, jqXHR) {

            if (String(data.d).indexOf("Error") == -1) {

                let _NomControl = _Main + 'ddlOrigenRecursos';
                _NContenedeor = '';

                _oAJAX = null;
                cargaCatalogo('STD', 'ddl', _NomControl, _NContenedeor, 9); // para llenar combo de ENTIDADES
            }
        });
    }     

}); // Fin ready



function fMuestraDocumento( _sRuta, _sTitulo, _iBase, _iAltura ) {

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




function cargaCatalogo(_pClaveCatalogo, _pTipo, _pNomControl, _pContenedor, _pLlaveCatalogo ) {

    _oData = "{_pClaveCatalogo:'" + _pClaveCatalogo + "', _pTipoCatalogo:" + _pLlaveCatalogo + " }";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Denuncias_IV.aspx/AJAX_cargaCatalogo",
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
                                table.append($('<tr></tr>').append($('<td></td>').append($('<input">').attr({
                                    type: 'radio', name: 'rb' + _pNomControl, value: this.Llave, id: 'r' + _pClaveCatalogo + '-' + counter, class: 'css-' + _pClaveCatalogo 
                                })).append(
                                    $('<label>').attr({
                                        for: 'rb' + _pNomControl + counter++
                                    }).text(this.Texto))));
                            });

                            $(_pContenedor).append(table);

                            break;

                        case 'chb':
                            $(_pNomControl).empty();
                            var items = '';
                            var table = "<table>"; // $('<table></table>');
                            var counter = 0;

                            $.each(data.d, function () {
                                items += "<tr><td><input name = ListHechos[] type = checkbox value = '" + this.Llave + "' ><b> " + this.Texto + "</b></input></td></tr>"
                            });
                            table = table + items + "</table>"
                            $(_pNomControl).html(table);

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
