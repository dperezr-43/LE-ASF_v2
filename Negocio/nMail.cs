using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using Datos;


using System.Net.Mail;
using System.Configuration;


namespace Negocio
{
    public class nMail
    {

        private Exception _Exception;
        private string _sMensaje;
        
        private eMail _eMail;
        private DatosSQL _dData;
        //private List<DataParam> _lParam;
        //private nLog _nLog;
        
        public string LigaValidacion { get; set; } = string.Empty;

        private string _sMail;

        private static readonly string _sHost = "10.7.202.5";
        private static readonly string _sDirMail = "participacionciudadana@asf.gob.mx";

        public string _sDate = String.Format("{0:ddMMyyyy}", DateTime.Today);

        public string Mail
        {
            get
            {
                return _sMail;
            }
            set
            {
                _sMail = value;
            }
        }

        public string Mensaje
        {
            get
            {
                return _sMensaje;
            }
        }

        // Public ReadOnly Property eMailList() As List(Of eMail)
        // Get
        // Return _eMailList
        // End Get
        // End Property

        public eMail eMail
        {
            get
            {
                return _eMail;
            }
        }

        //public Exception Exception
        //{
        //    get
        //    {
        //        return _Exception;
        //    }
        //    set
        //    {
        //        //_Exception = _value;
        //        //_nLog.ErrorMsg = _value.Message;
        //        //_nLog.Ruta = ConfigurationManager.AppSettings("rutaLog").ToString;
        //        //_nLog.GrabaLog();
        //    }
        //}

        public nMail()
        {
            _Exception = null;
            // _eMailList = New List(Of eMail)
            _eMail = new eMail();
            _dData = new DatosSQL();
            //_nLog = new nLog();
        }


       

        

        public string mes(int _piMes)
        {
            switch (_piMes)
            {
                case 1:
                    {
                        return "Enero";
                    }

                case 2:
                    {
                        return "Febrero";
                    }

                case 3:
                    {
                        return "Marzo";
                    }

                case 4:
                    {
                        return "Abril";
                    }

                case 5:
                    {
                        return "Mayo";
                    }

                case 6:
                    {
                        return "Junio";
                    }

                case 7:
                    {
                        return "Julio";
                    }

                case 8:
                    {
                        return "Agosto";
                    }

                case 9:
                    {
                        return "Septiembre";
                    }

                case 10:
                    {
                        return "Octubre";
                    }

                case 11:
                    {
                        return "Noviembre";
                    }

                case 12:
                    {
                        return "Diciembre";
                    }

                default:
                    {
                        return "";
                    }
            }
        }

      
        public void EnviaCorreosEdoDen()
        {

            // -----------------------------------------------------------------------------------------------------
            // PRODUCCION
            // -----------------------------------------------------------------------------------------------------
            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = _sDirMail;
            string _sHTML = "";
            

            AlternateView _aHTML;
            //LinkedResource _rPie;
            //LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                _mMessage.To.Add(eMail.Email);

                //if (eMail.Folio.Contains("ALERTA") | eMail.Folio.Contains("INFOR"))
                    // Copia oculta para administrador
                    //_mMessage.Bcc.Add("jmanrique@asf.gob.mx");

                if (eMail.CCO != "")
                    _mMessage.Bcc.Add(eMail.CCO);

                //_rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                //_rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                //_rPie.ContentId = "pie";
                //_rLogo.ContentId = "logo";

                _sHTML = "<table style=\"width: 800px; border: solid black 2px\">"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + eMail.Mensaje
                                            + "</td>"
                                        + "</tr>"
                                    + "</table>"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"3\" style=\"width: 100%;\">"
                                    + "<img src=\"cid:pie\" style=\"width: 100%\" />"
                                + "</td>"
                            + "</tr>"
                        + "</table>";

                _mMessage.Subject = "Seguimiento Folio: " + eMail.Folio;

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                //_aHTML.LinkedResources.Add(_rPie);
                //_aHTML.LinkedResources.Add(_rLogo);

                _mMessage.AlternateViews.Clear();
                _mMessage.AlternateViews.Add(_aHTML);

                _mMessage.Priority = MailPriority.High;
                // _smptClient.Host = "envios.appevent.com.mx"
                _smptClient.Host = _sHost;
                _smptClient.Credentials = new System.Net.NetworkCredential(_sDirMail, "");
                _smptClient.Timeout = 10675199;
                _smptClient.Port = 25;
                _smptClient.Send(_mMessage);

                _sMensaje = "Correos enviados correctamente";
            }


            catch (Exception ex)
            {
                //Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaValidacionCorreo()
        {

            // -----------------------------------------------------------------------------------------------------
            // PRODUCCION
            // -----------------------------------------------------------------------------------------------------
            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = _sDirMail;
            string _sHTML = "";


            AlternateView _aHTML;
            //LinkedResource _rPie;
            //LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                _mMessage.To.Add(eMail.Email);

                //if (eMail.Folio.Contains("ALERTA") | eMail.Folio.Contains("INFOR"))
                // Copia oculta para administrador
                //_mMessage.Bcc.Add("jmanrique@asf.gob.mx");

                if (eMail.CCO != "")
                    _mMessage.Bcc.Add(eMail.CCO);

                //_rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                //_rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                //_rPie.ContentId = "pie";
                //_rLogo.ContentId = "logo";

                _sHTML = "<table style=\"width: 800px; border: solid black 2px\">"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + eMail.Mensaje
                                            + "</td>"
                                        + "</tr>"
                                    + "</table>"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"3\" style=\"width: 100%;\">"
                                    + "<img src=\"cid:pie\" style=\"width: 100%\" />"
                                + "</td>"
                            + "</tr>"
                        + "</table>";

                _mMessage.Subject = "Seguimiento Folio: " + eMail.Folio;

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                //_aHTML.LinkedResources.Add(_rPie);
                //_aHTML.LinkedResources.Add(_rLogo);

                _mMessage.AlternateViews.Clear();
                _mMessage.AlternateViews.Add(_aHTML);

                _mMessage.Priority = MailPriority.High;
                // _smptClient.Host = "envios.appevent.com.mx"
                _smptClient.Host = _sHost;
                _smptClient.Credentials = new System.Net.NetworkCredential(_sDirMail, "");
                _smptClient.Timeout = 10675199;
                _smptClient.Port = 25;
                _smptClient.Send(_mMessage);

                _sMensaje = "Correos enviados correctamente";
            }


            catch (Exception ex)
            {
                //Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

    }

    public class eMail
    {
        private string _sEmail = "";
        private string _sFolio = "";
        private string _sCCO = "";
        private string _sMensaje = "";
        private string _sPass = "";

        public string Email
        {
            get
            {
                return _sEmail;
            }
            set
            {
                _sEmail = value;
            }
        }
        public string Folio
        {
            get
            {
                return _sFolio;
            }
            set
            {
                _sFolio = value;
            }
        }
        public string CCO
        {
            get
            {
                return _sCCO;
            }
            set
            {
                _sCCO = value;
            }
        }
        public string Mensaje
        {
            get
            {
                return _sMensaje;
            }
            set
            {
                _sMensaje = value;
            }
        }
        public string Pass
        {
            get
            {
                return _sPass;
            }
            set
            {
                _sPass = value;
            }
        }
    }
}
