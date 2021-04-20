
let _iContDocs = 0;
let Collection = function () {
    this._lCount = 0;
    this._oData = {};
    this.add = function ( key, item ) {
        if ( this._oData[key] != undefined )
            return undefined;
        this._oData[key] = item;
        return ++this._lCount
    }
    this.remove = function ( key ) {
        if ( this._oData[key] == undefined )
            return undefined;
        delete this._oData[key]
        return --this._lCount
    }
    this.item = function ( key ) {
        return this._oData[key];
    }
}
$( document ).keydown( function ( e ) {
    if ( e.keyCode == 8 && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA' ) {
        e.preventDefault();
    }
} );
$( document ).ready( function () {
    //$( "#grid" ).bootgrid();

    $( document ).tooltip( {
        track: true,
        position: { my: "left+40 center", at: "right center" }
    } );

    $( "#txtBuscCatDepEAPF" ).prop( "title", "Escriba el nombre, siglas o parte del nombre de la entidad que desea buscar, el resultado aparecerá en la lista desplegable de abajo." )

    $( document ).ajaxStart( function () {
        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();
        $( "#diag-load" ).dialog( {
            dialogClass: "no-close",
            resizable: false,
            height: "auto",
            modal: true
        } );
    } );
    $( document ).ajaxStop( function () {
        $( "#divControlPopupFondo" ).hide();
        $( "#diag-load" ).dialog( "close" );
    } );

    $( "#lBuscAud" ).button( {
        icons: {
            primary: "ui-icon-search"
        }
    } );
    $( "#lnkValidaCorreo" ).button( {
        icons: {
            primary: "ui-icon-mail-closed"
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

    $( "#lAbreDirectorio" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    $( "#lBuscCatDepEAPF, #lBuscCatOrgsCA" ).button( {
        icons: {
            primary: "ui-icon-search"
        }
    } );

    $( "#lSeguimiento" ).prop( "title", "De clic aquí para poder ver el estatus de o las denuncias que haya registrado anteiormente." );

    $( "#lSeguimiento" ).button( {
        icons: {
            primary: "ui-icon ui-icon-lightbulb"
        }
    } );

    $( "#trcorreo, #tOpcFP, #tFPF, #tBuscCatDepEAPF, #tBuscCatOrgsCA, #tFPE, #tBuscDepEntsEsts, #tBuscOrgsConsAutEst, #tBuscFPMD, " +
        "#tDenOtro, #dSS, #tCiud, #tOpcOSC, #tOpcCiud, #tOpcSPASF, #tOpcSPASFEstruc, #tOpcSPASFHon, #tOpcProv, #tOpcDtsSASF, #tOpcNoDtsSASF, " +
        "#tNoTDtsPuedoIdent, #tNCElem, #tArchs, #tOpcAud, #tbAud" ).hide();
    $( "#diag-ok, #diag-error, #dMje, #diag-load, #diag-upload, #dDirectorio, .sfSel" ).hide();

    $( "#trQuienDenun" ).hide();

    $( "#rdQuienFP" ).prop( "title", "Se considera servidor público aquella persona que desempeña empleo, cargo o comisión de conformidad con el artículo 3°, fracción XXV, de la Ley General de Responsabilidades Administrativas" );
    $( "#lblAquien" ).prop( "title", "Si su denuncia no se ubica en una de las dos opciones, deberá elegir otra vertiente del menú principal donde canalizar su denuncia" );

    //************************************************
    //Identidad Reservada

    $( "#txtOtroRazones" ).prop( "disabled", true );

    $( "input[id*=rdRes]" ).change( function () {
        if ( $( this ).prop( "id" ) == "rdRes5" ) {
            if ( $( this ).prop( "checked" ) ) {
                $( "#txtOtroRazones" ).prop( "disabled", false );
            }
        }
        else {
            $( "#txtOtroRazones" ).prop( "disabled", true );
        }
    } );
    $( "#lAvanSigSecc" ).hide();
    $( "#rdInfoResSi" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#lAvanSigSecc" ).hide();
            $( "#dSS" ).hide( "blind" );
            //$( "#lAvanSigSecc" ).hide();
            //  $( "#tPorQue" ).show( "blind" );
            $( "#trcorreo" ).show( "blind" );
            $( "#tQDen" ).prop( "disabled", true );
            $( "#tOpcFP" ).hide();
            $( "#rdQuienFP" ).prop( "checked", false );
            $( "#tOpcCiud" ).hide();
            $( "#rdQuienCiud" ).prop( "checked", false );
            $( "#tOpcOSC" ).hide();
            $( "#rdQuienOSC" ).prop( "checked", false );
            $( "#tOpcSPASF" ).hide();
            $( "#rdQuienSPASF" ).prop( "checked", false );
            $( "#tOpcProv" ).hide();
            $( "#rdQuienProv" ).prop( "checked", false );
            $( "#tDenOtro" ).hide();
            $( "#rdQuienOtro" ).prop( "checked", false );
            $( "#trQuienDenun" ).hide();
        }
    } );

    $( "#rdInfoResNo" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#lAvanSigSecc" ).show();
            $( "#tPorQue" ).hide( "blind" );
            $( "#tQDen" ).prop( "disabled", false );
            $( "#trQuienDenun" ).show();
            $( "#trcorreo" ).hide( "blind" );
        }
    } );

    //************************************************
    //Quien denuncia
    //************************************************
    //Funcionario Publico
    $( "#rdQuienFP" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tOpcFP" ).show( "blind" );
            $( "#tFPF" ).show( "blind" );

            $( "#tOpcCiud" ).hide( "blind" );
            $( "#tOpcOSC" ).hide( "blind" );
            $( "#tOpcProv" ).hide( "blind" );
            $( "#tDenOtro" ).hide( "blind" );
        }
    } );
    //************************************************
    //Funcionario Publico Federal
    $( "#rdFPF" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tFPF" ).show( "blind" );
            $( "#tFPE" ).hide( "blind" );
            $( "#tBuscFPMD" ).hide( "blind" );
        }
    } );

    $( "#rdCatDepEAPF" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tBuscCatDepEAPF" ).show( "blind" );
            $( "#tBuscCatOrgsCA" ).hide( "blind" );
        }
    } );

    $( "#rdCatOrgsCA" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tBuscCatOrgsCA" ).show( "blind" );
            $( "#tBuscCatDepEAPF " ).hide( "blind" );
        }
    } );
    //************************************************
    //Funcionario Publico Estatal
    //$( "#rdFPE" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#tFPE" ).show( "blind" );
    //        $( "#tFPF" ).hide( "blind" );
    //        $( "#tBuscFPMD" ).hide( "blind" );
    //    }
    //} );

    $( "#rdDepEntsEsts" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tBuscDepEntsEsts" ).show( "blind" );
            $( "#tBuscOrgsConsAutEst" ).hide( "blind" );
        }
    } );

    $( "#rdOrgsConsAutEst" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tBuscOrgsConsAutEst" ).show( "blind" );
            $( "#tBuscDepEntsEsts" ).hide( "blind" );
        }
    } );
    //************************************************
    //Funcionario Municipal/Delegacional
    //$( "#rdFPMD" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#tFPE" ).hide( "blind" );
    //        $( "#tFPF" ).hide( "blind" );
    //        $( "#tBuscFPMD" ).show( "blind" );
    //    }
    //} );

    //************************************************

    $( "#sFPF, #sFPE, #sFPM, #sFPFopc1, #sFPFopc2, #sFPEopc1, #sFPEopc2" ).mouseover( function () {
        $( this ).css( "background-color", "#CFDAE5" );
    } );

    $( "#sFPF, #sFPE, #sFPM, #sFPFopc1, #sFPFopc2, #sFPEopc1, #sFPEopc2" ).mouseout( function () {
        $( this ).css( "background-color", "" );
    } );

    $( "#rdQuienCiud, #rdQuienOSC, #rdQuienSPASF, #rdQuienProv, #rdQuienOtro, #rdQuienOSC, #rdQuienSPASF" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            //$( "#tOpcFP" ).hide( "blind" );
            $( "div[id*=tOpc]" ).hide( "blind" );
            $( "#tOpc" + String( $( this ).prop( "id" ) ).replace( "rdQuien", "" ) ).show( "blind" );

            if ( $( this ).prop( "id" ) == "rdQuienOtro" ) {
                $( "#tDenOtro" ).show( "blind" );
            }
            else {
                $( "#tDenOtro" ).hide( "blind" );
            }
        }
    } );

    //$( "#rdFASFNo" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#lMje" ).text( "Si su denuncia no es contra un Servidor Público de la ASF le sugerimos elegir otra vertiente donde canalizar su denuncia, de click en Aceptar para regresar al menu principal, de click en Cancelar para continuar capturando su denuncia." );

    //        $( "#divControlPopupFondo" ).height( $( document ).height() );
    //        $( "#divControlPopupFondo" ).show();

    //        $( "#dMje" ).dialog( {
    //            resizable: true,
    //            height: "auto",
    //            width: "40%",
    //            modal: true,
    //            dialogClass: "no-close",
    //            buttons: {
    //                "Aceptar": function ()
    //                {
    //                    //$( "#dMje" ).dialog( "close" );
    //                    //setTimeout( function ()
    //                    //{
    //                    document.location = "../index/index.html";
    //                    //}, 5000 );
    //                },
    //                "Cancelar": function ()
    //                {
    //                    $( "#rdFASFSi" ).prop( "checked", true );
    //                    $( "#rdFASFNo" ).prop( "checked", false );
    //                    $( "#dMje" ).dialog( "close" );
    //                }
    //            },
    //            close: function ()
    //            {
    //                $( "#divControlPopupFondo" ).hide();
    //            }
    //        } );


    //        //MensajeError( "Si su denuncia no es contra un Servidor Público de la ASF le sugerimos elegir otra vertiente donde canalizar su denuncia, gracias." );

    //    }
    //} );

    $( "#rdNTDNINo" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#lMje" ).text( "Su denuncia no puede proceder le sugerimos elegir otra vertiente donde canalizar su denuncia, de click en Aceptar para regresar al menu principal, de click en Cancelar para continuar capturando su denuncia." );

            $( "#divControlPopupFondo" ).height( $( document ).height() );
            $( "#divControlPopupFondo" ).show();

            $( "#dMje" ).dialog( {
                resizable: true,
                height: "auto",
                width: "40%",
                modal: true,
                dialogClass: "no-close",
                buttons: {
                    "Aceptar": function () {
                        //$( "#dMje" ).dialog( "close" );
                        //setTimeout( function ()
                        //{
                        document.location = "../index/index.html";
                        //}, 5000 );
                    },
                    "Cancelar": function () {
                        $( "#rdFASFSi" ).prop( "checked", true );
                        $( "#rdFASFNo" ).prop( "checked", false );
                        $( "#dMje" ).dialog( "close" );
                    }
                },
                close: function () {
                    $( "#divControlPopupFondo" ).hide();
                }
            } );

            //MensajeError( "Su denuncia no puede proceder, le agradecemos haber utilizado el sistema de Denuncias de la ASF." );
            //setTimeout( function ()
            //{
            //    document.location = "http://www.asf.gob.mx/";
            //}, 5000 );
        }
    } );

    $( "#rdOpcSPASFEstruc, #rdOpcSPASFHon" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            //$( "#tOpcFP" ).hide( "blind" );
            $( "div[id*=tOpcSPASFInt]" ).hide( "blind" );
            $( "#tOpcSPASFInt" + String( $( this ).prop( "id" ) ).replace( "rdOpcSPASF", "" ) ).show( "blind" );
        }
    } );

    $( "#rdDtsSASFSi" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tOpcDtsSASF" ).show( "blind" );
            $( "#tOpcNoDtsSASF" ).hide( "blind" );
        }
    } );

    $( "#rdDtsSASFNo" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tOpcDtsSASF" ).hide( "blind" );
            $( "#tOpcNoDtsSASF" ).show( "blind" );
        }
    } );

    $( "#rdNoTengoDts" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
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

    //$( "#txtFechaIrreg, #txtFechaFin" ).datepicker( {
    //    showAnim: "slide",
    //    changeMonth: true,
    //    changeYear: true,
    //    showButtonPanel: true,
    //    dateFormat: "dd/mm/yy"
    //} );

    $( "#txtFechaIrreg, #txtFechaFin" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy",
        onSelect: function ( dateText, inst ) {
            //if ( $( this ).prop( "id" ) == "txtFechaIrreg" && $( "#txtFechaFin" ).val() != "" )
            //{
            //    if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) > $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaFin" ).val() ) )
            //    {
            //        MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
            //        $( this ).val( "" );
            //    }
            //}
            //else if ( $( this ).prop( "id" ) == "txtFechaFin" && $( "#txtFechaIrreg" ).val() != "" )
            //{
            //    if ( $.datepicker.parseDate( "dd/mm/yy", $( this ).val() ) < $.datepicker.parseDate( "dd/mm/yy", $( "#txtFechaIrreg" ).val() ) )
            //    {
            //        MensajeError( "La fecha inicial no puede ser mayor a la fecha final." );
            //        $( this ).val( "" );
            //    }
            //}
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

    $( "#btnSubir" ).click( function () {
        $( "#flUp" ).trigger( 'click' );
    } );



    $( "#flUp" ).on( "change", PreparaArchivos );

    let icons = {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };

    $( "#dPuntos" ).accordion( {
        icons: icons,
        collapsible: true,
        heightStyle: "content",
        active: false,
        beforeActivate: function ( event, ui ) {
            // The accordion believes a panel is being opened
            if ( ui.newHeader[0] ) {
                var currHeader = ui.newHeader;
                var currContent = currHeader.next( '.ui-accordion-content' );
                // The accordion believes a panel is being closed
            } else {
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

    $( "#rdNCElem" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tNCElem" ).show( "blind" );
            $( "#tArchs" ).hide( "blind" );
        }
    } );

    //$( "#rdCElem" ).change( function ()
    //{
    //    if ( $( this ).prop( "checked" ) )
    //    {
    //        $( "#tArchs" ).show( "blind" );
    //    }
    //    else
    //    {
    //        $( "#tArchs" ).hide( "blind" );
    //    }
    //} );

    $( "#rdCElemSi" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tArchs" ).show( "blind" );
        }
    } );


    $( "#rdCElemNo" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tArchs" ).hide( "blind" );
        }
    } );

    $( "#rdSiAud" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tOpcAud" ).show( "blind" );
        }
    } );

    $( "#rdNoAud" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#tOpcAud" ).hide( "blind" );
        }
    } );


    $( "#rdNoseFecha" ).change( function () {
        if ( $( this ).prop( "checked" ) ) {
            $( "#txtFechaIrreg" ).prop( "disabled", true );
            $( "#txtFechaIrreg" ).val( "" );
        }
    } );

    //Checamos estatus de la liga	
    if ( $( "#hdnEstatusLiga" ).val() != "" ) {
        if ( $( "#hdnEstatusLiga" ).val() === "Error" ) {
            ShowPopup( "Validación de Liga Incorrecta, por favor capture otro Correo Electrónico e ingrese desde la liga enviada al Correo capturado" );
        }
        else if ( $( "#hdnEstatusLiga" ).val() === "Liga Caducada" ) {
            ShowPopup( "La liga de validación caducó, por favor capture otro Correo Electrónico e ingrese desde la liga enviada al Correo capturado" );
        }
        else {
            $( "#rdInfoResSi" ).prop( "checked", true );
            $( "#rdInfoResNo" ).hide();
            $( "label[for='rdInfoResNo']" ).hide();
            $( "#dSS" ).show( "blind" );
            $( "#lAvanSigSecc" ).hide();

        }
    }

} );


