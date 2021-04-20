$( document ).ready( function ()
{
    $( "#diag-load, #diag-error, #diag-ok, #dMje" ).hide();
    $( "#lEnviar" ).button( {
        icons: {
            primary: "ui-icon ui-icon-mail-closed"
        }
    } );
} );
function enviaPass()
{
    try
    {
        _oData = "{ _psFolio: '" + $( "#txtFolio" ).val() + "' }";

        $.ajax( {
            type: "POST",
            url: "RestPass.aspx/AJAX_enviaPass",
            data: _oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        } )
        .done( function ( data, textStatus, jqXHR )
        {
            if ( String( data.d ).indexOf( "Error" ) == -1 )
            {
               MensajeOk("Su contraseña se ha enviado al correo registrado en la denuncia.")
            }
            else
            {
                if ( data.d == "Error No existe un correo registrado con la denuncia. Lo invitamos a levantar otra denuncia donde capture su correo electrónico." ||
                     data.d == "Error El Folio no existe o está mal capturado." )
                {
                    MensajeError( String( data.d ).replace( "Error", "" ) );
                }
                else
                {
                    MensajeError( "Hubo un error al generar la contraseña." )
                }
                
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            MensajeError( "Error al generar la contraseña [AJAX.enviaPass()]" );
        } );
    }
    catch ( err )
    {
        MensajeError( "[enviaPass] \n" + err.message );
    }
}