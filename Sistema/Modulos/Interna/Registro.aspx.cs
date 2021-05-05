using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Negocio;
using System.IO;

namespace Sistema.Modulos.Interna
{
    public partial class Registro : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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



    }



 


}