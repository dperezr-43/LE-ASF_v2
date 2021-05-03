<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Seguimiento_Denuncia.aspx.cs" Inherits="Sistema.Modulos.Denuncias_IV.Seguimiento_Denuncia" EnableEventValidation="false" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    
    <div runat="server" style="width:100%">

    

        <%--    <link href="../../CSS/jquery-ui.css" rel="stylesheet" />
            <link href="../../Content/jquery.dataTables.css" rel="stylesheet" />
            <script src="../../JS/jquery-1.11.2.min.js"></script>
            <script src="../../JS/jquery-ui-1.10.3.custom.js"></script>
            <script src="../../JS/jquery.dataTables.js"></script>--%>
            <link href="../../CSS/jquery-ui.css" rel="stylesheet" />
            <link href="../../Content/chosen.css" rel="stylesheet" />
            <link href="../../Content/ImageSelect.css" rel="stylesheet" />
            <link href="../../CSS/jquery.dataTables.css" rel="stylesheet" />
          <%--  <link href="../../CSS/richtext.css" rel="stylesheet" />--%>
           <%-- <link href="../../CSS/richtext.min.css" rel="stylesheet" />--%>

            <%--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">--%>
        <%--  <link href="../../CSS/font-awesome.min.css" rel="stylesheet" />--%>
        <%--    <link href="../../CSS/fontawesome-free-5.14.0/css/fontawesome.css" rel="stylesheet" />
            <link href="../../CSS/fontawesome-free-5.14.0/css/fontawesome.min.css" rel="stylesheet" />--%>
            <script src="../../JS/jquery-1.11.2.min.js"></script>
            <script src="../../JS/jquery-ui-1.10.3.custom.js"></script>
            <script src="../../JS/jquery.dataTables.js"></script>
            <script src="../../JS/JSSeguimDenuncia.js"></script>
            <script src="../../JS/chosen.jquery.js"></script>
            <script src="../../JS/ImageSelect.jquery.js"></script>
           <%-- <script src="../../JS/jquery.richtext.js"></script>--%>
        <%--    <script src="../../JS/jquery.richtext.min.js"></script>--%>
            <%--<script src="../../JS/tinymce.min_2.js"></script>--%>
            <script type="text/javascript" src="https://cdn.tiny.cloud/1/v1a5rwaqu78gb45pxzvvs0u7mt0cbx5jpgi3u6ua6v8xm5x4/tinymce/5/tinymce.min.js"></script>
            <script src="../../JS/JSUtils.js"></script>
    
           
            <style>

                 .container {
                    width: 90%;
                  }

                 

            </style>


            <br />
            <br />
            <br />
            <br />

            <div runat="server" id="dvImagen" align="center">

                <asp:Image runat="server" ID="imgPrincipal" ImageUrl="~/Imagenes/seguimiento2.png" />

            </div>

            <asp:HiddenField runat="server" ID="HDllaveUsr" Value="0" />

            <br />

            <div align="center" runat="server" title="Búsqueda de Denuncias" id="dvFiltroBusqueda" class="div_redondeado">
                <br />
             <%--   <table style="width:100%">

                    <tr>
                        <td align="center" colspan="15">--%>

                            <table>
                                <tr>
                                    <td align="left">
                                        <asp:Label runat="server" ID="lblTitulo1" CssClass="CtrlFrm" Text="No. Folio"></asp:Label>
                                    </td>
                                    <td style="width:8px">
                                        &nbsp;
                                    </td>
                                    <td align="left" colspan="4">
                                        <asp:Label runat="server" ID="lblTitulo2" CssClass="CtrlFrm" Text="Fecha de Captura"></asp:Label>
                                    </td>
                                    <td style="width:8px">
                                        &nbsp;
                                    </td>
                                    <td align="left">
                                        <asp:Label runat="server" ID="lblTitulo3" CssClass="CtrlFrm" Text=" Tipo de Denuncia"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <asp:TextBox runat="server" ID="txtNoFolio" CssClass="CtrlFrmTXT" Width="250px" style=""></asp:TextBox>
                                    </td>
                                    <td style="width:40px">
                                        &nbsp;
                                    </td>
                                    <td>
                                        <asp:Label runat="server" ID="lblDe" Text="Del" CssClass="CtrlFrm"></asp:Label>&nbsp;&nbsp;&nbsp;
                                    </td>
                                    <td align="left">
                                        <asp:TextBox runat="server" ID="txtFechaInicio" CssClass="CtrlCalendarImg CtrlFrmTXT" ></asp:TextBox>&nbsp;&nbsp;&nbsp;
                                    </td>
                                    <td>
                                        <asp:Label runat="server" ID="lblAl" Text="al" CssClass="CtrlFrm"></asp:Label>&nbsp;&nbsp;&nbsp;
                                    </td>
                                    <td align="left" class="auto-style3">
                                        <asp:TextBox runat="server" ID="txtFechaFinal" CssClass="CtrlCalendarImg CtrlFrmTXT"></asp:TextBox>
                                    </td>
                                    <td style="width:40px">
                                        &nbsp;
                                    </td>
                                    <td align="left">
                                        <asp:DropDownList runat="server" ID="ddlTipoDenuncia" CssClass="CtrlFrmTXT"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:15px">

                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" colspan="4" class="auto-style1">
                                        <asp:Label runat="server" ID="lblEstado" CssClass="CtrlFrm" Text="Estado"></asp:Label>
                                    </td>
                                    <td class="auto-style2">
                                        &nbsp;
                                    </td>
                                    <td align="left" class="auto-style3" colspan="2">
                                        <asp:Label runat="server" ID="lblSubEstado" CssClass="CtrlFrm" Text="SubEstado"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" colspan="4">

                                      <%--  <div class="container CtrlFrm">--%>
                                            <%--<asp:DropDownList runat="server" ID="ddlEstado" CssClass="CtrlFrmTXT"></asp:DropDownList>--%>
                                           <%-- <asp:DropDownList runat="server" ID="ddlEstado" CssClass="CtrlFrmTXT"></asp:DropDownList>--%>
                                            <select id="ddlEstado" class="my-select" style="width: 150px"></select>
                                      <%--  </div>--%>

                    
                                    </td>
                                    <td style="width:8px">
                                        &nbsp;
                                    </td>
                                    <td align="left" class="auto-style3" colspan="2">
                                        <asp:DropDownList runat="server" ID="ddlSubEstado" CssClass="CtrlFrmTXT"></asp:DropDownList>
                                    </td>
                
                                    <td align="right">
                                       <%-- <asp:ImageButton runat="server" ID="imgBtnBuscar" ImageUrl="~/Imagenes/buscar.png" />--%>
                               
                                    </td>
                                </tr>
                            </table>

              <%--          </td>
                    </tr>

                </table>--%>

        <br />
            </div>
            <br />
            <br />

            <div runat="server" id="dvConsultaInformacion" style="width:97%" align="center">

                 <table id="tab_gvConsDenuncias" style="width:100%;font-size:8pt;text-align:center" class="stripe"></table>
            </div>
    
            <div runat="server" id="dvCambioEstado" title="Cambio de Estado">

                 <table>
                     <tr>
                         <td colspan="2">
                             <asp:Label runat="server" ID="lblSel" Text="Seleccione el nuevo Estado para la Denuncia seleccionada." CssClass="CtrlFrm"></asp:Label>
                         </td>
                     </tr>
                </table>
                <br />
                <table>
                     <tr>
                         <td>
                             <asp:Label runat="server" ID="lblEtiquetaFolio" Text="Folio: " CssClass="CtrlFrmBold"></asp:Label>
                         </td>
                         <td style="width:10px;">
                            &nbsp;
                        </td>
                         <td>
                             <asp:Label runat="server" ID="lblFolio" Text="Folio: " CssClass="CtrlFrm"></asp:Label>
                         </td>
                     </tr>
                    <tr>
                        <td style="height:10px">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label runat="server" ID="lblDivEstado" Text="Estado" CssClass="CtrlFrmBold"></asp:Label>
                        </td>
                        <td style="width:10px;">
                            &nbsp;
                        </td>
                        <td>
                            <%--<asp:DropDownList runat="server" ID="ddlDvEstado" ></asp:DropDownList>--%>
                            <select id="ddlDvEstado" class="my-select" style="width: 150px"></select>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:10px">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label runat="server" ID="Label1" Text="SubEstado" CssClass="CtrlFrmBold"></asp:Label>
                        </td>
                        <td style="width:10px;">
                            &nbsp;
                        </td>
                        <td>
                            <asp:DropDownList runat="server" ID="ddlDvSubEstado" CssClass="CtrlFrmTXT"></asp:DropDownList>
                        </td>
                    </tr>
                </table>
            </div>


            <div runat="server" id="dvEnvioCorreo" title="Mensaje para el denunciante">

                <table>
                    <tr>
                        <td>
                            <asp:Label ID="Label4" runat="server" CssClass="CtrlFrmBold" Text="Para:"></asp:Label>&nbsp;&nbsp;&nbsp;
                        </td>
                        <td>
                            <asp:TextBox ID="txtPara" CssClass="CtrlFrmTXT" runat="server" Width="300px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:5px;">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td>
                             <asp:Label ID="Label5" runat="server" CssClass="CtrlFrmBold" Text="CCO:"></asp:Label>&nbsp;&nbsp;&nbsp;
                        </td>
                        <td>
                            <asp:TextBox ID="txtCCO" CssClass="CtrlFrmTXT" runat="server" Width="300px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:10px;">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <textarea id="txtEmail"></textarea>
                        </td>
                    </tr>
                </table>


            </div>

            <div runat="server" id="dvOficioProcedencia" title="Oficio de procedencia">
                <br />
                <asp:Label ID="Label2" runat="server" CssClass="CtrlFrmBold" Text="Selecione un documento PDF"></asp:Label>
                <br />
                <br />
                <table>
                    <tr>
                        <td>
                            <label class="ctrFileUpload" id="btnOficio">Seleccionar</label>
                        </td>
                        <td style="width:10px">&nbsp;</td>
                        <td>
                            <asp:Label CssClass="CtrlFrm" ID="lblOficioProc" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                </table>
                 <asp:FileUpload ID="FileUploadOficioProc" runat="server" accept=".pdf" Width="200px" />
            </div>

            <div runat="server" id="dvSeccListaDocDenuncias" title="Documentos Denuncia" align="center">
                <br />
                <br />
                <div runat="server" id="dvListaDocDenuncias">

                </div>
            </div>
    
            <asp:HiddenField runat="server" ID="HDLlaveDocumento" Value="0" />
            <asp:HiddenField runat="server" ID="HDLlaveTipoDocumento" Value="0" />
  
    </div>
</asp:Content>
