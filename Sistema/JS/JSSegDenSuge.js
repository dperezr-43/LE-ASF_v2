$( document ).keydown( function ( e )
{
    if ( e.keyCode == 8 && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA' )
    {
        e.preventDefault();
    }
} );
$( document ).ready( function ()
{

    $( "#dvCambioEst, #dMsje, #diag-load, #diag-error, #diag-ok" ).hide();

    $( "a[id*=gVDecs_lImpDen_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-print"
        }
    } );

    $( "a[id*=gVDecs_lEditar_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-pencil"
        }
    } );

    $( "#lImprimir" ).button( {
        icons: {
            primary: "ui-icon ui-icon-print"
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

    $( "#dvCambioEst" ).hide();

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

    //$( "#ddlTpoIrreg" ).change( function ()
    //{
    //    if ( $( this ).val() != 0 )
    //    {
    //        traeConcIrreg( $( this ).val() )
    //    }
    //} )
} );
function asignaFolio( _psFolio )
{
    $( "#hdnFolio" ).val( _psFolio );
    return true;
}
function abreCambio( _psFolio, _plLlaveSugerencia )
{
    try
    {
        $( "#lblFolio" ).text( "Folio: " + _psFolio );
        $( "#hLlaveSugerencia" ).val( _plLlaveSugerencia );
        $( "#dvCambioEst" ).dialog( {
            resizable: false,
            height: "auto",
            width: "auto",
            modal: true,
            dialogClass: "no-close"
        } );

        return false;
    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}
function cierraCambio()
{
    $( "#dvCambioEst" ).dialog( "close" );
}
function cambiaEstatus()
{
    try
    {
        if ( $( "#ddlEdoCambio" ).val() != 0 )
        {
            _oData = "{ _plLlaveSugerencia: " + $( "#hLlaveSugerencia" ).val() +
                        ", _plLlaveEstatus: " + $( "#ddlEdoCambio" ).val() +
                        ", _plLlaveSubEstatus: " + ( $( "#ddlSubEdoCambio" ).val() == null ? 0 : $( "#ddlSubEdoCambio" ).val() ) + "}";

            $.ajax( {
                type: "POST",
                url: "SegDenSuge.aspx/AJAX_cambiaEstatus",
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
function traeSubEdos( _plLlaveEdo )
{
    try
    {
        _oData = "{ _plLlavEdo: " + _plLlaveEdo + "}";

        $.ajax( {
            type: "POST",
            url: "SegDenSuge.aspx/AJAX_traeSubEdos",
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
    catch ( err )
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
            url: "SegDenSuge.aspx/AJAX_traeSubEdos",
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
//function traeConcIrreg( _plLlaveIrreg )
//{
//    try
//    {
//        $( "#ddlConcIrreg" ).empty();
//        $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( "0" ).text( "--> Seleccione <--" ) );

//        switch ( parseInt( _plLlaveIrreg ) )
//        {
//            case 1:
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 1 ).text( "Solicita sobornos" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 2 ).text( "Acepta regalos y gratificaciones" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 3 ).text( "Manejo inadecuado de información (falsificación y/o alteración de información, incumple con confidencialidad y reserva de información)" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 4 ).text( "Manejo inadecuado y/o extracción de fondos suministros u otros bienes de la ASF" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 5 ).text( "Falta de profesionalismo y desarrollo ineficiente e inoportuno de las tareas encomendadas" ) );
//                break;
//            case 2:
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 1 ).text( "Su actuación obedece a intereses políticos" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 2 ).text( "Su actuación obedece a intereses personales y/o externos (Conflicto de intereses)" ) );
//                break;
//            case 3:
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 1 ).text( "Trato discriminatorio" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 2 ).text( "Trato prepotente u hostil" ) );
//                $( "#ddlConcIrreg" ).append( $( "<option     />" ).val( 3 ).text( "Acoso (Sexual, laboral, físico y psicológico)" ) );
//                break;
//        }
//    }
//    catch ( err )
//    {
//        MensajeError( err.message );
//    }
//}