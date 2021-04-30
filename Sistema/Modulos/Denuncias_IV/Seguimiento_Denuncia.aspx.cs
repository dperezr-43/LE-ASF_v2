
using System;
using System.Collections.Generic;
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



            try
            {
                //nCat.ClaveCatalogo = _pClaveCatalogo;



                nSeg.EnvioCorreo(_psFolio, _psPara, _psCCO, _psMensaje);

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

                nSeg.RegistroOficioProc(_plLlaveDenuncia, _psNombreArchivo, _bByte, _psLlaveUsuario);

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

        



    }
}