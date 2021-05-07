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

namespace Sistema.Modulos.Interna
{
    public partial class Registro : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            HDRutaServ.Value = Server.MapPath("");
            HDRutaServ.Value = HDRutaServ.Value.Substring(0, HDRutaServ.Value.LastIndexOf(@"\"));
            HDRutaServ.Value = HDRutaServ.Value.Substring(0, HDRutaServ.Value.LastIndexOf(@"\"));

            HDRutaServ.Value = HDRutaServ.Value + @"\Archivos";

            if (HDLlaveDocumento.Value != "0")
            {

                VerOficioProc();

            }


        }



        public void VerOficioProc()
        {
            nSeguimiento nSeg = new nSeguimiento();

            nSeg.TraeDocumento(Convert.ToInt32(HDLlaveDocumento.Value), Convert.ToInt32(HDLlaveTipoDocumento.Value));

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

                _sRespuesta = nDen.RegistroSol( _plLlaveDenuncia, _plLlaveTipoDenuncia, 0, "",0,"","","",_dtHechosDenuncia,null,null,null,null);

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
                                                    , object _poArrLlavesHechos
                                                    , object _poArrDocPres
                                                    )
        {

            //, object _poArrDocEv

            DataTable _dtHechosDenuncia = new DataTable();
            DataTable _dtDocPresIrr = new DataTable();
            nDenuncia nDen = new nDenuncia();
            DataRow _drDts;
            Int32 _iCont = 0;
            string _sRespuesta = "";

            object[] _oLlavesHechos = (object[])_poArrLlavesHechos;
            object[] _oDocPresIrr = (object[])_poArrDocPres;
            //object[] _oDocEv = (object[])_poArrDocEv;
            

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

                //Documentos Irregularidades

                _dtDocPresIrr.Columns.Add("llave_tipo_documento", typeof(Int32));
                _dtDocPresIrr.Columns.Add("nombre_documento", typeof(string));
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


                            //sRutaServidor = S_DatosDocumento[0];
                           // sRutaServidor = sRutaServidor.Substring(0, sRutaServidor.LastIndexOf(@"\"));

                        }
                        else
                        {
                            B_bytesDocumento = new Byte[1];
                        }

                        _drDts = _dtDocPresIrr.NewRow();
                        _drDts["llave_tipo_documento"] = 38;
                        _drDts["nombre_documento"] = S_DatosDocumento[1] + "#"+ S_DatosDocumento[2];
                        _drDts["documento"] = B_bytesDocumento;
                        _drDts["llave_obj"] = 2;
                        _drDts["identifica_cmb"] = 0;

                        _dtDocPresIrr.Rows.Add(_drDts);

                    }



                }



                _sRespuesta = nDen.RegistroSol(_plLlaveDenuncia, _plLlaveTipoDenuncia, 0, "", 0, "", "", "", _dtHechosDenuncia, null, null, _dtDocPresIrr, null);

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
        public static object AJAX_ConsultaInfoDenunciaFP(string _psFolio, string _psPassword)
        {


            nDenuncia nDen = new nDenuncia();



            try
            {
                nDen.TraeInfoDenunciasFP(_psFolio, _psPassword);

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

       

                //nSeg.Exception.Message;
  


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


        // DPR - Guardado general de la denuncia 
        [WebMethod]
        public static object AJAX_GuardaDenuncia(long _plLlaveDenuncia, long _plLlaveTipoDenuncia, object _poArrLlavesHechos, string _psPSWDenunciante)
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

                _sRespuesta = nDen.RegistroSol(_plLlaveDenuncia, _plLlaveTipoDenuncia, 0, "", 0, "", "", _psPSWDenunciante, _dtHechosDenuncia, null, null, null, null);

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


    }



 


}