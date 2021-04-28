<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Seguimiento_Denuncia.aspx.cs" Inherits="Sistema.Modulos.Denuncias_IV.Seguimiento_Denuncia" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    
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
    <link href="../../CSS/richtext.min.css" rel="stylesheet" />
    <script src="../../JS/jquery-1.11.2.min.js"></script>
    <script src="../../JS/jquery-ui-1.10.3.custom.js"></script>
    <script src="../../JS/jquery.dataTables.js"></script>
    <script src="../../JS/chosen.jquery.js"></script>
    <script src="../../JS/ImageSelect.jquery.js"></script>
    <script src="../../JS/jquery.richtext.js"></script>
<%--    <script src="../../JS/jquery.richtext.min.js"></script>--%>
    <script src="../../JS/JSSeguimDenuncia.js"></script>
    
    <br />
    <br />
    <br />
    <br />

    <div runat="server" id="dvImagen" align="center">

        <asp:Image runat="server" ID="imgPrincipal" ImageUrl="~/Imagenes/fiscalización.png" />

    </div>

    <br />

    <br />
    <input type="text" id="RichText" />
    <br />

    <div align="center" runat="server" title="Búsqueda de Denuncias" id="dvFiltroBusqueda" class="div_redondeado">

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
                                <asp:ImageButton runat="server" ID="imgBtnBuscar" ImageUrl="~/Imagenes/buscar.png" />
                            </td>
                        </tr>
                    </table>

      <%--          </td>
            </tr>

        </table>--%>

        
    </div>
    <br />
    <br />

    <div runat="server" id="dvConsultaInformacion" style="width:97%">

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

        <div runat="server" id="dvCuerpo">
            
        </div>

    </div>

</asp:Content>
