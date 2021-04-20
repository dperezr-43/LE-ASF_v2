var _sIdrdIrreg = "";
var _bIrreg = false;
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

    $( "#txtBuscEntIrreg" ).prop( "title", "Escriba el nombre, siglas o parte del nombre de la entidad que desea buscar, el resultado aparecerá en la lista desplegable de abajo." )

    $( "#diag-load, #diag-error, #diag-ok, #dMje, #dvRes" ).hide();

    //********************************************************
    //Archivos
    //$( "#tblDocPorSubir" ).hide();
    //$( "#tblbtnSube" ).hide();
    //$( "#diag-upload" ).hide();

    ////$( "#btnSubirArch" ).button( {
    ////    icons: {
    ////        primary: "ui-icon ui-icon-circle-plus"
    ////    }
    ////} );

    ////$( "#btnSubirArch" ).on( "click", GuardarArchivos() );

    //$( "#btnSubir" ).button( {
    //    icons: {
    //        primary: "ui-icon ui-icon-folder-open"
    //    }
    //} );

    //$( "#btnSubir" ).click( function ()
    //{
    //    $( "#flUp" ).trigger( 'click' );
    //} );

    //$( "#flUp" ).on( "change", PreparaArchivos );

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
            if ( _sIdrdIrreg != "" )
            {
                $( "#divControlPopupFondo" ).height( $( document ).height() );
                $( "#divControlPopupFondo" ).show();

                $( "#lMje" ).text( "Solo puede seleccionar una sola irregularidad, al seleccionar otra irregularidad la opción previamente seleccionada será descartada. " +
                                        "Si así lo desea puede dar de alta otra Denuncia volviendo a entrar al Sistema. ¿Desea continuar?." );

                $( "#dMje" ).dialog( {
                    resizable: true,
                    height: "auto",
                    width: "380px",
                    modal: true,
                    dialogClass: "no-close",
                    buttons: {
                        "Si": function ()
                        {
                            _sIdrdIrreg = $( _rdIrreg ).prop( "id" );
                            $( "table[id*=tIrreg-]" ).hide( "blind" );
                            $( "#tIrreg-" + String( $( _rdIrreg ).prop( "id" ) ).replace( "rdIrreg", "" ) ).show( "blind" );
                            //$( "input[id*=chkAud-]" ).prop( "checked", false );
                            //$( "table[id*=rTb-]" ).hide();
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
                //$( "input[id*=chkAud-]" ).prop( "checked", false );
                //$( "table[id*=rTb-]" ).hide();
            }
        }
    } );

    cargaEntidades();

    //$( "#ddlEntPert, #ddlEntRef, #ddlEntAud" ).combobox();

    //$( "#lAgregEnt" ).button( {
    //    icons: {
    //        primary: "ui-icon-plusthick"
    //    }
    //} );

    //$( "#lQuitaEnt" ).button( {
    //    icons: {
    //        primary: "ui-icon-closethick"
    //    }
    //} );

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

    //$( "#ddlEntRef" ).change( function ()
    //{
    //    if ( $( this ).val != 0 )
    //    {
    //        cargaPAAF();
    //    }
    //} );

    $( "#dSS" ).hide();
} );
function guardaDenuncia()
{

    var _sCmbId = "";
    var _sResp;
    //var _aDtsAuds = new Array();
    //var _aDtsDoctos = new Array();
    //var _cDts = Collection();
    //var _bIrreg = false;
    
    try
    {
        //if ( $( "#rdIANo" ).prop( "checked" ) && ( $( "#txtNombSP" ).val() == "" || $( "#txtTelContacto" ).val() == "" ) )
        //{
        //    MensajeError( "Si no desea que la información sea confidencial debe capturar su nombre y su telefono de contacto." );
        //    $( "#txtNombSP" ).css( "border-color", "red" );
        //    $( "#txtTelContacto" ).css( "border-color", "red" );
        //    grecaptcha.reset();
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

        if ( $( "#rdEsSPSi" ).prop( "checked" ) && $( "#ddlEntPert" ).val() == 0 )
        {
            MensajeError( "Si es servidor público activo debe seleccionar una entidad de adscripción." );
            $( "#ddlEntPert" ).css( "border-color", "red" );
            grecaptcha.reset();
            return false;
        }

        if ( $( "#ddlEntRef" ).val() == 0 )
        {
            MensajeError( "Debe seleccionar al menos una entidad o dependencia de la presunta irregularidad." );
            $( "#ddlEntPert" ).css( "border-color", "red" );
            grecaptcha.reset();
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
            MensajeError( "Debe seleccionar al menos una irregularidad" );
            grecaptcha.reset();
            return false;
        }

        //if ( $( "#txtEmail" ).val() == "" )
        //{
        //    //Mandamos confirmación
        //    $( "#divControlPopupFondo" ).height( $( document ).height() );
        //    $( "#divControlPopupFondo" ).show();

        //    $( "#lMje" ).text( "Si no captura una dirección de correo electrónico no se podrá dar seguimiento a su denuncia. Es recomendable que capture una para mantener comunicación y darle seguimiento.\n¿Desea capturarlo?" );

        //    $( "#dMje" ).dialog( {
        //        resizable: true,
        //        height: "auto",
        //        width: "auto",
        //        modal: true,
        //        dialogClass: "no-close",
        //        buttons: {
        //            "Si": function ()
        //            {
        //                $( "#dMje" ).dialog( "close" );
        //            },
        //            "No": function ()
        //            {
        //                $( "#dMje" ).dialog( "close" );

        //                if ( $( "#txtPass" ).val() == "" )
        //                {
        //                    MensajeError( "Debe capturar una contraseña." );
        //                    $( "#txtPass" ).css( "border-color", "red" );
        //                    grecaptcha.reset();
        //                    return false;
        //                }
        //                else
        //                {
        //                    if ( $( "#txtPass" ).val().length < 8 )
        //                    {
        //                        MensajeError( "La contraseña debe ser de 8 caracteres." );
        //                        $( "#txtPass" ).css( "border-color", "red" );
        //                        grecaptcha.reset();
        //                        return false;
        //                    }
        //                }

        //                $( "#txtNombSP" ).css( "border-color", "" );
        //                $( "#txtTelContacto" ).css( "border-color", "" );
        //                $( "#ddlEntRef" ).css( "border-color", "" );
        //                $( "#txtCIrreg" + _sCmbId ).css( "border-color", "" );
        //                $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "" );

        //                resumen();
        //            }
        //        },
        //        close: function ()
        //        {
        //            $( "#divControlPopupFondo" ).hide();
        //        }
        //    } );
        //}
        if ( $( "#txtEmail" ).val() != "" )
        {
            if ( !validateEmail( $( "#txtEmail" ).val() ) )
            {
                MensajeError( "Dirección de correo electrónico inválida." );
                $( "#txtEmail" ).css( "border-color", "red" );
                grecaptcha.reset();

                return false;
            }

            //if ( $( "#txtPass" ).val() == "" )
            //{
            //    MensajeError( "Debe capturar una contraseña." );
            //    $( "#txtPass" ).css( "border-color", "red" );
            //    grecaptcha.reset();
            //    return false;
            //}
            //else
            //{
            //    if ( $( "#txtPass" ).val().length < 8 )
            //    {
            //        MensajeError( "La contraseña debe ser de 8 caracteres." );
            //        $( "#txtPass" ).css( "border-color", "red" );
            //        grecaptcha.reset();
            //        return false;
            //    }
            //}

            //$( "#txtNombSP" ).css( "border-color", "" );
            //$( "#txtTelContacto" ).css( "border-color", "" );
            $( "#ddlEntRef" ).css( "border-color", "" );
            $( "#txtCIrreg" + _sCmbId ).css( "border-color", "" );
            $( "#txtDescIrreg" + _sCmbId ).css( "border-color", "" );
           
        }
        else
        {
            MensajeError( "Es recomendable que capture una dirección de correo para mantener una comunicación activa con la ASF, más no es obligatorio capturar una." );
        }

        resumen();

        return false;
    }
    catch(err)
    {
        MensajeError( "[guardaDenuncia] \n" + err.message );
        grecaptcha.reset();
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
            url: "Sugerencias.aspx/AJAX_cargaEntidadBusc",
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
function cargaEntidades()
{
    try
    {
        _oData = "{}";

        $.ajax( {
            type: "POST",
            url: "Sugerencias.aspx/AJAX_cargaEntidades",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                //$( "#ddlEntPert" ).empty();
                $( "#ddlEntRef" ).empty();
                //$( "#ddlEntAud" ).empty();

                //$( "#ddlEntPert" ).append( $( "<option     />" ).val( "0" ).text( "Seleccione una entidad o realice una búsqueda" ) );
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
        //    return false;
        //}

        if ( $( "#rdEsSPSi" ).prop( "checked" ) && $( "#ddlEntPert" ).val() == 0 )
        {
            MensajeError( "Si es servidor público activo debe seleccionar una entidad de adscripción." );
            $( "#ddlEntPert" ).css( "border-color", "red" );
            grecaptcha.reset();
            return false;
        }

        if ( $( "#ddlEntRef" ).val() == 0 )
        {
            MensajeError( "Debe seleccionar al menos una entidad o dependencia de la presunta irregularidad." );
            $( "#ddlEntRef" ).css( "border-color", "red" );
            grecaptcha.reset();
            return false;
        }

        //$( "#txtNombSP" ).css( "border-color", "" );
        //$( "#txtTelContacto" ).css( "border-color", "" );
        $( "#ddlEntRef" ).css( "border-color", "" );
        $( "#ddlEntPert" ).css( "border-color", "" );

        $( "#dSS" ).show( "blind" );
        $( "#lAvanSigSecc" ).hide();
    }
    catch(err)
    {
        MensajeError( "[validaPrimSecc] \n" + err.message );
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
        if ( $( "input[id*=rdIrreg]:checked" ).length != 0 )
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

            //if ( _sCmbId.substring( 0, 1 ) == 2 && _sCmbId.substring( 1, 2 ) <= 7 )
            //{
            //    _sHTML += "<ul>";
            //    _sHTML += "<li><label class=\"ControlForm\" style=\"font-weight: bold;\">Violaciones a la Ley de Obras Públicas y Servicios Relacionados con las Mismas.</label>";
            //    _sHTML += "<ul>";
            //    _sHTML += "<li><label class=\"ControlForm\">" + $( "#lbIrreg" + _sCmbId ).text() + "</label></li>";
            //    _sHTML += "</ul>";
            //    _sHTML += "</li>";
            //    _sHTML += "</ul>";

            //    _sIrreg = "Relacionada con Obras Públicas"
            //    _sTipo = "Violaciones a la Ley de Obras Públicas y Servicios Relacionados con las Mismas"
            //    _sSubTipo = $( "input[id*=rdIrreg]:checked" ).next().html();
            //}
            //else
            //{
            if ( _sCmbId.substring( 0, 1 ) == 5 )
            {
                if ( _sCmbId == 51 || _sCmbId == 52 || _sCmbId == 53 || _sCmbId == 56 )
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
            width: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Continuar": function ()
                {
                    _oData = "{ _sResponse: '" + grecaptcha.getResponse() + "' }";

                    $.ajax( {
                        type: "POST",
                        url: "Sugerencias.aspx/AJAX_verificaReCaptcha",
                        data: _oData,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    } )
                    .done( function ( data, textStatus, jqXHR )
                    {
                        var _lLlaveAud = 0;
                        var _iContInt = 0;

                        var _aResp = new Array();

                        var _aResp2 = JSON.parse(data.d);

                        //_sResp = JSON.parse( data.d );
                        //if ( _sResp.success )
                        if (_aResp2.success)
                        {

                            _oData = "{ _psIrreg: '" + _sIrreg + "' " +
                                        ", _psTipo: '" + _sTipo + "' " +
                                        ", _psSubTipo: '" + _sSubTipo + "' " +
                                        ", _psCIrreg: '" + ( _sCmbId == 0 ? "" : $( "#txtCIrreg" + _sCmbId ).val() ) + "' " +
                                        ", _psDescIrreg: '" + ( _sCmbId == 0 ? "" : $( "#txtDescIrreg" + _sCmbId ).val() ) + "' " +
                                        ", _psAnonima: '1'" + //+ ( $( "#rdIANo" ).prop( "checked" ) ? 0 : 1 ) + "' " +
                                        ", _psNombreSP: ''" + //+ $( "#txtNombSP" ).val() + "' " +
                                        ", _psTelSP: ''" + //+ $( "#txtTelContacto" ).val() + "' " +
                                        ", _psSPActivo: '" + ( $( "#rdEsSPSi" ).prop( "checked" ) ? 1 : 0 ) + "' " +
                                        ", _psEntIrreg: '" + $( "#ddlEntRef option:selected" ).text() + "' " +
                                        ", _psFechaIrreg: '" + $( "#txtFechaIrreg" ).val() + "' " +
                                        ", _psFechaIrreg2: '" + $( "#txtFechaIrreg2" ).val() + "' " +
                                        ", _psMail: '" + $( "#txtEmail" ).val() + "' " +
                                        ", _psHostAddress: '" + $( "#hdnUserHostAddress" ).val() + "' " +
                                        ", _psHostName: '" + $( "#hdnUserHostName" ).val() + "' " +
                                        ", _psPassword: '' " +
                                        "}";

                            $.ajax( {
                                type: "POST",
                                url: "Sugerencias.aspx/AJAX_guardaDenuncia",
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
                                    document.location = "Folio.aspx?_sFolio=" + data.d + "&_sTipo=Sugerencias";
                                }
                                else
                                {
                                    MensajeError( "Hubo un error al guardar los datos." );
                                    grecaptcha.reset();
                                }
                            } )
                            .fail( function ( jqXHR, textStatus, errorThrown )
                            {
                                MensajeError( "Error al guardar los datos [AJAX.guardaDenuncia()]" );
                                grecaptcha.reset();
                            } );
                        }
                        else
                        {
                            MensajeError("Captcha incorrecto, intente de nuevo.");
                            grecaptcha.reset();
                        }
                    } )
                    .fail( function ( jqXHR, textStatus, errorThrown )
                    {
                        MensajeError("Error al validar el recaptcha [AJAX.guardaDenuncia()]");
                        //grecaptcha.reset();
                        grecaptcha.reset();
                    } );

                    $( "#dvRes" ).dialog( "close" );
                },
                "Cancelar": function ()
                {
                    //grecaptcha.reset();
                    grecaptcha.reset();
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
        return false;
    }
}