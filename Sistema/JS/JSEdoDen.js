var _iDocsIrreg = 0;
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
    $( "#dUploadIrreg" ).hide();
    $( "#lBusc" ).button( {
        icons: {
            primary: "ui-icon ui-icon-search"
        }
    } );

    $( "a[id*=gVDecs_lDocAdicional_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-note"
        }
    } );

    $( "a[id*=gVDecs_lDecDocumentacion_]" ).button( {
        icons: {
            primary: "ui-icon ui-icon-document"
        }
    } );



    $( "#txtFechaCaptBusc" ).datepicker( {
        showAnim: "slide",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: "dd/mm/yy"
    } );

    $( "#bSubirIrreg" ).button( {
        icons: {
            primary: "ui-icon ui-icon-folder-open"
        }
    } );

    $( "#bSubirIrreg" ).click( function () {
        $( "#flUpIrreg" ).trigger( 'click' );
    } );

    $( "#flUpIrreg" ).on( "change", PreparaArchivosIrreg );

} );
function AJAX_subeDocAdicional() {

}
function abreAdminArchIrreg() {
    var _aDtsDoctosIrreg = new Array();

    try {
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
                "Listo": function () {
                    $.each( $( "tr[id*=rngDocsIrreg]" ), function ( index, element ) {
                        var _iIdRng = 0;

                        _cDts = null;
                        _cDts = new Collection;

                        _iIdRng = String( element.id ).replace( "rngDocsIrreg", "" );

                        _cDts.add( "NOMBRE_DOCTO", $( "#lblArchIrreg" + _iIdRng ).text() );

                        _aDtsDoctosIrreg[index] = _cDts._oData;
                    } );

                    if ( _aDtsDoctosIrreg.length == 0 ) {
                        MensajeError( "Debe seleccionar algún documento para subirlo." )
                    }
                    else {
                        _oData = "{ _psFolio: '" + $( "#hFolio" ).val() + "'" +
                                    ", _pDoctos: " + ( _aDtsDoctosIrreg.length == 0 ? null : JSON.stringify( _aDtsDoctosIrreg ) ) +
                                    "}";

                        $.ajax( {
                            type: "POST",
                            url: "EdoDen.aspx/AJAX_subeDocAdicional",
                            data: _oData,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json"
                        } )
                        .done( function ( data, textStatus, jqXHR ) {
                            if ( String( data.d ).indexOf( "Error" ) == -1 ) {
                                MensajeOk( "Documentos guardados correctamente." )
                            }
                            else {
                                MensajeError( "Hubo un error al guardar los datos." );
                            }
                        } )
                        .fail( function ( jqXHR, textStatus, errorThrown ) {
                            MensajeError( "Error al guardar los datos [AJAX.abreAdminArchIrreg()]" );
                        } );

                        $( "#dUploadIrreg" ).dialog( "close" );
                    }
                }
                ,
                "Cancelar": function () {
                    $( "#dUploadIrreg" ).dialog( "close" );
                }
            },
            close: function () {
                $( "#divControlPopupFondo" ).hide();
            }
        } );
    }
    catch ( err ) {
        MensajeError( "[abreAdminArchIrreg] \n" + err.message );
    }
}
var _oArchivosIrreg;
function PreparaArchivosIrreg( event ) {

    var _odata = new FormData();
    var _bPasa = false;
    var _oArchivosIrreg = null;

    try {
        _oArchivosIrreg = null;
        _oArchivosIrreg = event.target.files;

        if ( _oArchivosIrreg != null ) {

            $.each( _oArchivosIrreg, function ( key, value ) {
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
                        MensajeError( "Archivo no válido. Únicamente puede subir documentos Word, PDF, audio e imágenes." );
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

                            $( "#tblDocPorSubirIrreg > tbody:last" ).append( "<tr style='text-align: center' id='rngDocsIrreg" + _iDocsIrreg + "'>" +
                                    "<td style='width:85%'><label class='CtrlFrm' id='lblArchIrreg" + _iDocsIrreg + "'>" + response.responseText + "</label></td>" +
                                    "<td style='width:15%'><span class='ui-icon ui-icon-circle-close' style='float: center; margin: 0px 10px 0px 5px; cursor: pointer' " +
                                    "onclick='javascript:$(\"#rngDocsIrreg" + _iDocsIrreg + "\").remove();'></span></td>" );

                            $( "#tblDocPorSubirIrreg" ).show();

                            _iDocsIrreg += 1;
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
        MensajeError( "[PreparaArchivosIrreg] \n" + err.message );
    }

}
//function cuentaArchivosIrreg()
//{
//    try
//    {
//        $( "#lNumDocsIrreg" ).text( $( "tr[id*=rngDocsIrreg]" ).length + " documento(s) anexado(s)" );
//    }
//    catch ( err )
//    {
//        MensajeError( "[cuentaArchivosIrreg] \n" + err.message );
//    }
//}

const verDocumentosSoporte = function () {
    window.open( "DoctosInterna.aspx?_psFolio=" + $( "#hFolio" ).val() + "&_plLlaveInterna=" + $( "#hdnLlavePrincipal" ).val() + "&_piDoctoSoporte=1" );
}