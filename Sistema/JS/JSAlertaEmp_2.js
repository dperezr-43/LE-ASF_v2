var _sIdrdIrreg = "";
var _iDocsIrreg = 0;

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

    $( document ).tooltip( {
        track: true
    } );

    $( "#txtBuscEntIrreg" ).prop( "title", "Escriba el nombre, siglas o parte del nombre de la entidad que desea buscar, el resultado aparecerá en la lista desplegable de abajo." )

    $( "#lSeguimiento" ).prop( "title", "De clic aquí para poder ver el estatus de o las cédulas que haya registrado anteiormente." );

    $( "#lSeguimiento" ).button( {
        icons: {
            primary: "ui-icon ui-icon-lightbulb"
        }
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

    $( "#diag-load, #diag-error, #diag-ok, #dMje, #dvRes, #tEntFed, #tEntEst, #tEntMun, #dUploadIrreg" ).hide();

    $( "#rdEntFed" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tEntEst" ).hide();
            $( "#tEntMun" ).hide();
            $( "#tEntFed" ).show();
        }
    } );

    $( "#rdEntEstatal" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tEntEst" ).show();
            $( "#tEntMun" ).hide();
            $( "#tEntFed" ).hide();
        }
    } );

    $( "#rdEntMunicipal" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#tEntEst" ).hide();
            $( "#tEntMun" ).show();
            $( "#tEntFed" ).hide();
        }
    } );

    //$( "#tDtsDenunciante" ).hide();

    //$( "#rdIASi" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#tDtsDenunciante" ).hide();
    //        $( "#txtNombSP" ).val( "" );
    //        $( "#txtTelContacto" ).val( "" );
    //    }
    //} );

    //$( "#rdIANo" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#tDtsDenunciante" ).show();
    //    }
    //} );
    
    $( "#ddlEdoEntMun" ).change( function ()
    {
        if ( $( this ).val() != 0 )
        {
            cargaMunicipios( $( this ).val() );
        }
    } );

    var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };

    $( "#dIrregs" ).accordion( {
        icons: icons,
        collapsible: true,
        heightStyle: "content",
        active: false
    } );

    $( "table[id*=tIrreg-]" ).hide();

    $( "input[id*=rdIrreg]" ).change( function ()
    {
        var _rdIrreg = $( this );

        if ( $( this ).prop( "checked" ) )
        {
            if ( _sIdrdIrreg != "" )
            {
                $( "#divControlPopupFondo" ).height( $( document ).height() );
                $( "#divControlPopupFondo" ).show();

                $( "#lMje" ).text( "Solo puede seleccionar una sola irregularidad, al seleccionar otra irregularidad la opción previamente seleccionada será descartada. ¿Desea continuar?." );

                $( "#dMje" ).dialog( {
                    resizable: true,
                    height: "auto",
                    width: "auto",
                    modal: true,
                    dialogClass: "no-close",
                    buttons: {
                        "Si": function ()
                        {
                            _sIdrdIrreg = $( _rdIrreg ).prop( "id" );
                            $( "table[id*=tIrreg-]" ).hide( "blind" );
                            $( "#tIrreg-" + String( $( _rdIrreg ).prop( "id" ) ).replace( "rdIrreg", "" ) ).show( "blind" );
                            $( "table[id*=rTb-]" ).hide();
                            $( "#dMje" ).dialog( "close" );
                        },
                        "No": function ()
                        {
                            if ( _sIdrdIrreg != "" )
                            {
                                $( "#" + _sIdrdIrreg ).prop( "checked", true );
                            }
                            $( _rdIrreg ).prop( "checked", false );
                            $( "#dMje" ).dialog( "close" );
                        }
                    },
                    close: function ()
                    {
                        $( "#divControlPopupFondo" ).hide();
                    }
                } );
            }
            else
            {
                _sIdrdIrreg = $( _rdIrreg ).prop( "id" );
                $( "table[id*=tIrreg-]" ).hide( "blind" );
                $( "#tIrreg-" + String( $( _rdIrreg ).prop( "id" ) ).replace( "rdIrreg", "" ) ).show( "blind" );
                $( "table[id*=rTb-]" ).hide();
            }
        }
    } );

    //********************************************************
    //Archivos Irregularidad
    $( "#tblDocPorSubirIrreg" ).hide();
    $( "#dUploadIrreg" ).hide();

    //$( "#btnSubirArch" ).button( {
    //    icons: {
    //        primary: "ui-icon ui-icon-circle-plus"
    //    }
    //} );

    //$( "#btnSubirArch" ).on( "click", GuardarArchivos() );

    $( "#bSubirIrreg" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    $( "#bSubirIrreg" ).click( function ()
    {
        $( "#flUpIrreg" ).trigger( 'click' );
    } );

    $( "#flUpIrreg" ).on( "change", PreparaArchivosIrreg );

    $( "#lSubArch" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    //********************************************************

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

    $( "#lBtnBuscEntIrreg" ).button( {
        icons: {
            primary: "ui-icon-search"
        }
    } );

    $( "#dSS" ).hide();

    $( "#txtFechaIrreg, #txtFechaIrreg2" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy",
        onSelect: function ( dateText, inst )
        {
            if ( $( this ).prop( "id" ) == "txtFechaIrreg" && $( "#txtFechaIrreg2" ).val() != "" )
            {
                if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) > $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaIrreg2" ).val() ) )
                {
                    MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
                    $( this ).val( "" );
                }
            }
            else if ( $( this ).prop( "id" ) == "txtFechaIrreg2" && $( "#txtFechaIrreg" ).val() != "" )
            {
                if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) < $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaIrreg" ).val() ) )
                {
                    MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
                    $( this ).val( "" );
                }
            }
        }
    } );

} );
function validaPrimSecc()
{
    try
    {
        //if ( $( "#rdIANo" ).prop( "checked" ) && ( $( "#txtNombSP" ).val() == "" || $( "#txtTelContacto" ).val() == "" ) )
        //{
        //    MensajeError( "Si no desea que la información sea confidencial debe capturar su nombre y su telefono de contacto." );
        //    $( "#txtNombSP" ).css( "border-color", "red" );
        //    $( "#txtTelContacto" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    //Recaptcha.reload();
        //    return false;
        //}

        //$( "#txtNombSP" ).css( "border-color", "" );
        //$( "#txtTelContacto" ).css( "border-color", "" );

        if ( !$( "#rdEntFed" ).prop( "checked" ) && !$( "#rdEntEstatal" ).prop( "checked" ) && !$( "#rdEntMunicipal" ).prop( "checked" ) )
        {
            MensajeError( "Debe seleccionar la Entidad Federal o la Entidad Estatal o la Entidad Municipal." );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        if ( $( "#rdEntFed" ).prop( "checked" ) && ( $( "#ddlEnt" ) == null || $( "#ddlEnt" ).val() == 0 ) )
        {
            MensajeError( "Debe seleccionar la Entidad Federal." );
            $( "#ddlEnt" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        $( "#ddlEnt" ).css( "border-color", "" );

        if ( $( "#rdEntEstatal" ).prop( "checked" ) && ( $( "#ddlEdoEntEst" ).val() == 0 || $("#txtEntEst").val() == "" ) )
        {
            MensajeError( "Debe de seleccionar el estado y capturar la dependencia estatal." );
            $( "#txtEntEst" ).css( "border-color", "red" );
            $( "#ddlEdoEntEst" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        $( "#txtEntEst" ).css( "border-color", "" );
        $( "#ddlEdoEntEst" ).css( "border-color", "" );

        if ( $( "#rdEntMunicipal" ).prop( "checked" ) && ( $( "#ddlEdoEntMun" ).val() == 0 || $( "#ddelMunEntMun" ).val() == 0 || $( "#txtEntMun" ).val() == "" ) )
        {
            MensajeError( "Debe de seleccionar el estado, el municipio y capturar el nombre del área del municipio." );
            $( "#ddlEdoEntMun" ).css( "border-color", "red" );
            $( "#ddelMunEntMun" ).css( "border-color", "red" );
            $( "#txtEntMun" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        $( "#ddlEdoEntMun" ).css( "border-color", "" );
        $( "#ddelMunEntMun" ).css( "border-color", "" );
        $( "#txtEntMun" ).css( "border-color", "" );

        $( "#dSS" ).show( "blind" );
        $( "#lAvanSigSecc" ).hide();
    }
    catch ( err )
    {
        MensajeError( "[validaPrimSecc] \n" + err.message );
    }
}
function cargaMunicipios( _plLlaveEnt )
{
    try
    {
        _oData = "{ _plLlaveEntFed: " + _plLlaveEnt + " }";

        $.ajax( {
            type: "POST",
            url: "AlertaEmp.aspx/AJAX_traeMunicipios",
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
                    $( "#ddelMunEntMun" ).empty();
                    $( "#ddelMunEntMun" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $.each( data.d, function ( index, element )
                    {
                        $( "#ddelMunEntMun" ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreEntidad ) );
                    } );
                }
                else
                {
                    //Recaptcha.reload();
                }
            }
            else
            {
                MensajeError( "Hubo un error al cargar los datos." );
                //Recaptcha.reload();
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al cargar los Municipios [AJAX.cargaMunicipios()]" );
            //Recaptcha.reload();
        } );
    }
    catch ( err )
    {
        MensajeError( err.message );
        //Recaptcha.reload();
    }
}
function abreAdminArchIrreg()
{
    try
    {
        //Abrir modal
        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();

        _oResp = null;

        $( "tr[id*=rngDocsIrreg]" ).show();

        $( "#dUploadIrreg" ).dialog( {
            resizable: true,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Listo": function ()
                {
                    $( "#dUploadIrreg" ).dialog( "close" );
                }
            },
            close: function ()
            {
                $( "#divControlPopupFondo" ).hide();
                cuentaArchivosIrreg();
            }
        } );
    }
    catch ( err )
    {
        MensajeError( "[abreAdminArchIrreg] \n" + err.message );
    }
}
var _oArchivosIrreg;
function PreparaArchivosIrreg( event )
{

    var _odata = new FormData();
    var _bPasa = false;
    var _oArchivosIrreg = null;

    try
    {
        _oArchivosIrreg = null;
        _oArchivosIrreg = event.target.files;
        
        if ( _oArchivosIrreg != null )
        {
            $.each( _oArchivosIrreg, function ( key, value )
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

                            $( "#tblDocPorSubirIrreg > tbody:last" ).append( "<tr style='text-align: center' id='rngDocsIrreg" + _iDocsIrreg + "'>" +
                                    "<td style='width:85%'><label class='CtrlFrm' id='lblArchIrreg" + _iDocsIrreg + "'>" + response.responseText + "</label></td>" +
                                    "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                                    "onclick='javascript:$(\"#rngDocsIrreg" + _iDocsIrreg + "\").remove();'></span></td>" );

                            $( "#tblDocPorSubirIrreg" ).show();

                            _iDocsIrreg += 1;
                        },
                        500: function ( response )
                        {
                            MensajeError( response.responseText );
                        }
                    }
                } );

                //setTimeout( function ()
                //{
                //    _oResp = $.ajax( {
                //        url: 'Upload2.ashx',
                //        type: 'POST',
                //        data: _odata,
                //        cache: false,
                //        dataType: 'json',
                //        processData: false, // Don't process the files
                //        contentType: false,
                //        statusCode: {
                //            200: function ( response )
                //            {

                //                $( "#tblDocPorSubirIrreg > tbody:last" ).append( "<tr style='text-align: center' id='rngDocsIrreg" + _iDocsIrreg + "'>" +
                //                        "<td style='width:85%'><label class='CtrlFrm' id='lblArchIrreg" + _iDocsIrreg + "'>" + response.responseText + "</label></td>" +
                //                        "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                //                        "onclick='javascript:$(\"#rngDocsIrreg" + _iDocsIrreg + "\").remove();'></span></td>" );

                //                $( "#tblDocPorSubirIrreg" ).show();

                //                _iDocsIrreg += 1;
                //            },
                //            500: function ( response )
                //            {
                //                MensajeError( response.responseText );
                //            }
                //        }
                //    } );
                //}, 3000 );
                
            }
        }
        else
        {
            MensajeError( "Hubo un problema al seleccionar el documento, por favor inténtelo de nuevo." );
        }
    }
    catch ( err )
    {
        MensajeError( "[PreparaArchivosIrreg] \n" + err.message );
    }

}
function cuentaArchivosIrreg()
{
    try
    {
        $( "#lNumDocsIrreg" ).text( $( "tr[id*=rngDocsIrreg]" ).length + " documento(s) anexado(s)" );
    }
    catch ( err )
    {
        MensajeError( "[cuentaArchivosIrreg] \n" + err.message );
    }
}
function cargaEntidad( _psNDll, _psNTxt )
{
    try
    {
        _oData = "{ _psNombreEnt: '" + $( "#" + _psNTxt ).val() + "' }";

        $.ajax( {
            type: "POST",
            url: "AlertaEmp.aspx/AJAX_cargaEntidadBusc",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                $( "#" + _psNDll ).empty();
                $( "#" + _psNDll ).append( $( "<option     />" ).val( "0" ).text( "--> Resultados de la busqueda, seleccione uno: <--" ) );

                $.each( data.d, function ()
                {
                    $( "#" + _psNDll ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreMuestra ) );
                } );
            }
            else
            {
                MensajeError( "Hubo un error al traer los datos." )
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al traer los datos [AJAX.cargaEntidad()]" );
        } );
    }
    catch ( err )
    {
        MensajeError( "[cargaEntidades] \n" + err.message );
    }
}
function guardaDenuncia()
{

    var _sCmbId = "";
    var _sResp;
    var _bConf = true;

    try
    {
        //if ( $( "#rdIANo" ).prop( "checked" ) && ( $( "#txtNombSP" ).val() == "" || $( "#txtTelContacto" ).val() == "" ) )
        //{
        //    MensajeError( "Si no desea que la información sea confidencial debe capturar su nombre y su telefono de contacto." );
        //    $( "#txtNombSP" ).css( "border-color", "red" );
        //    $( "#txtTelContacto" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    //Recaptcha.reload();
        //    return false;
        //}

        //$( "#txtNombSP" ).css( "border-color", "" );
        //$( "#txtTelContacto" ).css( "border-color", "" );

        if ( !$( "#rdEntFed" ).prop( "checked" ) && !$( "#rdEntEstatal" ).prop( "checked" ) && !$( "#rdEntMunicipal" ).prop( "checked" ) )
        {
            MensajeError( "Debe seleccionar la Entidad Federal o la Entidad Estatal o la Entidad Municipal." );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        if ( $( "#rdEntFed" ).prop( "checked" ) && ( $( "#ddlEnt" ) == null || $( "#ddlEnt" ).val() == 0 ) )
        {
            MensajeError( "Debe seleccionar la Entidad Federal." );
            $( "#ddlEnt" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        $( "#ddlEnt" ).css( "border-color", "" );

        if ( $( "#rdEntEstatal" ).prop( "checked" ) && ( $( "#ddlEdoEntEst" ).val() == 0 || $( "#txtEntEst" ).val() == "" ) )
        {
            MensajeError( "Debe de seleccionar el Estado y capturar la Entidad Estatal." );
            $( "#txtEntEst" ).css( "border-color", "red" );
            $( "#ddlEdoEntEst" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        $( "#txtEntEst" ).css( "border-color", "" );
        $( "#ddlEdoEntEst" ).css( "border-color", "" );

        if ( $( "#rdEntMunicipal" ).prop( "checked" ) && ( $( "#ddlEdoEntMun" ).val() == 0 || $( "#ddelMunEntMun" ).val() == 0 || $( "#txtEntMun" ).val() == "" ) )
        {
            MensajeError( "Debe de seleccionar el Estado, el Municipio y capturar la Entidad Municipal." );
            $( "#ddlEdoEntMun" ).css( "border-color", "red" );
            $( "#ddelMunEntMun" ).css( "border-color", "red" );
            $( "#txtEntMun" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        $( "#ddlEdoEntMun" ).css( "border-color", "" );
        $( "#ddelMunEntMun" ).css( "border-color", "" );
        $( "#txtEntMun" ).css( "border-color", "" );

        if ( $( "input[id*=rdIrreg]:checked" ).length == 0 )
        {
            MensajeError( "Debe seleccionar al menos un concepto de irregularidad." );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        _sCmbId = String( $( "input[id*=rdIrreg]:checked" ).prop( "id" ) ).replace( "rdIrreg", "" );

        if ( $( "#txtDescIrreg" + _sCmbId ).val() == "" )
        {
            MensajeError( "Debe capturar una descripción de la irregularidad." );
            $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        if ( String( $( "#txtDescIrreg" + _sCmbId ).val() ).length > 3999 )
        {
            MensajeError( "El texto capturado no puede sobrepasar los 4000 caracteres." );
            $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        if ( $( "#txtEmail" ).val() == "" )
        {
            //Mandamos confirmación
            $( "#divControlPopupFondo" ).height( $( document ).height() );
            $( "#divControlPopupFondo" ).show();

            $( "#lMje" ).text( "Es recomendable que capture una dirección de correo para mantener una comunicación activa con la ASF, más no es obligatorio capturar una.\n¿Desea capturarla?" );

            $( "#dMje" ).dialog( {
                resizable: true,
                height: "auto",
                width: "35%",
                modal: true,
                dialogClass: "no-close",
                buttons: {
                    "Si": function ()
                    {
                        $( "#dMje" ).dialog( "close" );
                    },
                    "No": function ()
                    {
                        $( "#dMje" ).dialog( "close" );

                        if ( $( "#txtPass" ).val() == "" )
                        {
                            MensajeError( "Debe capturar una contraseña." );
                            $( "#txtPass" ).css( "border-color", "red" );
                            grecaptcha.reset();
                            //Recaptcha.reload();

                            return false;
                        }
                        else
                        {
                            if ( $( "#txtPass" ).val().length < 8 )
                            {
                                MensajeError( "La contraseña debe ser de 8 caracteres." );
                                $( "#txtPass" ).css( "border-color", "red" );
                                grecaptcha.reset();
                                //Recaptcha.reload();
                                return false;
                            }
                        }

                        //$( "#txtNombSP" ).css( "border-color", "" );
                        //$( "#txtTelContacto" ).css( "border-color", "" );
                        //$( "#ddlEntPert" ).css( "border-color", "" );
                        //$( "#ddlEntRef" ).css( "border-color", "" );
                        $( "#txtFechaIrreg" ).css( "border-color", "" );
                        //$( "#txtCIrreg" + _sCmbId ).css( "border-color", "" );
                        $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "" );
                        //$( "input[id*=txtInfo-]" ).css( "border-color", "" );

                        resumen();
                    }
                },
                close: function ()
                {
                    $( "#divControlPopupFondo" ).hide();
                }
            } );
        }
        else
        {
            if ( !validateEmail( $( "#txtEmail" ).val() ) )
            {
                MensajeError( "Dirección de correo electrónico inválida." );
                $( "#txtPass" ).css( "border-color", "red" );
                grecaptcha.reset();
                //Recaptcha.reload();

                return false;
            }

            if ( $( "#txtPass" ).val() == "" )
            {
                MensajeError( "Debe capturar una contraseña." );
                $( "#txtPass" ).css( "border-color", "red" );
                grecaptcha.reset();
                //Recaptcha.reload();

                return false;
            }
            else
            {
                if ( $( "#txtPass" ).val().length < 8 )
                {
                    MensajeError( "La contraseña debe ser de 8 caracteres." );
                    $( "#txtPass" ).css( "border-color", "red" );
                    grecaptcha.reset();
                    //Recaptcha.reload();
                    return false;
                }
            }

            //$( "#txtNombSP" ).css( "border-color", "" );
            //$( "#txtTelContacto" ).css( "border-color", "" );
            //$( "#ddlEntPert" ).css( "border-color", "" );
            //$( "#ddlEntRef" ).css( "border-color", "" );
            $( "#txtFechaIrreg" ).css( "border-color", "" );
            //$( "#txtCIrreg" + _sCmbId ).css( "border-color", "" );
            $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "" );
            //$( "input[id*=txtInfo-]" ).css( "border-color", "" );

            resumen();
        }



        return false;
    }
    catch ( err )
    {
        MensajeError( "[guardaDenuncia] \n" + err.message );
        grecaptcha.reset();
        //Recaptcha.reload();
        return false;
    }
}
function resumen()
{
    var _sHTML = "";
    var _sStyle = "";
    var _bToogle = false;
    var _cDts = Collection();
    var _sIrreg = "";
    var _aDtsDoctosIrreg = new Array();

    try
    {
      
        _sCmbId = String( $( "input[id*=rdIrreg]:checked" ).prop( "id" ) ).replace( "rdIrreg", "" );

        //_sIrreg = $( "#tIrreg" + _sCmbId.substring( 0, 1 ) ).text();

        _sIrreg = $( "input[id*=rdIrreg]:checked" ).next().html();

        _sHTML += "<label class=\"ControlForm\" style=\"font-weight: bold;\">Entidad seleccionada</label>";

        if ( $( "#rdEntFed" ).prop( "checked" ) && $( "#ddlEnt" ).val() != null && $( "#ddlEnt" ).val() != 0 )
        {
            _sHTML += "<ul>";
            _sHTML += "<li><label class=\"ControlForm\">Nombre: " + $( "#ddlEnt option:selected" ).text() + "</label></li>";
            _sHTML += "</ul>";
        }
        else if ( $( "#rdEntEstatal" ).prop( "checked" ) && $( "#ddlEdoEntEst" ).val() != null && $( "#txtEntEst" ).val() != "" )
        {
            _sHTML += "<ul>";
            _sHTML += "<li><label class=\"ControlForm\">Nombre: " + $( "#ddlEdoEntEst option:selected" ).text() + " - " + $( "#txtEntEst" ).val() + "</label></li>";
            _sHTML += "</ul>";
        }
        else if ( $( "#rdEntMunicipal" ).prop( "checked" ) && $( "#ddlEdoEntMun" ).val() != null && $( "#ddelMunEntMun" ).val() != null && $( "#txtEntMun" ).val() != "" )
        {
            _sHTML += "<ul>";
            _sHTML += "<li><label class=\"ControlForm\">Entidad: " + $( "#ddlEdoEntMun option:selected" ).text() + " - " + $( "#ddelMunEntMun option:selected" ).text() + " - " + $( "#txtEntMun" ).val() + "</label></li>";
            _sHTML += "</ul>";
        }

        _sHTML += "<label class=\"ControlForm\" style=\"font-weight: bold;\">Irregularidad seleccionada</label>";
        _sHTML += "<ul type=\"disk\">";
        _sHTML += "<li><label class=\"ControlForm\" style=\"font-weight: bold;\">" + _sIrreg + "</label>";
        
        //_sSubTipo = $( "input[id*=rdIrreg]:checked" ).next().html();

        //_sHTML += "<ul>";
        //_sHTML += "<li><label class=\"ControlForm\">" + _sSubTipo + "</label></li>";
        //_sHTML += "</ul>";

        _sHTML += "<ul>";
        _sHTML += "<li><label class=\"ControlForm\">Descripción: " + $( "#txtDescIrreg" + _sCmbId ).val() + "</label></li>";
        _sHTML += "</ul>";

        _sHTML += "</li>";
        _sHTML += "</ul>";

        $( "#dTblRes" ).empty();
        $( "#dTblRes" ).append( _sHTML );
        

        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();

        $( "#dvRes" ).dialog( {
            resizable: true,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Continuar": function ()
                {
                    _oData = "{ _sResponse: '" + grecaptcha.getResponse() + "' }";

                    $.ajax( {
                        type: "POST",
                        url: "AlertaEmp.aspx/AJAX_verificaReCaptcha",
                        data: _oData,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    } )
                    .done( function ( data, textStatus, jqXHR )
                    {
                        var _lLlaveAud = 0;
                        var _iContInt = 0;
                        var _aResp = new Array();

                        //_aResp = String( data.d ).split( "[ß]" );
                        var _aResp2 = JSON.parse(data.d);

                        if (_aResp2.success)
                        {
                            $.each( $( "tr[id*=rngDocsIrreg]" ), function ( index, element )
                            {
                                var _iIdRng = 0;

                                _cDts = null;
                                _cDts = new Collection;

                                _iIdRng = String( element.id ).replace( "rngDocsIrreg", "" );

                                _cDts.add( "NOMBRE_DOCTO", $( "#lblArchIrreg" + _iIdRng ).text() );

                                _aDtsDoctosIrreg[index] = _cDts._oData;
                            } );

                            _oData = "{ _psIrreg: '" + _sIrreg + "' " +
                                        ", _psDescIrreg: '" + ( _sCmbId == 0 ? "" : $( "#txtDescIrreg" + _sCmbId ).val() ) + "' " +
                                        ", _psAnonima: '1'" + //+ ( $( "#rdIANo" ).prop( "checked" ) ? 0 : 1 ) + "' " +
                                        ", _psNombreDen: ''" + //+ $( "#txtNombSP" ).val() + "' " +
                                        ", _psTelDen: ''" + //+ $( "#txtTelContacto" ).val() + "' " +
                                        ", _psEntidad: '" + ( $( "#rdEntFed" ).prop( "checked" ) ? $( "#ddlEnt option:selected" ).text() : ( $( "#rdEntEstatal" ).prop( "checked" ) ? $( "#txtEntEst" ).val() : $( "#txtEntMun" ).val() ) ) + "' " +
                                        ", _psEstado: '" + ( $( "#rdEntEstatal" ).prop( "checked" ) ? $( "#ddlEdoEntEst option:selected" ).text() : ( $( "#rdEntMunicipal" ).prop( "checked" ) ? $( "#ddlEdoEntMun option:selected" ).text() : "" ) ) + "' " +
                                        ", _psMunicipio: '" + ( $( "#rdEntMunicipal" ).prop( "checked" ) ? $( "#ddelMunEntMun option:selected" ).text() : "" ) + "' " +
                                        ", _psFechaIrreg: '" + $( "#txtFechaIrreg" ).val() + "' " +
                                        ", _psFechaIrreg2: '" + $( "#txtFechaIrreg2" ).val() + "' " +
                                        ", _psMail: '" + $( "#txtEmail" ).val() + "' " +
                                        ", _poDocsIrreg: " + ( _aDtsDoctosIrreg.length == 0 ? null : JSON.stringify( _aDtsDoctosIrreg ) ) +
                                        ", _psHostAddress: '" + $( "#hdnUserHostAddress" ).val() + "' " +
                                        ", _psHostName: '" + $( "#hdnUserHostName" ).val() + "' " +
                                        ", _psPassword: '" + $( "#txtPass" ).val() + "' " +
                                        "}";

                            $.ajax( {
                                type: "POST",
                                url: "AlertaEmp.aspx/AJAX_guardaDenuncia",
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
                                    grecaptcha.reset();
                                    //Recaptcha.reload();
                                }
                            } )
                            .fail( function ( jqXHR, textStatus, errorThrown )
                            {
                                MensajeError( "Error al guardar los datos [AJAX.guardaDenuncia()]" );
                                grecaptcha.reset();
                                //Recaptcha.reload();
                            } );
                        }
                        else
                        {
                            //if ( _aResp[0] == "The verification words are incorrect." )
                            //{
                            //    MensajeError( "Captcha incorrecto, intente de nuevo." );
                            //}
                            //else
                            //{
                            //    MensajeError( _aResp[0] );
                            //}
                            MensajeError("Captcha incorrecto, intente de nuevo.");
                            grecaptcha.reset();
                            ////Recaptcha.reload();
                        }
                    } )
                    .fail( function ( jqXHR, textStatus, errorThrown )
                    {
                        MensajeError( "Error al validar el recaptcha [AJAX.guardaDenuncia()]" );
                        grecaptcha.reset();
                        //Recaptcha.reload();
                    } );

                    $( "#dvRes" ).dialog( "close" );
                },
                "Cancelar": function ()
                {
                    grecaptcha.reset();
                    //Recaptcha.reload();
                    $( "#dvRes" ).dialog( "close" );
                }
            },
            close: function ()
            {
                $( "#divControlPopupFondo" ).hide();
            }
        } );
    }
    catch ( err )
    {
        MensajeError( "[resumen] \n" + err.message );
        grecaptcha.reset();
        //Recaptcha.reload();
        return false;
    }
}
function seguimiento()
{
    window.open( "Consulta.aspx" );
}