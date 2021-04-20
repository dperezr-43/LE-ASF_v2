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
    //$( "#grid" ).bootgrid();

    $( document ).tooltip( {
        track: true
    } );

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

    $( "#lSeguimiento" ).prop( "title", "De clic aquí para poder ver el estatus de o las denuncias que haya registrado anteiormente." );

    $( "#lSeguimiento" ).button( {
        icons: {
            primary: "ui-icon ui-icon-lightbulb"
        }
    } );

    $( "#tPorQue, #tOpcFP, #tFPF, #tBuscCatDepEAPF, #tBuscCatOrgsCA, #tFPE, #tBuscDepEntsEsts, #tBuscOrgsConsAutEst, #tBuscFPMD, " +
        "#tDenOtro, #dSS, #tCiud, #tOpcOSC, #tOpcCiud, #tOpcSPASF, #tOpcSPASFEstruc, #tOpcSPASFHon, #tOpcProv, #tOpcDtsSASF, #tOpcNoDtsSASF, " +
        "#tNoTDtsPuedoIdent, #tNCElem, #tArchs, #tOpcAud, #tbAud" ).hide();
    $( "#diag-ok, #diag-error, #dMje, #diag-load, #diag-upload, #dDirectorio, .sfSel" ).hide();

    //************************************************
    //Identidad Reservada

    $( "#rdInfoResSi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tPorQue" ).show( "blind" );
            $( "#tQDen" ).prop( "disabled", true );
            $( "#tQDen" ).hide();
        }
    } );

    $( "#rdInfoResNo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tPorQue" ).hide( "blind" );
            $( "#tQDen" ).prop( "disabled", false );
            $( "#tQDen" ).show();
        }
    } );

    //$( "#sFPF, #sFPE, #sFPM, #sFPFopc1, #sFPFopc2, #sFPEopc1, #sFPEopc2" ).mouseover( function ()
    //{
    //    $( this ).css( "background-color", "#CFDAE5" );
    //} );

    //$( "#sFPF, #sFPE, #sFPM, #sFPFopc1, #sFPFopc2, #sFPEopc1, #sFPEopc2" ).mouseout( function ()
    //{
    //    $( this ).css( "background-color", "" );
    //} );

    //$( "#rdQuienCiud, #rdQuienOSC, #rdQuienSPASF, #rdQuienProv, #rdQuienOtro, #rdQuienOSC, #rdQuienSPASF" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        //$( "#tOpcFP" ).hide( "blind" );
    //        $( "div[id*=tOpc]" ).hide( "blind" );
    //        $( "#tOpc" + String( $( this ).prop( "id" ) ).replace( "rdQuien", "" ) ).show( "blind" );

    //        if ( $( this ).prop( "id" ) == "rdQuienOtro" )
    //        {
    //            $( "#tDenOtro" ).show( "blind" );
    //        }
    //        else
    //        {
    //            $( "#tDenOtro" ).hide( "blind" );
    //        }
    //    }
    //} );

    //$( "#rdFASFNo" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        MensajeError( "Si su denuncia no es contra un Servidor Público de la ASF le sugerimos elegir otra vertiente donde canalizar su denuncia, gracias." );
    //        setTimeout( function ()
    //        {
    //            document.location = "../index/index.html";
    //        }, 3500 );
    //    }
    //} );

    //$( "#rdNTDNINo" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        MensajeError( "Su denuncia no puede proceder, le agradecemos haber utilizado el sistema de Denuncias de la ASF." );
    //        setTimeout( function ()
    //        {
    //            document.location = "http://www.asf.gob.mx/";
    //        }, 3500 );
    //    }
    //} );

    //$( "#rdOpcSPASFEstruc, #rdOpcSPASFHon" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        //$( "#tOpcFP" ).hide( "blind" );
    //        $( "div[id*=tOpcSPASFInt]" ).hide( "blind" );
    //        $( "#tOpcSPASFInt" + String( $( this ).prop( "id" ) ).replace( "rdOpcSPASF", "" ) ).show( "blind" );
    //    }
    //} );

    $( "#rdDtsSASFSi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tOpcDtsSASF" ).show( "blind" );
            $( "#tOpcNoDtsSASF" ).hide( "blind" );
        }
    } );

    $( "#rdDtsSASFNo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tOpcDtsSASF" ).hide( "blind" );
            $( "#tOpcNoDtsSASF" ).show( "blind" );
        }
    } );

    $( "#rdNoTengoDts" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tNoTDtsPuedoIdent" ).show( "blind" );
            //$( "#tNoTDtsNoIdent" ).hide( "blind" );
        }
    } );

    //$( "#rdNoTengoDtsNoIdent" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#tNoTDtsNoIdent" ).show( "blind" );
    //        $( "#tNoTDtsPuedoIdent" ).hide( "blind" );
    //    }
    //} );

    $( "#txtFechaIrreg, #txtFechaFin" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy",
        onSelect: function ( dateText, inst )
        {
            if ( $( this ).prop( "id" ) == "txtFechaIrreg" && $( "#txtFechaFin" ).val() != "" )
            {
                if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) > $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaFin" ).val() ) )
                {
                    MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
                    $( this ).val( "" );
                }
            }
            else if ( $( this ).prop( "id" ) == "txtFechaFin" && $( "#txtFechaIrreg" ).val() != "" )
            {
                if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) < $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaIrreg" ).val() ) )
                {
                    MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
                    $( this ).val( "" );
                }
            }
        }
    } );

    //Archivos
    $( "#lSubArch, #btnSubir" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    $( "#lSubArch" ).button( {
        icons: {
            primary: "ui-icon ui-icon-document"
        }
    } );

    $( "#btnSubir" ).click( function ()
    {
        $( "#flUp" ).trigger( 'click' );
    } );



    $( "#flUp" ).on( "change", PreparaArchivos );

    var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };

    $( "#dPuntos" ).accordion( {
        icons: icons,
        collapsible: true,
        heightStyle: "content",
        active: false,
        beforeActivate: function ( event, ui )
        {
            // The accordion believes a panel is being opened
            if ( ui.newHeader[0] )
            {
                var currHeader = ui.newHeader;
                var currContent = currHeader.next( '.ui-accordion-content' );
                // The accordion believes a panel is being closed
            } else
            {
                var currHeader = ui.oldHeader;
                var currContent = currHeader.next( '.ui-accordion-content' );
            }
            // Since we've changed the default behavior, this detects the actual status
            var isPanelSelected = currHeader.attr( 'aria-selected' ) == 'true';

            // Toggle the panel's header
            currHeader.toggleClass( 'ui-corner-all', isPanelSelected ).toggleClass( 'accordion-header-active ui-state-active ui-corner-top', !isPanelSelected ).attr( 'aria-selected', (( !isPanelSelected ).toString() ) );

            // Toggle the panel's icon
            currHeader.children( '.ui-icon' ).toggleClass( 'ui-icon-triangle-1-e', isPanelSelected ).toggleClass( 'ui-icon-triangle-1-s', !isPanelSelected );

            // Toggle the panel's content
            currContent.toggleClass( 'accordion-content-active', !isPanelSelected )
            if ( isPanelSelected ) { currContent.slideUp(); } else { currContent.slideDown(); }

            return false; // Cancels the default action
        }
    } );

    //$( "#dPuntos > div" ).accordion( {
    //    header: "h3",
    //    collapsible: true,
    //    icons: icons,
    //    heightStyle: "content",
    //    active: false
    //} );

    $( "#rdNCElem" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tNCElem" ).show( "blind" );
            $( "#tArchs" ).hide( "blind" );
        }
    } );

    $( "#rdCElem" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tArchs" ).show( "blind" );
        }
        else
        {
            $( "#tArchs" ).hide( "blind" );
        }
    } );

    $( "#rdSiAud" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tOpcAud" ).show( "blind" );
        }
    } );

    $( "#rdNoAud" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tOpcAud" ).hide( "blind" );
        }
    } );


} );
$( document ).tooltip( { track: true } );
function validaPrimSecc()
{
    try
    {
        if ( $( "#rdInfoResSi" ).prop( "checked" ) && ( !$( "#rdRes1" ).prop( "checked" ) && !$( "#rdRes2" ).prop( "checked" ) && !$( "#rdRes3" ).prop( "checked" ) && !$( "#rdRes4" ).prop( "checked" ) ) )
        {
            MensajeError( "Por favor detalle por qué razón desea que su identidad sea reservada." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#rdInfoResNo" ).prop( "checked" ) && ( $( "#txtNombreDenunciante" ).val() == "" || $( "#txtCCDenunciante" ).val() == "" || $( "#txtPuestoDenunciante" ).val() == "" || $( "#txtNumEmpDenunciante" ).val() == "" ) )
        {
            MensajeError( "Si no desea que su identidad sea reservada, por favor capture sus datos." );
            Recaptcha.reload();
            return false;
        }

        $( "#dSS" ).show( "blind" );
        $( "#lAvanSigSecc" ).hide();
    }
    catch ( err )
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

                            //for ( _iCont = 0; _iCont <= _aDts.length - 1; _iCont++ )
                            //{
                            $( "#tblDocPorSubir > tbody:last" ).append( "<tr style='text-align: center' id='rngDocs" + _iContDocs + "'>" +
                                    "<td style='width:85%'><label class='CtrlFrm' id='lblArch" + _iContDocs + "'>" + response.responseText + "</label></td>" +
                                    "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                                    "onclick='javascript:$(\"#rngDocs" + _iContDocs + "\").remove();'></span></td>" );

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
    var _aDtsDoctos = new Array();
    var _aDConceptos = new Array();
    var _sDescDependOrgano = "";

    var _sNombreDenunciante = "";
    var _sDirDenunciante = "";
    var _sRFC = "";

    var _sCC = "";
    var _sNumEmp = "";

    var _sDescOtro = "";
    var _sEstrucHono = "";

    var _sDepeOrganismo = "";

    try
    {
        //Validaciones

        if ( !$( "#rdFASFSi" ).prop( "checked" ) && !$( "#rdFASFNo" ).prop( "checked" ) )
        {
            MensajeError( "Debe detallar si el Servidor Público a denunciar es de la ASF." );
            Recaptcha.reload();
            return false;
        }

        if ( !$( "#rdDtsSASFSi" ).prop( "checked" ) && !$( "#rdDtsSASFNo" ).prop( "checked" ) )
        {
            MensajeError( "Debe detallar si conoce o no al Servidor Público que desea denunciar." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#rdDtsSASFSi" ).prop( "checked" ) && ( $( "#txtNombSPDenASF" ).val() == "" || $( "#txtCargoSPDenASF" ).val() == "" || $( "#txtAreaSPD" ).val() == "" ) )
        {
            MensajeError( "Es necesario que detalle el Nombre, Cargo y Área del Servidor Público a denunciar." );
            $( "#txtNombSPDenASF" ).css( "border-color", "red" );
            $( "#txtCargoSPDenASF" ).css( "border-color", "red" );
            $( "#txtAreaSPD" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtNombSPDenASF" ).css( "border-color", "" );
        $( "#txtCargoSPDenASF" ).css( "border-color", "" );
        $( "#txtAreaSPD" ).css( "border-color", "" );

        if ( $( "#rdDtsSASFNo" ).prop( "checked" ) && ( !$( "#rdNTDNISi" ).prop( "checked" ) && !$( "#rdNTDNINo" ).prop( "checked" ) ) )
        {
            MensajeError( "Si no conoce los datos del servidor público detalle si desea documentar los hechos." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#rdDtsSASFNo" ).prop( "checked" ) && ( !$( "#rdNTDNISi" ).prop( "checked" ) && !$( "#rdNTDNINo" ).prop( "checked" ) ) )
        {
            MensajeError( "Detalle si desea o no documentar los hechos." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#txtFechaIrreg" ).val() == "" && $( "#txtFechaFin" ).val() == "" )
        {
            MensajeError( "Debe detallar al menos una fecha de cuándo ocurrió la irregularidad." );
            $( "#txtFechaIrreg" ).css( "border-color", "red" );
            $( "#txtFechaFin" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtFechaIrreg" ).css( "border-color", "" );
        $( "#txtFechaFin" ).css( "border-color", "" );

        if ( $( "input[id*=chkPts]" ).length == 0 )
        {
            MensajeError( "Debe al menos seleccionar una de las opciones que considere se apega más a su denuncia." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#txtDescDen" ).val() == "" )
        {
            MensajeError( "Debe detallar que conducta indebida ha tenido el Servidor Público." );
            $( "#txtDescDen" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtDescDen" ).css( "border-color", "" );

        if ( $( "#rdCElem" ).prop( "checked" ) && $( "tr[id*=rngDocs]" ).length == 0 )
        {
            MensajeError( "Si cuenta con documentos que prueban su denuncia debe anexarlos a la misma." );
            Recaptcha.reload();
            return false;
        }

        if ( $( "#txtCprreoCont" ).val() == "" )
        {
            MensajeError( "No es obligatorio capturar su Correo Electrónico, pero si no lo hace no será posible darle seguimiento a su denuncia." );
        }

        if ( $( "#txtPass" ).val() == "" )
        {
            MensajeError( "Es necesario que captura una contraseña para su denuncia." );
            $( "#txtPass" ).css( "border-color", "red" );
            Recaptcha.reload();
            return false;
        }

        $( "#txtPass" ).css( "border-color", "" );

        //Guardamos
        _oData = "{ _sResponse: '" + Recaptcha.get_response() + "', _sChallenge: '" + Recaptcha.get_challenge() + "' }";

        $.ajax( {
            type: "POST",
            url: "InternasASF.aspx/AJAX_verificaReCaptcha",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( data.d )
            {
                //Documentos
                $.each( $( "tr[id*=rngDocs]" ), function ( index, element )
                {
                    _cDts = null;
                    _cDts = new Collection;

                    _cDts.add( "NOMBRE_DOCTO", $( "#lblArch" + String( element.id ).replace( "rngDocs", "" ) ).text() );

                    _aDtsDoctos[index] = _cDts._oData;
                } );

                //Conceptos que se apegan
                $.each( $( "input[id*=chkPts]:checked" ), function ( index, element )
                {
                    var _oChk;
                    _cDts = null;
                    _cDts = new Collection;

                    _cDts.add( "NUM_IRREG", String( element.id ).replace( "chkPts", "" ) );
                    ///_oChk = $( "#" + element.id ).parent();
                    _cDts.add( "NOMBRE_IRREG", $( "#" + element.id ).parent().text().trim() );

                    _aDConceptos[index] = _cDts._oData;
                } );

                _oData = "{ _psReservada: '" + ( $( "#rdInfoResSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psDescReservada: '" + $( "input[id*=rdRes]:checked" ).parent().text().trim() + "' " +
                            ", _psQuienDenuncia: 'Servidor Público de la ASF' " +
                            ", _psNombreDenunciante: '" + $( "#txtNombreDenunciante" ).val() + "' " +
                            ", _psCCDenunciante: '" + $( "#txtCCDenunciante" ).val() + "' " +
                            ", _psPuestoDenunciante: '" + $( "#txtPuestoDenunciante" ).val() + "' " +
                            ", _psNumEmpDenunciante: '" + $( "#txtNumEmpDenunciante" ).val() + "' " +
                            ", _psFPASF: '" + ( $( "#rdFASFSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psConoceDtsSP: '" + ( $( "#rdDtsSASFSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _psNombreSP: '" + $( "#txtNombSPDenASF" ).val() + "' " +
                            ", _psCargoSP: '" + $( "#txtCargoSPDenASF" ).val() + "' " +
                            ", _psAreaSP: '" + $( "#txtAreaSPD" ).val() + "' " +
                            ", _psNoTengoDatos: '" + ( $( "#rdNTDNISi" ).prop( "checked" ) ? "Si" : "No" ) + "'" +
                            ", _psFecha1: '" + $( "#txtFechaIrreg" ).val() + "' " +
                            ", _psFecha2: '" + $( "#txtFechaFin" ).val() + "' " +
                            ", _poConceptos: " + ( _aDConceptos.length == 0 ? null : JSON.stringify( _aDConceptos ) ) +
                            ", _psDescIrreg: '" + $( "#txtDescDen" ).val() + "' " +
                            ", _psCuentoConDoc: '" + ( $( "#rdCElem" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                            ", _poDocs: " + ( _aDtsDoctos.length == 0 ? null : JSON.stringify( _aDtsDoctos ) ) +
                            ", _psEmail: '" + $( "#txtCprreoCont" ).val() + "' " +
                            ", _psPass: '" + $( "#txtPass" ).val() + "' " +
                            "}";

                $.ajax( {
                    type: "POST",
                    url: "InternasASF.aspx/AJAX_guardaDenuncia",
                    data: _oData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                } )
                .done( function ( data, textStatus, jqXHR )
                {
                    if ( String( data.d ).indexOf( "Error" ) == -1 )
                    {
                        //MensajeOk( "Datos guardados correctamente. Gracias por su aportación." )
                        //setTimeout( function () { document.location = "http://www.asf.gob.mx"; }, 3000 );
                        $( "#divControlPopupFondo" ).height( $( document ).height() );
                        $( "#divControlPopupFondo" ).show();
                        document.location = "Folio.aspx?_sFolio=" + data.d;
                    }
                    else
                    {
                        MensajeError( "Hubo un error al guardar los datos." );
                        //grecaptcha.reset();
                        Recaptcha.reload();
                    }
                } )
                .fail( function ( jqXHR, textStatus, errorThrown )
                {
                    MensajeError( "Error al guardar los datos [AJAX.guardaDenuncia()]" );
                    //grecaptcha.reset();
                    Recaptcha.reload();
                } );
            }
            else
            {
                MensajeError( "Captcha incorrecto, intente de nuevo." );
                //grecaptcha.reset();
                Recaptcha.reload();
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al validar el recaptcha [AJAX.guardaDenuncia()]" );
            //grecaptcha.reset();
            Recaptcha.reload();
        } );


    }
    catch ( err )
    {
        MensajeError( "Error al guardar datos " + err.message );
    }
}
function seguimiento()
{
    window.open( "Consulta.aspx" );
}