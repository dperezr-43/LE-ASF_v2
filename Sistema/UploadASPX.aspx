<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadASPX.aspx.cs" Inherits="Sistema.UploadASPX" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Seleccionar Documento</title>
    <link href="Content/Style.css" rel="stylesheet" />
    <link href="CSS/jquery-ui.css" rel="stylesheet" />
    <script src="JS/jquery-1.11.2.min.js"></script>
    <script src="JS/jquery-ui-1.10.3.custom.js"></script>
    <script src="JS/JSUploadASPX.js"></script>

     <style type="text/css">
            .inputWrapper {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    /*Using a background color, but you can use a background image to represent a button*/
    /*background-color: #DDF;*/
}

.fileInput {
    cursor: pointer;
    height: 100%;
    position:absolute;
    top: 0;
    right: 0;
    /*This makes the button huge so that it can be clicked on*/
    font-size:50px;
}
.hidden {
    /*Opacity settings for all browsers*/
    opacity: 0;
    -moz-opacity: 0;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)
}


/*Dynamic styles*/

/*.inputWrapper:hover {
    background-color:#808080;
}*/
.inputWrapper.clicked {
    background-color: #A66;
}


        </style>

</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="HDNombreArchivo" runat="server" />
        <asp:HiddenField ID="HDTipo_Archivo" runat="server" />
        <asp:HiddenField ID="HDRuta_archivo" runat="server" />
        <asp:HiddenField ID="HDContador" Value="0" runat="server" />
         <asp:HiddenField ID="HDEvent_Boton" Value="0" runat="server" />
        <asp:HiddenField ID="HDActivo_Guardar" Value="0" runat="server" />
        <asp:HiddenField ID="HDRefresh" Value="0" runat="server" />

         <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>

           <%-- <div style="display: none;" runat="server" id="divx">
            <center>
			<table>
				<tr>
					<td style="color: black">
						<strong>PROCESANDO... </strong>
					</td>
					<td>
						<asp:Image ID="Image2" runat="server" ImageUrl="~/Imagenes/Iconos/cargando.gif" ImageAlign="Middle" />
					</td>
				</tr>
			</table>
		</center>
        </div>--%>

   <%--<div style="padding-top:20%; text-align: center; font-weight: bold; width: 90%;">--%>
        <div style="text-align: center; font-weight: bold; width: 90%;">
            <table align="center" style="width:90%">
                <tr>
                    <td style="vertical-align:top; text-align:center;">
                        <table align="left">
                            <tr>
                                <td>
                                    <asp:Label ID="Lbl_error" runat="server" Text="Seleccione el archivo que desea subir " CssClass="ControlForm"></asp:Label>
                                    &nbsp;
                 
                                </td>
                                <td>&nbsp;</td>
                                <td>
                                    <div class="inputWrapper" style="height: 36px; width: 36px;">
                                        <img border="0" src="Imagenes/mas.png">
                                        <input type="file" class="fileInput hidden" runat="server" id="fileselected" />
                                    </div>

                                </td>
                                <td style="width: 10px"></td>

                                <td align="center">
                                    <asp:ImageButton ID="imb_regresar" runat="server" ImageUrl="~/Imagenes/cancelar.png" ToolTip="Salir" OnClientClick="javascript: Regresar(0); return false;" />
                                </td>

                            </tr>

                            <tr>
                                <td colspan="5">
                                    <hr align="left" class="linesHTML" style="width:100%" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <asp:Label ID="Label1" runat="server" Text="" ForeColor="Red" CssClass="ControlForm"></asp:Label>
                                </td>

                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table align="left">

                            <tr>
                                <td>
                                    <asp:Label ID="lblRutaDocumento" runat="server" CssClass="ControlForm" Text="" Style="display: none;"></asp:Label>
                                    <asp:HiddenField ID="HDFechaModificacion" Value="" runat="server" />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <tr>
                </tr>
            </table>
        </div>

        <div id="divControlPopupFondo" style="width: 100%; height: 100%; top: 0px; left: 0px; display: none;"></div>
    </form>
</body>
</html>
