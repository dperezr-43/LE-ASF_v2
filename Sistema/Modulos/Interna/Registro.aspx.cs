using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Negocio;
using System.Data;

namespace Sistema.Modulos.Interna
{
    public partial class Registro : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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



    }
}