$( document ).tooltip( { track: true } );
function validaPrimSecc() {
    try {
        //if ( $( "#rdInfoResSi" ).prop( "checked" ) && ( !$( "#rdRes1" ).prop( "checked" ) && !$( "#rdRes2" ).prop( "checked" ) && !$( "#rdRes3" ).prop( "checked" ) && !$( "#rdRes4" ).prop( "checked" ) && !$( "#rdRes5" ).prop( "checked" ) ) )
        //{
        //    MensajeError( "Por favor detalle por qué razón desea que su identidad sea reservada." );
        //    grecaptcha.reset();
        //    return false;
        //}


        if ( $( "#rdInfoResSi" ).prop( "checked" ) ) {

            if ( $( "#txtDomicilio" ).val() === "" ) {
                MensajeError( "Por favor proporcione un correo electrónico o domicilio." );
                grecaptcha.reset();
                return false;
            }
            else {
                if ( String( $( "#txtDomicilio" ).val() ).indexOf( "@" ) != -1 ) {
                    if ( !validateEmail( $( "#txtDomicilio" ).val() ) ) {
                        MensajeError( "Por favor proporcione un correo electrónico válido." );
                        grecaptcha.reset();
                        return false;
                    }
                }
            }

        }


        //if ( $( "#rdRes5" ).prop( "checked" ) && $("#txtOtroRazones").val() == "" )
        //{
        //    MensajeError( "Por favor capture el detalle de la otra razón por la cuál desea que su identidad sea reservada." );
        //    $( "#txtOtroRazones" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}

        //$( "#txtOtroRazones" ).css( "border-color", "" );






        //if ($("#rdInfoResNo").prop("checked") && (!$("#rdQuienFP").prop("checked") && !$("#rdQuienCiud").prop("checked") && !$("#rdQuienOSC").prop("checked") &&
        //    !$("#rdQuienSPASF").prop("checked") && !$("#rdQuienProv").prop("checked") && !$("#rdQuienOtro").prop("checked")))
        if ( $( "#rdInfoResNo" ).prop( "checked" ) && ( !$( "#rdQuienFP" ).prop( "checked" ) && !$( "#rdQuienCiud" ).prop( "checked" ) && !$( "#rdQuienOSC" ).prop( "checked" ) &&
            !$( "#rdQuienProv" ).prop( "checked" ) && !$( "#rdQuienOtro" ).prop( "checked" ) ) ) {
            MensajeError( "Si no desea que su identidad sea reservada, por favor detalle quién está denunciando." );
            grecaptcha.reset();
            return false;
        }

        if ( $( "#rdQuienFP" ).prop( "checked" ) && ( !$( "#rdFPF" ).prop( "checked" ) && !$( "#rdFPE" ).prop( "checked" ) && !$( "#rdFPMD" ).prop( "checked" ) ) ) {
            MensajeError( "Por favor detalle si es Servidor Público Federal, Estatal o Municipal/Delegacional." );
            grecaptcha.reset();
            return false;
        }




        if ( $( "#rdQuienFP" ).prop( "checked" ) && ( $( "#rdFPF" ).prop( "checked" ) || $( "#rdFPE" ).prop( "checked" ) || $( "#rdFPMD" ).prop( "checked" ) ) ) {



            if ( $( "#txtNombFuncFPF" ).val() == "" ) {
                MensajeError( "Por favor detalle Nombre(s), Apellido Paterno, Apellido Materno." );
                $( "#txtNombFuncFPF" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtNombFuncFPF" ).css( "border-color", "" );
            //if ($("#txtMailFuncFPF").val() == "") {
            //    MensajeError("Por favor detalle correo electrónico.");
            //    grecaptcha.reset();
            //    return false;
            //}

            //if ($("#txtMailConfirmFuncFPF").val() == "") {
            //    MensajeError("Por favor confirme el correo electrónico.");
            //    grecaptcha.reset();
            //    return false;
            //}

            if ( !validaEmail( $( "#txtMailFuncFPF" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailFuncFPF" ).css( "border-color", "red" );
                return false;
            }
            if ( !validaEmail( $( "#txtMailConfirmFuncFPF" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailConfirmFuncFPF" ).css( "border-color", "red" );
                return false;
            }

            if ( $( "#txtMailFuncFPF" ).val() != $( "#txtMailConfirmFuncFPF" ).val() ) {
                MensajeError( "Correo eléctrónico no coincide, favor de verificarlo" );
                grecaptcha.reset();
                $( "#txtMailFuncFPF" ).css( "border-color", "red" );
                $( "#txtMailConfirmFuncFPF" ).css( "border-color", "red" );
                return false;
            }

            $( "#txtMailFuncFPF" ).css( "border-color", "" );
            $( "#txtMailConfirmFuncFPF" ).css( "border-color", "" );

            if ( $( "#txtMailFuncFPF" ).val() == "" && $( "#txtDomicilioFuncFPF" ).val() == "" ) {
                MensajeError( "Por favor detalle correo electrónico o domicilio." );
                grecaptcha.reset();
                return false;
            }

        }

        //if ( ($( "#rdFPF" ).prop( "checked" ) ) && ( !$( "#rdCatDepEAPF" ).prop( "checked" ) && !$( "#rdCatOrgsCA" ).prop( "checked" ) ) )
        //{
        //    MensajeError( "Por favor detalle si pertenece a algúna Dependencia o Entidad de la Administración Pública o si pertenece a algún Organismo Constitucionalmente Autónomo." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdCatDepEAPF" ).prop( "checked" ) && $( "#ddlCatDepEAPF" ).val() == 0 )
        //{
        //    MensajeError( "Por favor seleccione la Dependencia o Entidad a la que pertenece." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdCatOrgsCA" ).prop( "checked" ) && $( "#txtCatOrgsCA" ).val() == "" )
        //{
        //    MensajeError( "Por favor capture el nombre del Organismo al que pertenece." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdFPE" ).prop( "checked" ) && ( !$( "#rdDepEntsEsts" ).prop( "checked" ) && !$( "#rdOrgsConsAutEst" ).prop( "checked" ) ) )
        //{
        //    MensajeError( "Por favor detalle si pertenece a algúna Dependencia o Entidad Estatal o si pertenece a algún Organismo Constitucionalmente Autónomo Estatal." );
        //    grecaptcha.reset();
        //    return false;
        //}   

        //if ( $( "#rdDepEntsEsts" ).prop( "checked" ) && $( "#txtBuscDepEntsEsts" ).val() == "" )
        //{
        //    MensajeError( "Por favor seleccione la Dependencia o Entidad a la que pertenece." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdOrgsConsAutEst" ).prop( "checked" ) && $( "#txtBuscOrgsConsAutEst" ).val() == "" )
        //{
        //    MensajeError( "Por favor seleccione el Organismo al que pertenece." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdFPMD" ).prop( "checked" ) && $( "#txtBuscFPMD" ).val() == "" )
        //{
        //    MensajeError( "Por favor seleccione la Dependencia a la que pertenece." );
        //    grecaptcha.reset();
        //    return false;
        //}

        if ( $( "#rdQuienCiud" ).prop( "checked" ) ) {

            if ( $( "#txtNombreCiudadano" ).val() == "" ) {
                MensajeError( "Por favor detalle Nombre(s), Apellido Paterno, Apellido Materno." );
                $( "#txtNombreCiudadano" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtNombreCiudadano" ).css( "border-color", "" );

            if ( !validaEmail( $( "#txtMailCiudadano" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailCiudadano" ).css( "border-color", "red" );
                return false;
            }
            if ( !validaEmail( $( "#txtMailConfirmCiudadano" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailConfirmCiudadano" ).css( "border-color", "red" );
                return false;
            }

            if ( $( "#txtMailCiudadano" ).val() != $( "#txtMailConfirmCiudadano" ).val() ) {
                MensajeError( "Correo eléctrónico no coincide, favor de verificarlo" );
                grecaptcha.reset();
                $( "#txtMailCiudadano" ).css( "border-color", "red" );
                $( "#txtMailConfirmCiudadano" ).css( "border-color", "red" );
                return false;
            }

            $( "#txtMailCiudadano" ).css( "border-color", "" );
            $( "#txtMailConfirmCiudadano" ).css( "border-color", "" );

            if ( $( "#txtMailCiudadano" ).val() == "" && $( "#txtDomicilioCiudadano" ).val() == "" ) {
                MensajeError( "Por favor detalle correo electrónico o domicilio." );
                $( "#txtMailCiudadano" ).css( "border-color", "red" );
                $( "#txtDomicilioCiudadano" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtMailCiudadano" ).css( "border-color", "" );
            $( "#txtDomicilioCiudadano" ).css( "border-color", "" );
        }

        //$( "#txtNombreCiud" ).css( "border-color", "" );
        ////$( "#txtCorreoCiud" ).css( "border-color", "" );
        //$( "#txtDirCiud" ).css( "border-color", "" );

        if ( $( "#rdQuienOSC" ).prop( "checked" ) ) {
            //MensajeError( "Por favor capture su Nombre, su Dirección física o apartado postal y su RFC/CLUNI." );
            //$( "#txtNombreOSC" ).css( "border-color", "red" );
            ////$( "#txtMailOSC" ).css( "border-color", "red" );
            //$( "#txtDirOSC" ).css( "border-color", "red" );
            //$( "#txtRFCOSC" ).css( "border-color", "red" );
            //grecaptcha.reset();
            //return false;

            if ( $( "#txtNombreOSC" ).val() == "" ) {
                MensajeError( "Por favor detalle Razón Social." );
                $( "#txtNombreOSC" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtNombreOSC" ).css( "border-color", "" );

            if ( !validaEmail( $( "#txtMailOSC" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailOSC" ).css( "border-color", "red" );
                return false;
            }
            if ( !validaEmail( $( "#txtMailConfirmOSC" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailConfirmOSC" ).css( "border-color", "red" );
                return false;
            }


            if ( $( "#txtMailOSC" ).val() != $( "#txtMailConfirmOSC" ).val() ) {
                MensajeError( "Correo eléctrónico no coincide, favor de verificarlo" );
                grecaptcha.reset();
                $( "#txtMailOSC" ).css( "border-color", "red" );
                $( "#txtMailConfirmOSC" ).css( "border-color", "red" );
                return false;
            }

            $( "#txtMailOSC" ).css( "border-color", "" );
            $( "#txtMailConfirmOSC" ).css( "border-color", "" );

            if ( $( "#txtMailOSC" ).val() == "" && $( "#txtDomicilioOSC" ).val() == "" ) {
                MensajeError( "Por favor detalle correo electrónico o domicilio." );
                $( "#txtMailOSC" ).css( "border-color", "red" );
                $( "#txtDomicilioOSC" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtMailOSC" ).css( "border-color", "" );
            $( "#txtDomicilioOSC" ).css( "border-color", "" );
        }

        //$( "#txtNombreOSC" ).css( "border-color", "" );
        ////$( "#txtMailOSC" ).css( "border-color", "" );
        //$( "#txtDirOSC" ).css( "border-color", "" );
        //$( "#txtRFCOSC" ).css( "border-color", "" );

        //if ( $( "#rdQuienSPASF" ).prop( "checked" ) && ( !$( "#rdOpcSPASFEstruc" ).prop( "checked" ) && !$( "#rdOpcSPASFHon" ).prop( "checked" ) ) )
        //{
        //    MensajeError( "Por favor detalle es Servidor Público de estructura u Honorarios." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdOpcSPASFEstruc" ).prop( "checked" ) && ( $( "#txtCCEstruct" ).val() == "" || $( "#txtNoEmpEstruct" ).val() == "" ) )
        //{
        //    MensajeError( "Por favor capture su Centro de Costos y su número de empleado." );
        //    $( "#txtCCEstruct" ).css( "border-color", "red" );
        //    $( "#txtNoEmpEstruct" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}

        //$( "#txtCCEstruct" ).css( "border-color", "" );
        //$( "#txtNoEmpEstruct" ).css( "border-color", "" );

        //if ( $( "#rdOpcSPASFHon" ).prop( "checked" ) && ( $( "#txtCCHon" ).val() == "" || $( "#txtNoEmpHon" ).val() == "" ) )
        //{
        //    MensajeError( "Por favor capture su Centro de Costos y su número de empleado." );
        //    $( "#txtCCEstruct" ).css( "border-color", "red" );
        //    $( "#txtNoEmpEstruct" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}

        //$( "#txtCCHon" ).css( "border-color", "" );
        //$( "#txtNoEmpEstruct" ).css( "border-color", "" );

        if ( $( "#rdQuienProv" ).prop( "checked" ) ) {
            //MensajeError( "Por favor capture su Nombre, su Dirección física o apartado postaly su RFC." );
            //$( "#txtNombreProv" ).css( "border-color", "red" );
            ////$( "#txtMailProv" ).css( "border-color", "red" );
            //$( "#txtDirProv" ).css( "border-color", "red" );
            //$( "#txtRFCProv" ).css( "border-color", "red" );
            //grecaptcha.reset();
            //return false;


            if ( $( "#txtNombreProveedor" ).val() == "" ) {
                MensajeError( "Por favor detalle Razón Social." );
                $( "#txtNombreProveedor" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtNombreProveedor" ).css( "border-color", "" );

            if ( !validaEmail( $( "#txtMailProveedor" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailProveedor" ).css( "border-color", "red" );
                return false;
            }
            if ( !validaEmail( $( "#txtMailConfirmProveedor" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailConfirmProveedor" ).css( "border-color", "red" );
                return false;
            }


            if ( $( "#txtMailProveedor" ).val() != $( "#txtMailConfirmProveedor" ).val() ) {
                MensajeError( "Correo eléctrónico no coincide, favor de verificarlo" );
                grecaptcha.reset();
                $( "#txtMailProveedor" ).css( "border-color", "red" );
                $( "#txtMailConfirmProveedor" ).css( "border-color", "red" );
                return false;
            }

            $( "#txtMailProveedor" ).css( "border-color", "" );
            $( "#txtMailConfirmProveedor" ).css( "border-color", "" );

            if ( $( "#txtMailProveedor" ).val() == "" && $( "#txtDomicilioProveedor" ).val() == "" ) {
                MensajeError( "Por favor detalle correo electrónico o domicilio." );
                $( "#txtMailProveedor" ).css( "border-color", "red" );
                $( "#txtDomicilioProveedor" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtMailProveedor" ).css( "border-color", "" );
            $( "#txtDomicilioProveedor" ).css( "border-color", "" );
        }


        //$( "#txtNombreProv" ).css( "border-color", "" );
        ////$( "#txtMailProv" ).css( "border-color", "" );
        //$( "#txtDirProv" ).css( "border-color", "" );
        //$( "#txtRFCProv" ).css( "border-color", "red" );

        if ( $( "#rdQuienOtro" ).prop( "checked" ) ) {
            //MensajeError( "Por favor detalle a cuál pertenece." );
            //$( "#txtQuienDenOtro" ).css( "border-color", "red" );
            //grecaptcha.reset();
            //return false;


            if ( $( "#txtCaracterOtro" ).val() == "" ) {
                MensajeError( "Por favor detalle carácter con el que denuncia." );
                $( "#txtCaracterOtro" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtCaracterOtro" ).css( "border-color", "" );

            if ( $( "#txtNombreOtro" ).val() == "" ) {
                MensajeError( "Por favor detalle Nombre(s), Apellido Paterno, Apellido Materno." );
                $( "#txtNombreOtro" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtNombreOtro" ).css( "border-color", "" );

            if ( !validaEmail( $( "#txtMailOtro" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtMailOtro" ).css( "border-color", "red" );
                return false;
            }
            if ( !validaEmail( $( "#txtConfirmOtro" ).val() ) ) {
                grecaptcha.reset();
                $( "#txtConfirmOtro" ).css( "border-color", "red" );
                return false;
            }


            if ( $( "#txtMailOtro" ).val() != $( "#txtConfirmOtro" ).val() ) {
                MensajeError( "Correo eléctrónico no coincide, favor de verificarlo" );
                grecaptcha.reset();
                $( "#txtMailOtro" ).css( "border-color", "red" );
                $( "#txtConfirmOtro" ).css( "border-color", "red" );
                return false;
            }

            $( "#txtMailOtro" ).css( "border-color", "" );
            $( "#txtConfirmOtro" ).css( "border-color", "" );

            if ( $( "#txtMailOtro" ).val() == "" && $( "#txtDomicilioOtro" ).val() == "" ) {
                MensajeError( "Por favor detalle correo electrónico o domicilio." );
                $( "#txtMailOtro" ).css( "border-color", "red" );
                $( "#txtDomicilioOtro" ).css( "border-color", "red" );
                grecaptcha.reset();
                return false;
            }

            $( "#txtMailOtro" ).css( "border-color", "" );
            $( "#txtDomicilioOtro" ).css( "border-color", "" );
        }

        //$( "#txtQuienDenOtro" ).css( "border-color", "" );

        $( "#dSS" ).show( "blind" );
        $( "#lAvanSigSecc" ).hide();
    }
    catch ( err ) {
        MensajeError( "[validaPrimSecc] \n" + err.message );
    }
}
function abreAdminArch() {
    try {
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
                "Listo": function () {
                    $( "#diag-upload" ).dialog( "close" );
                }
            },
            close: function () {
                //$( "#tblDocPorSubir" ).find( "tr:gt(0)" ).remove();
                //$( "#tblDocPorSubir" ).hide();
                //$( "#tblbtnSube" ).hide();
                $( "#divControlPopupFondo" ).hide();
                cuentaArchivos();
            }
        } );
    }
    catch ( err ) {
        MensajeError( "[abreAdminArch] \n" + err.message );
    }
}
function cuentaArchivos() {
    try {
        $( "#lNumDocs" ).text( $( "tr[id*=rngDocs]" ).length + " documento(s) anexado(s)" );
    }
    catch ( err ) {
        MensajeError( "[cuentaArchivos] \n" + err.message );
    }
}
let _oArchivos;
function PreparaArchivos( event ) {

    let _odata = new FormData();
    let _bPasa = false;
    let _oArchivos = null;

    try {
        _oArchivos = null;
        _oArchivos = event.target.files;

        if ( _oArchivos != null ) {
            $.each( _oArchivos, function ( key, value ) {
                let _sExt = "";
                //Verificamos extensión
                _sExt = String( value.name ).substring( String( value.name ).lastIndexOf( "." ) + 1, String( value.name ).length );

                switch ( _sExt ) {
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
                        //case "ppt":
                        //    _bPasa = true;
                        //    break;
                        //case "pptx":
                        //    _bPasa = true;
                        //    break;
                        //case "xls":
                        //    _bPasa = true;
                        //    break;
                        //case "xlsx":
                        //    _bPasa = true;
                        //    break;
                        //case "msg":
                        //    _bPasa = true;
                        //    break;
                    case "pdf":
                        _bPasa = true;
                        break;
                        //case "txt":
                        //    _bPasa = true;
                        //    break;

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
                        MensajeError( "Archivo no válido. Únicamente puede subir documentos Word, PDF, audio e imágenes(JPEG)." );
                        _bPasa = false;

                }

                if ( _bPasa ) {
                    if ( value.size < 20000000 ) {
                        _odata.append( key, value );
                        _bPasa = true;
                    }
                    else {
                        MensajeError( "El archivo no puede ser mayor a 20 MB. Por favor elija un archivo de menor peso." );
                        _bPasa = false;
                    }
                }
            } );

            if ( _bPasa ) {
                _oResp = $.ajax( {
                    url: 'Upload2.ashx',
                    type: 'POST',
                    data: _odata,
                    cache: false,
                    dataType: 'json',
                    processData: false, // Don't process the files
                    contentType: false,
                    statusCode: {
                        200: function ( response ) {

                            //Correcto
                            //let _aDts = new Array();

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
                        500: function ( response ) {
                            MensajeError( response.responseText );
                        }
                    }
                } );
            }
        }
        else {
            MensajeError( "Hubo un problema al seleccionar el documento, por favor inténtelo de nuevo." );
        }
    }
    catch ( err ) {
        MensajeError( "[PreparaArchivos] \n" + err.message );
    }

}
function guardaDenuncia() {
    //_oData = "{}";

    //$.ajax( {
    //    type: "POST",
    //    url: "Internas.aspx/AJAX_enviaMail",
    //    data: _oData,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json"
    //} )
    //.done( function ( data, textStatus, jqXHR )
    //{
    //    //alert( data.d );
    //    if ( String( data.d ).indexOf( "Error" ) == -1 )
    //    {
    //        MensajeOk( "Correo enviado correctamente." );
    //        document.location = "Folio.aspx?_sFolio=DSPASF0001-15";
    //    }
    //    else
    //    {
    //        MensajeError( data.d );
    //    }
    //} )
    //.fail( function ( jqXHR, textStatus, errorThrown )
    //{
    //    MensajeError( "Error al enviar los correos AJAX [JS.guardaDenuncia]" );
    //} );

    let _aDtsDoctos = new Array();
    let _aDConceptos = new Array();
    let _sDescDependOrgano = "";

    let _sNombreDenunciante = "";
    let _sDirDenunciante = "";
    let _sRFC = "";

    let _sCC = "";
    let _sNumEmp = "";

    let _sDescOtro = "";
    let _sEstrucHono = "";

    let _sDepeOrganismo = "";

    let _sCorreo = "";
    let _sConfirmaCorreo = "";
    let _sOCA = "";
    let _sDomicilioDen = "";
    let _sCaracter = "";
    let bConceptoDenuncia = false;

    try {
        //Validaciones

        if ( !$( "#rdFASFSi" ).prop( "checked" ) && !$( "#rdFASFNo" ).prop( "checked" ) ) {
            MensajeError( "Debe detallar si el Servidor Público a denunciar es de la ASF." );
            grecaptcha.reset();
            return false;
        }

        //if ( !$( "#rdDtsSASFSi" ).prop( "checked" ) && !$( "#rdDtsSASFNo" ).prop( "checked" ) )
        //{
        //    MensajeError( "Debe detallar si conoce o no al Servidor Público que desea denunciar." );
        //    grecaptcha.reset();
        //    return false;
        //}

        if ( $( "#rdDtsSASFSi" ).prop( "checked" ) && ( $( "#txtNombSPDenASF" ).val() == "" || $( "#txtCargoSPDenASF" ).val() == "" || $( "#txtAreaSPD" ).val() == "" ) ) {
            MensajeError( "Es necesario que detalle el Nombre, Cargo y Área del Servidor Público a denunciar." );
            $( "#txtNombSPDenASF" ).css( "border-color", "red" );
            $( "#txtCargoSPDenASF" ).css( "border-color", "red" );
            $( "#txtAreaSPD" ).css( "border-color", "red" );
            grecaptcha.reset();
            return false;
        }

        $( "#txtNombSPDenASF" ).css( "border-color", "" );
        $( "#txtCargoSPDenASF" ).css( "border-color", "" );
        $( "#txtAreaSPD" ).css( "border-color", "" );

        //if ( $( "#rdDtsSASFNo" ).prop( "checked" ) && ( !$( "#rdNTDNISi" ).prop( "checked" ) && !$( "#rdNTDNINo" ).prop( "checked" ) ) )
        //{
        //    MensajeError( "Si no conoce los datos del servidor público detalle si desea documentar los hechos." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#rdDtsSASFNo" ).prop( "checked" ) && ( !$( "#rdNTDNISi" ).prop( "checked" ) && !$( "#rdNTDNINo" ).prop( "checked" ) ) )
        //{
        //    MensajeError( "Detalle si desea o no documentar los hechos." );
        //    grecaptcha.reset();
        //    return false;
        //}

        //if ( $( "#txtFechaIrreg" ).val() == "" && $( "#txtFechaFin" ).val() == "" )
        //{
        //    MensajeError( "Debe detallar al menos una fecha de cuándo ocurrió la irregularidad." );
        //    $( "#txtFechaIrreg" ).css( "border-color", "red" );
        //    $( "#txtFechaFin" ).css( "border-color", "red" );
        //    grecaptcha.reset();
        //    return false;
        //}


        if ( $( "#txtFechaIrreg" ).val() == "" && !$( "#rdNoseFecha" ).prop( "checked" ) ) {
            MensajeError( "Debe detallar si conoce la fecha de la irregularidad." );
            $( "#txtFechaIrreg" ).css( "border-color", "red" );
            //$("#txtFechaFin").css("border-color", "red");
            grecaptcha.reset();
            return false;
        }

        $( "#txtFechaIrreg" ).css( "border-color", "" );
        //$( "#txtFechaFin" ).css( "border-color", "" );


        $.each( $( "input[id*=chkPts]:checked" ), function ( index, element ) {
            bConceptoDenuncia = true;
            return false;
        } );


        //if ( $("input[id*=chkPts]").length == 0 )
        if ( bConceptoDenuncia == false ) {
            MensajeError( "Debe al menos seleccionar una de las opciones que considere se apega más a su denuncia." );
            grecaptcha.reset();
            return false;
        }



        if ( $( "#txtDescDen" ).val() == "" ) {
            //MensajeError( "Debe detallar que conducta indebida ha tenido el Servidor Público." );
            MensajeError( "Debe detallar que conducta indebida ha tenido la persona servidora pública." );
            $( "#txtDescDen" ).css( "border-color", "red" );
            grecaptcha.reset();
            return false;
        }

        $( "#txtDescDen" ).css( "border-color", "" );

        //if ( $( "#rdCElem" ).prop( "checked" ) && $( "tr[id*=rngDocs]" ).length == 0 ) 
        if ( $( "#rdCElemSi" ).prop( "checked" ) && $( "tr[id*=rngDocs]" ).length == 0 ) {
            MensajeError( "Si cuenta con documentos que prueban su denuncia debe anexarlos a la misma." );
            grecaptcha.reset();
            return false;
        }

        if ( $( "#txtCprreoCont" ).val() == "" ) {
            MensajeError( "Es recomendable que capture una dirección de correo para mantener una comunicación activa con la ASF, más no es obligatorio capturar una." );
        }

        if ( $( "#txtPass" ).val() == "" ) {
            MensajeError( "Es necesario que captura una contraseña para su denuncia." );
            $( "#txtPass" ).css( "border-color", "red" );
            grecaptcha.reset();
            return false;
        }

        $( "#txtPass" ).css( "border-color", "" );

        //Guardamos
        _oData = "{ _sResponse: '" + grecaptcha.getResponse() + "', _psCvePrivada: '" + $( "#hdnCvePrivadaReCaptcha" ).val() + "' }";

        $.ajax( {
            type: "POST",
            url: "Internas.aspx/AJAX_verificaReCaptcha",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
            .done( function ( data, textStatus, jqXHR ) {
                let _aResp2 = JSON.parse( data.d );

                if ( _aResp2.success ) {
                    //Documentos
                    $.each( $( "tr[id*=rngDocs]" ), function ( index, element ) {
                        _cDts = null;
                        _cDts = new Collection;

                        _cDts.add( "NOMBRE_DOCTO", $( "#lblArch" + String( element.id ).replace( "rngDocs", "" ) ).text() );

                        _aDtsDoctos[index] = _cDts._oData;
                    } );

                    if ( $( "#rdQuienFP" ).prop( "checked" ) ) //Funcionario Público
                    {
                        //if ( $( "#rdFPF" ).prop( "checked" ) ) //Funcionario Público Federal
                        //{
                        //    _sNombreDenunciante = $( "#txtNombFuncFPF" ).val();
                        //    if ( $( "#rdCatDepEAPF" ).prop( "checked" ) ) //Entidades de la Administración Pública Federal
                        //    {
                        //        _sDescDependOrgano = $( "#ddlCatDepEAPF option:selected" ).text();
                        //        _sDepeOrganismo = "Dependencia o Entidad de la Administración Pública Federal.";
                        //    }
                        //    else // Organismos Constitucionalmente Autonomos
                        //    {
                        //        //_sDescDependOrgano = $( "#ddlCatOrgsCA option:selected" ).text();
                        //        _sDescDependOrgano = $( "#txtCatOrgsCA" ).val();
                        //        _sDepeOrganismo = "Organismos Constitucionalmente Autónomos.";
                        //    }
                        //}
                        //else if ( $( "#rdFPE" ).prop( "checked" ) ) //Funcionario Público Estatal
                        //{
                        //    _sNombreDenunciante = $( "#txtNombFPE" ).val();
                        //    if ( $( "#rdDepEntsEsts" ).prop( "checked" ) ) //Dependencias y Entidades Estatales
                        //    {
                        //        _sDescDependOrgano = $( "#txtBuscDepEntsEsts" ).val();
                        //        _sDepeOrganismo = "Dependencias y Entidades Estatales.";
                        //    }
                        //    else //Organismos Constitucionalmente Autónomos Estatales
                        //    {
                        //        _sDescDependOrgano = $( "#txtBuscOrgsConsAutEst" ).val();
                        //        _sDepeOrganismo = "Organismos Constitucionalmente Autónomos Estatales.";
                        //    }
                        //}
                        //else if ( $( "#rdFPMD" ).prop( "checked" ) ) //Funcionario Público Municipal/Delegacional
                        //{
                        //    _sNombreDenunciante = $( "#txtNombFPMD" ).val();
                        //    _sDescDependOrgano = $( "#txtBuscFPMD" ).val();
                        //}


                        if ( $( "#rdFPF" ).prop( "checked" ) || $( "#rdFPE" ).prop( "checked" ) || $( "#rdFPMD" ).prop( "checked" ) ) //Funcionario Público Federal/Funcionario Público Estatal/Funcionario Público Municipal/Delegacional
                        {
                            _sNombreDenunciante = $( "#txtNombFuncFPF" ).val();
                            _sDescDependOrgano = $( "#txtDepFuncFPF" ).val();
                            _sOCA = $( "#txtOCAFuncFPF" ).val();



                            _sCorreo = $( "#txtMailFuncFPF" ).val();
                            _sConfirmaCorreo = $( "#txtMailConfirmFuncFPF" ).val();
                            _sDomicilioDen = $( "#txtDomicilioFuncFPF" ).val();


                        }
                    }
                    else {
                        //_sDescDependOrgano = "";
                        //if ( $( "#rdQuienCiud" ).prop( "checked" ) ) //Ciudadano
                        //{
                        //    _sNombreDenunciante = $( "#txtNombreCiud" ).val();
                        //    _sDirDenunciante = $( "#txtDirCiud" ).val();
                        //    _sRFC = "";
                        //}
                        //else if ( $( "#rdQuienOSC" ).prop( "checked" ) ) //Organización de la SOciedad Civil
                        //{
                        //    _sNombreDenunciante = $( "#txtNombreOSC" ).val();
                        //    _sDirDenunciante = $( "#txtDirOSC" ).val();
                        //    _sRFC = $( "#txtRFCOSC" ).val();
                        //}
                        //else if ( $( "#rdQuienSPASF" ).prop( "checked" ) ) //Servidor Público de la ASF
                        //{
                        //    if ( $( "#rdOpcSPASFEstruc" ).prop( "checked" ) )
                        //    {
                        //        _sCC = $("#txtCCEstruct").val();
                        //        _sNumEmp = $( "#txtNoEmpEstruct" ).val();
                        //        _sEstrucHono = "Estructura";
                        //    }
                        //    else
                        //    {
                        //        _sCC = $( "#txtCCHon" ).val();
                        //        _sNumEmp = $( "#txtNoEmpHon" ).val();
                        //        _sEstrucHono = "Honorarios";
                        //    }
                        //}
                        //else if ( $( "#rdQuienProv" ).prop( "checked" ) ) //Proveedor
                        //{
                        //    _sNombreDenunciante = $( "#txtNombreProv" ).val();
                        //    _sDirDenunciante = $( "#txtDirProv" ).val();
                        //    _sRFC = $( "#txtRFCProv" ).val();
                        //}
                        //else if ( $( "#rdQuienOtro" ).prop( "checked" ) ) //Otro
                        //{
                        //    _sDescOtro = $( "#txtQuienDenOtro" ).val();
                        //} 

                        if ( $( "#rdQuienCiud" ).prop( "checked" ) ) //Ciudadano
                        {
                            _sNombreDenunciante = $( "#txtNombFuncFPF" ).val();
                            _sDescDependOrgano = $( "#txtDepFuncFPF" ).val();
                            _sOCA = $( "#txtOCAFuncFPF" ).val();
                            _sCorreo = $( "#txtMailFuncFPF" ).val();
                            _sConfirmaCorreo = $( "#txtMailConfirmFuncFPF" ).val();
                            _sDomicilioDen = $( "#txtDomicilioFuncFPF" ).val();
                        }
                        else if ( $( "#rdQuienOSC" ).prop( "checked" ) ) //Organización de la SOciedad Civil
                        {
                            _sNombreDenunciante = $( "#txtNombreOSC" ).val();
                            _sCorreo = $( "#txtMailOSC" ).val();
                            _sConfirmaCorreo = $( "#txtMailConfirmOSC" ).val();
                            _sDomicilioDen = $( "#txtDomicilioOSC" ).val();
                        }

                        else if ( $( "#rdQuienProv" ).prop( "checked" ) ) //Proveedor
                        {
                            _sNombreDenunciante = $( "#txtNombreProveedor" ).val();
                            _sCorreo = $( "#txtMailProveedor" ).val();
                            _sConfirmaCorreo = $( "#txtMailConfirmProveedor" ).val();
                            _sDomicilioDen = $( "#txtDomicilioProveedor" ).val();
                        }
                        else if ( $( "#rdQuienOtro" ).prop( "checked" ) ) //Otro
                        {
                            _sCaracter = $( "#txtCaracterOtro" ).val();
                            _sNombreDenunciante = $( "#txtNombreOtro" ).val();
                            _sCorreo = $( "#txtMailOtro" ).val();
                            _sConfirmaCorreo = $( "#txtConfirmOtro" ).val();
                            _sDomicilioDen = $( "#txtDomicilioOtro" ).val();
                        }
                    }

                    //Conceptos que se apegan
                    $.each( $( "input[id*=chkPts]:checked" ), function ( index, element ) {
                        let _oChk;
                        _cDts = null;
                        _cDts = new Collection;

                        let _sNumIrreg = String( element.id ).replace( "chkPts", "" );

                        if ( _sNumIrreg === "1J2" ) {
                            _cDts.add( "NUM_IRREG", String( element.id ).replace( "chkPts", "1J" ) );
                        }
                        else if ( _sNumIrreg === "1J" ) {
                            _cDts.add( "NUM_IRREG", String( element.id ).replace( "chkPts", "1K" ) );
                        }
                        else {
                            _cDts.add( "NUM_IRREG", String( element.id ).replace( "chkPts", "" ) );
                        }
                        ///_oChk = $( "#" + element.id ).parent();
                        _cDts.add( "NOMBRE_IRREG", $( "#" + element.id ).parent().text().trim() );

                        _aDConceptos[index] = _cDts._oData;
                    } );

                    //_oData = "{ _psReservada: '" + ( $( "#rdInfoResSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                    //            ", _psDescReservada: '" + $( "input[id*=rdRes]:checked" ).parent().text().trim() + "' " +
                    //            ", _psQuienDenuncia: '" + $( "input[id*=rdQuien]:checked" ).parent().text().trim() + "' " +
                    //            ", _psQuienDenuncia2: '" + $( "input[id*=rdFP]:checked" ).parent().text().trim() + "' " +
                    //            ", _psDepeOrganismo: '" + _sDepeOrganismo + "' " +
                    //            ", _psDescDepeOrganismo: '" + _sDescDependOrgano + "' " +
                    //            ", _psNombreDenunciante: '" + _sNombreDenunciante + "' " +
                    //            ", _psDirDenunciante: '" + _sDirDenunciante + "' " +
                    //            ", _psRFC: '" + _sRFC + "' " +
                    //            ", _psEstructHono: '" + _sEstrucHono + "' " +
                    //            ", _psCC: '" + _sCC + "' " +
                    //            ", _psNoEmpleado: '" + _sNumEmp + "' " +
                    //            ", _psDescOtro: '" + _sDescOtro + "' " +
                    //            ", _psFPASF: '" + ( $( "#rdFASFSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                    //            ", _psConoceDtsSP: '" + ( $( "#rdDtsSASFSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                    //            ", _psNombreSP: '" + $( "#txtNombSPDenASF" ).val() + "' " +
                    //            ", _psCargoSP: '" + $( "#txtCargoSPDenASF" ).val() + "' " +
                    //            ", _psAreaSP: '" + $( "#txtAreaSPD" ).val() + "' " +
                    //            ", _psNoTengoDatos: '" + ( $( "#rdNTDNISi" ).prop( "checked" ) ? "Si" : "No" ) + "'" +
                    //            ", _psFecha1: '" + $( "#txtFechaIrreg" ).val() + "' " +
                    //            ", _psFecha2: '" + $( "#txtFechaFin" ).val() + "' " +
                    //            ", _poConceptos: " + ( _aDConceptos.length == 0 ? null : JSON.stringify( _aDConceptos ) ) +
                    //            ", _psDescIrreg: '" + $( "#txtDescDen" ).val() + "' " +
                    //            ", _psCuentoConDoc: '" + ( $( "#rdCElem" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                    //            ", _poDocs: " + ( _aDtsDoctos.length == 0 ? null : JSON.stringify( _aDtsDoctos ) ) +
                    //            ", _psEmail: '" + $( "#txtCprreoCont" ).val() + "' " +
                    //            ", _psPass: '" + $( "#txtPass" ).val() + "' " +
                    //            ", _psOtraRazon: '" + ( $( "#rdRes5" ).prop( "checked" ) ? $( "#txtOtroRazones" ).val() : "" ) + "' " +
                    //            "}";




                    _oData = "{ _psReservada: '" + ( $( "#rdInfoResSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                        ", _psDescReservada: '' " +
                        ", _psQuienDenuncia: '" + $( "input[id*=rdQuien]:checked" ).parent().text().trim() + "' " +
                        ", _psQuienDenuncia2: '" + $( "input[id*=rdFP]:checked" ).parent().text().trim() + "' " +
                        ", _psDepeOrganismo: '' " +
                        ", _psDescDepeOrganismo: '" + _sDescDependOrgano + "' " +
                        ", _psNombreDenunciante: '" + _sNombreDenunciante + "' " +
                        ", _psDirDenunciante: '" + _sDomicilioDen + "' " +
                        ", _psRFC: '' " +
                        ", _psEstructHono: '' " +
                        ", _psCC: '' " +
                        ", _psNoEmpleado: '' " +
                        ", _psDescOtro: '' " +
                        ", _psFPASF: '" + ( $( "#rdFASFSi" ).prop( "checked" ) ? "Si" : "Persona(s) contratada(s) para realizar un trabajo en nombre de la ASF." ) + "' " +
                        ", _psConoceDtsSP: '' " +
                        ", _psNombreSP: '" + $( "#txtNombSPDenASF" ).val() + "' " +
                        ", _psCargoSP: '" + $( "#txtCargoSPDenASF" ).val() + "' " +
                        ", _psAreaSP: '" + $( "#txtAreaSPD" ).val() + "' " +
                        ", _psNoTengoDatos: '" + ( $( "#rdNTDNISi" ).prop( "checked" ) ? "Si" : "No" ) + "'" +
                        ", _psFecha1: '" + $( "#txtFechaIrreg" ).val() + "' " +
                        ", _psFecha2: '' " +
                        ", _poConceptos: " + ( _aDConceptos.length == 0 ? null : JSON.stringify( _aDConceptos ) ) +
                        ", _psDescIrreg: '" + $( "#txtDescDen" ).val() + "' " +
                        //", _psCuentoConDoc: '" + ( $( "#rdCElem" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                        ", _psCuentoConDoc: '" + ( $( "#rdCElemSi" ).prop( "checked" ) ? "Si" : "No" ) + "' " +
                        ", _poDocs: " + ( _aDtsDoctos.length == 0 ? null : JSON.stringify( _aDtsDoctos ) ) +
                        //", _psEmail: '" + $( "#txtCprreoCont" ).val() + "' " +
                        ", _psEmail: '' " +
                        ", _psPass: '" + $( "#txtPass" ).val() + "' " +
                        ", _psOtraRazon: '" + ( $( "#rdRes5" ).prop( "checked" ) ? $( "#txtOtroRazones" ).val() : "" ) + "' " +
                        ", _psOCA: '" + _sOCA + "' " +
                        ", _psCorreo: '" + ( _sCorreo === "" ? $( "#hdnCorreo" ).val() : _sCorreo ) + "' " +
                        ", _psConfirmaCorreo: '" + ( _sConfirmaCorreo === "" ? $( "#hdnCorreo" ).val() : _sConfirmaCorreo ) + "' " +
                        ", _psCaracter: '" + _sCaracter + "' " +
                        ", _psNoSeFecha: '" + ( $( "#rdNoseFecha" ).prop( "checked" ) ? "" : "No sé" ) + "'" +
                        ",_psDomicilioNotificaciones: '" + $( "#txtDomicilio" ).val() + "' " +
                        "}";

                    $.ajax( {
                        type: "POST",
                        url: "Internas.aspx/AJAX_guardaDenuncia",
                        data: _oData,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    } )
                        .done( function ( data, textStatus, jqXHR ) {
                            if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                                //MensajeOk( "Datos guardados correctamente. Gracias por su aportación." )
                                //setTimeout( function () { document.location = "http://www.asf.gob.mx"; }, 3000 );
                                $( "#divControlPopupFondo" ).height( $( document ).height() );
                                $( "#divControlPopupFondo" ).show();
                                document.location = "Folio.aspx?_sFolio=" + data.d;
                            }
                            else {
                                MensajeError( "Hubo un error al guardar los datos." );
                                //grecaptcha.reset();
                                grecaptcha.reset();
                            }
                        } )
                        .fail( function ( jqXHR, textStatus, errorThrown ) {
                            MensajeError( "Error al guardar los datos [AJAX.guardaDenuncia()]" );
                            //grecaptcha.reset();
                            grecaptcha.reset();
                        } );
                }
                else {
                    MensajeError( "Captcha incorrecto, intente de nuevo." );
                    //grecaptcha.reset();
                    grecaptcha.reset();
                }
            } )
            .fail( function ( jqXHR, textStatus, errorThrown ) {
                MensajeError( "Error al validar el recaptcha por favor vuelva a intentarlo" );
                //grecaptcha.reset();
                grecaptcha.reset();
            } );

    }
    catch ( err ) {
        MensajeError( "Error al guardar datos " + err.message );
    }



}
function buscaEnt( _plTpoEntidad ) {
    try {
        _oData = "{ _psDesc: '" + $( "#txtBuscCatDepEAPF" ).val() + "' }";

        $.ajax( {
            type: "POST",
            url: "Internas.aspx/AJAX_cargaEntidad",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
            .done( function ( data, textStatus, jqXHR ) {
                if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                    $( "#ddlCatDepEAPF" ).empty();

                    $( "#ddlCatDepEAPF" ).append( $( "<option     />" ).val( "0" ).text( "--> Resultados de la busqueda, seleccione uno: <--" ) );

                    $.each( data.d, function () {
                        $( "#ddlCatDepEAPF" ).append( $( "<option     />" ).val( this.LlaveEntSICSA ).text( this.NombreEntidad ) );
                    } );
                }
                else {
                    MensajeError( "Hubo un error al traer los datos." )
                }
            } )
            .fail( function ( jqXHR, textStatus, errorThrown ) {
                MensajeError( "Error al traer los datos [AJAX.buscaEnt()]" );
            } );

    }
    catch ( err ) {
        MensajeError( "[buscaEnt] \n" + err.message );
    }
}
//function abreDirectorio()
//{

//    let _sHTML = "";

//    try
//    {
//        //Traemos los datos del directorio
//        _oData = "{}";

//        $.ajax( {
//            type: "POST",
//            url: "Internas.aspx/AJAX_cargaDirectorio",
//            data: _oData,
//            contentType: "application/json; charset=utf-8",
//            dataType: "json"
//        } )
//        .done( function ( data, textStatus, jqXHR )
//        {
//            if ( String( data.d ).indexOf( "Error" ) == -1 )
//            {
//                $.each( data.d, function ()
//                {
//                    _sHTML += "<tr>";

//                    _sHTML += "<td>";
//                    _sHTML += this.Trabajador;
//                    _sHTML += "</td>";

//                    _sHTML += "<td>";
//                    _sHTML += this.Nombre;
//                    _sHTML += "</td>";

//                    _sHTML += "<td>";
//                    _sHTML += this.Puesto;
//                    _sHTML += "</td>";

//                    _sHTML += "<td>";
//                    _sHTML += this.Area;
//                    _sHTML += "</td>";

//                    _sHTML += "</tr>";

//                } );
//                $( "#grid tbody" ).empty();
//                $( "#grid tbody" ).append( _sHTML );

//                $( "#grid" ).bootgrid( "clear" );
//                $( "#grid" ).bootgrid( "destroy" );

//                $( "#grid" ).bootgrid( {
//                    caseSensitive: false,
//                    columnSelection: false,
//                    selection: true,
//                    multiSelect: false,
//                    formatters: {
//                        "link": function ( column, row )
//                        {
//                            return "<a href=\"#\">" + column.id + ": " + row.id + "</a>";
//                        }
//                    },
//                    searchSettings: {
//                        delay: 50,
//                        characters: 2
//                    }
//                } ).on( "selected.rs.jquery.bootgrid", function ( e, rows )
//                {
//                    //let rowIds = [];
//                    //for ( let i = 0; i < rows.length; i++ )
//                    //{
//                    //    rowIds.push( rows[i].llave_trabajador );
//                    //}
//                    $( "#lDenunciado" ).text( rows[0].nombre + " - " + rows[0].puesto + " - " + rows[0].area )
//                } ).on( "deselected.rs.jquery.bootgrid", function ( e, rows )
//                {
//                    //let rowIds = [];
//                    //for ( let i = 0; i < rows.length; i++ )
//                    //{
//                    //    rowIds.push( rows[i].llave_trabajador );
//                    //}
//                    //alert( "Deselect: " + rowIds.join( "," ) );
//                    $( "#lDenunciado" ).text( "" );
//                } );

//                $( "#divControlPopupFondo" ).height( $( document ).height() );
//                $( "#divControlPopupFondo" ).show();

//                $( "#dDirectorio" ).dialog( {
//                    resizable: true,
//                    height: "auto",
//                    width: "auto",
//                    modal: true,
//                    dialogClass: "no-close",
//                    buttons: {
//                        "Listo": function ()
//                        {
//                            if ( $( "#lDenunciado" ).text() == "" )
//                            {
//                                $( "#lDenunciado" ).text( "No ha seleccionado ningún Servidor Público." )
//                            }
//                            $( ".sfSel" ).show();
//                            $( "#dDirectorio" ).dialog( "close" );
//                        },
//                        "Cancelar": function ()
//                        {
//                            $( "#dDirectorio" ).dialog( "close" );
//                        }
//                    },
//                    close: function ()
//                    {
//                        $( "#divControlPopupFondo" ).hide();
//                    }
//                } );
//            }
//            else
//            {
//                MensajeError( "Hubo un error al traer los datos." )
//            }
//        } )
//        .fail( function ( jqXHR, textStatus, errorThrown )
//        {
//            MensajeError( "Error al traer los datos [AJAX.cargaEntidad()]" );
//        } );
//    }
//    catch(err)
//    {
//        MensajeError( "[abreDirectorio] \n" + err.message );
//    }
//}
//function buscaAud()
//{
//    $( "#tbAud" ).show();
//}
function seguimiento() {
    window.open( "Consulta.aspx" );
}
var onloadCallback = function () {
    grecaptcha.render( document.getElementById( 'ckCaptcha' ), {
        'sitekey': $( "#hdnCvePublicaReCaptcha" ).val()
    } );
};