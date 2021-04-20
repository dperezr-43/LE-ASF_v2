<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Internas.aspx.cs" Inherits="Sistema.Modulos.Denuncias_IV.Internas" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <link type="text/css" rel="stylesheet" href="CSS/jquery-ui.css?n=1" />
    <link type="text/css" href="css/bootstrap.css" rel="stylesheet" />
    <link type="text/css" rel="stylesheet" href="CSS/jquery.bootgrid.css?n=1" />
    <link type="text/css" rel="stylesheet" href="CSS/Style.css?n=1" />
    <script type="text/javascript" src="js/modernizr-2.8.1.js"></script>
    <script type="text/javascript" src="JS/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="JS/bootstrap.js"></script>
    <script type="text/javascript" src="JS/jquery.bootgrid.js"></script>
    <%--<script type="text/javascript" src="JS/jquery.bootgrid.fa.js"></script>--%>
    <script type="text/javascript" src="JS/jquery-ui.js"></script>
    <%--<script src='https://www.google.com/recaptcha/api.js'></script>--%>
    <script type="text/javascript" src="JS/JSUtils.js?n=1"></script>
    <script type="text/javascript" src="JS/JSInternas_6.js?n=1"></script>
    <script type="text/javascript" src="JS/JSFunciones_1.js?n=1"></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
    <title></title>
    <style>
        .ui-tooltip {
            width: auto;
        }

        .auto-style1 {
            height: 34px;
        }

        .auto-style2 {
            height: 70px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor">
            <div id="logo">
                <img src="Imagenes/logo.png" alt="" style="border: 0" />
                <table id="table_user" border="0">
                    <tr>
                        <td style="text-align: right;">
                            <label id="lTitulo" class="lTitulo">DENUNCIA EN EL MARCO DE LA POLÍTICA DE INTEGRIDAD DE LA ASF </label>
                            &nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;">
                            <asp:LinkButton ID="lSeguimiento" Text="¿Quiere darle seguimiento a su denuncia ? De clic aquí." runat="server" OnClientClick="javascript: seguimiento(); return false;"></asp:LinkButton>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="width: 100%; text-align: center">
                <img src="Imagenes/denuncia.png" style="width: 90%; height: 100%" />
            </div>
            <br />
            <asp:Label ID="lblError" Visible="false" ForeColor="red" runat="server"></asp:Label>
            <table id="tTexto" style="width: 100%;">
                <tr>
                    <td class="header2">
                        <asp:Label ID="Label10" runat="server" CssClass="ControlForm" Text="AVISO"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="ControlForm" style="text-align: justify">
                            Mecanismo para <strong>denunciar actos contrarios a la Política de Integridad de la Auditoría Superior de la Federación</strong>, realizados por personas servidoras públicas adscritas a la misma, así como por aquellas contratadas para realizar un trabajo en su nombre.
                        </p>
                        <p class="ControlForm" style="text-align: justify">
                            &nbsp;
                        </p>
                        <p class="ControlForm" style="text-align: justify">
                            &nbsp;Si su denuncia no se ubica en dichos supuestos, deberá elegir otra vertiente del menú principal donde canalizar su denuncia.
                        </p>
                    </td>
                </tr>
            </table>
            <br />
            <table style="width: 100%;">
                <tr>
                    <td class="header2" style="width: 100%;">
                        <asp:Label ID="Label4" runat="server" CssClass="ControlForm" Text="DENUNCIANTE"></asp:Label>
                    </td>
                </tr>
            </table>
            <asp:Panel ID="pnDtsGrales" runat="server">
                <table id="tDtsGrales" style="padding: 0px; margin: 0px; width: 100%; border-collapse: collapse; border-spacing: 0px;">
                    <tr>
                        <td style="width: 30%">
                            <label class="ControlForm">¿Desea que su denuncia sea anónima?</label>
                        </td>
                        <td>
                            <table style="padding: 0px; margin: 0px; width: 100%; border-collapse: collapse; border-spacing: 0px;">
                                <tr>
                                    <td style="width: 50%">
                                        <asp:RadioButton ID="rdInfoResSi" runat="server" CssClass="ControlForm" GroupName="InfoRes" Text="Si" />&nbsp;<asp:RadioButton ID="rdInfoResNo" runat="server" CssClass="ControlForm" GroupName="InfoRes" Text="No" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr id="trcorreo">
                        <td style="width: 30%">
                            <label class="ControlForm">Proporcione un correo</label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtCorreo" runat="server" CssClass="ControlForm" Width="56%"></asp:TextBox>&nbsp;
                        <asp:LinkButton ID="lnkValidaCorreo" Text="Validar Correo" OnClientClick="javascript: validaCorreo(event); return false;" runat="server" ForeColor="White"></asp:LinkButton>
                        </td>
                    </tr>
                    <tr id="trQuienDenun">
                        <td style="width: 30%; vertical-align: top">
                            <label class="ControlForm">¿Quién formula la denuncia?</label>
                        </td>
                        <td>
                            <table style="padding: 0px; margin: 0px; width: 100%; border-collapse: collapse; border-spacing: 0px;" id="tQDen">
                                <tr>
                                    <td>
                                        <div style="width: 100%">
                                            <asp:RadioButton ID="rdQuienFP" runat="server" CssClass="ControlForm" GroupName="QDen" Text="Servidor Público" />
                                            <div id="tOpcFP" style="width: 100%">
                                                <div style="width: 100%">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPF" style="width: 100%"><asp:RadioButton ID="rdFPF" runat="server" CssClass="ControlForm" GroupName="OpcFP" Text="Servidor Público Federal." />&nbsp;<span id="sFPE0" style="width: 100%"><asp:RadioButton ID="rdFPE" runat="server" CssClass="ControlForm" GroupName="OpcFP" Text="Servidor Público Estatal." />&nbsp;<span id="sFPM0" style="width: 100%" title="Seleccione el Municipio y la Delegación a la que pertence."><asp:RadioButton ID="rdFPMD" runat="server" CssClass="ControlForm" GroupName="OpcFP" Text="Servidor Público Municipal/local." /></span>
                                                    </span>
                                                    </span>
                                                    <div id="tFPF" style="width: 100%">
                                                        <table style="width: 100%">
                                                            <tr>
                                                                <td style="width: 40%">
                                                                    <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nombre(s), Apellido Paterno, Apellido &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Materno.</label>
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="txtNombFuncFPF" runat="server" Width="80%"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 40%">
                                                                    <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dependencia o entidad.</label>
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="txtDepFuncFPF" runat="server" Width="80%"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 40%">
                                                                    <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OCA.</label>
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="txtOCAFuncFPF" runat="server" Width="80%"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 40%">
                                                                    <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Correo electrónico.</label>
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="txtMailFuncFPF" runat="server" Width="80%"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 40%">
                                                                    <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Confirmar correo electrónico.</label>
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="txtMailConfirmFuncFPF" runat="server" Width="80%"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 40%">
                                                                    <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En caso de no señalar correo electrónico, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;señalar domicilio para recibir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notificaciones.</label>
                                                                </td>
                                                                <td>
                                                                    <asp:TextBox ID="txtDomicilioFuncFPF" runat="server" Width="80%"></asp:TextBox>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <%-- <div style="width: 100%">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPFopc1" style="width: 100%" title="Seleccione la Dependencia o Entidad a la que pertenece."><asp:RadioButton ID="rdCatDepEAPF" runat="server" CssClass="ControlForm" GroupName="opcFPF" Text="Dependencia o Entidad de la Administración Pública Federal. " /></span>
                                                        <div id="tBuscCatDepEAPF" style="width: 100%">
                                                            <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Buscar</label>&nbsp;
                                                                <asp:TextBox ID="txtBuscCatDepEAPF" CssClass="ControlForm" runat="server" Width="60%"></asp:TextBox>&nbsp;
                                                                <asp:LinkButton ID="lBuscCatDepEAPF" runat="server" Text="Buscar" ForeColor="White" OnClientClick="javascript: buscaEnt(1); return false;"></asp:LinkButton>
                                                            </div>
                                                            <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:DropDownList ID="ddlCatDepEAPF" CssClass="ControlForm" runat="server" Width="70%"></asp:DropDownList>
                                                            </div>
                                                        </div>
                                                    </div>--%>                                                   <%-- <div style="width: 100%">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPFopc2" style="width: 100%" title="Seleccione el Organismo al que pertenece."><asp:RadioButton ID="rdCatOrgsCA" runat="server" CssClass="ControlForm" GroupName="opcFPF" Text="Organismos Constitucionalmente Autónomos." /></span>
                                                        <div id="tBuscCatOrgsCA" style="width: 100%">
                                                            <%--<div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Buscar</label>&nbsp;
                                                                <asp:TextBox ID="txtBuscCatOrgsCA" CssClass="ControlForm" runat="server" Width="70%"></asp:TextBox>&nbsp;<asp:LinkButton ID="lBuscCatOrgsCA" runat="server" Text="Buscar" ForeColor="White" OnClientClick="javascript: void(0); return false;"></asp:LinkButton>
                                                            </div>
                                                            <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <label class="ControlForm">Organismo</label>&nbsp;<asp:TextBox ID="txtCatOrgsCA" CssClass="ControlForm" runat="server" Width="70%"></asp:TextBox>
                                                                <%--<asp:DropDownList ID="ddlCatOrgsCA" CssClass="ControlForm" runat="server" Width="70%"></asp:DropDownList>
                                                            </div>
                                                        </div>
                                                    </div>--%>
                                                    </div>
                                                </div>
                                                <%-- <div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPE" style="width: 100%"><asp:RadioButton ID="rdFPE" runat="server" CssClass="ControlForm" GroupName="OpcFP" Text="Servidor Público Estatal." /></span>
                                                <div id="tFPE" style="width: 100%">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 25%">&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Nombre del funcionario.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtNombFPE" runat="server" Width="70%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div style="width: 100%">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPEopc1" style="width: 100%" title="Seleccione la Dependencia o Entidad Estatal a la que pertenece."><asp:RadioButton ID="rdDepEntsEsts" runat="server" CssClass="ControlForm" GroupName="opcFPE" Text="Dependencias y Entidades Estatales." /></span>
                                                        <div id="tBuscDepEntsEsts" style="width: 100%">
                                                            <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <label class="ControlForm">Dependencia</label>&nbsp;<asp:TextBox ID="txtBuscDepEntsEsts" CssClass="ControlForm" runat="server" Width="70%"></asp:TextBox>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="width: 100%">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPEopc2" style="width: 100%" title="Seleccione el Organismo Constitucionalmente Autónomo Estatal al que pertenece."><asp:RadioButton ID="rdOrgsConsAutEst" runat="server" CssClass="ControlForm" GroupName="opcFPE" Text="Organismos Constitucionalmente Autónomos Estatales." /></span>
                                                        <div id="tBuscOrgsConsAutEst" style="width: 100%">
                                                            <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <label class="ControlForm">Organismo</label>&nbsp;<asp:TextBox ID="txtBuscOrgsConsAutEst" CssClass="ControlForm" runat="server" Width="70%"></asp:TextBox>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span id="sFPM" style="width: 100%" title="Seleccione el Municipio y la Delegación a la que pertence."><asp:RadioButton ID="rdFPMD" runat="server" CssClass="ControlForm" GroupName="OpcFP" Text="Servidor Público Municipal/local." /></span>
                                                <div id="tBuscFPMD" style="width: 100%">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 25%">&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Nombre del funcionario.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtNombFPMD" runat="server" Width="70%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div style="width: 100%">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <label class="ControlForm">Dependencia</label>&nbsp;<asp:TextBox ID="txtBuscFPMD" CssClass="ControlForm" runat="server" Width="70%"></asp:TextBox>
                                                    </div>
                                                </div>
                                            </div>--%>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width: 100%">
                                            <asp:RadioButton ID="rdQuienCiud" runat="server" CssClass="ControlForm" GroupName="QDen" Text="Ciudadano." />
                                            <div id="tOpcCiud" style="width: 100%">
                                                <%--<table style="width: 100%">
                                                <tr>
                                                    <td style="width: 35%">&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Nombre.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtNombreCiud" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <%--<tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm" title="En caso de que el correo electrónico no exista, se dará de baja en automático la denuncia">Dirección Electrónica.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtCorreoCiud" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Dirección física o apartado postal.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtDirCiud" runat="server" Width="70%" TextMode="MultiLine" Height="50px"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>--%>
                                                <table style="width: 100%">
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nombre(s), Apellido Paterno, Apellido &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Materno.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtNombreCiudadano" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Correo electrónico.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMailCiudadano" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Confirmar correo electrónico.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMailConfirmCiudadano" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En caso de no señalar correo electrónico, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;señalar domicilio para recibir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notificaciones.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtDomicilioCiudadano" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width: 100%">
                                            <asp:RadioButton ID="rdQuienOSC" runat="server" CssClass="ControlForm" GroupName="QDen" Text="Organización de la Sociedad Civil." />
                                            <div id="tOpcOSC" style="width: 100%">
                                                <%-- <table style="width: 100%">
                                                <tr>
                                                    <td style="width: 35%">&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Nombre.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtNombreOSC" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <%--<tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm" title="En caso de que el correo electrónico no exista, se dará de baja en automático la denuncia">Dirección Electrónica.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtMailOSC" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>--%>                                               <%-- <tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Dirección física o apartado postal.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtDirOSC" runat="server" Width="70%" TextMode="MultiLine" Height="50px"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">RFC/CLUNI.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtRFCOSC" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>--%>
                                                <table style="width: 100%">
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Razón Social.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtNombreOSC" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Correo electrónico.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMailOSC" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Confirmar correo electrónico.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMailConfirmOSC" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En caso de no señalar correo electrónico, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;señalar domicilio para recibir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notificaciones.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtDomicilioOSC" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                                <%--<tr>
                                <td>
                                    <div style="width: 100%">
                                        <asp:RadioButton ID="rdQuienSPASF" runat="server" CssClass="ControlForm" GroupName="QDen" Text="Servidor Público de la ASF." />
                                        <div id="tOpcSPASF" style="width: 100%">
                                            <div style="width: 100%">
                                                &nbsp;&nbsp;&nbsp;&nbsp;<asp:RadioButton ID="rdOpcSPASFEstruc" runat="server" CssClass="ControlForm" GroupName="SPASF" Text="Estructura." />
                                                <div style="width: 100%" id="tOpcSPASFIntEstruc">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 30%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Centro de Costos.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtCCEstruct" runat="server" Width="70%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">No. Empleado.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtNoEmpEstruct" runat="server" Width="70%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                            <div style="width: 100%">
                                                &nbsp;&nbsp;&nbsp;&nbsp;<asp:RadioButton ID="rdOpcSPASFHon" runat="server" CssClass="ControlForm" GroupName="SPASF" Text="Honorarios." />
                                                <div style="width: 100%" id="tOpcSPASFIntHon">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 30%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Centro de Costos.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtCCHon" runat="server" Width="70%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">No. Empleado.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtNoEmpHon" runat="server" Width="70%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>--%>
                                <tr>
                                    <td>
                                        <div style="width: 100%">
                                            <asp:RadioButton ID="rdQuienProv" runat="server" CssClass="ControlForm" GroupName="QDen" Text="Proveedor." />
                                            <div id="tOpcProv" style="width: 100%">
                                                <%--<table style="width: 100%">
                                                <tr>
                                                    <td style="width: 35%">&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Nombre.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtNombreProv" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <%-- <tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm" title="En caso de que el correo electrónico no exista, se dará de baja en automático la denuncia">Dirección Electrónica.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtMailProv" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>--%>                                                <%--<tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Dirección física o apartado postal.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtDirProv" runat="server" Width="70%" TextMode="MultiLine" Height="50px"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">RFC.</label>
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtRFCProv" runat="server" Width="70%"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>--%>

                                                <table style="width: 100%">
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Razón Social.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtNombreProveedor" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Correo electrónico.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMailProveedor" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Confirmar correo electrónico.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMailConfirmProveedor" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 40%">
                                                            <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En caso de no señalar correo electrónico, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;señalar domicilio para recibir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notificaciones.</label>
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtDomicilioProveedor" runat="server" Width="80%"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width: 100%">
                                            <asp:RadioButton ID="rdQuienOtro" runat="server" CssClass="ControlForm" GroupName="QDen" Text="Otro." />
                                            <div id="tDenOtro" style="width: 100%">
                                                <div style="width: 100%">
                                                    <table style="width: 100%">
                                                        <tr>
                                                            <td style="width: 40%">
                                                                <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Carácter con el que denuncia.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtCaracterOtro" runat="server" Width="80%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 40%">
                                                                <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nombre(s), Apellido Paterno, Apellido &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Materno.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtNombreOtro" runat="server" Width="80%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 40%">
                                                                <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Correo electrónico.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtMailOtro" runat="server" Width="80%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 40%">
                                                                <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Confirmar correo electrónico.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtConfirmOtro" runat="server" Width="80%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 40%">
                                                                <label class="ControlForm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En caso de no señalar correo electrónico, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;señalar domicilio para recibir &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notificaciones.</label>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtDomicilioOtro" runat="server" Width="80%"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center">
                            <asp:LinkButton ID="lAvanSigSecc" Text="Avanzar a la siguiente sección" OnClientClick="javascript: validaPrimSecc(); return false;" runat="server" ForeColor="White"></asp:LinkButton>&nbsp;
                        </td>
                    </tr>
                </table>
            </asp:Panel>
            <br />
            <div id="dSS">
                <table id="tAquienDen" style="width: 100%;">
                    <tr>
                        <td class="header2">
                            <asp:Label ID="lblAquien1" runat="server" CssClass="ControlForm" Text="Sujeto(s) de la denuncia."></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 100%">
                            <table style="width: 100%">
                                <tr>
                                    <td style="width: 50%; background-color: RGB(188, 188, 188);">
                                        <asp:Label ID="lblAquien" runat="server" CssClass="ControlForm" Text=" A quien(es) denuncia por:" Font-Bold="True"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:RadioButton ID="rdFASFSi" Text="Persona(s) servidora(s) pública(s) de la ASF." runat="server" CssClass="ControlForm" GroupName="DenFuncASF" />
                                                </td>
                                                <td>
                                                    <asp:RadioButton ID="rdFASFNo" Text="Persona(s) contratada(s) para realizar un trabajo en nombre de la ASF." runat="server" CssClass="ControlForm" GroupName="DenFuncASF" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <%-- <tr>
                                    <td style="width: 50%; background-color: RGB(188, 188, 188);">
                                        <asp:Label ID="Label2" runat="server" CssClass="ControlForm" Text="¿Conoce los datos del servidor(a) público de la ASF que desea denunciar?" Font-Bold="True"></asp:Label>
                                    </td>
                                </tr>--%>
                                <tr>
                                    <td>
                                        <table style="width: 100%">
                                            <tr>
                                                <td style="width: 100%">
                                                    <div style="width: 100%">
                                                        <%-- <asp:RadioButton ID="rdDtsSASFSi" Text="Si" runat="server" CssClass="ControlForm" GroupName="DtsSPASF" />&nbsp;<asp:RadioButton ID="rdDtsSASFNo" Text="No" runat="server" CssClass="ControlForm" GroupName="DtsSPASF" />--%>
                                                        <div style="width: 100%" id="tOpDtsSASF">
                                                            <table style="width: 100%">
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <asp:Label ID="Label3" runat="server" CssClass="ControlForm" Text="Ingrese los datos de la(s) persona(s) servidora(s) pública(s) de la ASF y/o persona(s) contratada(s) para realizar un trabajo en su nombre." Font-Bold="True"></asp:Label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="width: 25%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Nombre completo.</label>
                                                                    </td>
                                                                    <td>
                                                                        <asp:TextBox ID="txtNombSPDenASF" runat="server" Width="70%"></asp:TextBox>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Puesto o Cargo.</label>
                                                                    </td>
                                                                    <td>
                                                                        <asp:TextBox ID="txtCargoSPDenASF" runat="server" Width="70%"></asp:TextBox>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Área de adscripción o de prestación &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;de servicio.</label></td>
                                                                    <td>
                                                                        <asp:TextBox ID="txtAreaSPD" runat="server" Width="70%"></asp:TextBox></td>
                                                                </tr>
                                                            </table>
                                                        </div>

                                                        <%--<div style="width: 100%" id="tOpcNoDtsSASF">
                                                                <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;<asp:RadioButton ID="rdNoTengoDts" Text="No tengo sus datos pero puedo identificarlo con un directorio de la ASF." runat="server" CssClass="ControlForm" GroupName="noTengoDts" />
                                                                <div style="width: 100%" id="tNoTDtsPuedoIdent">
                                                                    <br />
                                                                    <div style="width: 100%">
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:LinkButton ID="lAbreDirectorio" runat="server" OnClientClick="javascript: abreDirectorio(); return false;" Text="Abrir Directorio"></asp:LinkButton>
                                                                    </div>
                                                                    <br />
                                                                    <div style="width: 100%; background-color: whitesmoke;" class="sfSel">
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm" style="font-weight: bold">Servidor Público seleccionado:</label>
                                                                    </div>
                                                                    <div style="width: 100%; background-color: whitesmoke;" class="sfSel">
                                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm" style="font-weight: bold" id="lDenunciado"></label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br />--%>                                                           <%-- <div style="width: 100%">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <label class="ControlForm">No tiene sus datos, no puede identificarlo, ¿quiere documentar los hechos?</label>
                                                                <%--<asp:RadioButton ID="rdNoTengoDtsNoIdent" Text="No tiene sus datos, no puede identificarlo, ¿quiere documentar los hechos?" runat="server" CssClass="ControlForm" GroupName="noTengoDts" />--%>                                                                 <%--<div style="width: 100%" id="tNoTDtsNoIdent">
                                                                    <table>
                                                                        <tr>
                                                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:RadioButton ID="rdNTDNISi" Text="Si" runat="server" CssClass="ControlForm" GroupName="NTDNI" />
                                                                            </td>
                                                                            <td>
                                                                                <asp:RadioButton ID="rdNTDNINo" Text="No" runat="server" CssClass="ControlForm" GroupName="NTDNI" />
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                                     </div>--%>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 50%; background-color: RGB(188, 188, 188);">
                                        <asp:Label ID="Label7" runat="server" CssClass="ControlForm" Text="Indique la fecha en la que sucedieron los hechos:" Font-Bold="True"></asp:Label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <%-- <table style="width: 100%">
                                            <tr>
                                                <td style="width: 10%">
                                                    <asp:Label ID="Label5" runat="server" CssClass="ControlForm" Text="Rango aproximado"></asp:Label>
                                                </td>
                                                <td>
                                                    <asp:Label ID="Label8" runat="server" CssClass="ControlForm" Text="Del"></asp:Label>&nbsp;<asp:TextBox ID="txtFechaIrreg" runat="server" CssClass="ControlForm"></asp:TextBox>&nbsp;<asp:Label ID="Label9" runat="server" CssClass="ControlForm" Text="Al"></asp:Label>&nbsp;<asp:TextBox ID="txtFechaFin" runat="server" CssClass="ControlForm"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>--%>
                                        <table style="width: 100%">
                                            <tr>

                                                <td>
                                                    <asp:Label ID="Label8" runat="server" CssClass="ControlForm" Text="Día/Mes/Año"></asp:Label>&nbsp;<asp:TextBox ID="txtFechaIrreg" runat="server" CssClass="ControlForm"></asp:TextBox>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <asp:RadioButton ID="rdNoseFecha" Text="No sé" runat="server" CssClass="ControlForm" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br />
                <table id="tConsisteDen" style="width: 100%;">
                    <tr>
                        <td class="header2">
                            <asp:Label ID="Label12" runat="server" CssClass="ControlForm" Text="¿En qué consiste su denuncia?"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: RGB(188, 188, 188);">
                            <asp:Label ID="Label13" runat="server" CssClass="ControlForm" Text="Seleccione por lo menos una conducta contraria a la Política de Integridad que se apegue más a los hechos acontecidos." Font-Bold="True"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="dPuntos">
                                <h3>Actuación irresponsable o deshonesta.</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1A" Text="a. Acepta regalos y/o dádivas a cambio de favores o información institucional." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1B" Text="b. Intervino en el proceso de contratación de una entidad que brinda servicios a la ASF, respecto de la cual tiene intereses." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1C" Text="c. Hace un uso irresponsable de los bienes y/o servicios de la ASF." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="auto-style1">
                                                <asp:CheckBox ID="chkPts1D" Text="d. Promociona un negocio personal con las personas de la entidad auditada." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1E" Text="e. Solicita a una entidad auditada o ente proveedor que contrate a un familiar." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1F" Text="f. Utiliza su posición laboral como ventaja para realizar trámites ante una institución gubernamental." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1G" Text="g. Discrimina por cualquier medio a una persona." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1H" Text="h. Acosa sexualmente a un(a) compañero(a) de trabajo." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1I" Text="i. Hostiga sexualmente a un(a) subordinado(a)." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1J2" Text="j. Acosa laboralmente a un compañero(a) de trabajo o subordinado(a)." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts1J" Text="k. Acepta u otorga beneficios para ella y/o persona(s) con la(s) que mantiene afinidad en línea recta, sin limitación alguna, así como por consanguinidad, y en su caso, empleadores, socios, acreedores, por parte de una persona a la que atiende o con la que se relacione con motivo de sus actividades." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Actuación parcial o subjetiva.</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2A" Text="a. Actúa obedeciendo intereses políticos." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2B" Text="b. Participa en la auditoría de un ente donde trabajó o prestó servicios dentro del año inmediato anterior." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2C" Text="c. Su actuación como persona servidora pública influyó en la elección de un candidato para una posición específica clave en la entidad auditada." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2D" Text="d. Participa en el proceso de contratación con una entidad auditada." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2E" Text="e. Acepta viajes de vacaciones financiados por una entidad auditada." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2F" Text="f. Intervino en la atención, tramitación o resolución de asuntos motivado por intereses familiares, afectivos, de amistad o de negocio." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts2G" Text="g. Intervino en la contratación de servicios externos con actividades de fiscalización cuando existía parentesco, ya sea por consanguinidad o afinidad, con cualquier servidor público de la ASF, o cuando existía relación afectiva o de amistad cercana." runat="server" />
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                                <h3>Actuación ineficiente o poco profesional</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts3A" Text="a. Desconoce el marco normativo que rige a la ASF." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts3B" Text="b. Desconoce el marco legal y técnico para realizar una auditoría." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts3C" Text="c. No ha cumplido con la capacitación necesaria para el ejercicio de sus funciones." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Actuación ilegal</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts4A" Text="a. Realiza trabajos de fiscalización que transgreden el mandato legal de la ASF." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts4B" Text="b. Emite observaciones de auditoría sin motivación, fundamentación y sustento legal suficiente." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts4C" Text="c. Amenaza al personal de la entidad auditada con emitir una observación con consecuencias legales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts4D" Text="d. Su comportamiento en redes sociales afecta la imagen institucional." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts4E" Text="e. Su comportamiento público es inadecuado afectando la imagen institucional." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts4F" Text="f. Divulga resultados de auditoría no publicados." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Actuación desleal</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts5A" Text="a. Divulga resultados preliminares relacionados con una auditoría." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts5B" Text="b. Trata inadecuadamente información clasificada como reservada." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts5C" Text="c. Trata inadecuadamente información clasificada como confidencial." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts5D" Text="d. Sustrae información institucional con fines personales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPts5E" Text="e. Modifica, altera y/o manipula indebidamente información institucional." runat="server" />
                                            </td>
                                        </tr>

                                        <%--                                        <tr>
                                            <td style="background-color: RGB(188, 188, 188);">
                                                <asp:Label ID="Label11" runat="server" CssClass="ControlForm" Text="Describa sucintamente los hechos relacionados con la(s) conducta(s) contraria(s) a la Política de Integridad de la ASF, indicando circunstancias de tiempo , modo y lugar." Font-Bold="True"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="auto-style2">
                                                <asp:TextBox TextMode="MultiLine" Width="100%" ID="txtDescDen" Height="60px" runat="server" CssClass="ControlForm"></asp:TextBox>
                                            </td>
                                        </tr>--%>
                                    </table>
                                </div>
                                <%--  <h3>Objetividad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsObjA" Text="a. El servidor público de la ASF subordina su juicio a criterios ajenos a su labor." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsObjB" Text="b. El servidor público de la ASF toma decisiones sin evidencia pertinente, relevante y suficiente." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsObjC" Text="c. El servidor público de la ASF emite opiniones sin evidencia pertinente, relevante y suficiente." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Imparcialidad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsImpA" Text="a. El servidor público de la ASF no da el mismo trato a los sujetos que se encuentran en las mismas circunstancias." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsImpB" Text="b. El servidor público de la ASF permite la injerencia de prejuicios o preferencias personales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsImpC" Text="c. El servidor público de la ASF permite que ante terceros exista la impresión o percepción de que ha transgredido este principio." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Confidencialidad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsConf" Text="El servidor público de la ASF no ha preservado la estricta reserva de la información obtenida en el desempeño de las funciones de fiscalización." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Competencia Técnica y Profesional</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCTPA" Text="a. El servidor público de la ASF no cuenta con los conocimientos, aptitudes y habilidades necesarias para llevar a cabo sus responsabilidades individuales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCTPB" Text="b. El servidor público de la ASF incurrió en actitudes prepotentes u hostiles hacia los entes auditados." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Institucionalidad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsInstA" Text="a. El servidor público de la ASF no conoce y/o no se apega al marco jurídico que rige a la Institución, a las políticas, lineamientos y directrices internas emitidas por la ASF." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsInstB" Text="b. El servidor público de la ASF antepone sus intereses personales y particulares en sus labores." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsInstC" Text="c. El servidor público de la ASF no se conduce con apego a la verdad, distorsiona y/u omite información relevante para el conocimiento de los hechos." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsInstD" Text="d. El servidor público de la ASF no informa a su superior jerárquico o a las instancias competentes de la ASF sobre actos contrarios a leyes, directrices internas, incluido el Código de Conducta." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Imparcialidad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsImparA" Text="a. El servidor público de la ASF no ejerce sus funciones de manera objetiva, antepone sus prejuicios y permite la influencia de terceros." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsImparB" Text="b. El servidor público de la ASF no actúa de manera neutral, concede privilegios o tiene preferencias por personas o grupos." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsImparC" Text="c. El servidor público de la ASF impide el ejercicio de los derechos y la igualdad de oportunidades de las personas." runat="server" />
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                                <h3>Economía y eficacia</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsEcoA" Text="a. El servidor público de la ASF no usa en forma racional de los bienes y recursos institucionales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsEcoB" Text="b. El servidor público de la ASF no informa precisa y oportunamente el ejercicio de sus recursos institucionales asignados, y no devuelve el excedente." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsEcoC" Text="c. El servidor público de la ASF utiliza bienes y servicios institucionales para asuntos de carácter privado." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsEcoD" Text="d. El servidor público de la ASF no restituye las cantidades que resultan del abuso o uso irracional de los bienes institucionales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsEcoE" Text="e. El servidor público de la ASF no preserva el patrimonio cultural ni la sustentabilidad del medio ambiente y de los recursos naturales, de acuerdo con las funciones que realiza." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Respeto y tolerancia</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsRespA" Text="a. El servidor público de la ASF no tiene un trato cordial al interior de la institución ni con partes externas, no propicia el entendimiento, la armonía y el diálogo respetuoso." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsRespB" Text="b. El servidor público de la ASF en forma verbal, escritas o de cualquier otro tipo, expresa ofensas o manifestaciones degradantes hacia otra persona." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsRespC" Text="c. El servidor público de la ASF discrimina por motivo de género, edad, condición social o económica, preferencia sexual, estado civil, lengua, discapacidad, preferencia política o religiosa." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsRespD" Text="d. El servidor público de la ASF en sus funciones oficiales realiza proselitismo religioso, político o de cualquier otra índole." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsRespE" Text="e. El servidor público de la ASF acosa (sexual, físico, psicológico o laboralmente) o tiene conductas que atentan contra la confianza de una persona y su dignidad." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsRespF" Text="f. El servidor público no procura un ambiente laboral armonioso, profesional y basado en el respeto mutuo." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Fortaleza e imagen institucional</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsFortA" Text="a. El servidor público de la ASF no preserva la buena imagen de la Institución." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsFortB" Text="b. El servidor público de la ASF no cumple con sus obligaciones de capacitación." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsFortC" Text="c. El servidor público de la ASF no procura una especialización y certificación técnica continua dentro de su área profesional." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Incumplimiento a la protección de la integridad física</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProtA" Text="a. El servidor público de la ASF no conoce ni cumple con todas las disposiciones, incluso las de protección civil, cuyo objeto es proteger la vida y salvaguardar la integridad física de las personas." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProtB" Text="b. El servidor público de la ASF actúa con negligencia y pone en riesgo su propia seguridad o la de terceros." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProtC" Text="c. El servidor público de la ASF, como consecuencia de la situación de inseguridad en ciertas horas, en zonas del territorio nacional, no toma las medidas de seguridad para prevenir cualquier tipo de riesgos." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProtD" Text="d. El servidor público de la ASF no se conduce íntegra, prudente y profesionalmente para evitar contingencias o situaciones de riesgo." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProtE" Text="e. El servidor público de la ASF no verifica la vigencia de los seguros institucionales que los protege en caso de alguna eventualidad se encuentran vigentes." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Probidad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProbA" Text="a. El servidor público de la ASF, en el desempeño de sus funciones, participó en acto deshonesto o fraudulento." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProbB" Text="b. El servidor público de la ASF falsificó o alteró los registros de información, documentos o cuentas." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProbC" Text="c. El servidor público de la ASF usa en forma deliberada información falsa." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProbD" Text="d. El servidor público de la ASF utiliza su cargo para obtener beneficios indebidos." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsProbE" Text="e. El servidor público de la ASF utiliza su cargo para obtener ventajas indebidas" runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Aceptación de muestras de cortesía y hospitalidad</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCHA" Text="a. El servidor público de la ASF recibe obsequios que influyen sobre sus decisiones oficiales." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCHB" Text="b. El servidor público de la ASF recibe obsequios que no están  dentro de los estándares de la cortesía, la hospitalidad o el protocolo." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCHC" Text="c. El servidor público de la ASF recibe obsequios como dinero en efectivo." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCHD" Text="d. El servidor público de la ASF recibe obsequios que no cuenta con la autorización de su superior jerárquico para aceptarlos." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <h3>Conflicto de Interés</h3>
                                <div>
                                    <table style="width: 100%">
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCIA" Text="a. El servidor público de la ASF tiene intereses en o asociación con entidades que probablemente tengan relaciones con la ASF. " runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCIB" Text="b. El servidor Público denunciado tiene intereses en o asociación con entidades que probablemente tengan una relación comercial con la ASF." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCIC" Text="c. El servidor Público denunciado participa en actividades que puedan afectar su objetividad e independencia en la realización de sus funciones." runat="server" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:CheckBox ID="chkPtsCID" Text="d. El servidor Público denunciado cuenta con parientes empleados en la ASF (por ejemplo, cónyuge, padres, hijos o hermanos)." runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </div>--%>
                            </div>
                        </td>
                    </tr>
                    <%-- <tr>
                        <td style="background-color: RGB(188, 188, 188);">
                            <asp:Label ID="Label11" runat="server" CssClass="ControlForm" Text="¿Qué conducta indebida ha tenido el Servidor Público? Detalle los hechos." Font-Bold="True"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:TextBox TextMode="MultiLine" Width="100%" ID="txtDescDen" Height="60px" runat="server" CssClass="ControlForm"></asp:TextBox>
                        </td>
                    </tr>--%>                    <%-- <tr>
                        <td style="width: 50%; background-color: RGB(188, 188, 188);">
                            <asp:Label ID="Label10" runat="server" CssClass="ControlForm" Text="El funcionario a quien desea denunciar ¿tuvo papel en alguna auditoría?" Font-Bold="True"></asp:Label>
                        </td>
                    </tr>--%>                    <%--<tr>
                        <td>
                            <div style="width: 100%">
                                <asp:RadioButton ID="rdSiAud" Text="Si" runat="server" CssClass="ControlForm" GroupName="DtsSPASF" />&nbsp;<asp:RadioButton ID="rdNoAud" Text="No" runat="server" CssClass="ControlForm" GroupName="DtsSPASF" />
                                <div style="width: 100%" id="tOpcAud">
                                    <table style="width: 100%">
                                        <tr>
                                            <td colspan="5">
                                                <asp:Label ID="Label16" runat="server" CssClass="ControlForm" Text="Seleccione la auditoría en la que estuvo involucrado el funcionario." Font-Bold="True"></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 5%">&nbsp;
                                            </td>
                                            <td style="width: 9%">
                                                <asp:Label ID="lbCP" CssClass="ControlForm" Text="Cuenta Pública" runat="server"></asp:Label>
                                            </td>
                                            <td style="width: 9%">
                                                <asp:DropDownList ID="ddlCP" runat="server" CssClass="ControlForm">
                                                    <asp:ListItem Text="-- Seleccione --" Value="0" Selected="True"></asp:ListItem>
                                                    <asp:ListItem Text="2012"></asp:ListItem>
                                                    <asp:ListItem Text="2013"></asp:ListItem>
                                                    <asp:ListItem Text="2014"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                            <td style="width: 9%">
                                                <asp:Label ID="Label17" CssClass="ControlForm" Text="No. Auditoría" runat="server"></asp:Label>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumAudBusc" runat="server" CssClass="ControlForm"></asp:TextBox>&nbsp;<asp:LinkButton ID="lBuscAud" Text="Buscar" OnClientClick="javascript: buscaAud(); return false;" runat="server" ForeColor="White"></asp:LinkButton>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="width: 100%" id="tbAud">
                                        <table style="width: 100%">
                                            <tr>
                                                <td style="width: 5%">&nbsp;
                                                </td>
                                                <td colspan="4">
                                                    <table style="width: 90%; margin-left: auto; margin-right: auto; border-collapse: collapse; border-spacing: 0px;">
                                                        <tr style="text-align: center">
                                                            <td>&nbsp;
                                                            </td>
                                                            <td style="background-color: #1F4E81; color: whitesmoke; font-weight: bold;">
                                                                <asp:Label ID="Label18" CssClass="ControlForm" Text="No. Auditoría" runat="server"></asp:Label>
                                                            </td>
                                                            <td style="background-color: #1F4E81; color: whitesmoke; font-weight: bold;">
                                                                <asp:Label ID="Label19" CssClass="ControlForm" Text="Título" runat="server"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr style="border: 1px solid #1F4E81; background-color: #EFF3FA">
                                                            <td style="text-align: center">
                                                                <asp:RadioButton runat="server" CssClass="ControlForm" GroupName="opAud" />
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:Label ID="Label21" CssClass="ControlForm" Text="68" runat="server"></asp:Label>
                                                            </td>
                                                            <td>
                                                                <asp:Label ID="Label20" CssClass="ControlForm" Text="Construcción de Ductos en los Campos Antiguo, Cañón, Calabaza, Velero, Comitas, Cuervito, Culebra y/u Otros del Activo Integral Burgos" runat="server"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr style="border: 1px solid #1F4E81;">
                                                            <td style="text-align: center">
                                                                <asp:RadioButton runat="server" CssClass="ControlForm" GroupName="opAud" />
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:Label ID="Label22" CssClass="ControlForm" Text="69" runat="server"></asp:Label>
                                                            </td>
                                                            <td>
                                                                <asp:Label ID="Label23" CssClass="ControlForm" Text="Ampliación del Aeropuerto de Loreto, en el Estado de Baja California" runat="server"></asp:Label>
                                                            </td>
                                                        </tr>
                                                        <tr style="border: 1px solid #1F4E81; background-color: #EFF3FA">
                                                            <td style="text-align: center">
                                                                <asp:RadioButton runat="server" CssClass="ControlForm" GroupName="opAud" />
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:Label ID="Label24" CssClass="ControlForm" Text="70" runat="server"></asp:Label>
                                                            </td>
                                                            <td>
                                                                <asp:Label ID="Label25" CssClass="ControlForm" Text="Aplicación de Recursos a Educación, Investigación y Vinculación en Materia Agropecuaria y Forestal" runat="server"></asp:Label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>--%>
                </table>
                <%--<br />--%>
                <table id="tHechosRel" style="width: 100%;">
                    <tr>
                        <td style="background-color: RGB(188, 188, 188);">
                            <p>
                                <asp:Label ID="Label11" runat="server" CssClass="ControlForm" Text="Denuncie los hechos en los que usted considera que se vulnera la Política de Integridad." Font-Bold="True"></asp:Label>
                            </p>
                            <p>
                                a) Refiera cuándo ocurrieron los hechos y durante cuánto tiempo (puede señalar fechas aproximadas).<br />
                                b) Indique dónde ocurrieron los mismos.
                            </p>
                            <p>
                                Recomendamos observar la siguiente estructura:<br />
                                La persona servidora pública (nombre) del área (indicar área a la que pertenece, si se sabe) considero que vulneró la Política de Integridad de la ASF al (aceptar regalos de…, 
                                solicitar a un ente auditado que contratara a su familiar…, hostigar sexualmente a …, acosar laboralmente a…, etc.). Estos hechos fueron contra (señalar nombre (s) de la (s) 
                                persona (s) afectada (s), bienes menoscabados, etc.) y ocurrieron en (indicar lugar y fecha).
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="auto-style2">
                            <asp:TextBox TextMode="MultiLine" Width="100%" ID="txtDescDen" Height="60px" runat="server" CssClass="ControlForm"></asp:TextBox>
                        </td>
                    </tr>
                </table>
                <%--<br />--%>
                <table id="tElemsVerf" style="width: 100%;">
                    <tr>
                        <td class="header2">
                            <asp:Label ID="Label14" runat="server" CssClass="ControlForm" Text="Elementos de verificabilidad y sustento de su denuncia."></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: RGB(188, 188, 188);">
                            <asp:Label ID="Label15" runat="server" CssClass="ControlForm" Text="Con base en la(s) conducta(s) que manifestó en las preguntas anteriores, indique si cuenta con documentación que la sustente. En caso afirmativo, deberá adjuntarlas." Font-Bold="True"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width: 100%">
                                <tr>
                                    <td>
                                        <%--<div style="width: 100%">
                                            &nbsp;&nbsp;&nbsp;&nbsp;<asp:RadioButton ID="rdNCElem" Text="No cuento con elementos de prueba, pero puedo brindar mi testimonio." runat="server" CssClass="ControlForm" GroupName="ElemVerSust" />
                                            <div style="width: 100%" id="tNCElem" title="Por favor, indique un correo electrónico no asociado a su nombre para contactarle.">
                                                
                                            </div>
                                        </div>--%>
                                        <div style="width: 100%">
                                            &nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="Label1" runat="server" CssClass="ControlForm" Text="Cuento con documentos que prueban mi denuncia."></asp:Label>&nbsp;<asp:RadioButton ID="rdCElemSi" runat="server" CssClass="ControlForm" GroupName="DcotoDen" Text="Si" />&nbsp;<asp:RadioButton ID="rdCElemNo" runat="server" CssClass="ControlForm" GroupName="DcotoDen" Text="No" />
                                            <div style="width: 100%" id="tArchs">
                                                <table style="width: 100%">
                                                    <tr>
                                                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:LinkButton OnClientClick="javascript: abreAdminArch(); return false;" ID="lSubArch" runat="server" Text="Subir/Ver Archivos"></asp:LinkButton>&nbsp;<label id="lNumDocs" class="ControlForm">0 documento(s) anexado(s).</label>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <%--                                        <table style="width: 100%">
                                            <tr>
                                                <td style="width: 10%">&nbsp;&nbsp;&nbsp;&nbsp;<label class="ControlForm">Email.</label>
                                                </td>
                                                <td>
                                                    <asp:TextBox ID="txtCprreoCont" runat="server" CssClass="ControlForm" Width="70%"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>--%>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br />
                <div>
                    <table style="width: 100%">
                        <tr>
                            <td class="header2" style="width: 100%">
                                <asp:Label ID="Label26" runat="server" CssClass="ControlForm" Text="CONTRASEÑA"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
                <table id="tContrasena" style="border-radius: 6px; width: 100%; margin-left: auto; margin-right: auto;">
                    <tr>
                        <td colspan="2">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <p>
                                Para agregar información complementaria o consultar el estado de su denuncia, deberá ingresar una contraseña de 8 caracteres que pueda recordar fácilmente.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%">
                            <label class="ControlForm">Contraseña.</label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtPass" runat="server" CssClass="ControlForm" MaxLength="8" TextMode="Password"></asp:TextBox>
                        </td>
                    </tr>
                </table>
                <%--<br />--%><%--<div>
                    <table style="width: 100%">
                        <tr>
                            <td class="header2" style="width: 100%">
                                <asp:Label ID="Label5" runat="server" CssClass="ControlForm" Text="ENVÍO DE INFORMACIÓN"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
                <table id="tEmail" style="border-radius: 6px; width: 100%; margin-left: auto; margin-right: auto;">
                    <tr>
                        <td colspan="2">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%">
                            <label class="ControlForm">Dirección de correo electrónico: (es conveniente incluirlo para así tener una comunicación activa).</label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtEmail" runat="server" CssClass="ControlForm"></asp:TextBox>
                        </td>
                    </tr>
                </table>--%>
                <br />
                <table id="tCaptcha" style="margin-left: auto; margin-right: auto; width: 100%">
                    <tr>
                        <td>
                            <p>
                                Resuelva el Captcha.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center">
                            <%--<div class="g-recaptcha" data-sitekey="6LdaSQkTAAAAAGXpdP9svSjwNPO68bCbDyIndg6a"></div>--%><%--<div class="g-recaptcha" data-sitekey="6LdWlwkTAAAAAK1NRp1G4-TN4EtNunrfwEdZt0AH"></div>--%>
                            <table style="width: 10%; margin-right: auto; margin-left: auto">
                                <tr>
                                    <td>
                                        <div id="ckCaptcha" class="g-recaptcha"></div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <br />
                <table id="tbtn" style="margin-left: auto; margin-right: auto; width: 200px;">
                    <tr>
                        <td style="text-align: center">
                            <asp:LinkButton ID="btnGuardar" Text="Guardar Datos" OnClientClick="javascript: guardaDenuncia(); return false;" runat="server" ForeColor="White"></asp:LinkButton>
                        </td>
                    </tr>
                </table>
            </div>
       
            <footer>
                Sus datos personales serán protegidos de conformidad con la Ley General de Datos Personales en Posesión de Sujetos Obligados y demás normativa aplicable en la materia. Puede                 
                <p>
                    revisar nuestra Política de Privacidad <a href="javascript:void(0);" style="color: white; font-weight: bold" onclick="abrePolitica();">Aquí</a>.
                </p>
            </footer>
        </div>
        <div id="divControlPopupFondo" style="width: 100%; height: 100%; top: 0px; left: 0px; display: none;"></div>
        <div id="diag-load" title="Cargando...">
            <table style="margin-left: auto; margin-right: auto; width: 170px">
                <tr>
                    <td colspan="2" style="text-align: center">
                        <img src="Imagenes/ajax-loader.gif" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="ui-icon ui-icon-alert"></span>
                    </td>
                    <td>
                        <b>Cargando... Por favor espere.</b>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dMje" title="Aviso...">
            <table style="margin-left: auto; margin-right: auto; width: 100%">
                <tr>
                    <td>
                        <span class="ui-icon ui-icon-alert"></span>
                    </td>
                    <td>
                        <b>
                            <label id="lMje" class="ControlForm"></label>
                        </b>
                    </td>
                </tr>
            </table>
        </div>
        <div id="diag-error" title="Error">
            <p>
                <span class="ui-icon ui-icon-closethick" style="float: left; margin: 0 7px 20px 0;"></span><b>
                    <label id="lblMsjeError"></label>
                </b>
            </p>
        </div>
        <div id="diag-ok" title="Datos Almacenados Correctamente">
            <p>
                <span class="ui-icon ui-icon-info" style="float: left; margin: 0 7px 20px 0;"></span><b>
                    <label id="lblMsjOk"></label>
                </b>
            </p>
        </div>
        <div id="diag-upload" title="Admin. Archivos">
            <table style="margin-left: auto">
                <tr>
                    <td style="text-align: center; background-color: #1d497a; color: #FFF">
                        <label class="ControlForm" style="font-weight: bold">Únicamente puede anexar archivos no mayores a 20 MB (MegaBytes).</label>
                    </td>
                </tr>
                <%--<tr>
                    <td style="text-align: center; background-color: #1d497a; color: #FFF">
                        <label class="ControlForm" style="font-weight: bold">Si el documento(s) excede el tamaño (20 MB) o si desea entregar en persona dicho(s) documento(s),</label>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; background-color: #1d497a; color: #FFF">
                        <label class="ControlForm" style="font-weight: bold">por favor envíe un correo a xxxx@asf.gob.mx para concertar una cita.</label>
                    </td>
                </tr>--%>
                <tr>
                    <td style="text-align: right">
                        <button id="btnSubir">Elegir Archivos</button>
                        <input type="file" multiple="multiple" style="display: none" id="flUp"
                            accept="application/vnd.ms-word.document.12, application/msword, application/vnd.ms-powerpoint, 
                            application/vnd.ms-powerpoint.presentation.12, application/vnd.ms-excel, 
                            application/vnd.ms-excel.12, application/vnd.ms-outlook, application/pdf, image/gif, image/jpeg, 
                            image/png, audio/basic, auido/L24, audio/mid, audio/mpeg, audio/mp4, audio/x-mpegurl, audio/ogg, audio/vnd.wav,
                            video/x-flv, video/mp4, application/x-mpegURL, video/MP2T, video/3gpp, video/quicktime, video/x-ms-wmv" />
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left">
                        <label class="ControlForm" id="lblAud" style="font-weight: bold"></label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style="margin-left: auto; margin-right: auto; width: 500px" id="tblDocPorSubir">
                            <tr style="background-color: #1F4E81; text-align: center">
                                <td style="width: 85%">
                                    <label style="font-weight: bold; color: whitesmoke" class="CtrlFrm">Nombre Doc.</label>
                                </td>
                                <td style="width: 15%">
                                    <label style="font-weight: bold; color: whitesmoke" class="CtrlFrm">Quitar Doc.</label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="dDirectorio" title="Directorio de la ASF" style="width: 960px">
            <table id="grid" class="table table-condensed table-hover table-striped" style="width: 960px">
                <thead>
                    <tr>
                        <th data-column-id="llave_trabajador" data-type="numeric" data-visible="false">Trabajador</th>
                        <th data-column-id="nombre" data-type="string" data-identifier="true">Nombre</th>
                        <th data-column-id="puesto" data-type="string">Puesto</th>
                        <th data-column-id="area" data-type="string">Área</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div id="dPolitica" style="width: 500px" title="Política de Privacidad">
            <table style="width: 100%">
                <tr>
                    <td style="text-align: center">
                        <label style="font-weight: bold; font-size: medium">Política de Privacidad</label>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="text-align: justify">
                            Los datos personales recabados serán protegidos, incorporados y tratados para uso exclusivo de “Participación Ciudadana” de la Auditoría Superior de la Federación, con fundamento en los artículos 116 y 120 de la Ley General de Transparencia y Acceso a la Información Pública, así como los artículos 3, fracción II, IX, X, XX, 27, 32 y demás relativos de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados. Los datos serán utilizados para llevar a cabo los trámites de recepción, seguimiento y atención a las denuncias ciudadanas, así como para fines estadísticos que se utilizarán de manera agregada. Asimismo, se le informa que sus datos no podrán ser difundidos sin su consentimiento expreso, salvo las excepciones previstas en la Ley. La Unidad Administrativa responsable del Sistema de datos personales de la “Participación Ciudadana” es la Secretaría Técnica del Auditor Superior de la Federación, y el domicilio en el que él (la) interesado(a) podrá ejercer los derechos de acceso, rectificación, cancelación y oposición, se encuentra en Carretera Picacho Ajusco número 167, en la Colonia Ampliación Fuentes del Pedregal, Delegación Tlalpan, C.P. 14110, o mediante una solicitud de acceso o corrección de datos personales en el Sistema de Solicitudes de Información de la Auditoría Superior de la Federación.<%-- (<a style="font-weight: bold;" href="javascript:void(0);" onclick="javascript: abreINFOMEX();">INFOMEX</a>).--%>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        <asp:HiddenField ID="hdnCvePrivadaReCaptcha" runat="server" />
        <asp:HiddenField ID="hdnCorreo" runat="server" />
        <asp:HiddenField ID="hdnEstatusLiga" runat="server" />
        <asp:HiddenField ID="hdnCvePublicaReCaptcha" runat="server" />
    </form>
</body>
</html>
