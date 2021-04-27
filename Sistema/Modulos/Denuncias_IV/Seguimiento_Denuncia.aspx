<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Seguimiento_Denuncia.aspx.cs" Inherits="Sistema.Modulos.Denuncias_IV.Seguimiento_Denuncia" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    
<%--    <link href="../../CSS/jquery-ui.css" rel="stylesheet" />
    <link href="../../Content/jquery.dataTables.css" rel="stylesheet" />
    <script src="../../JS/jquery-1.11.2.min.js"></script>
    <script src="../../JS/jquery-ui-1.10.3.custom.js"></script>
    <script src="../../JS/jquery.dataTables.js"></script>--%>
 
    <script src="../../JS/jquery-1.11.2.min.js"></script>
    <script src="../../JS/jquery-ui-1.10.3.custom.js"></script>
    <script src="../../JS/jquery.dataTables.js"></script>
    <script src="../../JS/JSSeguimDenuncia.js"></script>
    <br />
    <br />
    <br />
    <br />

    <div runat="server" id="dvImagen" align="center">

        <asp:Image runat="server" ID="imgPrincipal" ImageUrl="~/Imagenes/fiscalización.png" />

    </div>

    <br />

    <div align="center" runat="server" title="Búsqueda de Denuncias" id="dvFiltroBusqueda" class="div_redondeado">
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
                <td style="width:8px">
                    &nbsp;
                </td>
                <td>
                    <asp:Label runat="server" ID="lblDe" Text="Del" CssClass="CtrlFrm"></asp:Label>
                </td>
                <td align="left">
                    <asp:TextBox runat="server" ID="txtFechaInicio" CssClass="CtrlFrmTXT" ></asp:TextBox>
                </td>
                <td>
                    <asp:Label runat="server" ID="lblAl" Text="al" CssClass="CtrlFrm"></asp:Label>
                </td>
                <td align="left" class="auto-style3">
                    <asp:TextBox runat="server" ID="txtFechaFinal" CssClass="CtrlFrmTXT"></asp:TextBox>
                </td>
                <td style="width:8px">
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
                    <asp:DropDownList runat="server" ID="ddlEstado" CssClass="CtrlFrmTXT"></asp:DropDownList>
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
             <tr>
                 <td>
                     <asp:Label runat="server" ID="lblEtiquetaFolio" Text="Folio: " CssClass="CtrlFrm"></asp:Label>
                 </td>
                 <td>
                     <asp:Label runat="server" ID="lblFolio" Text="Folio: " CssClass="CtrlFrm"></asp:Label>
                 </td>
             </tr>
         </table>
        <table>
            <tr>
                <td>
                    <asp:Label runat="server" ID="lblDivEstado" Text="Estado" CssClass="CtrlFrm"></asp:Label>
                </td>
                <td style="width:10px;">
                    &nbsp;
                </td>
                <td>
                    <asp:DropDownList runat="server" ID="ddlDvEstado" ></asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" ID="Label1" Text="SubEstado" CssClass="CtrlFrm"></asp:Label>
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

</asp:Content>
