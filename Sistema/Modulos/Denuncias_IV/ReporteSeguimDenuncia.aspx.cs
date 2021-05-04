using System;
using Microsoft.Reporting.WebForms;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.ReportingServices;
using Sistema.DS_Reportes.dsRepSeguimDenTableAdapters;
using System.Data;

namespace Sistema.Modulos.Denuncias_IV
{
    public partial class ReporteSeguimDenuncia : System.Web.UI.Page
    {

        bool CargaPrimera = true;

        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {

                CargaPrimera = false;

                //Int32 _lLlaveDenuncia = 2;

                Int32 _lLlaveDenuncia = Int32.Parse(Request.QueryString["Llave_Denuncia"]);
                string _sCadError = "";

                DS_Reportes.dsRepSeguimDen ds = new DS_Reportes.dsRepSeguimDen();

                dtInfoDenunciaTableAdapter dtInfo = new dtInfoDenunciaTableAdapter();
                dtInfo.Fill(ds.dtInfoDenuncia, _lLlaveDenuncia);


                DS_Reportes.dsRepSeguimDen ds2 = new DS_Reportes.dsRepSeguimDen();

                sp_TraeInfoDenunciaTabTableAdapter dtInfo2 = new sp_TraeInfoDenunciaTabTableAdapter();
                dtInfo2.Fill(ds2.sp_TraeInfoDenunciaTab, _lLlaveDenuncia, ref _sCadError);

                

                ReportDataSource rds = new ReportDataSource("dsInfoDenuncia", ds.Tables[0]);
                ReportDataSource rd2 = new ReportDataSource("dsTraeDatosTabla",(DataTable)dtInfo2.GetData(_lLlaveDenuncia, ref _sCadError));

                rptSeguimDen.LocalReport.ReportPath = "Reportes/rSeguimientoDen.rdlc";

                rptSeguimDen.LocalReport.DataSources.Clear();
                rptSeguimDen.LocalReport.DataSources.Add(rds);
                rptSeguimDen.LocalReport.DataSources.Add(rd2);
                

                //ReportParameter[] parameters = new ReportParameter[1];

                //parameters[0] = new ReportParameter("llaveDen_param", _lLlaveDenuncia.ToString(), true);

                //rptSeguimDen.LocalReport.SetParameters(parameters);
                rptSeguimDen.LocalReport.Refresh();

            }
            
            //Int32 _lLlaveDenuncia = Int32.Parse(Session["Llave_denuncia"].ToString());
           

        }
    }
}