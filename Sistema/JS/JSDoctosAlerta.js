$( document ).ready( function ()
{
    $( "a[id*=gVDoctos_lDescargar_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-transferthick-e-w"
        }
    } );

} );
function descargaDocto( _plLlaveDocto )
{
    try
    {
        $( "#hLlaveDoctoDesc" ).val( _plLlaveDocto );
    }
    catch ( err )
    {
        MensajeError( err.message );
    }
}