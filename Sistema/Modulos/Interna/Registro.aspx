<%@ Page Language="C#"  MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Registro.aspx.cs" Inherits="Sistema.Modulos.Interna.Registro" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <%--<h2><%: Title %>.</h2>
    <h3>Your application description page.</h3>
    <p>Use this area to provide additional information.</p>--%>

    <link href="../../CSS/Style_Accordion.css" rel="stylesheet" />
    
    <link href="../../CSS/jquery-ui.css" rel="stylesheet" />
    <script src="../../JS/jquery-1.11.2.min.js"></script>
    <script src="../../JS/jquery-ui-1.10.3.custom.js"></script>

    <script src="../../JS/JSRegistro.js"></script>
    


    <script src="../../JS/JSUtils.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
    

    <div class="contenedor" >



        <table id="otInfo" border="0" style="width: 80%; margin-top:80px; margin-left: auto; margin-right: auto;">
           
            <tr>
                <td></td>
                <td></td>
                <td colspan="3" class="left_txt" style="font-size:18px">
                    <label id="lTitulo" class="lTitulo txt_az_bold">
                        Consulta el Título Cuarto de la Ley de Fiscalización y Rendición de Cuentas de la Federación.
                        <a href="http://www.asf.gob.mx/uploads/41_Instrumentos_Legales/Ley_de_Fiscalizacion_y_Rendicion_de_Cuentas_de_la_Federacion_18-07-2016.pdf" target="_blank">http://www.asf.gob.mx/uploads/41_Instrumentos_Legales/Ley_de_Fiscalizacion_y_Rendicion_de_Cuentas_de_la_Federacion_18-07-2016.pdf  (pág. 22 del PDF)</a>
                        
                    </label>
                </td>
            </tr>
            <tr><td class="row_height_size"></td></tr>
            <tr>
                <td colspan="2"></td>                
                <td>
                    <img src="../../Imagenes/den_presenta.png" class="img_size_h" />
                </td>
                <td></td>
                <td>
                    <img src="../../Imagenes/den_finalidad.png" class="img_size_h"/>
                </td>
            </tr>
            <tr><td class="row_height_size"></td></tr>
            <tr>
                <td style="width:10%; vertical-align:top;">
                    <img class="img_normal_size" src="../../Imagenes/manual.png"  data-toggle="tooltip" title="La ASF pone a su disposición el tutorial para conocer qué es lo que se puede denunciar. Clic en la imagen para ver el tutorial" />
                </td>
                
                <td>&nbsp;&nbsp;</td>

                <td colspan="3" style="width:90%">
                    <img class="fManualInfografia" src="../../Imagenes/den_que_denunciar.png" style="height:190px"/>
                </td>
            </tr>
            <tr><td class="row_height_size"></td></tr>
            <tr>
                <td colspan="2"></td>
                <td colspan="3" align="center">
                    <img src="../../Imagenes/den_respuesta.png"  class="img_size_h" />
                </td>
               
            </tr>

            <tr><td class="row_height_size"></td></tr>

            <tr>
                <td colspan="5">
                    <div id="dvCont" class="div_redondeado">
                        <table>
                            <tr><td class="row_height_size"></td></tr>
                            <tr>
                                <td class="center_txt txt_az_bold" style="font-size:20px">
                                    <asp:Label runat="server" Text="¿Qué debe contener mi denuncia?"></asp:Label>
                                    &nbsp;
                                    <img src="../../Imagenes/den_contenido.png"  class="img_size_h_v2" />
                                </td>
                                
                            </tr>
                            
                            <tr><td class="row_height_size"></td></tr>
                                                        

                            <tr>
                                <td align="center">

                                    <table id="otInfDen" style="width:70%">

                                        <tr>
                                            <td class="left_txt txt_az_normal" colspan="2" style="background-color:#f2f2f2; border-top-color:#f2f2f2; border-left-color:#f2f2f2; border-right-color:#f2f2f2; font-size:11pt;"> 
                                                <asp:Label runat="server" Text="Para presentar la denuncia se requiere al menos los dos primeros elementos:"></asp:Label>
                                                <br />
                                                <br />
                                            </td>
                                            
                                        </tr>
                                        
                                        
                                        <tr>
                                            <td class="al_img_celda">
                                                <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCF" />
                                                <br />
                                               
                                            </td>
                                            
                                            <td  class="txt_alineados_celdas txt_az_bold">
                                                <asp:Label runat="server" Text="El (los) ejercicio(s) fiscal(es) en que se presentan los presuntos hechos irregulares."></asp:Label>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td class="al_img_celda">
                                               <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCF" />
                                               <br />
                                            </td>
                                             
                                            <td  class="txt_alineados_celdas txt_az_bold">
                                                <asp:Label runat="server" Text="La descripción de los presuntos hechos irregulares."></asp:Label>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td class="al_img_celda">
                                                <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCF" />
                                                <br />
                                               
                                            </td>                                             
                                            <td class="txt_alineados_celdas txt_az_bold">
                                                <asp:Label runat="server" Text="Cuando sea posible se deberá disponer de elementos de prueba, documentos y evidencias, mediante los cuales se presuma el manejo, aplicación o custodia irregular de recursos públicos o de su desvío."></asp:Label>
                                            </td>
                                            
                                        </tr>                                        
                                    </table>

                                    <br />
                                    <br />

                                </td>
                            </tr>
                        </table>
                    </div>

                </td>
            </tr>

            <tr><td class="row_height_size"></td></tr>


            <tr>

                <td colspan="5">
                    <div id="dvParticipacion" class="div_redondeado">
                        <table>
                            <tr>
                                <td style="padding:20px; width:84%" class="txt_ne_normal">
                                    <asp:Label runat="server">Sí no dispone de los  dos primeros elementos, le invitamos a que consulte las otras opciones de denuncia y participación ciudadana como: Sugerencias de Auditorías, información sobre irregularidades, y denuncia de irregularidades de entes privados que interactúan con el sector público. <a href ="http://participacionciudadana.asf.gob.mx" target="_parent"> http://participacionciudadana.asf.gob.mx/</a>   </asp:Label>
                                    
                                </td>

                                <td style="width:16%">
                                    <a href ="http://participacionciudadana.asf.gob.mx" target="_parent"><img src="../../Imagenes/den_participacion.png" class="img_size_h_v2" /></a>


                                </td>
                            </tr>
                        </table>

                    </div>
                </td>




            </tr>

            <tr><td class="row_height_size"></td></tr>

            <tr>
                <td colspan="5" class="back_celdas center_txt txt_dor_bold" style="height:40px; border-radius:10px;">
                    <asp:Label runat="server" Text="DENUNCIANTE"></asp:Label>
                </td>
            </tr>

            <tr><td class="row_height_size"></td></tr>

            <tr>

                <td colspan="5">
                    <table class="size_100">
                        <tr>
                            <td style="width:25%"  class="txt_ne_bold left_txt">
                                <asp:Label runat="server" Text="¿Desea que su denuncia sea anónima?"></asp:Label>
                            </td>
                            <td class="sep_width_20"></td>

                            <td style="width:75%" class="left_txt txt_ne_normal">
                                <asp:RadioButtonList id="rblDenunciaAnonima" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="&nbsp; Si &nbsp;" Value="14"></asp:ListItem>                                    
                                    <asp:ListItem Text="&nbsp; No" Value="15"></asp:ListItem>
                                </asp:RadioButtonList>
                            
                            </td>





                        </tr>                        
                     


                        <tr>
                            <td colspan="3">
                                <br />
                                <div id="dvSiAnonima" class="size_100" style="display:none;">
                                    <div id="contenedor" class="dvcontenedor">                                                                                                                
                                        
                                        <div id="completa" class="dvFilaCompleta">

                                            <div class="div_redondeado_28 txt_az_bold">
                                                <asp:Label runat="server" Text="Podrá consultar la respuesta mediante el Folio de Registro de la Denuncia que se proporcionará al final del registro."></asp:Label>
                                            </div>

                                        </div>

                                        <div class="dvFilaCompleta" style="height:20px"></div>                                                                                                             

                                        <div id="pie" class="dvpie center_txt">
                                            <input  type="button"  name="btnContinuaDenuncia" value="Continuar"/>
                                        </div>
                                    </div>
                                </div>

                            </td>
                        </tr>


                    </table>
                </td>

             
               
              
            </tr>


        </table>

        <%-- Captura de la denuncia --%>
        <div id="dvDenunciaRegistro"  style="display:block; width: 95%; margin-top:80px; margin-left: auto; margin-right: auto;"">

            <hr class="linesHTML" />

            <div class="dvcontenedor" >

                <div class="dvFilaCompleta center_txt txt_az_bold" style="font-size:20px;">
                    <asp:Label runat="server" Text="SISTEMA DE DENUNCIAS ELECTRÓNICAS (SIDEEL)"></asp:Label>                    
                </div>
                <br />                
                <div class="dvFilaCompleta center_txt txt_dor_bold" style="font-size:18px;">
                    <asp:Label runat="server" Text="DENUNCIAS CIUDADANAS FUNDAMENTADAS EN EL TÍTULO CUARTO DE LA LFRCF"></asp:Label>
                </div>

                <br />

                <%-- Registro de denuncia no anonima --%>

                <div id="Denuncia_no_anonima" class="set">

                    <a href="#" class="txt_az_bold"> DATOS DE CONTACTO
                    <i class="fa fa-plus"></i>
                    </a>
                    
                    <div class="content center_txt">


                        <table style="width:60%; margin:0px auto;">
                            
                            <tr class="left_txt">
                                   
                                <td class="txt_az_normal">                                   
                                    <br />
                                    <br />
                                    <asp:Label runat="server" Text="Nombre o seudónimo "></asp:Label>                                    
                                </td>
                            </tr>

                            <tr class="left_txt ">
                                 <td class="txt_az_normal">
                                    <asp:TextBox ID="txtNomSeudonimo" runat="server" Width="100%"></asp:TextBox>   
                                     
                                </td>
                            </tr>

                            <tr>
                                <td class="row_height_size"></td>
                            </tr>

                            <tr class="left_txt">
                                <td class="txt_az_normal">
                                    <asp:Label runat="server" Text="Dirección de correo electrónico para recibir la respuesta" Width="40%"></asp:Label>                                    
                                </td>                              
                            </tr>

                            <tr class="left_txt">
                                <td class="txt_az_normal">
                                    <asp:TextBox ID="TextBox4" runat="server" Width="100%"></asp:TextBox>                                    
                                    <br />
                                    <br />
                                </td>
                            </tr>

                            <tr class="left_txt">
                                <td class="txt_az_normal">
                                    <asp:Label runat="server" Text="Podrá consultar la respuesta mediante el Folio de Registro de la Denuncia, que se proporcionará al final del registro "></asp:Label>                                    
                                    <br />
                                    <br />
                                </td>                              
                            </tr>


                            <tr>
                                <td class="center_txt txt_az_normal">                                   
                                    
                                    <input  type="button" name="btnGuardaDatosContacto" value="Validar Correo"/>
                                    <br />
                                    <br />
                                    
                                </td>
                            </tr>


                            <tr class="center_txt">
                                <td class="txt_az_bold">
                                    <a href="https://www.asf.gob.mx/Section/262_Proteccion_de_Datos" target="_blank">
                                        <img src="../../Imagenes/candado_2.png" data-toggle="tooltip" title="Proteccion de Datos Personales" class="img_normal_size" />
                                    </a>
                                    
                                    <asp:Label runat="server" Text="La ASF protegerá en todo momento la identidad del denunciante "></asp:Label>                                    
                                    <br />
                                    <br />
                                </td>                              
                            </tr>

                           

                        </table>
                    </div>

                </div>


                <%-- Registro de denuncia anonima --%>

                <div id="Denuncia_anonima" class="set">                                       


                    <a href="#" id="aLinkRD" class="txt_az_bold"> REGISTRO DE DENUNCIA
                    <i class="fa fa-plus"></i>
                    </a>

                    <div class="content center_txt">


                        <%-- Sección de captura para el registro de los Hechos de la Denuncia --%>

                        <div id="RDHechos" class="size_95">

                            <table class="size_95" style="margin: 0px auto;">
                                <tr>
                                    <td style="vertical-align: top; width: 3%">
                                        <br />
                                        <div class="back_celdas">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">
                                        <br />
                                        <div class="back_celdas txt_az_normal">
                                            <asp:Label runat="server" Text="&nbsp;&nbsp;Hechos de la denuncia "></asp:Label>
                                        </div>


                                        <table class="size_100" style="margin: 0px auto;">
                                            <tr>
                                                <td class="left_txt txt_az_normal">
                                                    <br />
                                                    <asp:Label runat="server" Text="Seleccione la(s) opción(es) deseada(s): "></asp:Label>
                                                    <br />
                                                    <br />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="txt_az_normal left_txt" style="font-size: 10pt;">
                                                    <div runat="server" id="dvchbHechos"></div>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="size_100 left_txt txt_az_normal">
                                        <br />
                                        <asp:Label runat="server">Sí la denuncia que usted desea presentar se encuentra fuera de estos supuestos, le invitamos a que viste la página de Participación Ciudadana de la ASF en donde puede también presentarla: <a href="http://participacionciudadana.asf.gob.mx/index/index.html" target="_parent" >http://participacionciudadana.asf.gob.mx/index/index.html</a> </asp:Label>
                                        <br />


                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="3" class="center_txt size_100">
                                        <br />
                                        <br />
                                        <input type="button" name="btnGuardaDenuncia" value="Guardar" />
                                        <br />
                                        <br />
                                        <hr class="linesHTML" />
                                    </td>
                                </tr>

                            </table>
                        </div>



                        <%-- Sección de captura de los elementos complementarios de la Denuncia --%>


                        <div id="RDComplementoDenuncia" class="size_95">

                            <table class="size_95" style="margin: 0px auto;">

                                <tr>
                                    <td style="vertical-align: top; width: 3%">

                                        <div class="back_cel_den_color">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="back_cel_den_color txt_az_bold">
                                            <asp:Label runat="server" Text="&nbsp;&nbsp; El(los) ejercicio(s) fiscal(es) en que se presentan los presuntos hechos irregulares"></asp:Label>
                                        </div>

                                    </td>
                                </tr>


                                <tr>
                                    <td style="vertical-align: top; width: 3%">

                                        <div class="back_cel_den_NoColor">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>

                                    <td style="width: .2%"></td>

                                    <td class="size_90 left_txt" style="height: 120px; vertical-align: top">
                                        <table>
                                            <tr>
                                                <td class="txt_az_normal back_cel_den_NoColor" style="height: 120px; vertical-align: top">
                                                    <asp:Label runat="server" Text="&nbsp;&nbsp; Selección múltiple &nbsp;"></asp:Label>
                                                </td>

                                                <td class="sep_width"></td>

                                                <td class="txt_az_normal back_cel_den_NoColor" style="height: 120px; vertical-align: top">
                                                    <asp:ListBox ID="lbxCP" runat="server" Width="100px" Height="120px"></asp:ListBox>
                                                </td>

                                                <td class="sep_width"></td>

                                                <td>
                                                    <table>

                                                        <tr>

                                                            <td>
                                                                <asp:ImageButton runat="server" ID="imgAddCP" ImageUrl="../../Imagenes/add-one.png" OnClientClick="javascript:AgregaRemueveCP(0); return false" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:ImageButton runat="server" ID="imgRemCP" ImageUrl="../../Imagenes/remove-one.png" OnClientClick="javascript:AgregaRemueveCP(1); return false" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:ImageButton runat="server" ID="imgAddCPTodos" ImageUrl="../../Imagenes/add-all.png" OnClientClick="javascript:AgregaRemueveCP(2); return false" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <asp:ImageButton runat="server" ID="imgRemCPtODOS" ImageUrl="../../Imagenes/remove-all.png" OnClientClick="javascript:AgregaRemueveCP(3); return false" />
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>

                                                <td class="sep_width"></td>


                                                <td class="txt_az_normal back_cel_den_NoColor" style="height: 120px; vertical-align: top">
                                                    <asp:ListBox ID="lbxCPSeleccionados" runat="server" Width="100px" Height="120px"></asp:ListBox>
                                                </td>

                                            </tr>
                                        </table>


                                    </td>
                                </tr>


                                <tr>
                                    <td style="vertical-align: top; width: 3%">

                                        <div class="back_cel_den_color">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="back_cel_den_color txt_az_bold">
                                            <asp:Label runat="server" Text="&nbsp;&nbsp; La descripción de los presuntos hechos irregulares"></asp:Label>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="txt_az_normal">

                                            <table class="size_100">
                                                <tr>
                                                    <td class="txt_az_normal" colspan="6">
                                                        <br />
                                                        <asp:Label runat="server" Text="Si usted cuenta con un escrito, en formato de .doc y .docs o PDF (1 MB de tamaño máximo), puede  cargarlo por medio del siguiente campo. Tome en cuenta que su escrito debe estar fundado y motivado. &nbsp;"></asp:Label>
                                                        <br />
                                                        <br />
                                                    </td>
                                                </tr>
                                                <tr>
                                                <td class="txt_az_bold right_txt" style="width:20%">
                                                    <asp:Label runat="server" Text="Descripción del Archivo &nbsp;"></asp:Label>   
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <asp:TextBox ID="txtDescArchivo" Width="100%" runat="server"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="txt_az_bold right_txt" style="width:10%">
                                                    <%--<asp:Label runat="server" Text="Cargar Archivo &nbsp;"></asp:Label>   --%>
                                                    <label class="ctrFileUpload" id="btnArchDoc">Seleccionar</label>
                                                    &nbsp;
                                                  
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <%--<asp:TextBox ID="txtRegDescArchivo" runat="server" Width="100%"></asp:TextBox>--%>
                                                    <asp:Label CssClass="CtrlFrm" ID="lblArchDoc" runat="server" Text="" BorderColor="Transparent"></asp:Label>
                                                    &nbsp;
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width:5%" colspan="2" align="center">
                                                    <img src="../../Imagenes/file-add.png" class="img_normal_size" id="imgRegDescArchivo" onclick="javascript:agregarDocumento(0);" />
                                                    &nbsp;&nbsp;
                                                </td>
                                                
                                                
                                                <%--<td class="left_txt" style="width:5%">
                                                    <img src="../../Imagenes/garbage.png" class="img_normal_size" id="imgDescArchivo" />                                                    
                                                   
                                                </td>--%>
                                            </tr>
                                            <tr><td class="row_height_size"></td></tr>
                                            <tr>
                                                <td colspan="2">
                                                    <table align="center">
                                                        <tr>
                                                            <td align="center">
                                                                <div runat="server" id="dvListaDocumentos" align="center">
                                                                    <table border="1" id="Tdocumentos" style="border-width: 1px; border-style: solid; border-collapse: collapse;">
                                                                        <thead>
                                                                            <tr style="color: White; background-color: #D3CFC8; border-style: none; font-size:11px; font-weight:bold">
                                                                                <td style="width:50px;display:none;">Llave</td>
                                                                                <td align="center" style="width:100px;">Documento</td>
                                                                                <td align="center" style="width:300px;">Descripción</td>
                                                                                <td align="center" style="width:30px;">Eliminar</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                                <tr>
                                                    <td class="row_height_size"></td>
                                                </tr>
                                            </table>



                                        </div>

                                    </td>
                                </tr>



                                <tr>
                                    <td style="vertical-align: top; width: 3%">

                                        <div class="back_cel_den_color">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="back_cel_den_color txt_az_bold">
                                            <asp:Label runat="server" Text="&nbsp;&nbsp; Sí es posible, se deberá disponer de elementos de prueba, documentos y evidencias mediante los cuales se presuma el manejo, aplicación o custodia irregular de recursos públicos o de su desvío."></asp:Label>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="txt_az_normal">

                                            <table class="size_100">
                                                <tr>
                                                    <td class="txt_az_normal" colspan="6">
                                                        <br />
                                                        <asp:Label runat="server" Text="Son admisibles formatos PDF, xls, doc y docs, XML, JPG, JPEG, TIF, BMP, MP3, MP4, CVS o cualquier otro archivo gráfico o de texto. (Tamaño máximo por archivo 100 MB por archivo digital: Tamaño del repositorio 50GB). Por cuestiones de seguridad no se aceptan archivos en formato comprimido .zip o .rar. &nbsp;"></asp:Label>
                                                        <br />
                                                        <br />
                                                    </td>
                                                </tr>
                                                <tr>
                                                <td class="txt_az_bold right_txt" style="width:20%">
                                                    <asp:Label runat="server" Text="Descripción del Archivo &nbsp;"></asp:Label>   
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <asp:TextBox ID="txtDescArchEv" Width="100%" runat="server"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                                <td class="left_txt" style="width:5%">
                                                    <img src="../../Imagenes/garbage.png" class="img_normal_size" id="imgDescCargaArchivo" />                                                    
                                                   
                                                </td>

                                            </tr>
                                            <tr>
                                                <td class="txt_az_bold right_txt" style="width:10%">
                                                   <%-- <asp:Label runat="server" Text="Cargar Archivo &nbsp;"></asp:Label>   --%>
                                                    <label class="ctrFileUpload" id="btnArchEv">Seleccionar</label>
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <%--<asp:TextBox ID="txtCargarArchivo" runat="server" Width="100%"></asp:TextBox>--%>
                                                    <asp:Label CssClass="CtrlFrm" ID="lblArchEv" runat="server" Text="" BorderColor="Transparent"></asp:Label>
                                                    &nbsp;
                                                </td>
                                                
                                            </tr>
                                            <tr>
                                                <td class="left_txt" style="width:5%" colspan="2">
                                                    <img src="../../Imagenes/file-add.png" class="img_normal_size" id="imgCargarEv"  onclick="javascript:agregarDocumento(1);" />
                                                    &nbsp;&nbsp;
                                                </td>
                                            </tr>
                                            <tr><td class="row_height_size"></td></tr>
                                            <tr>
                                                <td colspan="2">
                                                    <table align="center">
                                                        <tr>
                                                            <td align="center">
                                                                <div runat="server" id="dvListaDocEv" align="center">
                                                                    <table border="1" id="TdocEv" style="border-width: 1px; border-style: solid; border-collapse: collapse;">
                                                                        <thead>
                                                                            <tr style="color: White; background-color: #D3CFC8; border-style: none; font-size:11px; font-weight:bold">
                                                                                <td style="width:50px;display:none;">Llave</td>
                                                                                <td align="center" style="width:100px;">Documento</td>
                                                                                <td align="center" style="width:300px;">Descripción</td>
                                                                                <td align="center" style="width:30px;">Eliminar</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            </table>



                                        </div>

                                    </td>
                                </tr>




                                <tr>
                                    <td style="vertical-align: top; width: 3%">

                                        <div class="back_cel_den_color">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="back_cel_den_color txt_az_bold">
                                            <asp:Label runat="server" Text="&nbsp;&nbsp; Entidad(es) involucrada(s)"></asp:Label>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="txt_az_normal">

                                            <table class="size_100">

                                                <tr>
                                                    <td class="row_height_size"></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt_az_bold right_txt" style="width: 25%; vertical-align: top">
                                                        <asp:Label runat="server" Text="Seleccionar el nivel de Gobierno &nbsp; &nbsp;"></asp:Label>

                                                    </td>
                                                    <td style="width: 75%" class="left_txt">                                                       
                                                        <div id="dvNivelGobierno" style="vertical-align: top"></div>
                                                        <br />
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td class="row_height_size_5"></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt_az_bold right_txt" style="width: 25%; vertical-align: top">
                                                        <asp:Label runat="server" Text="Seleccionar la entidad involucrada &nbsp; &nbsp;"></asp:Label>
                                                    </td>
                                                    <td style="width: 75%" class="left_txt">

                                                        <asp:TextBox ID="txtEntInvolucrada" runat="server" Width="100%" MaxLength="300"></asp:TextBox>

                                                        &nbsp;
                                                    <img src="../../Imagenes/file-add.png" class="img_normal_size" id="imgAddEntInv" />

                                                    </td>

                                                </tr>

                                                <tr>
                                                    <td class="row_height_size"></td>
                                                </tr>

                                            </table>



                                        </div>

                                    </td>
                                </tr>




                                <tr>
                                    <td style="vertical-align: top; width: 3%">

                                        <div class="back_cel_den_color">
                                            <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                        </div>
                                    </td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="back_cel_den_color txt_az_bold">
                                            <asp:Label runat="server" Text="&nbsp;&nbsp; Objeto(s) denunciado(s)"></asp:Label>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td style="width: .2%"></td>
                                    <td class="size_90 left_txt">

                                        <div class="txt_az_normal">

                                            <table class="size_100">

                                                <tr>
                                                    <td class="row_height_size"></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt_az_bold right_txt" style="width: 25%; vertical-align: top">
                                                        <asp:Label runat="server" Text="Objeto(s) denunciado(s) &nbsp; &nbsp;"></asp:Label>

                                                    </td>
                                                    <td style="width: 75%" class="left_txt">
                                                        <asp:TextBox ID="txtObjetoDenunciado" runat="server" Width="50%" Height="200px" MaxLength="500" TextMode="MultiLine"></asp:TextBox>
                                                        &nbsp;
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td class="row_height_size_5"></td>
                                                </tr>
                                                <tr>
                                                    <td class="txt_az_bold right_txt" style="width: 25%; vertical-align: top">
                                                        <asp:Label runat="server" Text="Origen de los recursos &nbsp; &nbsp;"></asp:Label>
                                                    </td>
                                                    <td style="width: 75%" class="left_txt txt_az_normal">
                                                        <asp:DropDownList ID="ddlOrigenRecursos" runat="server" Width="80%"></asp:DropDownList>
                                                    </td>

                                                </tr>

                                                <tr>
                                                    <td class="row_height_size"></td>
                                                </tr>

                                            </table>


                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td class="row_height_size"></td>
                                </tr>

                            <tr>
                                <td colspan="3" class="center_txt">
                                    <input type="button" name="btnGuardaSegSecc" value="Guardar" />
                                </td>
                            </tr>
                            <tr>
                                <td class="row_height_size" colspan="3">
                                    <hr class="linesHTML" />
                                </td>
                            </tr>
                            </table>

                        </div>



                        <%-- Sección para alta de contraseña del denunciante --%>

                        <div id="RDGeneraPSW" class="size_95 disabledbutton">


                            <table class="size_95" style="margin: 0px auto;">
                                
                                <tr>
                                    <td colspan="3">

                                        <table class="size_100">

                                            <tr>
                                                <td class="center_txt" colspan="2" style="font-size: 20px">
                                                    <asp:Label CssClass="txt_dor_bold" runat="server" Text="CONTRASEÑA"></asp:Label>
                                                    <br />
                                                    <br />
                                                </td>

                                            </tr>
                                            <tr>
                                                <td class="left_txt" colspan="2">
                                                    <asp:Label CssClass="txt_az_bold" runat="server" Text="Para agregar información complementaria o consultar el estado de su denuncia, deberá ingresar una contraseña de 8 caracteres que pueda recordar fácilmente."></asp:Label>
                                                    <br />
                                                    <br />
                                                    <br />

                                                </td>

                                            </tr>
                                            <tr>
                                                <td class="left_txt" style="width: 10%">
                                                    <asp:Label CssClass="txt_az_normal" runat="server" Text="Contraseña"></asp:Label>
                                                    &nbsp;
                                                </td>
                                                <td class="left_txt" style="width: 90%">
                                                    <asp:TextBox ID="txtPSW" runat="server" Width="30%" MaxLength="8" CssClass="center_txt"></asp:TextBox>
                                                    <br />
                                                    <br />
                                                    <br />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td class="left_txt" colspan="2">
                                                    <asp:Label CssClass="txt_az_bold" runat="server" Text="Resuelva el Captcha."></asp:Label>
                                                    <br />
                                                    <br />


                                                </td>
                                            </tr>

                                            <tr>
                                                <td colspan="2" class="center_txt size_100">
                                                    <div id="ckCaptcha" class="g-recaptcha"></div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colspan="2" class="center_txt size_100">
                                                    <input type="button" name="btnContinuaDenuncia" value="Guardar" onclick="javascript: fGuardaDenuncia(); return false;" />
                                                    &nbsp;&nbsp;&nbsp;
                                                <img src="../../Imagenes/garbage.png" class="img_normal_size" />

                                                </td>

                                            </tr>

                                            <tr>
                                                <td class="row_height_size"></td>
                                            </tr>


                                        </table>
                                    </td>

                                </tr>


                            </table>

                        </div>


        

                    </div>



                   
                </div>
               

                <div id="Denuncia_seguimiento" class="set">

                    <a href="#" class="txt_az_bold"> SEGUIMIENTO DE LA DENUNCIA REGISTRADA
                    <i class="fa fa-plus"></i>
                    </a>
                    
                    <div class="content center_txt">


                        <table style=" width:60%; margin:0px auto;" >

                            <tr>
                                <td colspan="3">
                                    <img src="../../Imagenes/Consulta_v2.png" />
                                </td>
                            </tr>
                            <tr>
                                <td class="center_txt" colspan="3">
                                    <br />                                    
                                    <br />
                                    <asp:Label CssClass="txt_az_bold" runat="server" Text="Para entrar a ver el seguimiento o concluir su denuncia es necesario capturar el Folio y la contraseña de la misma."></asp:Label>
                                    <br />
                                    <br />
                                </td>
                            </tr>

                            <tr>
                                <td class="center_txt">
                                    <asp:Label CssClass="txt_az_bold" runat="server" Text="Folio"></asp:Label>
                                    <br />                                    
                                </td>

                                <td style="width:10px;" ></td>
                                
                                <td class="center_txt">
                                    <asp:Label CssClass="txt_az_bold" runat="server" Text="Contraseña"></asp:Label>
                                    <br />                                     
                                </td>

                            </tr>


                            <tr class="center_txt">
                                   
                                <td class="txt_az_normal">                                                                                                           
                                    <asp:TextBox ID="txtSegFolio" runat="server" MaxLength="60" CssClass="center_txt" Width="100%" data-toggle="tooltip" ToolTip="Folio generado por el sistema cuando se registro la deuncia"></asp:TextBox>
                                </td>

                                <td></td>

                                <td class="txt_az_normal">                                                                                                           
                                    <asp:TextBox ID="txtSegPsw" runat="server" MaxLength="8" CssClass="center_txt" Width="100%" TextMode="Password" placeholder="Debe estar conformada por 8 caracteres"></asp:TextBox>                                    
                                </td>

                            </tr>    
                            
                            <tr>
                                <td class="center_txt txt_az_normal" colspan="3">                                   
                                    <br />                                    
                                    <br />
                                    <input  type="button" name="btnSegconsulta" value="Consultar"/>
                                    <br />                                    
                                    <br />
                                    
                                </td>
                            </tr>

                            <tr>
                                <td class="center_txt txt_az_normal" colspan="3">                                   
                                    
                                    <input  type="button" name="btnSegRecuperaPsw" value="Olvide mi contraseña"/>
                                    <br />
                                    <br />
                                    
                                </td>
                            </tr>

                           
                  

                        </table>

                    </div>

                </div>


                <div class="size_100">
                    <table style="margin:0px auto; width:60%;">
                        <tr>
                            <td class="size_100 center_txt">
                                <br />
                                <br />
                                <input type="button" name="btnRegresaPresentacion" value="Regresar" />
                                <br />
                                <br />
                                
                            </td>
                        </tr>
                    </table>
                </div>


            </div>

            <div id="dvLogFolio" runat="server">
                <table>
                    <tr>
                        <td>
                            <asp:Label runat="server" ID="lblLogFolio" Text="Folio" CssClass="txt_dor_bold"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtLogFolio" runat="server" MaxLength="60" CssClass="center_txt" Width="400px"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:15px">

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label runat="server" ID="Label1" Text="Contraseña" CssClass="txt_dor_bold"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtLogPass" runat="server" CssClass="center_txt" Width="200px" ></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>

        </div>  <%-- Captura de la denuncia  --%>


        <asp:HiddenField runat="server" ID="HDLlaveDenuncia" Value="0" />
        <asp:HiddenField runat="server" ID="HDLlaveTipoDenuncia" Value="0" />
        <asp:HiddenField runat="server" ID="HDFolio" Value="" />


        <div runat="server" id="dvRespuesta" title="Seguimiento de la denuncia" class="center_txt">
            <br />
            <asp:Label ID="lblRespuesta" runat="server" CssClass="txt_az_bold" Font-Size="25px" Text=""></asp:Label>
            
        </div>



        <asp:HiddenField runat="server" ID="HDLlaveDocumento" Value="0" />
        <asp:HiddenField runat="server" ID="HDLlaveTipoDocumento" Value="0" />
        <asp:HiddenField runat="server" ID="HDRutaServ" Value="" />
        <asp:HiddenField runat="server" ID="HDSeleccArchivo" Value="0" />
        <asp:HiddenField ID="hdnCvePrivadaReCaptcha" runat="server" />
        <asp:HiddenField runat="server" ID="hdnCvePublicaReCaptcha" Value="0" />
        <asp:HiddenField ID="hdnEstatusLiga" runat="server" />

        <asp:HiddenField runat="server" ID="hdnPGuarda" Value="0" />

    </div>
   
    

</asp:Content>