$( document ).ready( function ()
{
    if ( screen.width > 1024 )
    {
        $( "#lTitulo" ).prop( "width", "20px" );
    }
    else if ( screen.width <= 1024 )
    {
        $( "#lTitulo" ).prop( "width", "5px" );
    }

    $( "#dPolitica" ).hide();
});

function BuscaEnTabla(_sTabla, _sBuscar, _iColumna) {

    var table = $("#" + _sTabla).DataTable();

    if (_iColumna == 0) {

        table.search('' + _sBuscar + '').draw();
    }
    else {
        table.columns(_iColumna).search('' + _sBuscar + '').draw();
    }


}


//Función para realizar busqueda exacta en DataTable 
//_sTabla: Nombre de la tabla donde se realizará la busqueda
//_sBuscar: Nombre del datos a buscar
//_iColumna: numero de columna donde se realizará la busqueda

function BuscaEnTablaExacta(_sTabla, _sBuscar, _iColumna) {

    var table = $("#" + _sTabla).DataTable();

    if (_iColumna == 0) {

        table.search('' + _sBuscar + '').draw();
    }
    else {

        /*
            table.column(_iColumna).search("^" + _sBuscar + "$", true, false, true).draw();

            Definición de los valores pasados en la función ".search"

            1.- Tratar como una expresión regular
            2.- Búsqueda inteligente
            3.- Hacer coincidencias entre mayúsculas y minúsculas
        */
        _sBuscar == '' ? BuscaEnTabla(_sTabla, _sBuscar, _iColumna) : table.column(_iColumna).search("^" + _sBuscar + "$", true, false, true).draw();


    }


}

function MensajeOk( _psMensaje, _psTitle )
{
    try
    {
        //$( "#divControlPopupFondo" ).height( $( document ).height() );
        //$( "#divControlPopupFondo" ).show();

        //$( "#lblMsjeOk" ).text( _psMensaje );

        $( "#diag-ok" ).attr( "title", _psTitle );
        $( "#lblMsjOk" ).text( _psMensaje );

        $("#diag-ok").dialog({
            open: function () { $(".ui-dialog-titlebar-close").hide(); },
            resizable: false,
            height: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Aceptar": function ()
                {
                    $( "#diag-ok" ).dialog( "close" );
                    //document.location = "http://www.asf.gob.mx";
                    $( "#divControlPopupFondo" ).hide();
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
        alert( "[MensajeOk] \n" + err.message );
    }

}
function MensajeError( _psMensaje )
{
    try
    {
        //$( "#divControlPopupFondo" ).height( $( document ).height() );
        //$( "#divControlPopupFondo" ).show();

        $( "#lblMsjeError" ).text( _psMensaje );

        $( "#diag-error" ).dialog( {
            open: function () { $(".ui-dialog-titlebar-close").hide(); },
            resizable: false,
            height: "auto",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Aceptar": function ()
                {
                    $( "#diag-error" ).dialog( "close" );
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
        MensajeError( "[MensajeError] \n" + err.message );
    }

}
function formatNum( _psNum )
{
    var _dNum = 0.0;

    try
    {
        _dNum = _psNum.toString().replace( /\$|\,/g, "" );

        if ( _dNum < 0 )
        {
            _dNum = 0;
        }

        if ( isNaN( _dNum ) )
        {
            return ""
        }

        if ( _dNum.indexOf( "." ) != -1 )
        {
            _dNum = String( _dNum ).substring( 0, ( _dNum.indexOf( "." ) ) + 2 );
        }

        return _dNum;
    }
    catch ( err )
    {
        MensajeError( ex.message + " formatNum()" );
    }
}
function SoloNumeros( e )
{
    try
    {
        if ( !e.shiftKey )
        {
            if ( e.keyCode == 9 || ( e.keyCode >= 48 && e.keyCode <= 57 ) || ( e.keyCode >= 96 && e.keyCode <= 105 )
                || ( e.keyCode == 110 || e.keyCode == 190 ) || e.keyCode == 188 || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39 )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    catch ( err )
    {
        MensajeError( "[SoloNumeros] \n" + err.message );
    }
}
function validateEmail( _psEmail )
{
    var _oRe = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return _oRe.test( _psEmail );
}
function abrePolitica()
{
    $( "#divControlPopupFondo" ).height( $( document ).height() );
    $( "#divControlPopupFondo" ).show();

    $( "#dPolitica" ).dialog( {
        resizable: true,
        height: "auto",
        width: "500px",
        modal: true,
        dialogClass: "no-close",
        buttons: {
            "Aceptar": function ()
            {
                $( "#dPolitica" ).dialog( "close" );
            }
        },
        close: function ()
        {
            $( "#divControlPopupFondo" ).hide();
        }
    } );
}
function abreINFOMEX()
{
    window.open( "http://www.asf.gob.mx:8083" );
}
function validateEmail(_seMail) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(_seMail);
}
