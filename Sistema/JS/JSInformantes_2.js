var _sIdrdIrreg = "";
var _bIrreg = false;
var _aDtsAuds = new Array();
var _aDtsDoctos = new Array();
var _aDtsDoctosIrreg = new Array();
var _iContDocs = 0;
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

    $( document ).tooltip( {
        track: true
    });

    $( ".toolImps" ).prop( "title", "Impuestos son las contribuciones establecidas en ley que deben pagar las personas físicas y morales que se " +
                                        "encuentran en la situación jurídica o de hecho prevista por la misma y que sean distintas de las señaladas en las fracciones " +
                                        "II, III y IV de este Artículo. (Código Fiscal de la Federación, Título Primero, Cápitulo I, Artículo 2o.)." );

    $( ".toolAport" ).prop( "title", "Aportaciones de seguridad social son las contribuciones establecidas en ley a cargo de personas " +
                                        "que son sustituidas por el Estado en el cumplimiento de obligaciones fijadas por la ley en materia " +
                                        "de seguridad social o a las personas que se beneficien en forma especial por servicios de " +
                                        "seguridad social proporcionados por el mismo Estado. (Código Fiscal de la Federación, Título Primero, Cápitulo I, Artículo 2o.)." );

    $( ".toolDer" ).prop( "title", "Derechos son las contribuciones establecidas en Ley por el uso o aprovechamiento de los bienes " +
                                        "del dominio público de la Nación, así como por recibir servicios que presta el Estado en sus " +
                                        "funciones de derecho público, excepto cuando se presten por organismos descentralizados u " +
                                        "organos desconcentrados cuando en este último caso, se trate de contraprestaciones que no se " +
                                        "encuentren previstas en la Ley Federal de Derechos. También son derechos las contribuciones a " +
                                        "cargo de los organismos públicos descentralizados por prestar servicios exclusivos del Estado. " +
                                        "(Código Fiscal de la Federación, Título Primero, Cápitulo I, Artículo 2o.)." );

    $( ".toolAprov" ).prop( "title", "Los aprovechamientos son los ingresos que percibe el Estado por funciones de derecho público distintos de " +
                                        "las contribuciones, de los ingresos derivados de financiamientos y de los que obtengan los organismos " +
                                        "descentralizados y las empresas de participación estatal." );

    $( "#txtBuscEnt, #txtBuscEntIrreg" ).prop( "title", "Escriba el nombre, siglas o parte del nombre de la entidad que desea buscar, el resultado aparecerá en la lista desplegable de abajo." )

    $( "#diag-load, #diag-error, #diag-ok, #dMje, #dvRes" ).hide();

    $( "#lSeguimiento" ).prop( "title", "De clic aquí para poder ver el estatus de o las cédulas que haya registrado anteiormente." );

    //********************************************************
    //Archivos
    $( "#tblDocPorSubir" ).hide();
    $( "#diag-upload" ).hide();

    //$( "#btnSubirArch" ).button( {
    //    icons: {
    //        primary: "ui-icon ui-icon-circle-plus"
    //    }
    //} );

    //$( "#btnSubirArch" ).on( "click", GuardarArchivos() );

    $( "#lSeguimiento" ).button( {
        icons: {
            primary: "ui-icon ui-icon-lightbulb"
        }
    } );

    $( "#btnSubir, #lSubArch" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    $( "#btnSubir" ).click( function ()
    {
        $( "#flUp" ).trigger( 'click' );
    } );

    $( "#flUp" ).on( "change", PreparaArchivos );

    //********************************************************

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

    //********************************************************

    

    var icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };

    $( "#dIrregs, div.accordian" ).accordion( {
        icons: icons,
        collapsible: true,
        heightStyle: "content",
        active: false
    } );

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

    $( "table[id*=tIrreg-]" ).hide();
    
    $( "input[id*=rdIrreg]" ).change( function ()
    {
        var _rdIrreg = $( this );

        if ( $( this ).prop( "checked" ) )
        {
            if ( _sIdrdIrreg != "" || $( "input[id*=chkAud-]:checked" ).length != 0 )
            {
                $( "#divControlPopupFondo" ).height( $( document ).height() );
                $( "#divControlPopupFondo" ).show();

                $( "#lMje" ).text( "Solo puede seleccionar una o varias auditorías o una sola irregularidad, al seleccionar otra irregularidad la opción previamente seleccionada será descartada. " +
                                        "Si así lo desea puede dar de alta otra Denuncia volviendo a entrar al Sistema. ¿Desea continuar?." );

                $( "#dMje" ).dialog( {
                    resizable: true,
                    height: "auto",
                    width: "55%",
                    modal: true,
                    dialogClass: "no-close",
                    buttons: {
                        "Si": function ()
                        {
                            _sIdrdIrreg = $( _rdIrreg ).prop( "id" );
                            $( "table[id*=tIrreg-]" ).hide( "blind" );
                            $( "#tIrreg-" + String( $( _rdIrreg ).prop( "id" ) ).replace( "rdIrreg", "" ) ).show( "blind" );
                            $( "input[id*=chkAud-]" ).prop( "checked", false );
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
                $( "input[id*=chkAud-]" ).prop( "checked", false );
                $( "table[id*=rTb-]" ).hide();
            }
        }
    } );

    cargaEntidades();

    //$( "#ddlEntPert, #ddlEntRef, #ddlEntAud" ).combobox();

    $( "#lAgregEnt" ).button( {
        icons: {
            primary: "ui-icon-plusthick"
        }
    } );

    $( "#lQuitaEnt" ).button( {
        icons: {
            primary: "ui-icon-closethick"
        }
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

    $( "#lBuscEntAds, #lBtnBuscEntIrreg" ).button( {
        icons: {
            primary: "ui-icon-search"
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

    //$( "#txtTelContacto" ).keydown( function ( event )
    //{
    //    if ( !SoloNumeros( event ) )
    //    {
    //        event.preventDefault();
    //    }
    //} );

    $( "#ddlEntRef" ).change( function ()
    {
        if ( $( this ).val != 0 )
        {
            cargaPAAF();
        }
    } );

    //$( "#ddlEntRef" ).combobox( {
    //    select: function ( event, ui )
    //    {
    //        if ( $( this ).val != 0 && $( this ).val != null )
    //        {
    //            //$( "#tbAuds" ).show( "blind" );
    //            cargaPAAF();
    //        }
    //    }
    //} );

    $( "#dSS" ).hide();
    $( "#dSPAct" ).hide();

    $( "#rdEsSPSi" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#dSPAct" ).show();
        }

    } );

    $( "#rdEsSPNo" ).change( function ()
    {
        if ( $( this ).prop( "checked" ) )
        {
            $( "#dSPAct" ).hide();
        }

    } );

} );
function agregaOtraEnt()
{
    try
    {
        if ( $( "#ddlEntRef" ).val() != -1 && $( "#ddlEntRef" ).val() != null )
        {
            if ( $( "#lstbEntRef option[value*='" + $( "#ddlEntRef" ).val() + "']" ).length == 0 )
            {
                $( "#lstbEntRef" ).append( "<option value=\"" + $( "#ddlEntRef" ).val() + "\">" + $( "#ddlEntRef option:selected" ).text() + "</option>" );
            }
        }
    }
    catch ( err )
    {
        MensajeError( "[agregaOtraEnt] \n" + err.message );
    }
}
function quitaOtraEnt()
{
    try
    {
        $( "#lstbEntRef option[value*='" + $( "#lstbEntRef option:selected" ).val() + "']" ).remove();
    }
    catch ( err )
    {
        MensajeError( "[quitaOtraEnt] \n" + err.message );
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

        //if ( $( "#ddlEntPert" ).val() == 0 )
        //{
        //    MensajeError( "Debe seleccionar una entidad o dependencia de adscripción." );
        //    $( "#ddlEntPert" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#lstbEntRef option" ).length == 0 )
        //{
        //    MensajeError( "Debe seleccionar al menos una entidad o dependencia de la presunta irregularidad." );
        //    $( "#ddlEntRef" ).css( "border-color", "red" );
        //    $( "#lstbEntRef" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}

        if ( $( "#rdEsSPSi" ).prop( "checked" ) && $( "#ddlEntPert" ).val() == 0 && $( "#txtOtraEntAdsc" ).val() == "" )
        {
            MensajeError( "Si es servidor público activo debe seleccionar una entidad de adscripción. Si no encuentra la entidad en la lista puede capturar el nombre en la seccion \"Otra entidad que no se encuentre en el catálogo\"." );
            $( "#ddlEntPert" ).css( "border-color", "red" );
            grecaptcha.reset();
            ////Recaptcha.reload();
            return false;
        }

        if ( $( "#ddlEntRef" ).val() == 0 && $( "#txtOtraEntIrreg" ).val() == "" )
        {
            MensajeError( "Debe seleccionar al menos una entidad o dependencia de la presunta irregularidad. Si no encuentra la entidad en la lista puede capturar el nombre en la seccion \"Otra entidad que no se encuentre en el catálogo\"." );
            $( "#ddlEntPert" ).css( "border-color", "red" );
            grecaptcha.reset();
            ////Recaptcha.reload();
            return false;
        }

        //if ( $( "#txtFechaIrreg" ).val() == "" )
        //{
        //    MensajeError( "Debe seleccionar una fecha estimada de la irregularidad." );
        //    $( "#txtFechaIrreg" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}

        if ( $( "input[id*=rdIrreg]:checked" ).length == 0 )
        {
            //Verificamos selección de auditorías
            if ( $( "input[id*=chkAud-]:checked" ).length == 0 )
            {
                MensajeError( "Debe seleccionar al menos un concepto de irregularidad o auditoría(s) en curso" );
                grecaptcha.reset();
                ////Recaptcha.reload();
                return false;
            }
            else
            {
                $( "input[id*=txtInfo-]" ).css( "border-color", "" );
                $.each( $( "input[id*=chkAud-]:checked" ), function ()
                {
                    _sCmbId = String( $( this ).prop( "id" ) ).replace( "chkAud-", "" );

                    if ( $( "#txtInfo-" + _sCmbId ).val() == "" )
                    {
                        MensajeError( "Debe de capturar la información de la auditoría seleccionada." );
                        $( "#txtInfo-" + _sCmbId ).css( "border-color", "red" );
                        grecaptcha.reset();
                        ////Recaptcha.reload();
                        _bConf = false;
                        return false;
                    }
                } );

                if ( !_bConf )
                {
                    return false;
                }

            }
            _bIrreg = false;
        }
        else
        {
            _bIrreg = true;
        }

        if ( _bIrreg )
        {
            _sCmbId = String( $( "input[id*=rdIrreg]:checked" ).prop( "id" ) ).replace( "rdIrreg", "" );

            if ( $( "#txtCIrreg" + _sCmbId ).val() == "" )
            {
                MensajeError( "Debe completar los datos para dar de alta la irregularidad." );
                $( "#txtCIrreg" + _sCmbId ).css( "border-color", "red" );
                grecaptcha.reset();
                ////Recaptcha.reload();
                return false;
            }

            if ( $( "#txtDescIrreg" + _sCmbId ).val() == "" )
            {
                MensajeError( "Debe capturar una descripción de la irregularidad." );
                $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "red" );
                grecaptcha.reset();
                ////Recaptcha.reload();
                return false;
            }

            if ( String( $( "#txtDescIrreg" + _sCmbId ).val() ).length > 3999 )
            {
                MensajeError( "El texto capturado no puede sobrepasar los 4000 caracteres." );
                $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "red" );
                grecaptcha.reset();
                ////Recaptcha.reload();
                return false;
            }
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
                width: "auto",
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
                            ////Recaptcha.reload();
                           
                            return false;
                        }
                        else
                        {
                            if ( $( "#txtPass" ).val().length < 8 )
                            {
                                MensajeError( "La contraseña debe ser de 8 caracteres." );
                                $( "#txtPass" ).css( "border-color", "red" );
                                grecaptcha.reset();
                                ////Recaptcha.reload();
                                return false;
                            }
                        }

                        //$( "#txtNombSP" ).css( "border-color", "" );
                        //$( "#txtTelContacto" ).css( "border-color", "" );
                        $( "#ddlEntPert" ).css( "border-color", "" );
                        $( "#ddlEntRef" ).css( "border-color", "" );
                        $( "#txtFechaIrreg" ).css( "border-color", "" );
                        $( "#txtCIrreg" + _sCmbId ).css( "border-color", "" );
                        $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "" );
                        $( "input[id*=txtInfo-]" ).css( "border-color", "" );

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
                ////Recaptcha.reload();

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
            $( "#ddlEntPert" ).css( "border-color", "" );
            $( "#ddlEntRef" ).css( "border-color", "" );
            $( "#txtFechaIrreg" ).css( "border-color", "" );
            $( "#txtCIrreg" + _sCmbId ).css( "border-color", "" );
            $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "" );
            $( "input[id*=txtInfo-]" ).css( "border-color", "" );

            resumen();
        }

        

        return false;
    }
    catch(err)
    {
        MensajeError( "[guardaDenuncia] \n" + err.message );
        grecaptcha.reset();
        //Recaptcha.reload();
        return false;
    }
}
function cargaEntidad( _psNDll, _psNTxt )
{
    try
    {
        _oData = "{ _psNombreEnt: '" + $( "#" + _psNTxt ).val() + "' }";

        $.ajax( {
            type: "POST",
            url: "Informantes.aspx/AJAX_cargaEntidadBusc",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                $( "#" + _psNDll ).empty();
                $( "#" + _psNDll ).append( $( "<option     />" ).val( "0" ).text( "--> Resultados de la busqueda, seleccione una entidad: <--" ) );

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
function cargaEntidades()
{
    try
    {
        _oData = "{}";

        $.ajax( {
            type: "POST",
            url: "Informantes.aspx/AJAX_cargaEntidades",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                $( "#ddlEntPert" ).empty();
                $( "#ddlEntRef" ).empty();
                //$( "#ddlEntAud" ).empty();

                $( "#ddlEntPert" ).append( $( "<option     />" ).val( "0" ).text( "Seleccione una entidad o realice una búsqueda" ) );
                $( "#ddlEntRef" ).append( $( "<option     />" ).val( "0" ).text( "Seleccione una entidad o realice una búsqueda" ) );
                //$( "#ddlEntAud" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                

                $.each( data.d, function ()
                {
                    $( "#ddlEntPert" ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreMuestra ) );
                    $( "#ddlEntRef" ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreMuestra ) );
                    //$( "#ddlEntAud" ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreMuestra ) );
                } );
            }
            else
            {
                MensajeError( "Hubo un error al traer los datos." )
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al traer los datos [AJAX.cargaEntidades()]" );
        } );
    }
    catch(err)
    {
        MensajeError( "[cargaEntidades] \n" + err.message );
    }
}
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

        if ( $( "#rdEsSPSi" ).prop( "checked" ) && ( $( "#ddlEntPert" ).val() == 0 && $( "#txtOtraEntAdsc" ).val() == "" ) )
        {
            MensajeError( "Si es servidor público activo debe seleccionar o capturar una entidad de adscripción." );
            $( "#ddlEntPert" ).css( "border-color", "red" );
            $( "#txtOtraEntAdsc" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        if ( $( "#ddlEntRef" ).val() == 0 && $( "#txtOtraEntIrreg" ).val() == "" )
        {
            MensajeError( "Debe seleccionar o capturar al menos una entidad o dependencia de la presunta irregularidad." );
            $( "#ddlEntRef" ).css( "border-color", "red" );
            $( "#txtOtraEntIrreg" ).css( "border-color", "red" );
            grecaptcha.reset();
            //Recaptcha.reload();
            return false;
        }

        //$( "#txtNombSP" ).css( "border-color", "" );
        //$( "#txtTelContacto" ).css( "border-color", "" );
        $( "#ddlEntRef" ).css( "border-color", "" );
        $( "#ddlEntPert" ).css( "border-color", "" );
        $( "#txtOtraEntAdsc" ).css( "border-color", "" );
        $( "#txtOtraEntIrreg" ).css( "border-color", "" );

        $( "#dSS" ).show( "blind" );
        $( "#lAvanSigSecc" ).hide();
    }
    catch(err)
    {
        MensajeError( "[validaPrimSecc] \n" + err.message );
    }
}
function cargaPAAF()
{
    var _iCont = 0;
    var _sHTML = "";
    var _bToogle = true;
    var _sStyle = "";

    try
    {
        _oData = "{ _plLlaveEntidad: " + $("#ddlEntRef").val() + " }";

        $.ajax( {
            type: "POST",
            url: "Informantes.aspx/AJAX_cargaPAAF",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                if ( String( data.d ).indexOf( "Sin Datos" ) == -1 )
                {
                    _sHTML = "<table style=\"width: 100%; border-collapse: collapse; border-spacing: 0px;\">" +
                                "<tr>" +
                                    "<td style=\"width: 5%\">&nbsp;" +
                                    "</td>" +
                                    "<td style=\"background-color: #1F4E81; color: whitesmoke; font-weight: bold; text-align: center\">" +
                                        "<label class=\"ControlForm\">No.<label>" +
                                    "</td>" +
                                    "<td style=\"background-color: #1F4E81; color: whitesmoke; font-weight: bold; text-align: center\">" +
                                        "<label class=\"ControlForm\">Título<label>" +
                                    "</td>" +
                                "</tr>";

                    _oInfo = $.each( data.d, function ()
                    {
                        if ( _bToogle )
                        {
                            _sStyle = "border: 1px solid #1F4E81; background-color: #EFF3FA";
                            _bToogle = false;
                        }
                        else
                        {
                            _sStyle = "border: 1px solid #1F4E81;";
                            _bToogle = true;
                        }

                        _sHTML += "<tr>" +
                                    "<td style=\"width: 5%; border: 1px solid #1F4E81; background-color: #EFF3FA; text-align: center\">" +
                                        "<input type=\"checkbox\" id=\"chkAud-" + this.LlaveAud + "\" class=\"ControlForm\" onchange=\"javascript: muestraCapt( this );\" />" +
                                    "</td>" +
                                    "<td style=\"" + _sStyle + "; text-align: center\">" +
                                        "<label class=\"ControlForm\" id=\"lbNumAud-" + this.LlaveAud + "\">" + this.NumAud + "</label>" +
                                    "</td>" +
                                    "<td style=\"" + _sStyle + "\">" +
                                        "<label class=\"ControlForm\" id=\"lbTitAud-" + this.LlaveAud + "\">" + this.TituloAud + "</label>" +
                                    "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td colspan=\"3\" style=\"width: 100%\">" +
                                        "<table style=\"width: 90%\" id=\"rTb-" + this.LlaveAud + "\">" +
                                            "<tr>" +
                                                "<td colspan=\"2\">" +
                                                    //"<button id=\"bSubArch-" + this.LlaveAud + "\" onclick=\"javascript: abreAdminArch(" + this.LlaveAud + "); return false;\">Subir Documentos</button>" +
                                                    "<a class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary\" id=\"bSubArch" + this.LlaveAud + "\" role=\"button\" " +
                                                    "style=\"color: white;\" onclick=\"javascript: abreAdminArch(" + this.LlaveAud + ", '" + this.NumAud + ' - ' + this.TituloAud + "'); return false;\" " +
                                                    "href=\"javascript:__doPostBack('bSubArch','')\">" +
                                                    "<span class=\"ui-button-icon-primary ui-icon ui-icon-document\"></span><span class=\"ui-button-text\" title=\"Opcional. Puede subir documentos " +
                                                    "para complementar sus comentarios.\">Subir Documentos</span></a>" +
                                                    "&nbsp;<label id=\"lNumDocs" + this.LlaveAud + "\" class=\"ControlForm\">0 documento(s) anexado(s).</label>" +
                                                "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                                "<td style=\"width: 25%\">" +
                                                    "<label class=\"ControlForm\">Compartir información</label>" +
                                                "</td>" +
                                                "<td style=\"width: 75%\">" +
                                                    "<textarea id=\"txtInfo-" + this.LlaveAud + "\" style=\"width: 90%; height: 80px\" class=\"ControlForm\" maxlength=\"3999\"></textarea>" +
                                                "</td>" +
                                            "</tr>" +
                                        "</table>" +
                                    "</td>" +
                                "</tr>";
                    } );
                    _sHTML += "</table>";
                }
                else
                {
                    _sHTML = "<table style=\"width: 100%; border-collapse: collapse; border-spacing: 0px;\">" +
                                "<tr>" +
                                    "<td style=\"width: 100%\"><label class=\"ControlForm\">La entidad seleccionada no tiene auditorías para esta Cuenta Pública.</label></td>" +
                                "</tr>" +
                            "</table>";
                }

                $( "#dTbAuds" ).empty();
                $( "#dTbAuds" ).append( _sHTML );

                $( "table[id*=rTb-]" ).hide();

                //$.when( _oInfo ).done( function ()
                //{
                //    $( "#button[id*=bSubArch-]" ).button( {
                //        icons: {
                //            primary: "ui-icon-document"
                //        }
                //    } );
                //} );
                
            }
            else
            {
                MensajeError( "Hubo un error al traer los datos." )
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al traer los datos [AJAX.cargaPAAF()]" );
        } );
    }
    catch(err)
    {
        MensajeError( "[cargaPAAF] \n" + err.message );
    }
}
function muestraCapt( _poChk )
{
    var _sId = "";
    
    try
    {
        _sId = String( $( _poChk ).prop( "id" ) ).replace( "chkAud-", "" );

        if ( $( _poChk ).prop( "checked" ) )
        {
            //Validar si ya existe selección de irregularidades
            if ( $( "input[id*=rdIrreg]:checked" ).length != 0 )
            {
                //Mandamos confirmación
                $( "#divControlPopupFondo" ).height( $( document ).height() );
                $( "#divControlPopupFondo" ).show();

                $( "#lMje" ).text( "Si tiene Irregularidades seleccionadas estas se descartarán. ¿Desea continuar?" );

                $( "#dMje" ).dialog( {
                    resizable: true,
                    height: "auto",
                    width: "auto",
                    modal: true,
                    dialogClass: "no-close",
                    buttons: {
                        "Si": function ()
                        {
                            _sIdrdIrreg = "";
                            $( "table[id*=tIrreg-]" ).hide( "blind" );

                            $( "#rTb-" + _sId ).show( "blind" );
                            $( "table[id*=tIrreg-]" ).hide( "blind" );
                            $( "input[id*=rdIrreg]" ).prop( "checked", false );

                            $( "#dMje" ).dialog( "close" );
                        },
                        "No": function ()
                        {
                            if ( _sIdrdIrreg != "" )
                            {
                                $( "#" + _sIdrdIrreg ).prop( "checked", true );
                            }
                            $( _poChk ).prop( "checked", false );
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
                _sIdrdIrreg = "";
                $( "table[id*=tIrreg-]" ).hide( "blind" );

                $( "#rTb-" + _sId ).show( "blind" );
                $( "table[id*=tIrreg-]" ).hide( "blind" );
                $( "input[id*=rdIrreg]" ).prop( "checked", false );
            }
        }
        else
        {
            $( "#rTb-" + _sId ).hide( "blind" );
        }
    }
    catch(err)
    {
        MensajeError( "[muestraCapt] \n" + err.message );
    }
}
function abreAdminArch( _plLlaveAud, _psAud )
{
    try
    {
        //Abrir modal
        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();

        _oResp = null;

        $( "#hdnLlaveAudFile" ).val( _plLlaveAud );

        $( "tr[id*=rngDocs]" ).hide();
        $( "tr[id*=rngDocs" + _plLlaveAud + "]" ).show();

        $( "#lblAud" ).text( "Auditoría: " + _psAud );

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
                cuentaArchivos( _plLlaveAud );
            }
        } );
    }
    catch(err)
    {
        MensajeError( "[abreAdminArch] \n" + err.message );
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

                            $( "#tblDocPorSubir > tbody:last" ).append( "<tr style='text-align: center' id='rngDocs" + $( "#hdnLlaveAudFile" ).val() + _iContDocs + "'>" +
                                    "<td style='width:85%'><label class='CtrlFrm' id='lblArch" + $( "#hdnLlaveAudFile" ).val() + _iContDocs + "'>" + response.responseText + "</label></td>" +
                                    "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                                    "onclick='javascript:$(\"#rngDocs" + $( "#hdnLlaveAudFile" ).val() + _iContDocs + "\").remove();'></span></td>" );

                            //for ( _iCont = 0; _iCont <= _aDts.length - 1; _iCont++ )
                            //{

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
function cuentaArchivos( _plLlaveAud )
{
    try
    {
        $( "#lNumDocs" + _plLlaveAud ).text( $( "tr[id*=rngDocs" + _plLlaveAud + "]" ).length + " documento(s) anexado(s)" );
    }
    catch(err)
    {
        MensajeError( "[cuentaArchivos] \n" + err.message );
    }
}
function resumen()
{
    var _sHTML = "";
    var _sStyle = "";
    var _bToogle = false;
    var _cDts = Collection();
    var _sIrreg = "";
    var _sTipo = "";
    var _sSubTipo = "";

    try
    {
        if ( $( "input[id*=rdIrreg]:checked" ).length == 0 )
        {
            //Verificamos selección de auditorías
            if ( $( "input[id*=chkAud-]:checked" ).length != 0 )
            {

                if ( $( "#rdEsSPSi" ).prop( "checked" ) )
                {
                    if ( $( "#ddlEntPert" ).val() != null && $( "#ddlEntPert" ).val() != 0 )
                    {
                        _sHTML += "<ul>";
                        _sHTML += "<li><label class=\"ControlForm\">Entidad de adscripción: " + $( "#ddlEntPert option:selected" ).text() + "</label></li>";
                        _sHTML += "</ul>";
                    }
                    else if ( $( "#txtOtraEntAdsc" ).val() != "" )
                    {
                        _sHTML += "<ul>";
                        _sHTML += "<li><label class=\"ControlForm\">Entidad de adscripción: " + $( "#txtOtraEntAdsc" ).val() + "</label></li>";
                        _sHTML += "</ul>";
                    }
                }

                if ( $( "#ddlEntRef" ).val() != null && $( "#ddlEntRef" ).val() != 0 )
                {
                    _sHTML += "<ul>";
                    _sHTML += "<li><label class=\"ControlForm\">Entidad involucrada: " + $( "#ddlEntRef option:selected" ).text() + "</label></li>";
                    _sHTML += "</ul>";
                }
                else if ( $( "#txtOtraEntIrreg" ).val() != "" )
                {
                    _sHTML += "<ul>";
                    _sHTML += "<li><label class=\"ControlForm\">Entidad involucrada: " + $( "#txtOtraEntIrreg" ).val() + "</label></li>";
                    _sHTML += "</ul>";
                }

                _sHTML += "<table style=\"width: 100%; border-collapse: collapse; border-spacing: 0px;\">";
                _sHTML += "<tr>";
                _sHTML += "<td colspan=\"3\">";
                _sHTML += "<label class=\"ControlForm\">Auditorías seleccionadas</label>";
                _sHTML += "</td>";
                _sHTML += "</tr>";
                _sHTML += "<tr>";
                _sHTML += "<td colspan=\"3\">";
                _sHTML += "&nbsp;";
                _sHTML += "</td>";
                _sHTML += "</tr>";

                $.each( $( "input[id*=chkAud-]:checked" ), function ()
                {
                    _sCmbId = String( $( this ).prop( "id" ) ).replace( "chkAud-", "" );

                    if ( _bToogle )
                    {
                        _sStyle = "border: 1px solid #1F4E81; background-color: #EFF3FA";
                        _bToogle = false;
                    }
                    else
                    {
                        _sStyle = "border: 1px solid #1F4E81;";
                        _bToogle = true;
                    }

                    _sHTML += "<tr>";
                    _sHTML += "<td style=\"" + _sStyle + "\">";
                    _sHTML += "<label class=\"ControlForm\">" + $( "#lbNumAud-" + _sCmbId ).text() + "</label>";
                    _sHTML += "</td>";
                    _sHTML += "<td style=\"" + _sStyle + "\">";
                    _sHTML += "<label class=\"ControlForm\">" + $( "#lbTitAud-" + _sCmbId ).text() + "</label>";
                    _sHTML += "</td>";
                    _sHTML += "<td style=\"" + _sStyle + "\">";
                    _sHTML += "<label class=\"ControlForm\">" + $( "#txtInfo-" + _sCmbId ).text() + "</label>";
                    _sHTML += "</td>";
                    _sHTML += "</tr>";
                } );

                _sHTML += "</table>";

                _sIrreg = "Relacionada con auditorías en curso"
            }

            $( "#dTblRes" ).empty();
            $( "#dTblRes" ).append( _sHTML );
        }
        else 
        {
            _sCmbId = String( $( "input[id*=rdIrreg]:checked" ).prop( "id" ) ).replace( "rdIrreg", "" );

            _sIrreg = $( "#tIrreg" + _sCmbId.substring( 0, 1 ) ).text();

            _sHTML += "<label class=\"ControlForm\" style=\"font-weight: bold;\">Entidad seleccionada</label>";

            if ( $( "#rdEsSPSi" ).prop( "checked" ) )
            {
                if ( $( "#ddlEntPert" ).val() != null && $( "#ddlEntPert" ).val() != 0 )
                {
                    _sHTML += "<ul>";
                    _sHTML += "<li><label class=\"ControlForm\">Entidad de adscripción: " + $( "#ddlEntPert option:selected" ).text() + "</label></li>";
                    _sHTML += "</ul>";
                }
                else if ( $( "#txtOtraEntAdsc" ).val() != "" )
                {
                    _sHTML += "<ul>";
                    _sHTML += "<li><label class=\"ControlForm\">Entidad de adscripción: " + $( "#txtOtraEntAdsc" ).val() + "</label></li>";
                    _sHTML += "</ul>";
                }
            }

            if ( $( "#ddlEntRef" ).val() != null && $( "#ddlEntRef" ).val() != 0 )
            {
                _sHTML += "<ul>";
                _sHTML += "<li><label class=\"ControlForm\">Entidad involucrada: " + $( "#ddlEntRef option:selected" ).text() + "</label></li>";
                _sHTML += "</ul>";
            }
            else if ( $( "#txtOtraEntIrreg" ).val() != "" )
            {
                _sHTML += "<ul>";
                _sHTML += "<li><label class=\"ControlForm\">Entidad involucrada: " + $( "#txtOtraEntIrreg" ).val() + "</label></li>";
                _sHTML += "</ul>";
            }

            _sHTML += "<label class=\"ControlForm\" style=\"font-weight: bold;\">Irregularidad seleccionada</label>";
            _sHTML += "<ul type=\"disk\">";
            _sHTML += "<li><label class=\"ControlForm\" style=\"font-weight: bold;\">" + _sIrreg + "</label>";

            if ( _sCmbId.substring( 0, 1 ) == 2 && _sCmbId.substring( 1, 2 ) <= 7 )
            {
                _sHTML += "<ul>";
                _sHTML += "<li><label class=\"ControlForm\" style=\"font-weight: bold;\">Violaciones a la Ley de Obras Públicas y Servicios Relacionados con las Mismas.</label>";
                _sHTML += "<ul>";
                _sHTML += "<li><label class=\"ControlForm\">" + $( "#lbIrreg" + _sCmbId ).text() + "</label></li>";
                _sHTML += "</ul>";
                _sHTML += "</li>";
                _sHTML += "</ul>";

                //_sIrreg = "Relacionada con Obras Públicas"
                _sTipo = "Violaciones a la Ley de Obras Públicas y Servicios Relacionados con las Mismas"
                _sSubTipo = $( "input[id*=rdIrreg]:checked" ).next().html();
                //_sSubTipo = $( "label[id=" + _sCmbId + "]" ).next().html();
            }
            else
            {
                if (_sCmbId.substring( 0, 1 ) == 5)
                {
                    if (_sCmbId == 51 || _sCmbId == 52 || _sCmbId == 53 || _sCmbId == 56)
                    {
                        _sSubTipo = $( "#lbIrreg" + _sCmbId ).text();
                    }
                    else
                    {
                        _sSubTipo = $( "input[id*=rdIrreg]:checked" ).next().html();
                    }
                }
                else
                {
                    _sSubTipo = $( "input[id*=rdIrreg]:checked" ).next().html();
                }

                

            }

            _sHTML += "<ul>";
            _sHTML += "<li><label class=\"ControlForm\">" + _sSubTipo + "</label></li>";
            _sHTML += "</ul>";

            _sHTML += "<ul>";
            _sHTML += "<li><label class=\"ControlForm\">Concepto: " + $( "#txtCIrreg" + _sCmbId ).val() + "</label></li>";
            _sHTML += "</ul>";

            _sHTML += "<ul>";
            _sHTML += "<li><label class=\"ControlForm\">Descripción: " + $( "#txtDescIrreg" + _sCmbId ).val() + "</label></li>";
            _sHTML += "</ul>";

            _sHTML += "</li>";
            _sHTML += "</ul>";

            $( "#dTblRes" ).empty();
            $( "#dTblRes" ).append( _sHTML );
        }

        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();

        $( "#dvRes" ).dialog( {
            resizable: true,
            height: "auto",
            width: "50%",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Continuar": function ()
                {
                    //Verificamos el recaptcha
                    _oData = "{ _sResponse: '" + grecaptcha.getResponse() + "' }";
                    //_oData = "{ _sResponse: '" + Recaptcha.get_response() + "', _sChallenge: '" + Recaptcha.get_challenge() + "' }";

                    $.ajax( {
                        type: "POST",
                        url: "Informantes.aspx/AJAX_verificaReCaptcha",
                        data: _oData,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    } )
                    .done( function ( data, textStatus, jqXHR )
                    {
                        var _lLlaveAud = 0;
                        var _iContInt = 0;
                        var _aResp = new Array();

                        //_aResp = String(data.d).split("[ß]");
                        var _aResp2 = JSON.parse(data.d);

                        if (_aResp2.success )
                        {
                            //Guardamos
                            //Juntamos Entidades de la Irregularidad
                            //$.each( $( "#lstbEntRef option" ), function ( index, option )
                            //{
                            //    _aDts[index] = $( option ).text();
                            //} );

                            if ( !_bIrreg )
                            {
                                _sCmbId = 0;
                                //Juntamos auditorias
                                //_aDtsAuds = null;
                                //_aDtsDoctos = null;
                                $.each( $( "input[id*=chkAud-]:checked" ), function ( _iIndex )
                                {
                                    _lLlaveAud = String( $( this ).prop( "id" ) ).replace( "chkAud-", "" );

                                    _cDts = null;
                                    _cDts = new Collection;

                                    _cDts.add( "LLAVE_AUDITORIA", _lLlaveAud );
                                    _cDts.add( "INFORMACION", $( "#txtInfo-" + _lLlaveAud ).val() );

                                    _aDtsAuds[_iIndex] = _cDts._oData;

                                    //Juntamos documentos
                                    $.each( $( "tr[id*=rngDocs" + _lLlaveAud + "]" ), function ()
                                    {
                                        _cDts = null;
                                        _cDts = new Collection;

                                        _cDts.add( "LLAVE_AUDITORIA", _lLlaveAud );
                                        _cDts.add( "NOMBRE_DOCTO", $( "#lblArch" + _lLlaveAud + _iContInt ).text() );

                                        _aDtsDoctos[_iContInt] = _cDts._oData;

                                        _iContInt += 1;

                                    } );

                                } );
                            }

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
                                        ", _psTipo: '" + _sTipo + "' " +
                                        ", _psSubTipo: '" + _sSubTipo + "' " +
                                        ", _psCIrreg: '" + ( _sCmbId == 0 ? "" : $( "#txtCIrreg" + _sCmbId ).val() ) + "' " +
                                        ", _psDescIrreg: '" + ( _sCmbId == 0 ? "" : $( "#txtDescIrreg" + _sCmbId ).val() ) + "' " +
                                        //", _psAnonima: '" + ( $( "#rdIANo" ).prop( "checked" ) ? 0 : 1 ) + "' " +
                                        ", _psAnonima: '1' " +
                                        ", _psNombreSP: ''" + // + $( "#txtNombSP" ).val() + "' " +
                                        ", _psTelSP: ''" + //$( "#txtTelContacto" ).val() + "' " +
                                        ", _psSPActivo: '" + ( $( "#rdEsSPSi" ).prop( "checked" ) ? 1 : 0 ) + "' " +
                                        ", _psEntidadAds: '" + ( $( "#ddlEntPert" ).val() == null ? 0 : ( $( "#ddlEntPert" ).val() == 0 ? 0 : $( "#ddlEntPert option:selected" ).text() ) ) + "' " +
                                        ", _psOtraEntidadAds: '" + ( $( "#ddlEntPert" ).val() == null ? "" : $("#txtOtraEntAdsc").val() ) + "' " +
                                        ", _psEntIrreg: '" + $( "#ddlEntRef option:selected" ).text() + "' " +
                                        ", _psOtraEntIrreg: '" + $( "#txtOtraEntIrreg" ).val() + "' " +
                                        ", _psFechaIrreg: '" + $( "#txtFechaIrreg" ).val() + "' " +
                                        ", _psFechaIrreg2: '" + $( "#txtFechaIrreg2" ).val() + "' " +
                                        ", _psMail: '" + $( "#txtEmail" ).val() + "' " +
                                        ", _poAuds: " + ( _aDtsAuds.length == 0 ? null : JSON.stringify( _aDtsAuds ) ) +
                                        ", _poDocs: " + ( _aDtsDoctos.length == 0 ? null : JSON.stringify( _aDtsDoctos ) ) +
                                        ", _poDocsIrreg: " + ( _aDtsDoctosIrreg.length == 0 ? null : JSON.stringify( _aDtsDoctosIrreg ) ) +
                                        ", _psHostAddress: '" + $( "#hdnUserHostAddress" ).val() + "' " +
                                        ", _psHostName: '" + $( "#hdnUserHostName" ).val() + "' " +
                                        ", _psPassword: '" + $( "#txtPass" ).val() + "' " +
                                        "}";

                            $.ajax( {
                                type: "POST",
                                url: "Informantes.aspx/AJAX_guardaDenuncia",
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
                                    ////Recaptcha.reload();
                                }
                            } )
                            .fail( function ( jqXHR, textStatus, errorThrown )
                            {
                                MensajeError( "Error al guardar los datos [AJAX.guardaDenuncia()]" );
                                grecaptcha.reset();
                                ////Recaptcha.reload();
                            } );
                        }
                        else
                        {
                            //if ( _aResp[0] == "The verification words are incorrect." )
                            //{
                                MensajeError( "Captcha incorrecto, intente de nuevo." );
                            //}
                            //else
                            //{
                            //    MensajeError( _aResp[0] );
                            //}
                            grecaptcha.reset();
                            ////Recaptcha.reload();
                        }
                    } )
                    .fail( function ( jqXHR, textStatus, errorThrown )
                    {
                        MensajeError( "Error al validar el recaptcha [AJAX.guardaDenuncia()]" );
                        grecaptcha.reset();
                        ////Recaptcha.reload();
                    } );

                    $( "#dvRes" ).dialog( "close" );
                },
                "Cancelar": function ()
                {
                    grecaptcha.reset();
                    ////Recaptcha.reload();
                    $( "#dvRes" ).dialog( "close" );
                }
            },
            close: function ()
            {
                $( "#divControlPopupFondo" ).hide();
            }
        } );
    }
    catch(err)
    {
        MensajeError( "[resumen] \n" + err.message );
        grecaptcha.reset();
        ////Recaptcha.reload();
        return false;
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
function seguimiento()
{
    window.open( "Consulta.aspx" );
}
