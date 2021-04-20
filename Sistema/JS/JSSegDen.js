$( document ).on( 'focusin', function ( e )
{
    if ( $( e.target ).closest( ".mce-window, .moxman-window" ).length )
    {
        e.stopImmediatePropagation();
    }
} );
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

    $( "#lImprimir" ).button( {
        icons: {
            primary: "ui-icon ui-icon-print"
        }
    } );
    
    $( "a[id*=gVDecs_lAuds_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-document"
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

    $( "#txtFechaCaptBusc, #txtFechaCaptBusc2" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    } );

    $( "#dvCambioEst, #dCorreo, #dMsje, #diag-load, #diag-error, #diag-ok, #dDocsDenuncia" ).hide();

    $( "#ddlEstado" ).change( function ()
    {
        if ( $( this ).val() != 0 )
        {
            traeSubEdos( $( this ).val() )
        }
    } )

    $( "#ddlEdoCambio" ).change( function ()
    {
        if ( $( this ).val() != 0 )
        {
            traeSubEdosCambio( $( this ).val() )
        }
    } )

    $( "#txtEmail" ).on( 'keydown', function ( event )
    {
        if ( event.which == 13 )
        {
            alert( 'enter pressed' );
            event.preventDefault();
        }
    } );
} );
function asignaFolio( _psFolio )
{
    $( "#hdnFolio" ).val( _psFolio );
    return true;
}
function abreCambio( _psFolio, _plLlaveInformante )
{
    try
    {
        $( "#lblFolio" ).text( "Folio: " + _psFolio );
        $( "#hLlaveInformante" ).val( _plLlaveInformante );
        $( "#dvCambioEst" ).dialog( {
            resizable: false,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close"
        } );

        return false;
    }
    catch(err)
    {
        MensajeError( err.message );
    }
}
function cierraCambio()
{
    $( "#dvCambioEst" ).dialog( "close" );
}
function traeSubEdos( _plLlaveEdo )
{
    try
    {
        _oData = "{ _plLlavEdo: " + _plLlaveEdo + "}";

        $.ajax( {
            type: "POST",
            url: "SegDenInf.aspx/AJAX_traeSubEdos",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                if ( data.d.length > 0 )
                {
                    $( "#ddlSubEstado" ).empty();
                    $( "#ddlSubEstado" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $.each( data.d, function ( index, element )
                    {
                        $( "#ddlSubEstado" ).append( $( "<option     />" ).val( this.LlaveEdo ).text( this.DescEdo ) );
                    } );
                }
                else
                {
                    $( "#ddlSubEstado" ).empty();
                }
            }
            else
            {
                MensajeError( "Hubo un error al traer los datos." );
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al traer los datos [AJAX.traeSubEdos()]" );
        } );
    }
    catch(err)
    {
        MensajeError( err.message );
    }
}
function traeSubEdosCambio( _plLlaveEdo )
{
    try
    {
        _oData = "{ _plLlavEdo: " + _plLlaveEdo + "}";

        $.ajax( {
            type: "POST",
            url: "SegDenInf.aspx/AJAX_traeSubEdos",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                if ( data.d.length > 0 )
                {
                    $( "#ddlSubEdoCambio" ).empty();
                    $( "#ddlSubEdoCambio" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );
                    $.each( data.d, function ( index, element )
                    {
                        $( "#ddlSubEdoCambio" ).append( $( "<option     />" ).val( this.LlaveEdo ).text( this.DescEdo ) );
                    } );
                }
                else
                {
                    $( "#ddlSubEdoCambio" ).empty();
                }
            }
            else
            {
                MensajeError( "Hubo un error al traer los datos." );
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al traer los datos [AJAX.traeSubEdosCambio()]" );
        } );
    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}
function abreMensajeCorreo( _psEmail, _psFolio )
{
    try
    {
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
                    "Enviar": function()
                    {
                        if ( tinymce.activeEditor.getContent() != "" )
                        {
                            $( "#lMsje" ).text( "El mensaje está listo para ser enviado al Denunciante. ¿Desea continuar?" );
                            $( "#dMsje" ).dialog( {
                                resizable: false,
                                height: "auto",
                                width: "auto",
                                modal: true,
                                dialogClass: "no-close",
                                buttons:
                                    {
                                        "Si": function ()
                                        {
                                            _oData = "{ _psMensaje: '" + String( tinymce.activeEditor.getContent() ).split( "'" ).join( "" ) + "'" +
                                                        ", _psEMail: '" + $( "#txtPara" ).val() + "'" +
                                                        ", _psFolio: '" + _psFolio + "'" +
                                                        ", _psCCO: '" + $( "#txtCCO" ).val() + "' }";

                                            $.ajax( {
                                                type: "POST",
                                                url: "SegDenInf.aspx/AJAX_enviaMail",
                                                data: _oData,
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json"
                                            } )
                                            .done( function ( data, textStatus, jqXHR )
                                            {
                                                if ( String( data.d ).indexOf( "Error" ) == -1 )
                                                {
                                                    MensajeOk( "Correo enviado correctamente." );
                                                    $( "#dMsje" ).dialog( "close" );
                                                    $( "#dCorreo" ).dialog( "close" );
                                                }
                                                else
                                                {
                                                    MensajeError( data.d );
                                                }
                                            } )
                                            .fail( function ( jqXHR, textStatus, errorThrown )
                                            {
                                                MensajeError( "Error al enviar los correos AJAX [JS.abreMensajeCorreo]" );
                                            } );

                                            $( "#dMsje" ).dialog( "close" );
                                            
                                        },
                                        "No": function ()
                                        {
                                            $( "#dMsje" ).dialog( "close" );
                                        }
                                    },
                                close: function ()
                                {
                                    tinymce.activeEditor.setContent( "" );
                                }
                            } );
                        }
                        else
                        {
                            MensajeError( "Debe escribir un mensaje." );
                        }
                    },
                    "Cancelar": function()
                    {
                        $( "#dCorreo" ).dialog( "close" );
                    }
                },
            close: function ()
            {
                tinymce.activeEditor.setContent( "" );
            }
        } );

        
    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}
