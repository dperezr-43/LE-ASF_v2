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
                                    <asp:ListItem Text="&nbsp; Si &nbsp;" Value="1"></asp:ListItem>                                    
                                    <asp:ListItem Text="&nbsp; No" Value="0"></asp:ListItem>
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


                    <a href="#" class="txt_az_bold"> REGISTRO DE DENUNCIA
                    <i class="fa fa-plus"></i>
                    </a>

                    <div class="content center_txt">

                        <table class="size_95" style="margin:0px auto;">
                            
                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    <br />
                                    <div class="back_celdas">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    <br />
                                    <div class="back_celdas txt_az_normal">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp;Hechos de la denuncia "></asp:Label>
                                    </div>
                                    

                                    <table class="size_100" style="margin:0px auto;">                                        
                                        <tr>
                                            <td class="left_txt txt_az_normal">
                                                <br />
                                                <asp:Label runat="server" Text="Seleccione la(s) opción(es) deseada(s): "></asp:Label>
                                                <br />
                                                <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="txt_az_normal left_txt" style="font-size:10pt;">
                                                <asp:CheckBoxList ID="chbHechos" runat="server" CssClass="txt_az_normal ">
                                                    <asp:ListItem Text="&nbsp; Desvío de recursos hacia fines distintos a los autorizados." Value="1"></asp:ListItem>
                                                    <asp:ListItem Text="&nbsp; Irregularidades en la captación o en el manejo y utilización de los recursos públicos." Value="2"></asp:ListItem>
                                                    <asp:ListItem Text="&nbsp; Actos presuntamente irregulares en la contratación y ejecución de obras, contratación y prestación de servicios públicos, adquisición de bienes, y otorgamiento de permisos, <br /> &nbsp; licencias y concesiones entre otros." Value="3"></asp:ListItem>
                                                    <asp:ListItem Text="&nbsp; La comisión recurrente de irregularidades en el ejercicio de los recursos públicos." Value="4"></asp:ListItem>
                                                    <asp:ListItem Text="&nbsp; Inconsistencia en la información financiera o programática de cualquier entidad fiscalizada que oculte o pueda originar daños o perjuicios a su patrimonio." Value="5"></asp:ListItem>
                                                    <asp:ListItem Text="&nbsp; Desconozco cómo clasificarlo en alguno de los supuestos anteriores." Value="5"></asp:ListItem>
                                                </asp:CheckBoxList>
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
                                    <input  type="button" name="btnGuardaDenuncia" value="Guardar"/>
                                    <br />
                                    <br />
                                    <hr class="linesHTML" />
                                </td>
                            </tr>

                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    
                                    <div class="back_cel_den_color">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="back_cel_den_color txt_az_bold">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp; El(los) ejercicio(s) fiscal(es) en que se presentan los presuntos hechos irregulares"></asp:Label>
                                    </div>                                                                  
                                    
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    
                                    <div class="back_cel_den_NoColor">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="txt_az_normal back_cel_den_NoColor">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp; Selección múltiple &nbsp;"></asp:Label>
                                        <asp:DropDownList ID="ddlCP" runat="server"></asp:DropDownList>
                                    </div>                                                                  
                                    
                                </td>
                            </tr>


                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    
                                    <div class="back_cel_den_color">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="back_cel_den_color txt_az_bold">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp; La descripción de los presuntos hechos irregulares"></asp:Label>
                                    </div>                                                                  
                                    
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
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
                                                <td class="txt_az_bold right_txt" style="width:10%">
                                                    <asp:Label runat="server" Text="Cargar Archivo &nbsp;"></asp:Label>   
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <asp:TextBox ID="txtRegDescArchivo" runat="server" Width="100%"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                                <td class="left_txt" style="width:5%">
                                                    <img src="../../Imagenes/file-add.png" class="img_normal_size" />
                                                    &nbsp;&nbsp;
                                                </td>
                                                <td class="txt_az_bold right_txt" style="width:20%">
                                                    <asp:Label runat="server" Text="Descripción del Archivo &nbsp;"></asp:Label>   
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <asp:TextBox ID="TextBox1" Width="100%" runat="server"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                                <td class="left_txt" style="width:5%">
                                                    <img src="../../Imagenes/garbage.png" class="img_normal_size" />                                                    
                                                   
                                                </td>
                                            </tr>
                                            <tr><td class="row_height_size"></td></tr>
                                        </table>

                                        
                                        
                                    </div>                                                                  
                                    
                                </td>
                            </tr>



                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    
                                    <div class="back_cel_den_color">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="back_cel_den_color txt_az_bold">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp; Sí es posible, se deberá disponer de elementos de prueba, documentos y evidencias mediante los cuales se presuma el manejo, aplicación o custodia irregular de recursos públicos o de su desvío."></asp:Label>
                                    </div>                                                                  
                                    
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
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
                                                <td class="txt_az_bold right_txt" style="width:10%">
                                                    <asp:Label runat="server" Text="Cargar Archivo &nbsp;"></asp:Label>   
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <asp:TextBox ID="TextBox2" runat="server" Width="100%"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                                <td class="left_txt" style="width:5%">
                                                    <img src="../../Imagenes/file-add.png" class="img_normal_size" />
                                                    &nbsp;&nbsp;
                                                </td>
                                                <td class="txt_az_bold right_txt" style="width:20%">
                                                    <asp:Label runat="server" Text="Descripción del Archivo &nbsp;"></asp:Label>   
                                                    &nbsp;
                                                </td>
                                                <td class="txt_az_normal left_txt" style="width:30%">
                                                    <asp:TextBox ID="TextBox3" Width="100%" runat="server"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                                <td class="left_txt" style="width:5%">
                                                    <img src="../../Imagenes/garbage.png" class="img_normal_size" />                                                    
                                                   
                                                </td>

                                            </tr>
                                            <tr><td class="row_height_size"></td></tr>
                                        </table>

                                        
                                        
                                    </div>                                                                  
                                    
                                </td>
                            </tr>




                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    
                                    <div class="back_cel_den_color">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="back_cel_den_color txt_az_bold">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp; Entidad(es) involucrada(s)"></asp:Label>
                                    </div>                                                                  
                                    
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="txt_az_normal">

                                        <table class="size_100">
                                           
                                            <tr><td class="row_height_size"></td></tr>
                                            <tr>
                                                <td class="txt_az_bold right_txt" style="width:25%; vertical-align:top">
                                                    <asp:Label runat="server" Text="Seleccionar el nivel de Gobierno &nbsp; &nbsp;"></asp:Label>   
                                                    
                                                </td>
                                                <td style="width: 75%" class="left_txt">
                                                    <%--<asp:RadioButtonList ID="rblNivelGobierno" runat="server" RepeatDirection="Horizontal" CssClass="txt_az_normal" >                                                        
                                                    </asp:RadioButtonList>
                                                    &nbsp;--%>

                                                    <div id="NivelGobierno"></div>
                                                    <br />
                                                </td>
                                               
                                            </tr>
                                            <tr><td class="row_height_size_5"></td></tr>
                                            <tr>
                                                <td class="txt_az_bold right_txt" style="width:25%; vertical-align:top">
                                                    <asp:Label runat="server" Text="Seleccionar la entidad involucrada &nbsp; &nbsp;"></asp:Label>                                                       
                                                </td>
                                                <td style="width: 75%" class="left_txt">
                                                    <asp:DropDownList ID="ddlEntidadInvolucrada" runat="server"></asp:DropDownList>
                                                    &nbsp;
                                                    <img src="../../Imagenes/file-add.png" class="img_normal_size" />
                                                    &nbsp;
                                                    <img src="../../Imagenes/garbage.png" class="img_normal_size" />
                                                </td>
                                               
                                            </tr>

                                            <tr><td class="row_height_size"></td></tr>

                                        </table>

                                        
                                        
                                    </div>                                                                  
                                    
                                </td>
                            </tr>




                            <tr>
                                <td style="vertical-align:top; width:3%">
                                    
                                    <div class="back_cel_den_color">
                                        <img src="../../Imagenes/manual.png" data-toggle="tooltip" title="." class="img_normal_size fToolLFRCArt61 fManualInfografia" />
                                    </div>                                    
                                </td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="back_cel_den_color txt_az_bold">
                                        <asp:Label runat="server" Text="&nbsp;&nbsp; Objeto(s) denunciado(s)"></asp:Label>
                                    </div>                                                                  
                                    
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td style="width:.2%"></td>
                                <td class="size_90 left_txt" >
                                    
                                    <div class="txt_az_normal">

                                        <table class="size_100">
                                           
                                            <tr><td class="row_height_size"></td></tr>
                                            <tr>
                                                <td class="txt_az_bold right_txt" style="width:25%; vertical-align:top">
                                                    <asp:Label runat="server" Text="Objeto(s) denunciado(s) &nbsp; &nbsp;"></asp:Label>   
                                                    
                                                </td>
                                                <td style="width: 75%" class="left_txt">
                                                   <asp:TextBox ID="txtObjetoDenunciado" runat="server" Width="50%" MaxLength="250"></asp:TextBox>
                                                    &nbsp;
                                                </td>
                                               
                                            </tr>
                                            <tr><td class="row_height_size_5"></td></tr>
                                            <tr>
                                                <td class="txt_az_bold right_txt" style="width:25%; vertical-align:top">
                                                    <asp:Label runat="server" Text="Origen de los recursos &nbsp; &nbsp;"></asp:Label>                                                       
                                                </td>
                                                <td style="width: 75%" class="left_txt">
                                                    <asp:DropDownList ID="ddlOrigenRecursos" runat="server" Width="50%"></asp:DropDownList>                                                   
                                                </td>
                                               
                                            </tr>

                                            <tr><td class="row_height_size"></td></tr>

                                        </table>

                                        
                                        
                                    </div>                                                                  
                                    
                                </td>
                            </tr>

                            <tr><td class="row_height_size"></td></tr>

                            <tr>
                                <td colspan="3" class="center_txt">
                                    <input  type="button"  name="btnContinuaDenuncia" value="Guardar"/>
                                </td>
                            </tr>

                            <tr><td class="row_height_size" colspan="3"><hr class="linesHTML" /></td></tr>


                            <tr>
                                <td colspan="3">

                                    <table class="size_100">
                                        
                                        <tr>
                                            <td class="center_txt" colspan="2" style="font-size:20px">
                                                <asp:Label CssClass="txt_dor_bold" runat="server" Text="CONTRASEÑA" ></asp:Label>                                                       
                                                <br />
                                                <br />
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td class="left_txt" colspan="2">
                                                <asp:Label CssClass="txt_az_bold" runat="server" Text="Para agregar información complementaria o consultar el estado de su denuncia, deberá ingresar una contraseña de 8 caracteres que pueda recordar fácilmente." ></asp:Label>                                                       
                                                <br />
                                                <br />
                                                <br />
                                                
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td class="left_txt" style="width:10%">
                                                <asp:Label CssClass="txt_az_normal" runat="server" Text="Contraseña"></asp:Label>     
                                                &nbsp;
                                            </td>
                                            <td class="left_txt" style="width:90%">
                                                <asp:TextBox ID="txtPSW" runat="server" Width="30%" MaxLength="8" CssClass="center_txt"></asp:TextBox>
                                                <br />
                                                <br />
                                                <br />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="left_txt" colspan="2">
                                                <asp:Label CssClass="txt_az_bold" runat="server" Text="Resuelva el Captcha." ></asp:Label>                                                       
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
                                                <img src="../../Imagenes/file-add.png" class="img_normal_size" />
                                                 &nbsp;&nbsp;&nbsp;
                                                <img src="../../Imagenes/garbage.png" class="img_normal_size" />

                                            </td>
                                           
                                        </tr>

                                        <tr><td class="row_height_size"></td></tr>


                                    </table>
                                </td>

                            </tr>

                             
                        </table>

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
                                    <asp:TextBox ID="txtSegFolio" runat="server" MaxLength="60" CssClass="center_txt" Width="100%"></asp:TextBox>
                                </td>

                                <td></td>

                                <td class="txt_az_normal">                                                                                                           
                                    <asp:TextBox ID="txtSegPsw" runat="server" MaxLength="20" CssClass="center_txt" Width="100%" TextMode="Password"></asp:TextBox>                                    
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

        </div>  <%-- Captura de la denuncia  --%>




    </div>
   
    

</asp:Content>