using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Negocio;
using System.Data;
using System.IO;
using System.Configuration;
using System.Net;
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.Globalization;
using System.Threading;

namespace Sistema.Modulos.Interna
{
    public partial class Registro : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            HDUrlSitio.Value = ConfigurationManager.AppSettings["URLSitio"];


            HDRutaServ.Value = Server.MapPath("");
            HDRutaServ.Value = HDRutaServ.Value.Substring(0, HDRutaServ.Value.LastIndexOf(@"\"));
            HDRutaServ.Value = HDRutaServ.Value.Substring(0, HDRutaServ.Value.LastIndexOf(@"\"));

            HDRutaServ.Value = HDRutaServ.Value + @"\Archivos";

            if (HDLlaveDocumento.Value != "0")
            {

                VerOficioProc();

            }
            else if(!(HDVerLlaveDoc.Value=="0" && HDVerRutaDoc.Value==""))
            {
                VerDocumentacion();
            }
            else if (HDImprimirFolio.Value == "1")
            {

                ImprimirFolio();

            }

            hdnCvePrivadaReCaptcha.Value = ConfigurationManager.AppSettings["CvePrivadaReCaptcha"];
            hdnCvePublicaReCaptcha.Value = ConfigurationManager.AppSettings["CvePublicaRecaptcha"];

            

        }

        public void VerDocumentacion()
        {
            string sNomArch = "";
            byte[] bDocumento = null;

            if(HDVerLlaveDoc.Value!="0")
            {
                nSeguimiento nSeg = new nSeguimiento();

                nSeg.TraeDocumento(Convert.ToInt32(HDVerLlaveDoc.Value));

                if (nSeg.Exception == null)
                {

                    sNomArch = Path.GetFileName(nSeg.ListDoc[0]._sNombreDocumento);
                    bDocumento = nSeg.ListDoc[0]._bDocumento;
                    //nSeg.Exception.Message;
                }
            }
            else if(HDVerRutaDoc.Value!= "")
            {
                sNomArch = Path.GetFileName(HDVerRutaDoc.Value);
                bDocumento = File.ReadAllBytes(HDVerRutaDoc.Value);

            }

            Response.Clear();
            Response.ClearContent();
            Response.Buffer = true;

            Response.AddHeader("content-disposition", "attachment; filename=" + sNomArch);

            switch(Path.GetExtension(sNomArch.Trim()).ToLower())
            {

                case ".txt":
                    Response.ContentType = "text/plain";
                    break;

                case ".pdf":
                    Response.ContentType = "application/pdf";
                    break;

                case ".doc":
                case ".docx":
                case ".rtf":
                    Response.ContentType = "Application/msword";
                    break;
                    
                case ".xls":
                case ".xlsx":
                    Response.ContentType = "Application/x-msexcel";
                    break;

                case "swf":
                    Response.ContentType = "application/x-shockwave-flash";
                    break;

                case ".jpg":
                case ".jpeg":
                    Response.ContentType = "image/jpeg";
                    break;

                case ".gif":
                    Response.ContentType = "image/GIF";
                    break;

                case ".png":
                    Response.ContentType = "image/png";
                    break;

                case ".bmp":
                    Response.ContentType = "image/bmp";
                    break;

                case ".webp":
                    Response.ContentType = "image/webp";
                    break;

                case ".midi":
                    Response.ContentType = "audio/midi";
                    break;

                case ".wav":
                    Response.ContentType = "audio/wav";
                    break;

                case ".webm":
                    Response.ContentType = "video/webm";
                    break;

                case ".ogg":
                    Response.ContentType = "video/ogg";
                    break;

                case ".mpeg":
                    Response.ContentType = "video/mpeg";
                    break;

                case ".mp4":
                case ".m4a":
                case ".m4p":
                case ".m4b":
                case ".m4r":
                case ".m4v":
                    Response.ContentType = "video/mp4";
                    break;

                case ".mov":
                    Response.ContentType = "video/quicktime";
                    break;

                case ".wmv":
                case ".avi":
                    Response.ContentType = "video/x-ms-wmv";
                    break;

                case ".htm":
                case ".html":
                    Response.ContentType = "text/HTML";
                    break;

                default: 
                    Response.ContentType = "application/octet-stream"; 
                    break;



            }

            

            Response.BinaryWrite(bDocumento);

            Response.Flush();

            Response.End();

        }



        public void VerOficioProc()
        {
            nSeguimiento nSeg = new nSeguimiento();

            nSeg.TraeDocumento(Convert.ToInt32(HDLlaveDocumento.Value));

            if (nSeg.Exception == null)
            {

                Response.Clear();
                Response.ClearContent();
                Response.Buffer = true;

                Response.AddHeader("content-disposition", "attachment; filename=" + Path.GetFileName(nSeg.ListDoc[0]._sNombreDocumento));

                Response.ContentType = " application/pdf";

                Response.BinaryWrite(nSeg.ListDoc[0]._bDocumento);

                Response.Flush();

                Response.End();

                //nSeg.Exception.Message;
            }
            else
            {
                //return "Datos modificados correctamente";

            }

        }

        public void ImprimirFolio()
        {
            string _sNombreArchCompleto = HDRutaServ.Value + @"\Folio_" + HDLlaveDenuncia.Value + ".pdf";
            string _sLogoRuta = HDRutaServ.Value.Substring(0, HDRutaServ.Value.LastIndexOf(@"\")) + @"\Imagenes\logo.png";
            string _sImgFolio = HDRutaServ.Value.Substring(0, HDRutaServ.Value.LastIndexOf(@"\")) + @"\Imagenes\folio_capturado.png";



            iTextSharp.text.Document docPDF = new iTextSharp.text.Document(PageSize.LETTER, 30, 30, 20, 50);
            iTextSharp.text.pdf.PdfWriter writer = PdfWriter.GetInstance(docPDF, new FileStream(_sNombreArchCompleto, FileMode.Create));

            iTextSharp.text.BaseColor FontLetraColor = new iTextSharp.text.BaseColor(4, 34, 106);

            docPDF.Open();

            iTextSharp.text.Image _iLogo = iTextSharp.text.Image.GetInstance(_sLogoRuta);
            _iLogo.ScaleAbsolute(140, 50);

            iTextSharp.text.pdf.PdfPTable _tEncabezado = new iTextSharp.text.pdf.PdfPTable(2);
            _tEncabezado.WidthPercentage = 100.0F;

            float[] _fTEwidth  = { 200.0F, 500.0F};
            _tEncabezado.SetWidths(_fTEwidth);

            iTextSharp.text.pdf.PdfPCell _cLogo = new iTextSharp.text.pdf.PdfPCell(_iLogo);

            _cLogo.Border = Rectangle.NO_BORDER;

            _tEncabezado.AddCell(_cLogo);

            iTextSharp.text.Paragraph pTitulo = new iTextSharp.text.Paragraph()
            {
                // Font = 
                Font = new iTextSharp.text.Font(iTextSharp.text.FontFactory.GetFont("Calibri", 14, iTextSharp.text.Font.BOLD)),
                Alignment = iTextSharp.text.Element.ALIGN_RIGHT,
                
            };

            DateTime _dHoy = DateTime.Now;
            string _sFechaHoy = _dHoy.ToString("D", new CultureInfo("es-MX"));

            _sFechaHoy = _sFechaHoy.Substring(_sFechaHoy.IndexOf(",")+2);

            pTitulo.Add("Ciudad de México, a " + _sFechaHoy);

            PdfPCell _cTituloEnc = new PdfPCell();

            _cTituloEnc.Border = iTextSharp.text.Rectangle.NO_BORDER;

            _cTituloEnc.AddElement(pTitulo);

            _tEncabezado.AddCell(_cTituloEnc);

            docPDF.Add(_tEncabezado);

            iTextSharp.text.Paragraph pPEspacio = new iTextSharp.text.Paragraph();
            pPEspacio.Add(Environment.NewLine);
            docPDF.Add(pPEspacio);



            iTextSharp.text.Image _iFolio = iTextSharp.text.Image.GetInstance(_sImgFolio);
            _iFolio.ScaleAbsolute(140,120);

            iTextSharp.text.pdf.PdfPTable _tCuerpo1 = new iTextSharp.text.pdf.PdfPTable(2);
            _tCuerpo1.WidthPercentage = 80.0F;

            float[] _fCwidth = { 40.0F, 60.0F };
            _tCuerpo1.SetWidths(_fCwidth);

            iTextSharp.text.pdf.PdfPCell _cFolio = new iTextSharp.text.pdf.PdfPCell(_iFolio);

            _cFolio.Border = Rectangle.NO_BORDER;

            _tCuerpo1.AddCell(_cFolio);

            iTextSharp.text.Paragraph p1 = new iTextSharp.text.Paragraph()
            {
                // Font = 
                Font = new iTextSharp.text.Font(iTextSharp.text.FontFactory.GetFont("Verdana", 11, iTextSharp.text.Font.NORMAL, FontLetraColor)),
                Alignment = iTextSharp.text.Element.ALIGN_CENTER

            };

            p1.Add("Su denuncia fue recibida");

            iTextSharp.text.Paragraph p2 = new iTextSharp.text.Paragraph()
            {
                // Font = 
                Font = new iTextSharp.text.Font(iTextSharp.text.FontFactory.GetFont("Verdana", 11, iTextSharp.text.Font.BOLD, FontLetraColor)),
                Alignment = iTextSharp.text.Element.ALIGN_CENTER

            };

            p2.Add("¡Agradecemos su participación!");
            p2.Add(Environment.NewLine);
            p2.Add(Environment.NewLine);
            p2.Add("Folio de registro de la denuncia");

            iTextSharp.text.Paragraph p3 = new iTextSharp.text.Paragraph()
            {
                // Font = 
                Font = new iTextSharp.text.Font(iTextSharp.text.FontFactory.GetFont("Verdana", 11, iTextSharp.text.Font.NORMAL, FontLetraColor)),
                Alignment = iTextSharp.text.Element.ALIGN_CENTER

            };
            p3.Add(HDFolio.Value);

            PdfPCell _cMensaje = new PdfPCell();

            _cMensaje.Border = iTextSharp.text.Rectangle.NO_BORDER;

            _cMensaje.AddElement(p1);
            _cMensaje.AddElement(p2);
            _cMensaje.AddElement(p3);

            _tCuerpo1.AddCell(_cMensaje);

            docPDF.Add(_tCuerpo1);

            //Meter otro espacio
            docPDF.Add(pPEspacio);

            iTextSharp.text.Paragraph pMensajeFinal = new iTextSharp.text.Paragraph()
            {
                // Font = 
                Font = new iTextSharp.text.Font(iTextSharp.text.FontFactory.GetFont("Verdana", 11, iTextSharp.text.Font.NORMAL, FontLetraColor)),
                Alignment = iTextSharp.text.Element.ALIGN_CENTER

            };
            pMensajeFinal.Add("La ASF emitirá la respuesta que proceda por las áreas competentes, y se le comunicará por alguno de los siguientes medios:");
            pMensajeFinal.Add(Environment.NewLine);
            pMensajeFinal.Add(Environment.NewLine);
            pMensajeFinal.Add("Por el correo electrónico proporcionado o el Folio de Registro de la Denuncia");

            docPDF.Add(pMensajeFinal);

            docPDF.Close();

            Thread.Sleep(3000);

            byte[] _bData = File.ReadAllBytes(_sNombreArchCompleto);

            Thread.Sleep(3000);

            File.Delete(_sNombreArchCompleto);

            Response.Clear();
            Response.ClearContent();
            Response.Buffer = true;

            Response.AddHeader("content-disposition", "attachment; filename=" + Path.GetFileName(_sNombreArchCompleto));

            Response.ContentType = " application/pdf";


            Response.BinaryWrite(_bData);

            Response.Flush();

            Response.End();

        }

        [WebMethod]
        public static object AJAX_RegistraHechos(long _plLlaveDenuncia, long _plLlaveTipoDenuncia, object _poArrLlavesHechos)
        {

            DataTable _dtHechosDenuncia = new DataTable();
            nDenuncia nDen = new nDenuncia();
            DataRow _drDts;
            Int32 _iCont = 0;
            string _sRespuesta = "";

            object[] _oLlavesHechos = (object[])_poArrLlavesHechos;


            try
            {
                _dtHechosDenuncia.Columns.Add("llave_obj_prin", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("llave_obj_sub", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("llave_obj_sub_vinc", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("llave_tipo_relacion", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("consecutivo", typeof(Int32));

                if( _poArrLlavesHechos != null)
                {
                    _drDts = null;
                    _iCont = 0;

                    for (_iCont = 0; _iCont < _oLlavesHechos.Length; _iCont++)
                    {

                        _drDts = _dtHechosDenuncia.NewRow();
                        _drDts["llave_obj_prin"] = 2;
                        _drDts["llave_obj_sub"] = 3;
                        _drDts["llave_obj_sub_vinc"] = Int32.Parse(_oLlavesHechos[_iCont].ToString());
                        _drDts["llave_tipo_relacion"] = 36;
                        _drDts["consecutivo"] = _iCont +1;

                        _dtHechosDenuncia.Rows.Add(_drDts);

                    }



                }

                //QUITAR EL HOLA
                _sRespuesta = nDen.RegistroSol( _plLlaveDenuncia, _plLlaveTipoDenuncia, 0, "",0,"","","","hola",_dtHechosDenuncia,null,null,null,null);

                if (nDen.Exception != null)
                {

                    return nDen.Exception.Message;
                }
                else
                {
                    return _sRespuesta;

                }

                //return nSeg.ListCons;

                
       
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }

        [WebMethod]
        public static object AJAX_RegistraDatosDenun( long _plLlaveDenuncia
                                                    , long _plLlaveTipoDenuncia
                                                    , long _plNivelGobierno
                                                    , object _poArrLlavesHechos
                                                    , object _poArrLlavesCP
                                                    , object _poArrDocPres
                                                    , object _poArrDocEv
                                                    , object _poArrEntidades
                                                    , string _psObjetosDenunciados
                                                    , int _piOrigenRecursos
                                                    , string _psPSWDenunciante 
                                                    )
        {

            //

            DataTable _dtHechosDenuncia = new DataTable();
            DataTable _dtCP = new DataTable();
            DataTable _dtDocPresIrr = new DataTable();
            DataTable _dtDocEvid = new DataTable();
            DataTable _dtEntidades = new DataTable();
            nDenuncia nDen = new nDenuncia();
            DataRow _drDts;
            Int32 _iCont = 0;
            string _sRespuesta = "";

            object[] _oLlavesHechos = (object[])_poArrLlavesHechos;
            object[] _oLlavesCP = (object[])_poArrLlavesCP;
            object[] _oDocPresIrr = (object[])_poArrDocPres;
            object[] _oDocEv = (object[])_poArrDocEv;
            object[] _oEntidades = (object[])_poArrEntidades;

            string sRutaServidor = "";

            try
            {

                //Hechos de Denuncia

                _dtHechosDenuncia.Columns.Add("llave_obj_prin", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("llave_obj_sub", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("llave_obj_sub_vinc", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("llave_tipo_relacion", typeof(Int32));
                _dtHechosDenuncia.Columns.Add("consecutivo", typeof(Int32));

                if (_poArrLlavesHechos != null)
                {
                    _drDts = null;
                    _iCont = 0;

                    for (_iCont = 0; _iCont < _oLlavesHechos.Length; _iCont++)
                    {

                        _drDts = _dtHechosDenuncia.NewRow();
                        _drDts["llave_obj_prin"] = 2;
                        _drDts["llave_obj_sub"] = 3;
                        _drDts["llave_obj_sub_vinc"] = Int32.Parse(_oLlavesHechos[_iCont].ToString());
                        _drDts["llave_tipo_relacion"] = 36;
                        _drDts["consecutivo"] = _iCont + 1;

                        _dtHechosDenuncia.Rows.Add(_drDts);

                    }



                }

                // Cuentas Públicas 


                _dtCP.Columns.Add("llave_obj_prin", typeof(Int32));
                _dtCP.Columns.Add("llave_obj_sub", typeof(Int32));
                _dtCP.Columns.Add("llave_obj_sub_vinc", typeof(Int32));
                _dtCP.Columns.Add("llave_tipo_relacion", typeof(Int32));
                _dtCP.Columns.Add("consecutivo", typeof(Int32));


                if (_poArrLlavesCP != null)
                {
                    _drDts = null;
                    _iCont = 0;

                    for (_iCont = 0; _iCont < _oLlavesCP.Length; _iCont++)
                    {

                        _drDts = _dtCP.NewRow();
                        _drDts["llave_obj_prin"] = 2;
                        _drDts["llave_obj_sub"] = 4;
                        _drDts["llave_obj_sub_vinc"] = Int32.Parse(_oLlavesCP[_iCont].ToString());
                        _drDts["llave_tipo_relacion"] = 31;
                        _drDts["consecutivo"] = _iCont + 1;

                        _dtCP.Rows.Add(_drDts);

                    }



                }



                //Documentos Irregularidades

                _dtDocPresIrr.Columns.Add("llave_tipo_documento", typeof(Int32));
                _dtDocPresIrr.Columns.Add("nombre_documento", typeof(string));
                _dtDocPresIrr.Columns.Add("descripcion_documento", typeof(string));
                _dtDocPresIrr.Columns.Add("documento", typeof(byte[]));
                _dtDocPresIrr.Columns.Add("llave_obj", typeof(Int32));
                _dtDocPresIrr.Columns.Add("identifica_cmb", typeof(Int32));

                if (_poArrDocPres != null)
                {
                    _drDts = null;
                    _iCont = 0;

                    for (_iCont = 0; _iCont < _oDocPresIrr.Length; _iCont++)
                    {

                        string[] S_DatosDocumento = _oDocPresIrr[_iCont].ToString().Split('#');

                        

                        Byte[] B_bytesDocumento;

                        if(S_DatosDocumento[0]!="")
                        {
                            
                            string S_RutaDocumento = S_DatosDocumento[0].Replace("//", "\\");
                            B_bytesDocumento = File.ReadAllBytes(S_RutaDocumento);


                            sRutaServidor = S_RutaDocumento;
                            sRutaServidor = sRutaServidor.Substring(0, sRutaServidor.LastIndexOf(@"\"));

                        }
                        else
                        {
                            B_bytesDocumento = new Byte[1];
                        }

                        _drDts = _dtDocPresIrr.NewRow();
                        _drDts["llave_tipo_documento"] = 38;
                        _drDts["nombre_documento"] = S_DatosDocumento[1];
                        _drDts["descripcion_documento"] =  S_DatosDocumento[2];
                        _drDts["documento"] = B_bytesDocumento;
                        _drDts["llave_obj"] = 2;
                        _drDts["identifica_cmb"] = 0;

                        _dtDocPresIrr.Rows.Add(_drDts);

                    }



                }

                //Documentos Evidencia

                _dtDocEvid.Columns.Add("llave_tipo_documento", typeof(Int32));
                _dtDocEvid.Columns.Add("nombre_documento", typeof(string));
                _dtDocEvid.Columns.Add("descripcion_documento", typeof(string));
                _dtDocEvid.Columns.Add("documento", typeof(byte[]));
                _dtDocEvid.Columns.Add("llave_obj", typeof(Int32));
                _dtDocEvid.Columns.Add("identifica_cmb", typeof(Int32));

                if (_poArrDocEv != null)
                {
                    _drDts = null;
                    _iCont = 0;

                    for (_iCont = 0; _iCont < _oDocEv.Length; _iCont++)
                    {

                        string[] S_DatosDocumento = _oDocEv[_iCont].ToString().Split('#');



                        Byte[] B_bytesDocumento;

                        if (S_DatosDocumento[0] != "")
                        {

                            string S_RutaDocumento = S_DatosDocumento[0].Replace("//", "\\");
                            B_bytesDocumento = File.ReadAllBytes(S_RutaDocumento);


                            sRutaServidor = S_RutaDocumento;
                            sRutaServidor = sRutaServidor.Substring(0, sRutaServidor.LastIndexOf(@"\"));

                        }
                        else
                        {
                            B_bytesDocumento = new Byte[1];
                        }

                        _drDts = _dtDocEvid.NewRow();
                        _drDts["llave_tipo_documento"] = 39;
                        _drDts["nombre_documento"] = S_DatosDocumento[1];
                        _drDts["descripcion_documento"] = S_DatosDocumento[2];
                        _drDts["documento"] = B_bytesDocumento;
                        _drDts["llave_obj"] = 2;
                        _drDts["identifica_cmb"] = 0;

                        _dtDocEvid.Rows.Add(_drDts);

                    }

                }

           

                //Entidades involucradas

                long _iConsecutivo = 1;

                _dtEntidades.Columns.Add("llave_objeto", typeof(Int32));
                _dtEntidades.Columns.Add("llave_tipo_texto", typeof(Int32));
                _dtEntidades.Columns.Add("consecutivo", typeof(Int32));
                _dtEntidades.Columns.Add("nombre_entidad", typeof(string));
                

                if (_poArrEntidades != null)
                {
                    _drDts = null;
                    _iCont = 0;

                    for (_iCont = 0; _iCont < _oEntidades.Length; _iCont++)
                    {



                        ;

                        _drDts = _dtEntidades.NewRow();
                        _drDts["llave_objeto"] = 2;
                        _drDts["llave_tipo_texto"] = 32;
                        _drDts["consecutivo"] = _iConsecutivo;
                        _drDts["nombre_entidad"] = _oEntidades[_iCont].ToString();


                        _dtEntidades.Rows.Add(_drDts);

                        _iConsecutivo++;
                    }



                }

        
                _sRespuesta = nDen.RegistroSol(_plLlaveDenuncia, _plLlaveTipoDenuncia, _plNivelGobierno, _psObjetosDenunciados, _piOrigenRecursos, "","", "", _psPSWDenunciante, _dtHechosDenuncia, _dtCP, _dtEntidades, _dtDocPresIrr, _dtDocEvid);

                if(sRutaServidor!="")
                {
                    Directory.Delete(sRutaServidor, true);
                }

                if (nDen.Exception != null)
                {

                    return nDen.Exception.Message;
                }
                else
                {
                    return _sRespuesta;

                }

                //return nSeg.ListCons;



            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }

        


        [WebMethod]
        public static object AJAX_ConsultaInfoDenunciaFP(string _psFolio, string _psPassword, long _plLlaveDenuncia)
        {


            nDenuncia nDen = new nDenuncia();



            try
            {
                nDen.TraeInfoDenunciasFP(_psFolio, _psPassword, _plLlaveDenuncia);

                if (nDen.Exception != null)
                {

                    return nDen.Exception.Message;
                }
                else
                {
                    return nDen.ListInfoDen;

                }


            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }

        [WebMethod]
        public static object AJAX_validacionDenuncia(long plLlaveDenuncia)
        {


            nDenuncia nDen = new nDenuncia();



            try
            {
                nDen.validarDenuncia(plLlaveDenuncia);

                return nDen.MensajeError;


            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }



        [WebMethod]
        public static object AJAX_envioDenuncia(long plLlaveDenuncia)
        {

           
            nDenuncia nDen = new nDenuncia();


            

            try 
            {
                nDen.envioDenuncia(plLlaveDenuncia);

                if (nDen.Exception != null)
                {

                    return nDen.Exception.Message;
                }
                else
                {
                    return "Denuncia enviada correctamente";

                }



            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }

        [WebMethod]
        public static object AJAX_ConsultaEnvioDenuncia(string _psFolio, string _psPassword)
        {


            nDenuncia nDen = new nDenuncia();
            string _sResp = "";

            

            try
            {

                _sResp = nDen.ConsultaEnvioDenuncia(_psFolio, _psPassword);

                if (nDen.Exception != null)
                {

                    return nDen.Exception.Message;
                }
                else
                {
                    return _sResp;

                }



            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }


        [WebMethod]
        public static object AJAX_cargaCatalogo(string ClaveCatalogo, int LlaveTipoCat)
        {


            nCatalogo nCat = new nCatalogo();



            try
            {
                nCat.ClaveCatalogo = ClaveCatalogo;
                nCat.LlaveTipoCat = LlaveTipoCat; 

                nCat.Catalogos();

                if (nCat.Exception != null)
                {

                    return nCat.Exception.Message;
                }
                else
                {
                    return nCat.CatList;

                }


            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nCat = null;
            }
        }


        

        
        [WebMethod]

        public static string AJAX_verificaReCaptcha(string _sResponse, string _psCvePrivada)
        {
            
            string _sReCaptchaSecret = _psCvePrivada;

            string url = "https://www.google.com/recaptcha/api/siteverify?secret=" + _sReCaptchaSecret + "&response=" + _sResponse;
            return (new WebClient()).DownloadString(url);
        }

        [WebMethod]
        public static object AJAX_enviarCorreo(string _psCorreo,
                                               string _psURL)
        {


            nDenuncia nDen = new nDenuncia();

            string _sUrl= _psURL + "Registro.aspx?datos=";

            try
            {


                //nDen.EnvioValCorreo(_psURL, _psCorreo, _psCCO, _sMensaje);


                return "Correo enviado correctamente";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nDen = null;
            }
        }

        
       




    }



 


}