function cambiaEstatus()
{
    try
    {
        if ( $( "#ddlEdoCambio" ).val() != 0 )
        {
            _oData = "{ _plLlaveInformante: " + $( "#hLlaveInformante" ).val() +
                        ", _plLlaveEstatus: " + $( "#ddlEdoCambio" ).val() +
                        ", _plLlaveSubEstatus: " + ( $( "#ddlSubEdoCambio" ).val() == null ? 0 : $( "#ddlSubEdoCambio" ).val() ) + "}";

            $.ajax( {
                type: "POST",
                url: "SegDenInf.aspx/AJAX_cambiaEstatus",
                data: _oData,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            } )
            .done( function ( data, textStatus, jqXHR )
            {
                if ( String( data.d ).indexOf( "Estatus cambiados correctamente." ) != -1 )
                {
                    MensajeOk( "Datos modificados correctamente. Por favor espere a que se recarguen la página." );
                    cierraCambio();
                    __doPostBack( 'bGrid', '' );
                }
                else
                {
                    MensajeError( data.d );
                }
            } )
            .fail( function ( jqXHR, textStatus, errorThrown )
            {
                MensajeError( "Error al modificar el estatus AJAX [JS.cambiaEstatus]" );
            } );
        }
    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}
function abreDoctos( _plLlaveInformante, _psFolio )
{
    try
    {
        //Cargamos documentos
        //window.open( "DoctosInforms.aspx?_psFolio=" + _psFolio + "&_lLlaveInformante=" + _plLlaveInformante, "Documentos", "", "height=300px, width=800px, scrollbars=0, status=0, titlebar=0, menubar=0" );

        $( "#dDocsDenuncia" ).children( $( "<iframe />" ) ).remove();

        $( "#dDocsDenuncia" ).append( $( "<iframe />" ).attr( "src", "DoctosInforms.aspx?_psFolio=" + _psFolio + "&_lLlaveInformante=" + _plLlaveInformante ).width( "1100px" ).height( "300px" ) ).dialog(
        {
            resizable: false,
            height: "auto",
            width: "1200px",
            modal: true,
            dialogClass: "no-close",
            buttons:
                {
                    "Cerrar": function ()
                    {
                        $( "#dDocsDenuncia" ).dialog( "close" );
                    }
                }
        } );

        //$( "#dDocsDenuncia" ).load( "DoctosInforms.aspx?_psFolio=" + _psFolio + "&_lLlaveInformante=" + _plLlaveInformante ).dialog(
        //{
        //    resizable: false,
        //    height: "auto",
        //    width: "auto",
        //    modal: true,
        //    dialogClass: "no-close",
        //    buttons:
        //        {
        //            "Cerrar": function()
        //            {
        //                $( "#dDocsDenuncia" ).dialog( "close" );
        //            }
        //        }
        //} );

    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}
function abreAuds( _plLlaveInformante, _psFolio )
{

    var _sHTML = "";
    var _bFlag = false;

    try
    {
        $( "#lAuds" ).text( _psFolio );

        //Cargamos auditorías
        _oData = "{ _plLlaveInformante: " + _plLlaveInformante + "}";

        $.ajax( {
            type: "POST",
            url: "SegDenInf.aspx/AJAX_traeAuditorias",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
                if ( data.d.length > 0 )
                {
                    _sHTML = "<table style=\"margin-left: auto; margin-right: auto; width: 90%\">" + 
                                "<tr style=\"background-color: #1F4E81; text-align: center\">" + 
                                    "<td style=\"width: 15%\">" +
                                        "<label style=\"font-weight: bold; color: whitesmoke\" class=\"CtrlFrm\">No.</label>" + 
                                    "</td>" +
                                    "<td style=\"width: 45%\">" +
                                        "<label style=\"font-weight: bold; color: whitesmoke\" class=\"CtrlFrm\">Título</label>" +
                                    "</td>" +
                                    "<td style=\"width: 10%\">" +
                                        "<label style=\"font-weight: bold; color: whitesmoke\" class=\"CtrlFrm\">Cuenta</label>" +
                                    "</td>" +
                                    "<td style=\"width: 20%\">" +
                                        "<label style=\"font-weight: bold; color: whitesmoke\" class=\"CtrlFrm\">Información</label>" +
                                    "</td>" +
                                    "<td style=\"width: 10%\">" +
                                        "<label style=\"font-weight: bold; color: whitesmoke\" class=\"CtrlFrm\">&nbsp;</label>" +
                                    "</td>" +
                                "</tr>";

                    $.each( data.d, function ( index, element )
                    {
                        if ( _bFlag )
                        {
                            _sHTML += "<tr style=\"background-color: #CFDAE5; color: black;\">";
                            _bFlag = false;
                        }
                        else
                        {
                            _sHTML += "<tr>";
                        }
                        

                        _sHTML += "<td style=\"width: 15%; text-align: center\">" +
                                        "<label class=\"CtrlFrm\">" + element.NumeroAud + "</label>" +
                                    "</td>" +
                                    "<td style=\"width: 45%\">" +
                                        "<label class=\"CtrlFrm\">" + element.TituloAud + "</label>" +
                                    "</td>" +
                                    "<td style=\"width: 10%; text-align: center\">" +
                                        "<label class=\"CtrlFrm\">" + element.CP + "</label>" +
                                    "</td>" +
                                    "<td style=\"width: 20%; text-align: center\">" +
                                        "<label class=\"CtrlFrm\">" + element.InfoAud + "</label>" +
                                    "</td>" +
                                    "<td style=\"width: 10%; text-align: center\">" +
                                        ( element.CountDoctos > 0 ?
                                        "<label class=\"CtrlFrm\"><a class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary\" id=\"lDocs" + index + "\" " +
                                            "role=\"button\" aria-disabled=\"false\" style=\"color: white; width: 25px; height: 25px;\" onclick=\"javascript: docsAuds(" + element.LlaveAuditoria + ", " + element.NumeroAud + "); return false;\">" +
                                            "<span class=\"ui-button-icon-primary ui-icon ui-icon-note\"></span><span class=\"ui-button-text\">&nbsp;</span></a></label>" : "" ) +
                                    "</td>" +
                                    "</tr>";

                        _bFlag = true;
                    } );

                    _sHTML += "</table>";
                    $( "#dtAuds" ).empty();
                    $( "#dtAuds" ).append( _sHTML );

                    $( "#dAuditorias" ).dialog( {
                        resizable: false,
                        height: "auto",
                        width: "auto",
                        modal: true,
                        dialogClass: "no-close",
                        buttons:
                        {
                            "Cerrar": function ()
                            {
                                $( "#dAuditorias" ).dialog( "close" );
                            }
                        }
                    } );

                }
            }
            else
            {
                MensajeError( "Hubo un error al traer los datos." );
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al traer las auditorías [AJAX.abreAuds()]" );
        } );
    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}
function docsAuds( _plLlaveAuditoria, _lNumAud )
{
    try
    {
        //Cargamos documentos
        //window.open( "DoctosInforms.aspx?_psFolio=" + _psFolio + "&_lLlaveInformante=" + _plLlaveInformante, "Documentos", "", "height=300px, width=800px, scrollbars=0, status=0, titlebar=0, menubar=0" );

        $( "#dDocsDenuncia" ).children( $( "<iframe />" ) ).remove();

        $( "#dDocsDenuncia" ).append( $( "<iframe />" ).attr( "src", "DoctosAuds.aspx?_lLlaveAud=" + _plLlaveAuditoria + "&_lNumAud=" + _lNumAud ).width( "800px" ).height( "300px" ) ).dialog(
        {
            resizable: false,
            height: "auto",
            width: "900px",
            modal: true,
            dialogClass: "no-close",
            buttons:
                {
                    "Cerrar": function ()
                    {
                        $( "#dDocsDenuncia" ).dialog( "close" );
                    }
                }
        } );

        //$( "#dDocsDenuncia" ).load( "DoctosInforms.aspx?_psFolio=" + _psFolio + "&_lLlaveInformante=" + _plLlaveInformante ).dialog(
        //{
        //    resizable: false,
        //    height: "auto",
        //    width: "auto",
        //    modal: true,
        //    dialogClass: "no-close",
        //    buttons:
        //        {
        //            "Cerrar": function()
        //            {
        //                $( "#dDocsDenuncia" ).dialog( "close" );
        //            }
        //        }
        //} );

    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}