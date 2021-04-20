var _aDtsDoctos = new Array();
var _iContDocs = 0;

var Collection = function ()
{
    this._lCount = 0;
    this._oData = {};
    this.add = function ( key, item )
    {
        if ( this._oData[key] != undefined )
            return undefined;
        this._oData[key] = item;
        return ++this._lCount
    }
    this.remove = function ( key )
    {
        if ( this._oData[key] == undefined )
            return undefined;
        delete this._oData[key]
        return --this._lCount
    }
    this.item = function ( key )
    {
        return this._oData[key];
    }
}

$( document ).keydown( function ( e )
{
    if ( e.keyCode == 8 && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA' )
    {
        e.preventDefault();
    }
} );
$( document ).ready( function ()
{
    $( document ).ajaxStart( function ()
    {
        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();
        $( "#diag-load" ).dialog( {
            dialogClass: "no-close",
            resizable: false,
            height: "auto",
            modal: true
        } );
    } );
    $( document ).ajaxStop( function ()
    {
        $( "#divControlPopupFondo" ).hide();
        $( "#diag-load" ).dialog( "close" );
    } );

    $( "#txtNombreDen" ).prop( "title", "Llenado opcional." );

    $( "#btnGuardar" ).button( {
        icons: {
            primary: "ui-icon-disk"
        }
    } );

    $( "#lAvanSigSecc" ).button( {
        icons: {
            primary: "ui-icon-arrowthick-1-s"
        }
    } );

    $( document ).tooltip( {
        track: true
    } );

    $( "#diag-load, #diag-error, #diag-ok, #dMje, #tAfecta, #tInfoAcre, #tRepoIrreg, #dSS, #tNomInfor" ).hide();

    //********************************************************
    //Archivos
    $( "#tblDocPorSubir" ).hide();
    $( "#tblbtnSube" ).hide();
    $( "#diag-upload" ).hide();
    $( "#dSubeArch" ).hide();

    
    //$( "#btnSubirArch" ).button( {
    //    icons: {
    //        primary: "ui-icon ui-icon-circle-plus"
    //    }
    //} );

    //$( "#btnSubirArch" ).on( "click", GuardarArchivos() );

    $( "#btnSubir" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    $( "#lSubArch" ).button( {
        icons: {
            primary: "ui-icon ui-icon-document"
        }
    } );

    $( "#lSubArch" ).prop( "title", "Puede complementar su denuncia, queja o sugerencia anexando documentos electrónicos." );

    $( "#btnSubir" ).click( function ()
    {
        $( "#flUp" ).trigger( 'click' );
    } );

    $( "#flUp" ).on( "change", PreparaArchivos );

    $( "#rdPropInfoSi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#dSubeArch" ).show();
        }
    } );

    $( "#rdPropInfoNo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#dSubeArch" ).hide();
        }
    } );

    //********************************************************

    $( "#rASi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tNomInfor" ).hide();
            $( "#txtNombreDen" ).val( "" );
        }
    } );

    $( "#rANo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tNomInfor" ).show();
        }
    } );

    $( "#rdInfoAcreSi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tInfoAcre" ).show();
        }
    } );

    $( "#rdInfoAcreNo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tInfoAcre" ).hide();
        }
    } );

    $( "#rdRepIrregSi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tRepoIrreg" ).show();
        }
    } );

    $( "#rdRepIrregNo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tRepoIrreg" ).hide();
        }
    } );

    $( "#chkEjecutandose" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "input[id*=txtFechaObra]" ).prop( "disabled", true );
            $( "input[id*=txtFechaObra]" ).val( "" );
        }
        else
        {
            $( "input[id*=txtFechaObra]" ).prop( "disabled", false );
            $( "input[id*=txtFechaObra]" ).val( "" );
        }
    } );

    $( "#txtFechaIrreg1, #txtFechaIrreg2" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy",
        onSelect: function ( dateText, inst )
        {
            if ( $( this ).prop( "id" ) == "txtFechaIrreg1" && $( "#txtFechaIrreg2" ).val() != "" )
            {
                if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) > $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaIrreg2" ).val() ) )
                {
                    MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
                    $( this ).val( "" );
                }
            }
            else if ( $( this ).prop( "id" ) == "txtFechaIrreg2" && $( "#txtFechaIrreg1" ).val() != "" )
            {
                if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) < $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaIrreg1" ).val() ) )
                {
                    MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
                    $( this ).val( "" );
                }
            }
        }
    } );

    $( "#ddlEntFed" ).change( function ()
    {
        if ( $( this ).val() != 0 )
        {
            cargaMunicipios( $( this ).val() );
        }
    } );

} );
function validaPrimSecc()
{
    try
    {

        if ( !$( "#rASi" ).prop( "checked" ) && !$( "#rANo" ).prop( "checked" ) )
        {
            MensajeError( "Debe detallar si desea que su denuncia sea anónima o no." );
            $( "#rASi" ).css( "border-color", "red" );
            $( "#rANo" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#rASi" ).css( "border-color", "" );
        $( "#rANo" ).css( "border-color", "" );

        if ( $( "#rANo" ).prop( "checked" ) && $( "#txtNombComp" ).val() == "" )
        {
            MensajeError( "Si no desea que su denuncia sea anónima debe proporcionar su nombre completo." );
            $( "#txtNombComp" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtNombComp" ).css( "border-color", "" );

        if ( $( "#txtDirDen" ).val() == "" )
        {
            $( "#divControlPopupFondo" ).height( $( document ).height() );
            $( "#divControlPopupFondo" ).show();

            $( "#lMje" ).text( "Puede no proporcionar su correo electrónico pero no podrá darle seguimiento a su denuncia." );

            $( "#dMje" ).dialog( {
                resizable: true,
                height: "auto",
                width: "auto",
                modal: true,
                dialogClass: "no-close",
                buttons: {
                    "Entiendo": function ()
                    {
                        $( "#dMje" ).dialog( "close" );
                    }
                },
                close: function ()
                {
                    $( "#divControlPopupFondo" ).hide();
                }
            } );
            $( "#txtDirDen" ).css( "border-color", "red" );
        }
        else if ( !validateEmail( $( "#txtDirDen" ).val() ) )
        {
            MensajeError( "Correo electrónico incorrecto." );
            $( "#txtDirDen" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtDirDen" ).css( "border-color", "" );
       

        $( "#dSS" ).show( "blind" );
        $( "#lAvanSigSecc" ).hide();
    }
    catch(err)
    {
        MensajeError( "[validaPrimSecc] \n" + err.message );
    }
}
function abreAdminArch()
{
    try
    {
        //Abrir modal
        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();

        $( "tr[id*=rngDocs]" ).show();

        $( "#diag-upload" ).dialog( {
            resizable: true,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Listo": function ()
                {
                    $( "#diag-upload" ).dialog( "close" );
                }
            },
            close: function ()
            {
                //$( "#tblDocPorSubir" ).find( "tr:gt(0)" ).remove();
                //$( "#tblDocPorSubir" ).hide();
                //$( "#tblbtnSube" ).hide();
                $( "#divControlPopupFondo" ).hide();
                cuentaArchivos();
            }
        } );
    }
    catch ( err )
    {
        MensajeError( "[abreAdminArch] \n" + err.message );
    }
}
function cuentaArchivos()
{
    try
    {
        $( "#lNumDocs" ).text( $( "tr[id*=rngDocs]" ).length + " documento(s) anexado(s)" );
    }
    catch ( err )
    {
        MensajeError( "[cuentaArchivos] \n" + err.message );
    }
}
var _oArchivos;
function PreparaArchivos( event )
{

    var _odata = new FormData();
    var _bPasa = false;
    var _oArchivos = null;

    try
    {
        _oArchivos = null;
        _oArchivos = event.target.files;

        if ( _oArchivos != null )
        {

            $.each( _oArchivos, function ( key, value )
            {
                var _sExt = "";
                //Verificamos extensión
                _sExt = String( value.name ).substring( String( value.name ).lastIndexOf( "." ) + 1, String( value.name ).length );

                switch ( _sExt )
                {
                    case "flv":
                        _bPasa = true;
                        break;
                    case "mp4":
                        _bPasa = true;
                        break;
                    case "m3u8":
                        _bPasa = true;
                        break;
                    case "ts":
                        _bPasa = true;
                        break;
                    case "3gp":
                        _bPasa = true;
                        break;
                    case "mov":
                        _bPasa = true;
                        break;
                    case "avi":
                        _bPasa = true;
                        break;
                    case "wmv":
                        _bPasa = true;
                        break;

                    case "au":
                        _bPasa = true;
                        break;
                    case "snd":
                        _bPasa = true;
                        break;
                    case "mid":
                        _bPasa = true;
                        break;
                    case "rmi":
                        _bPasa = true;
                        break;
                    case "mp3":
                        _bPasa = true;
                        break;
                    case "aif":
                        _bPasa = true;
                        break;
                    case "aifc":
                        _bPasa = true;
                        break;
                    case "aiff":
                        _bPasa = true;
                        break;
                    case "m3u":
                        _bPasa = true;
                        break;
                    case "wav":
                        _bPasa = true;
                        break;

                    case "doc":
                        _bPasa = true;
                        break;
                    case "docx":
                        _bPasa = true;
                        break;
                    case "ppt":
                        _bPasa = true;
                        break;
                    case "pptx":
                        _bPasa = true;
                        break;
                    case "xls":
                        _bPasa = true;
                        break;
                    case "xlsx":
                        _bPasa = true;
                        break;
                    case "msg":
                        _bPasa = true;
                        break;
                    case "pdf":
                        _bPasa = true;
                        break;
                    case "txt":
                        _bPasa = true;
                        break;

                    case "gif":
                        _bPasa = true;
                        break;
                    case "jpeg":
                        _bPasa = true;
                        break;
                    case "jpg":
                        _bPasa = true;
                        break;
                    case "png":
                        _bPasa = true;
                        break;
                    case "bmp":
                        _bPasa = true;
                        break;
                    default:
                        MensajeError( "Archivo no válido. Únicamente puede subir archivos de texto, documentos, pdf, powerpoint, excel, audio, video e imágenes." );
                        _bPasa = false;

                }

                if ( _bPasa )
                {
                    if ( value.size < 20000000 )
                    {
                        _odata.append( key, value );
                        _bPasa = true;
                    }
                    else
                    {
                        MensajeError( "El archivo no puede ser mayor a 20 MB. Por favor elija un archivo de menor peso." );
                        _bPasa = false;
                    }
                }
            } );

            if ( _bPasa )
            {
                _oResp = $.ajax( {
                    url: 'Upload2.ashx',
                    type: 'POST',
                    data: _odata,
                    cache: false,
                    dataType: 'json',
                    processData: false, // Don't process the files
                    contentType: false,
                    statusCode: {
                        200: function ( response )
                        {

                            //Correcto
                            //var _aDts = new Array();

                            //_aDts = String( response.responseText ).split( "§" );

                            $( "#tblDocPorSubir > tbody:last" ).append( "<tr style='text-align: center' id='rngDocs" + _iContDocs + "'>" +
                                    "<td style='width:85%'><label class='CtrlFrm' id='lblArch" + _iContDocs + "'>" + response.responseText + "</label></td>" +
                                    "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                                    "onclick='javascript:$(\"#rngDocs" + _iContDocs + "\").remove();'></span></td>" );

                            //for ( _iCont = 0; _iCont <= _aDts.length - 1; _iCont++ )
                            //{
                            //    $( "#tblDocPorSubir > tbody:last" ).append( "<tr style='text-align: center' id='rngDocs" + _iCont + "'>" +
                            //        "<td style='width:85%'><label class='CtrlFrm' id='lblArch" + _iCont + "'>" + _aDts[_iCont] + "</label></td>" +
                            //        "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                            //        "onclick='javascript:$(\"#rngDocs" + _iCont + "\").remove();'></span></td>" );
                            //}

                            $( "#tblDocPorSubir" ).show();

                            _iContDocs += 1;
                            //$( "#tblbtnSube" ).show();
                        },
                        500: function ( response )
                        {
                            MensajeError( response.responseText );
                        }
                    }
                } );
            }
        }
        else
        {
            MensajeError( "Hubo un problema al seleccionar el documento, por favor inténtelo de nuevo." );
        }
    }
    catch ( err )
    {
        MensajeError( "[PreparaArchivos] \n" + err.message );
    }

}
function guardaDenuncia()
{
    var _iContInt = 0;

    try
    {
        //Validar
        if ( $( "#txtNombProg" ).val() == "" )
        {
            MensajeError( "Debe capturar el nombre del programa al que se refiere la queja, irregularidad o sugerencia." );
            $( "#txtNombProg" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtNombProg" ).css( "border-color", "" );

        if ( $( "#txtDetalles" ).val() == "" )
        {
            MensajeError( "Debe capturar el detalle de la queja, denuncia o sugerencia." );
            $( "#txtDetalles" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }
        else if ($( "#txtDetalles" ).val().length > 3999)
        {
            MensajeError( "El detalle de la queja, denuncia o sugerencia no debe ser mayor a 4000 caracteres." );
            $( "#txtDetalles" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtDetalles" ).css( "border-color", "" );

        if ( $( "#ddlEntFed" ).val() == "0" )
        {
            MensajeError( "Debe capturar la Entidad Federativa, Delegación o Municipio." );
            $( "#ddlEntFed" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#ddlEntFed" ).css( "border-color", "" );

        if ( $( "#ddlDel" ).val() == "0" )
        {
            MensajeError( "Debe capturar la Delegación o Municipio." );
            $( "#ddlDel" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#ddlDel" ).css( "border-color", "" );

        if ( $( "input[id*=rdEstObra]:checked" ).length == 0 )
        {
            MensajeError( "Debe de seleccionar como se encuentra la obra." );
            $( "input[id*=rdEstObra]" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "input[id*=rdEstObra]" ).css( "border-color", "" );

        if ( $( "input[id*=rSA]:checked" ).length == 0 )
        {
            MensajeError( "Debe de seleccionar como se proporcionó el servicio o apoyo." );
            $( "input[id*=rSA]" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "input[id*=rSA]" ).css( "border-color", "" );

        if ( $( "#txComoAfecta" ).val() == "" )
        {
            MensajeError( "Debe capturar como le afecta la irregularidad detectada." );
            $( "#txComoAfecta" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }
        else if ( $( "#txComoAfecta" ).val().length > 3999 )
        {
            MensajeError( "El detalle de cómo le afecta la irregularidad, denuncia o sugerencia no debe ser mayor a 4000 caracteres." );
            $( "#txComoAfecta" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txComoAfecta" ).css( "border-color", "" );

        if ( $( "#txtFechaIrreg1" ).val() == "" && $( "#txtFechaIrreg2" ).val() == "" )
        {
            MensajeError( "Debe capturar el periodo estimado en el cuál detectó la irregularidad o situación que denuncia." );
            $( "#txtFechaIrreg1" ).css( "border-color", "red" );
            $( "#txtFechaIrreg2" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtFechaIrreg1" ).css( "border-color", "" );
        $( "#txtFechaIrreg2" ).css( "border-color", "" );

        if ( $( "#rdRepIrregSi" ).prop( "checked" ) && ( $( "#txtQuienReporta" ).val() == "" || $( "#txtRespReporte" ).val() == "" ) )
        {
            MensajeError( "Se ha reportado la irregularidad previamente debe detallar a quién y que respuesta hubo." );
            $( "#txtQuienReporta" ).css( "border-color", "red" );
            $( "#txtRespReporte" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtQuienReporta" ).css( "border-color", "" );
        $( "#txtRespReporte" ).css( "border-color", "" );

        if ( $( "#txtSPResp" ).val() == "" )
        {
            MensajeError( "Debe capturar al o a los Servidores Públicos responsables de la irregularidad." );
            $( "#txtSPResp" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtSPResp" ).css( "border-color", "" );

        if ( $( "#txEntSP" ).val() == "" )
        {
            MensajeError( "Debe capturar a que dependencia pertenece el Servidor Público posible responsable de la irregularidad." );
            $( "#txEntSP" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txEntSP" ).css( "border-color", "" );

        if ( $( "#txtPorqueSen" ).val() == "" )
        {
            MensajeError( "Debe capturar el por qué señala a los Servidores Públicos responsables." );
            $( "#txtPorqueSen" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtPorqueSen" ).css( "border-color", "" );

        if ( $( "#rdPropInfoSi" ).prop( "checked" ) && $( "tr[id*=rngDocs]" ).length == 0 )
        {
            MensajeError( "No existen documentos anexados, si no cuenta con ellos y/o no puede proporcionarlos marque 'No' en la opción correspondiente." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#txtPass" ).val() == "" )
        {
            MensajeError( "Debe capturar una contraseña." );
            $( "#txtPass" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }
        else
        {
            if ( $( "#txtPass" ).val().length < 8 )
            {
                MensajeError( "La contraseña debe ser de 8 caracteres." );
                $( "#txtPass" ).css( "border-color", "red" );
                Recaptcha.reload();
                return false;
            }
        }

        $( "#txtPass" ).css( "border-color", "" );

        //Verificamos el recaptcha
        //_oData = "{ _sResponse: '" + grecaptcha.getResponse() + "' }";

        _oData = "{ _sResponse: '" + Recaptcha.get_response() + "', _sChallenge: '" + Recaptcha.get_challenge() + "' }";

        $.ajax( {
            type: "POST",
            url: "CCS.aspx/AJAX_verificaReCaptcha",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            
            var _aResp = new Array();

            _aResp = String( data.d ).split( "[ß]" );

            if ( _aResp[1] == "True" )
            {

                //Juntamos documentos
                if ( $( "#rdPropInfoSi" ).prop( "checked" ) )
                {
                    $.each( $( "tr[id*=rngDocs]" ), function ( _iIndexInt )
                    {
                        _cDts = null;
                        _cDts = new Collection;

                        _cDts.add( "NOMBRE_DOCTO", $( "#lblArch" + _iIndexInt ).text() );

                        _aDtsDoctos[_iContInt] = _cDts._oData;

                        _iContInt += 1;

                    } );
                }

                _oData = "{ _psDenAnon: '" + ( $( "#rASi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psNombreInform: '" + $( "#txtNombComp" ).val() + "' " +
                            ", _psEmail: '" + $( "#txtDirDen" ).val() + "' " +
                            ", _psNombProg: '" + $( "#txtNombProg" ).val() + "' " +
                            ", _psDetalleQueja: '" + $( "#txtDetalles" ).val() + "' " +
                            ", _plLlaveEntFed: " + $( "#ddlEntFed" ).val() +
                            ", _plLlaveMun: " + $( "#ddlDel" ).val() +
                            ", _psLocalidad: '" + $( "#txtLocalidad" ).val() + "' " +
                            ", _psJuris: '" + $( "#txtJuris" ).val() + "' " +
                            ", _psEdoObra: '" + $( "input[id*=rdEstObra]:checked" ).parent().text() + "' " +
                            ", _psProp: '" + $( "input[id*=rSA]:checked" ).parent().text() + "' " +
                            ", _psAfectaIrreg: '" + $( "#txComoAfecta" ).val() + "' " +
                            ", _psDispDoc: '" + ( $( "#rdInfoAcreSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psPuedePropDoc: '" + ( $( "#rdPropInfoSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psFechaIrreg1: '" + $( "#txtFechaIrreg1" ).val() + "' " +
                            ", _psFechaIrreg2: '" + $( "#txtFechaIrreg2" ).val() + "' " +
                            ", _psReportoIrreg: '" + ( $( "#rdRepIrregSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psAQuienRepor: '" + $( "#txtQuienReporta" ).val() + "' " +
                            ", _psRespRepor: '" + $( "#txtRespReporte" ).val() + "' " +
                            ", _psSPRespIrreg: '" + $( "#txtSPResp" ).val() + "' " +
                            ", _psDependSPIrreg: '" + $( "#txEntSP" ).val() + "' " +
                            ", _psPorSenala: '" + $( "#txtPorqueSen" ).val() + "' " +
                            ", _poDocs: " + ( _aDtsDoctos.length == 0 ? null : JSON.stringify( _aDtsDoctos ) ) +
                            ", _psHostAddress: '" + $( "#hdnUserHostAddress" ).val() + "' " +
                            ", _psHostName: '" + $( "#hdnUserHostName" ).val() + "' " +
                            ", _psPassword: '" + $( "#txtPass" ).val() + "' " +
                            "}";

                $.ajax( {
                    type: "POST",
                    url: "CCS.aspx/AJAX_guardaDenuncia",
                    data: _oData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                } )
                .done( function ( data, textStatus, jqXHR )
                {
                    if ( String( data.d ).indexOf( "Error" ) == -1 )
                    {
                        document.location = "Folio.aspx?_sFolio=" + data.d;
                    }
                    else
                    {
                        MensajeError( "Hubo un error al guardar los datos." );
                        Recaptcha.reload();
                    }
                } )
                .fail( function ( jqXHR, textStatus, errorThrown )
                {
                    MensajeError( "Error al guardar los datos [AJAX.guardaDenuncia()]" );
                    Recaptcha.reload();
                } );
            }
            else
            {
                if ( _aResp[0] == "The verification words are incorrect." )
                {
                    MensajeError( "Captcha incorrecto, intente de nuevo." );
                }
                else
                {
                    MensajeError( _aResp[0] );
                }
                Recaptcha.reload();
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al validar el recaptcha [AJAX.guardaDenuncia()]" );
            Recaptcha.reload();
        } );



    }
    catch ( err )
    {
        MensajeError( "[guardaDenuncia] \n" + err.message );
    }
}
function cargaMunicipios( _plLlaveEnt )
{
    try
    {
        _oData = "{ _plLlaveEntFed: " + _plLlaveEnt + " }";

        $.ajax( {
            type: "POST",
            url: "ACUMSS.aspx/AJAX_traeMunicipios",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                if ( String( data.d ) != "Sin Datos" )
                {
                    $( "#ddlDel" ).empty();
                    $( "#ddlDel" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $.each( data.d, function ( index, element )
                    {
                        $( "#ddlDel" ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreEntidad ) );
                    } );
                }
                else
                {
                    Recaptcha.reload();
                }
            }
            else
            {
                MensajeError( "Hubo un error al cargar los datos." );
                Recaptcha.reload();
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al cargar los Municipios [AJAX.cargaMunicipios()]" );
            Recaptcha.reload();
        } );
    }
    catch ( err )
    {
        MensajeError( err.message );
        Recaptcha.reload();
    }
}

