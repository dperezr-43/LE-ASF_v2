using Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Sistema.Modulos.Denuncias_IV
{
    public partial class Seguimiento_Denuncia : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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
        public static object AJAX_traeEstados()
        {


            nCatalogo nCat = new nCatalogo();



            try
            {
                //nCat.ClaveCatalogo = _pClaveCatalogo;

                //nCat.TraeCatalogo();

                //if (nCat.Exception != null)
                //{

                //    return nCat.Exception.Message;
                //}
                //else
                //{
                //    return nCat.CatList;

                //}

                //return  nCat.CatList;

                return "Datos";

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

        
    }
}