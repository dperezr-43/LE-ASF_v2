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




    $("input[id*=rblDenunciaAnonima]").change(function () {
        
        try {

            let _sNameDiv = '#dvSiAnonima';

            ($(this).val() === '1' ? $(_sNameDiv).show() : $(_sNameDiv).hide());

          
        }
        catch (err) {
            alert("[rblDenunciaAnonima.change] \n" + err.message);
        }

      
    });




    $('.fToolLFRCF').prop('title', 'El ejercicio fiscal 2020 está siendo auditado por la ASF. Por disposición legal(artículo 59 de la LFRCF), dicho ejercicio no es susceptible de reportar denuncias fundamentadas en el Título Cuarto de la Ley citada.');

    $('.fToolLFRCArt61').prop('title', 'De acuerdo con la Ley de Fiscalización y Rendición de Cuentas de la Federación (artículo 61), su denuncia debe hacer referencia a alguno de los siguientes supuestos de presuntos daños o perjuicios a la Hacienda Pública Federal o al patrimonio de los entes públicos. Clic en el ícono para ver el tutorial');

    setTimeout(function () {
        $('[data-toggle="tooltip"]').tooltip(); 
    }, 3000);


  


    //$("#btnContinuaDenuncia").click() {
    $("body").on("click", "input[name*='btnContinuaDenuncia']", function () {

        try {

            $('#otInfo').hide();
            $('#dvDenunciaRegistro').show();


        } catch (err) {

            alert("[btnContinuaDenuncia.click - (Reday)] \n" + err.message);
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


    cargaCP('NG');

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




function cargaCP(_pClaveCatalogo ) {

    _oData = "{_pClaveCatalogo:'" + _pClaveCatalogo + "'}";

    try {


        _oAJAX = $.ajax({
            type: "POST",
            url: "Denuncias_IV.aspx/AJAX_cargaCP",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        })

            .done(function (data, textStatus, jqXHR) {

                if (String(data.d).indexOf("Error") == -1) {

                    let _ddlCP = _Main + 'ddlCP';

                    $(_ddlCP).empty();

                    $.each(data.d, function () {
                        $(_ddlCP).append($("<option     />").val(this.Llave).text(this.Texto));
                    });



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
