let _iContDocsFuncs = 0;
validaCorreo = function ( event ) {
    event.preventDefault();
    try {
        if ( !validaEmail( $( "#txtCorreo" ).val() ) ) {
            return;
        }
        $( "#lMje" ).text( "Se enviará un correo electrónico a la dirección capturada con la liga para que pueda capturar su denuncia. ¿Desea continuar?" );

        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();

        $( "#dMje" ).dialog( {
            resizable: true,
            height: "auto",
            width: "40%",
            modal: true,
            dialogClass: "no-close",
            buttons: {
                "Si": function () {
                    // Do PostBack
                    $( "#hdnCorreo" ).val( $( "#txtCorreo" ).val() )
                    __doPostBack( 'btnValidaCorreo', 'Validar' );
                },
                "No": function () {
                    $( "#dMje" ).dialog( "close" );
                }
            },
            close: function () {
                $( "#divControlPopupFondo" ).hide();
            }
        } );
    }
    catch ( err ) {
        MensajeError( err.message );
    }
}
function ShowPopup( message ) {
    $( function () {
        //$("#divAlerta").html(message);
        $( "#lMje" ).html( message );
        $( "#divControlPopupFondo" ).height( $( document ).height() );
        $( "#divControlPopupFondo" ).show();
        $( "#dMje" ).dialog( {
            title: "Aviso",
            buttons: {
                Aceptar: function () {
                    $( "#divControlPopupFondo" ).hide();
                    $( this ).dialog( 'close' );
                }
            },
            modal: true
        } );
    } );
}
function reCaptchaKey() {
    $( "#ckCaptcha" ).prop( "data-sitekey", $( "#hdnCvePublicaReCaptcha" ).val() );
}
const agregaDocumentacion = function () {
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
            //cuentaArchivos();
        }
    } );
}
//function cuentaArchivos() {
//    try {
//        $( "#lNumDocs" ).text( $( "tr[id*=rngDocs]" ).length + " documento(s) anexado(s)" );
//    }
//    catch ( err ) {
//        MensajeError( "[cuentaArchivos] \n" + err.message );
//    }
//}
let _oArchivosFunc;
const PreparaArchivosFunc = function ( event ) {

    if ( event.target.files != undefined ) {

        let _odata = new FormData();
        let _bPasa = false;
        let _oArchivosFunc = null;

        try {
            _oArchivosFunc = null;
            _oArchivosFunc = event.target.files;

            if ( _oArchivosFunc != null ) {
                $.each( _oArchivosFunc, function ( key, value ) {
                    var _sExt = "";
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
                            MensajeError( "Archivo " + value.name + " no válido. Únicamente puede subir documentos Word, PDF, audio e imágenes." );
                            _bPasa = false;

                    }

                    if ( _bPasa ) {
                        if ( value.size < 20000000 ) {
                            _odata.append( key, value );
                            //_bPasa = true;
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
                                        //var _aDts = new Array();

                                        //_aDts = String( response.responseText ).split( "§" );

                                        //for ( _iCont = 0; _iCont <= _aDts.length - 1; _iCont++ )
                                        //{
                                        $( "#tblDocPorSubir > tbody:last" ).append( "<tr style='text-align: center' id='rngDocs" + _iContDocsFuncs + "'>" +
                                            "<td style='width:85%'><label class='CtrlFrm' id='lblArch" + _iContDocsFuncs + "'>" + response.responseText + "</label></td>" +
                                            "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                                            "onclick='javascript:$(\"#rngDocs" + _iContDocsFuncs + "\").remove();'></span></td>" );

                                        //}

                                        $( "#tblDocPorSubir" ).show();

                                        _iContDocsFuncs += 1;

                                        //$( "#tblbtnSube" ).show();
                                        $( "#flUp" ).val( "" );
                                    },
                                    500: function ( response ) {
                                        MensajeError( response.responseText );
                                        $( "#flUp" ).val( "" );
                                    }
                                }
                            } );
                        }
                        else {
                            MensajeError( "El archivo " + value.name + " es mayor a 20 MB. Por favor elija un archivo de menor peso." );
                            //_bPasa = false;
                        }
                    }
                } );

                //if ( _bPasa ) {

                //}
            }
            else {
                MensajeError( "Hubo un problema al seleccionar el documento, por favor inténtelo de nuevo." );
            }

        }
        catch ( err ) {
            MensajeError( "[PreparaArchivos] \n" + err.message );
        }
    }


}
const validaEmail = function ( _psCorreo ) {
    let regex = new RegExp( "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" );
    if ( !regex.test( _psCorreo ) ) {
        event.preventDefault();
        ShowPopup( "Formato de correo incorrecto, por favor vuelva a intentarlo" );
        return false;
    }
    return true;
}