using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

using System.Data;
using Negocio;




namespace Sistema.Modulos.Denuncias_IV
{
    public partial class Denuncias_IV : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }



        [WebMethod]
        public static object AJAX_cargaCatalogo( string _pClaveCatalogo, int _pTipoCatalogo)
        {
                        

           nCatalogo nCat = new nCatalogo();
                        


            try
            {
                nCat.ClaveCatalogo = _pClaveCatalogo;
                nCat.ILlaveCat = _pTipoCatalogo; // Pp--*
                nCat.Catalogos();

                if (nCat.Exception != null)
                {

                    return nCat.Exception.Message;
                }
                else
                {
                    return nCat.CatList;
                }


                nCat.ClaveCatalogo = _pClaveCatalogo;
                nCat.ILlaveCat = _pTipoCatalogo; // Pp--*
                nCat.Catalogos();

                if (nCat.Exception != null) {
                
                    return nCat.Exception.Message;
                }
                else {
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



            //[WebMethod()]
            //public static object AJAX_cargaCP()
            //{


            //    nEntidad _nEnt = new nEntidad();

            //    try
            //    {
            //        _nEnt.eEntidad.NombreEntidad = _psDesc;
            //        _nEnt.eEntidad.Periodo = 2015;


            //        _nEnt.Carga();

            //        if (_nEnt.Mensaje != "Datos cargados correctamente")
            //            return _nEnt.Mensaje;
            //        else
            //            return _nEnt.eEntidadList;
            //    }
            //    catch (Exception ex)
            //    {
            //        return ex.Message;
            //    }
            //    finally
            //    {
            //        _nEnt = null;
            //    }
            //}



        }
}