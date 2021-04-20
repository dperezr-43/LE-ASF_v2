var Collection = function () {
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
    //$( "#ddlEstado" ).change( function () {
    //    //$( this ).prop( "class", $( "#ddlEstadosD option:selected" ).prop( "class" ) );
    //    $( this ).css( "color", $( "#ddlEstadosD option:selected" ).css( "color" ) );
    //} );
    cargaDropEstados();
    $( "#diag-upload" ).hide();
    $( "#lImprimir" ).button( {
        icons: {
            primary: "ui-icon ui-icon-print"
        }
    } );

    $( "a[id*=gVDecs_lEditar_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-pencil"
        }
    } );

    $( "a[id*=gVDecs_lDoctos_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-note"
        }
    } );

    $( "a[id*=gVDecs_lImpDen_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-print"
        }
    } );

    $( "a[id*=gVDecs_lEnviaCorreo_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
    } );

    $( "#lBusc" ).button( {
        icons: {
            primary: "ui-icon ui-icon-search"
        }
    } );

    $( "#lAceptar" ).button( {
        icons: {
            primary: "ui-icon ui-icon-circle-plus"
        }
    } );

    $( "#lCancelar" ).button( {
        icons: {
            primary: "ui-icon ui-icon-circle-close"
        }
    } );

    $( "#lBusc" ).button( {
        icons: {
            primary: "ui-icon ui-icon-search"
        }
    } );

    $( "#lDocumentacion" ).button( {
        icons: {
            primary: "ui-icon ui-icon-document"
            //primary: "ui-icon ui-icon-circle-plus"
        }
    } );
    $( "#lDocumentacion" ).hide();




    $( "#txtFechaCaptBusc, #txtFechaCaptBusc2" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    } );

    $( "#ddlEstado" ).change( function () {
        $( this ).css( "color", $( "#ddlEstado option:selected" ).css( "color" ) );
        $( "#hdnLlaveEstado" ).val( $( this ).val() );
        if ( $( this ).val() != 0 ) {
            traeSubEdos( $( this ).val() )
        }
    } )

    $( "#ddlEdoCambio" ).change( function () {
        $( this ).css( "color", $( "#ddlEdoCambio option:selected" ).css( "color" ) );
        $( "#lSentidoDeterminacion" ).hide();
        if ( $( this ).val() != 0 ) {
            if ( $( this ).val() === "1" || $( this ).val() === "2" ) {
                $( "#ddlSubEdoCambio" ).val( null );
                $( "#trSubEdoCambio" ).hide();
                $( "#trSubEdoSolInformacion" ).hide();
            }
            traeSubEdosCambio( $( this ).val() )
        }
    } )

    $( "#ddlTpoIrreg" ).change( function () {
        if ( $( this ).val() != 0 ) {
            traeConcIrreg( $( this ).val() )
        }
    } )
    $( "#lSentidoDeterminacion" ).hide();
    $( "#dvCambioEst, #dCorreo, #dMsje, #diag-load, #diag-error, #diag-ok, #dDocsDenuncia" ).hide();
    $( "#trSubEdoSolInformacion" ).hide();
    $( "#ddlSubEdoCambio" ).change( function () {
        $( "#ddlSubEdoSolInformacion" ).val( "0" );
        $( "#lSentidoDeterminacion" ).hide();
        if ( $( this ).val() === "1" ) {
            $( "#trSubEdoSolInformacion" ).show();
        }
        else {
            $( "#trSubEdoSolInformacion" ).hide();
            if ( $( this ).val() === "7" ) {
                $( "#lSentidoDeterminacion" ).show();
            }
        }
    } );

    $( "#ddlSubEdoSolInformacion" ).change( function () {
        if ( $( this ).val() != "0" ) {
            $( "#lDocumentacion" ).show();
        }
        else {
            $( "#lDocumentacion" ).hide();
        }
    } );
    $( "#btnSubir" ).click( function () {
        $( "#flUp" ).trigger( 'click' );
    } );



    $( "#flUp" ).change( function ( event ) {
        PreparaArchivosFunc( event )
    } );
} );
function asignaFolio( _psFolio ) {
    $( "#hdnFolio" ).val( _psFolio );
    return true;
}
function abreCambio( _psFolio, _plLlaveInterna ) {
    try {
        $( "#lblFolio" ).text( "Folio: " + _psFolio );
        $( "#hLlaveInterna" ).val( _plLlaveInterna );
        $( "#dvCambioEst" ).dialog( {
            resizable: false,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close"
        } );

        return false;
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function cambiaEstatus() {
    try {
        if ( $( "#ddlEdoCambio" ).val() != 0 ) {

            let _aDtsDoctos = [];
            let _cDts;
            $.each( $( "tr[id*=rngDocs]" ), function ( index, element ) {
                _cDts = null;
                _cDts = new Collection;

                _cDts.add( "NOMBRE_DOCTO", $( "#lblArch" + String( element.id ).replace( "rngDocs", "" ) ).text() );

                _aDtsDoctos[index] = _cDts._oData;
            } );

            _oData = "{ _plLlaveInterna: " + $( "#hLlaveInterna" ).val() +
                        ", _plLlaveEstatus: " + $( "#ddlEdoCambio" ).val() +
                        ", _plLlaveSubEstatus: " + ( $( "#ddlSubEdoCambio" ).val() == null ? 0 : $( "#ddlSubEdoCambio" ).val() ) +
                        ", _poDocs: " + ( _aDtsDoctos.length === 0 ? null : JSON.stringify( _aDtsDoctos ) ) +
                        ", _psSubEstatusSolInformacion: '" + $( "#ddlSubEdoSolInformacion" ).val() + "'" +
                        "}";

            $.ajax( {
                type: "POST",
                url: "SegDenInternas.aspx/AJAX_cambiaEstatus",
                data: _oData,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            } )
            .done( function ( data, textStatus, jqXHR ) {
                if ( String( data.d ).indexOf( "Estatus cambiados correctamente." ) != -1 ) {
                    MensajeOk( "Datos modificados correctamente. Por favor espere a que se recarguen la página." );
                    cierraCambio();
                    __doPostBack( 'bGrid', '' );
                }
                else {
                    MensajeError( data.d );
                }
            } )
            .fail( function ( jqXHR, textStatus, errorThrown ) {
                MensajeError( "Error al modificar el estatus AJAX [JS.cambiaEstatus]" );
            } );
        }
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function cierraCambio() {
    $( "#dvCambioEst" ).dialog( "close" );
}
function traeSubEdos( _plLlaveEdo ) {
    try {
        _oData = "{ _plLlavEdo: " + _plLlaveEdo + "}";

        $.ajax( {
            type: "POST",
            url: "SegDenInternas.aspx/AJAX_traeSubEdos",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR ) {
            if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                if ( data.d.length > 0 ) {
                    $( "#ddlSubEstado" ).empty();
                    $( "#ddlSubEstado" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $.each( data.d, function ( index, element ) {
                        $( "#ddlSubEstado" ).append( $( "<option     />" ).val( this.LlaveEdo ).text( this.DescEdo ) );
                    } );
                }
                else {
                    $( "#ddlSubEstado" ).empty();
                }
            }
            else {
                MensajeError( "Hubo un error al traer los datos." );
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown ) {
            MensajeError( "Error al traer los datos [AJAX.traeSubEdos()]" );
        } );
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function traeSubEdosCambio( _plLlaveEdo ) {
    try {
        _oData = "{ _plLlavEdo: " + _plLlaveEdo + "}";

        $.ajax( {
            type: "POST",
            url: "SegDenInternas.aspx/AJAX_traeSubEdos",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR ) {
            if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                if ( data.d.length > 0 ) {
                    $( "#ddlSubEdoCambio" ).empty();
                    $( "#ddlSubEdoCambio" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $.each( data.d, function ( index, element ) {
                        $( "#ddlSubEdoCambio" ).append( $( "<option     />" ).val( this.LlaveEdo ).text( this.DescEdo ) );
                    } );
                    $( "#trSubEdoCambio" ).show();
                }
                else {
                    $( "#ddlSubEdoCambio" ).empty();
                    $( "#trSubEdoCambio" ).hide();
                }
            }
            else {
                MensajeError( "Hubo un error al traer los datos." );
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown ) {
            MensajeError( "Error al traer los datos [AJAX.traeSubEdosCambio()]" );
        } );
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function traeConcIrreg( _plLlaveIrreg ) {
    try {
        $( "#ddlConcIrreg" ).empty();
        $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );

        switch ( parseInt( _plLlaveIrreg ) ) {
            case 1:
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 1 ).text( "Solicita sobornos" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 2 ).text( "Acepta regalos y gratificaciones" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 3 ).text( "Manejo inadecuado de información (falsificación y/o alteración de información, incumple con confidencialidad y reserva de información)" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 4 ).text( "Manejo inadecuado y/o extracción de fondos suministros u otros bienes de la ASF" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 5 ).text( "Falta de profesionalismo y desarrollo ineficiente e inoportuno de las tareas encomendadas" ) );
                break;
            case 2:
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 1 ).text( "Su actuación obedece a intereses políticos" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 2 ).text( "Su actuación obedece a intereses personales y/o externos (Conflicto de intereses)" ) );
                break;
            case 3:
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 1 ).text( "Trato discriminatorio" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 2 ).text( "Trato prepotente u hostil" ) );
                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 3 ).text( "Acoso (Sexual, laboral, físico y psicológico)" ) );
                break;
        }
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function abreDoctos( _plLlaveInterna, _psFolio ) {
    try {
        //Cargamos documentos
        $( "#dDocsDenuncia" ).children( $( "<iframe />" ) ).remove();

        $( "#dDocsDenuncia" ).append( $( "<iframe />" ).attr( "src", "DoctosInterna.aspx?_psFolio=" + _psFolio + "&_plLlaveInterna=" + _plLlaveInterna ).width( "1100px" ).height( "300px" ) ).dialog(
        {
            resizable: false,
            height: "auto",
            width: "1200px",
            modal: true,
            dialogClass: "no-close",
            buttons:
                {
                    "Cerrar": function () {
                        $( "#dDocsDenuncia" ).dialog( "close" );
                    }
                }
        } );
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function abreMensajeCorreo( _psEmail, _psFolio ) {
    try {
        tinymce.init( {
            selector: '#txtEmail',
            //language: "es_MX",
            language_url: "JS/tinymce/js/langs/es_MX.js",
            height: 500,
            menubar: false,
            elementpath: false,
            resize: false,
            statusbar: false,
            toolbar: "undo redo | bold italic underline  | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect | cut copy paste | bullist numlist | outdent | indent"
            //,
            //setup: function ( ed )
            //{
            //    ed.on( 'keydown', function ( ed, evt )
            //    {
            //        var chars_without_html = $.trim( tinyMCE.activeEditor.getContent().replace( /(<([^>]+)>)/ig, "" ) ).length;
            //        if ( chars_without_html > 15 )
            //        {
            //            tinyMCE.activeEditor.setContent( tinyMCE.activeEditor.getContent().replace( /<br\s*\/>/gi, "<br />" ) );
            //            ed.stopPropagation();
            //            ed.preventDefault();

            //        }
            //    } );
            //}
        } );

        $( "#txtPara" ).val( _psEmail );

        $( "#dCorreo" ).dialog( {
            resizable: false,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons:
                {
                    "Enviar": function () {
                        if ( tinymce.activeEditor.getContent() != "" ) {
                            $( "#lMsje" ).text( "El mensaje está listo para ser enviado al Denunciante. ¿Desea continuar?" );
                            $( "#dMsje" ).dialog( {
                                resizable: false,
                                height: "auto",
                                width: "auto",
                                modal: true,
                                dialogClass: "no-close",
                                buttons:
                                    {
                                        "Si": function () {
                                            _oData = "{ _psMensaje: '" + String( tinymce.activeEditor.getContent() ).split( "'" ).join( "" ) + "'" +
                                                        ", _psEMail: '" + $( "#txtPara" ).val() + "'" +
                                                        ", _psFolio: '" + _psFolio + "'" +
                                                        ", _psCCO: '" + $( "#txtCCO" ).val() + "' }";

                                            $.ajax( {
                                                type: "POST",
                                                url: "SegDenInternas.aspx/AJAX_enviaMail",
                                                data: _oData,
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json"
                                            } )
                                            .done( function ( data, textStatus, jqXHR ) {
                                                if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                                                    MensajeOk( "Correo enviado correctamente." );
                                                    $( "#dMsje" ).dialog( "close" );
                                                    $( "#dCorreo" ).dialog( "close" );
                                                }
                                                else {
                                                    MensajeError( data.d );
                                                }
                                            } )
                                            .fail( function ( jqXHR, textStatus, errorThrown ) {
                                                MensajeError( "Error al enviar los correos AJAX [JS.abreMensajeCorreo]" );
                                            } );

                                            $( "#dMsje" ).dialog( "close" );

                                        },
                                        "No": function () {
                                            $( "#dMsje" ).dialog( "close" );
                                        }
                                    },
                                close: function () {
                                    tinymce.activeEditor.setContent( "" );
                                }
                            } );
                        }
                        else {
                            MensajeError( "Debe escribir un mensaje." );
                        }
                    },
                    "Cancelar": function () {
                        $( "#dCorreo" ).dialog( "close" );
                    }
                },
            close: function () {
                tinymce.activeEditor.setContent( "" );
            }
        } );


    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function asignaFolio( _psFolio ) {
    $( "#hdnFolio" ).val( _psFolio );
    return true;
}
const cargaDropEstados = function () {
    try {

        $.ajax( {
            type: "POST",
            url: "SegDenInternas.aspx/AJAX_TraeEstados",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR ) {
            if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                if ( data.d.length > 0 ) {
                    $( "#ddlEstado" ).empty();
                    $( "#ddlEstado" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $( "#ddlEdoCambio" ).empty();
                    $( "#ddlEdoCambio" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    let _sOption = "";
                    //let _sText = "";
                    $.each( data.d, function ( index, element ) {
                        switch ( this.LlaveEdo ) {
                            case 1:
                                _sOption = "<option class=\"faRed\"     />";
                                break;
                            case 2:
                                _sOption = "<option class=\"faYellow\"     />";
                                break;
                            case 3:
                                _sOption = "<option class=\"faYellow\"     />";
                                break;
                            case 4:
                                _sOption = "<option class=\"faGreen\"     />";
                                break;
                        }
                        var doc = new DOMParser().parseFromString( "&#xf058 " + this.DescEdo, "text/html" );
                        //return doc.documentElement.textContent;
                        $( "#ddlEstado" ).append( $( _sOption ).val( this.LlaveEdo ).text( doc.documentElement.textContent ) );
                        $( "#ddlEdoCambio" ).append( $( _sOption ).val( this.LlaveEdo ).text( doc.documentElement.textContent ) );

                    } );
                }
                else {
                    $( "#ddlEstado" ).empty();
                }
            }
            else {
                MensajeError( "Hubo un error al traer los datos." );
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown ) {
            MensajeError( "Error al traer los datos [AJAX.cargaDropEstados()]" );
        } );
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}