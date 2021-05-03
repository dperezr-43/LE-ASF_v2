
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Negocio;

namespace Sistema.Modulos.Denuncias_IV
{
    public partial class Seguimiento_Denuncia : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Quitar código después
            HDllaveUsr.Value = "JITREJO250191";

            if(HDLlaveDocumento.Value != "0")
            {

                VerOficioProc();

            }

        }
        [WebMethod]
        public static object AJAX_traeConsultas()
        {


            nSeguimiento nSeg = new nSeguimiento();



            try
            {
                //nCat.ClaveCatalogo = _pClaveCatalogo;



                nSeg.TraeConsulta();

                //if (nCat.Exception != null)
                //{

                //    return nCat.Exception.Message;
                //}
                //else
                //{
                //    return nCat.CatList;

                //}

                return nSeg.ListCons;

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nSeg = null;
            }
        }


        [WebMethod]
        public static object AJAX_traeCatalogo(string _psClaveCatalogo, long _plLlaveTipoCat)
        {

            nCatalogo nCat = new nCatalogo();

            try
            {
                nCat.ClaveCatalogo = _psClaveCatalogo;
                nCat.LlaveTipoCat = _plLlaveTipoCat;
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
        public static object AJAX_cambioEstado(long _plLlaveDenuncia,
                                               long _plEstado,
                                               long _plSubEstado,
                                               string _psLlaveUsuario)
        {

            nSeguimiento nSeg = new nSeguimiento();

            try
            {

                nSeg.CambioEstado(_plLlaveDenuncia, _plEstado, _plSubEstado, _psLlaveUsuario);

                if (nSeg.Exception != null)
                {

                    return nSeg.Exception.Message;
                }
                else
                {
                    return "Datos modificados correctamente";

                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nSeg = null;
            }
        }
        


         [WebMethod]
        public static object AJAX_enviarCorreo(string _psFolio,
                                               string _psPara,
                                               string _psCCO,
                                               string _psMensaje)
        {


            nSeguimiento nSeg = new nSeguimiento();

            string _sMensaje = _psMensaje.Replace("#", "'");

            try
            {
                //nCat.ClaveCatalogo = _pClaveCatalogo;



                nSeg.EnvioCorreo(_psFolio, _psPara, _psCCO, _sMensaje);

                //if (nCat.Exception != null)
                //{

                //    return nCat.Exception.Message;
                //}
                //else
                //{
                //    return nCat.CatList;

                //}

                //return nSeg.ListCons;

                return "Correo enviado correctamente";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nSeg = null;
            }
        }

        [WebMethod]
        public static object AJAX_regOficioProcedencia(long _plLlaveDenuncia,
                                               string _psNombreArchivo,
                                               object _pByteOfic,
                                               string _psLlaveUsuario)
        {

            nSeguimiento nSeg = new nSeguimiento();

            System.Collections.Generic.Dictionary<string, object> _lObj = (System.Collections.Generic.Dictionary<string, object>)_pByteOfic;

            //Int32 _long = _pByteOfic.

            byte[] _bByte = new byte[_lObj.Count];
            Int32 _lPos = 0;

            foreach(KeyValuePair<string,object> kvp in _lObj)
            {

                _bByte[_lPos] = Byte.Parse(kvp.Value.ToString());
                _lPos+= 1;
            }

            try
            {

                nSeg.RegistroOficioProc(_plLlaveDenuncia, 2,_psNombreArchivo, _bByte, _psLlaveUsuario,37,"","","1");

                if (nSeg.Exception != null)
                {

                    return nSeg.Exception.Message;
                }
                else
                {
                    return "Datos modificados correctamente";

                }
                return "Datos modificados correctamente";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nSeg = null;
            }
        }

        [WebMethod]
        public static object AJAX_traeDocumentosDenuncia(long _plLlaveDenuncia)
        {

            nSeguimiento nSeg = new nSeguimiento();

            
            try
            {

                nSeg.TraeDocumentosDenuncia(_plLlaveDenuncia, 2);

                if (nSeg.Exception != null)
                {

                    return nSeg.Exception.Message;
                }
                else
                {
                    return nSeg.ListDoc;

                }
                
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                nSeg = null;
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
    }
}