using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Web.Services;

namespace Sistema
{
    public partial class UploadASPX : System.Web.UI.Page
    {



        protected void Page_Load(object sender, EventArgs e)
        {
            string[] datos;
            Type cstype = this.GetType();
            string mensaje_error = "";

            if (!IsPostBack)
            {

                if (Request.QueryString["llvTipoDoc"] != null)
                {

                    datos = Request.QueryString["llvTipoDoc"].Split(',');
                    HDTipo_Archivo.Value = datos[0];
                    HDNombreArchivo.Value = datos[1];

                    HDRuta_archivo.Value = Server.MapPath("Archivos");


                    if (HDTipo_Archivo.Value == "0")
                    {

                        HDRuta_archivo.Value += @"\" + datos[2];

                    }

                }

            }
            else
            {

                string path = HDRuta_archivo.Value;
                bool fileOk = false;
                bool lengOk = false;

                HttpPostedFile filesel = fileselected.PostedFile;

                if (filesel.FileName != null)
                {
                    string fileExtension;
                    fileExtension = System.IO.Path.GetExtension(filesel.FileName).ToLower();

                    string[] allowedExtensions = { ".docx", ".doc" };



                    if (HDTipo_Archivo.Value == "0")
                    {

                        //allowedExtensions = { ".docx", ".doc"};

                    }

                    if (HDTipo_Archivo.Value == "0")
                    {
                        fileOk = true;
                    }
                    else
                    {
                        for (Int32 i = 0; i < allowedExtensions.Length; i++)
                        {
                            if (fileExtension == allowedExtensions[i])
                            {
                                fileOk = true;
                                break;
                            }
                        }
                    }

                    if (fileOk)
                    {
                        mensaje_error = "";
                    }
                    else
                    {
                        if (HDTipo_Archivo.Value == "1")
                        {
                            mensaje_error = "Solo acepta archivos doc o docx.";
                        }
                    }
                    if (HDTipo_Archivo.Value == "1")
                    {
                        lengOk = true;
                    }
                    else
                    {

                        if (filesel.ContentLength > 104857600)
                        {
                            mensaje_error = "Debe seleccionar un archivo con tamaño menor a 100 Mb";
                        }
                        else
                        {
                            lengOk = true;
                            if (mensaje_error.Length == 0)
                            {
                                mensaje_error = "";
                            }
                        }
                    }

                    if (fileOk && lengOk)
                    {
                        try
                        {

                            if (HDNombreArchivo.Value != "")
                            {
                                File.Delete(path + @"\" + HDNombreArchivo.Value);
                            }

                            string nom_archivo = Path.GetFileName(filesel.FileName);

                            string dire = path + @"\" + nom_archivo;

                            if (HDTipo_Archivo.Value == "0")
                            { 
                                if(!Directory.Exists(path))
                                {

                                    Directory.CreateDirectory(path);

                                }
                            }

                            filesel.SaveAs(dire);

                            lblRutaDocumento.Text = dire;
                            HDNombreArchivo.Value = nom_archivo;

                            HDActivo_Guardar.Value = "1";

                            //this.Dispose();
                            

                            ClientScript.RegisterStartupScript(cstype, "Script", "Regresar(1)", true);

                        }
                        catch (Exception ex)
                        {

                            Label1.Text = ex.Message;

                        }
                    }



                }

            }
        }
    }
}