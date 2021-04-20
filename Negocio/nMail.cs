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
    class nMail
    {

        private Exception _Exception;
        private string _sMensaje;
        
        private eMail _eMail;
        private DB _dData;
        private List<DataParam> _lParam;
        private nLog _nLog;
        
        public string LigaValidacion { get; set; } = string.Empty;

        private string _sMail = "";

        private static readonly string _sHost = "10.7.202.5";
        private static readonly string _sDirMail = "participacionciudadana@asf.gob.mx";

        public string _sDate = String.Format("{0:ddMMyyyy}", DateTime.Today);

        private 



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

        public Exception Exception
        {
            get
            {
                return _Exception;
            }
            set
            {
                _Exception = _value;
                _nLog.ErrorMsg = _value.Message;
                _nLog.Ruta = ConfigurationManager.AppSettings("rutaLog").ToString;
                _nLog.GrabaLog();
            }
        }

        public nMail()
        {
            _Exception = null;
            // _eMailList = New List(Of eMail)
            _eMail = new eMail();
            _dData = new DB();
            _nLog = new nLog();
        }


        public void EnviaConfirmacion()
        {

            // ---------------------------------------------------------
            // PRODUCCION

            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = "cuest_ent_fisc@auditoriasuperior.gob.mx";
            string _sHTML = "";
            //string _sDate = String.Format(DateTime.Today, "dd/MM/yyyy");


            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Encuesta a Entidades Fiscalizadas");

                // _mMessage.To.Add("btalamante@asf.gob.mx")
                // _mMessage.To.Add("alvaro@asf.gob.mx")
                _mMessage.To.Add(eMail.Email);
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Su cuestionario ha sido atendido satisfactoriamente. Para cualquier duda y/o a aclaración al correo <a href=\"mailto:migarcia@asf.gob.mx\">migarcia@asf.gob.mx</a> y/o al teléfono 52003656."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "¡Gracias!"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
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

                _mMessage.Subject = "Notificación de Encuesta a Entidades Fiscalizadas";

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

                _mMessage.AlternateViews.Clear();
                _mMessage.AlternateViews.Add(_aHTML);

                _mMessage.Priority = MailPriority.High;
                // _smptClient.Host = "mail.hmailserver.com"
                _smptClient.Host = "localhost";
                _smptClient.Credentials = new System.Net.NetworkCredential("cuest_ent_fisc@auditoriasuperior.gob.mx", "ent010100");
                _smptClient.Timeout = 10675199;
                _smptClient.Port = 25;
                _smptClient.Send(_mMessage);

                _sMensaje = "Correos enviados correctamente";
            }
            catch (Exception ex)
            {
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaConfirmacionSocCivil()
        {

            // ---------------------------------------------------------
            // PRODUCCION

            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = "cuest_soc_civ@auditoriasuperior.gob.mx";
            string _sHTML = "";            
            //string _sDate = String.Format("{0:ddMMyyyy}", DateTime.Today);


            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Cuestionario a Organizaciones de la Sociedad Civil");

                // _mMessage.To.Add("btalamante@asf.gob.mx")
                // _mMessage.To.Add("alvaro@asf.gob.mx")
                _mMessage.To.Add(eMail.Email);
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Su cuestionario ha sido atendido satisfactoriamente. Para cualquier duda y/o a aclaración al correo <a href=\"mailto:migarcia@asf.gob.mx\">migarcia@asf.gob.mx</a> y/o al teléfono 52003656."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "¡Gracias!"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
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

                _mMessage.Subject = "Notificación de Cuestionario a Organizaciones de la Sociedad Civil";

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

                _mMessage.AlternateViews.Clear();
                _mMessage.AlternateViews.Add(_aHTML);

                _mMessage.Priority = MailPriority.High;
                // _smptClient.Host = "mail.hmailserver.com"
                _smptClient.Host = "localhost";
                _smptClient.Credentials = new System.Net.NetworkCredential("cuest_soc_civ@auditoriasuperior.gob.mx", "soc010100");
                _smptClient.Timeout = 10675199;
                _smptClient.Port = 25;
                _smptClient.Send(_mMessage);

                _sMensaje = "Correos enviados correctamente";
            }
            catch (Exception ex)
            {
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
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

        public void EnviaPrueba()
        {

            // ---------------------------------------------------------
            // PRODUCCION

            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = "cuest_ent_fisc@auditoriasuperior.gob.mx";
            string _sHTML = "";
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Encuesta a Entidades Fiscalizadas");

                _mMessage.To.Add("btalamante@asf.gob.mx");
                _mMessage.To.Add("alvaro@asf.gob.mx");
                _mMessage.To.Add("braulionm@hotmail.com");
                _mMessage.To.Add("lemonteros@asf.gob.mx");
                // _mMessage.To.Add(eMail.Email)
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Prueba enviada desde server externo"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Su cuestionario ha sido atendido satisfactoriamente. Para cualquier duda y/o a aclaración al correo <a href=\"mailto:migarcia@asf.gob.mx\">migarcia@asf.gob.mx</a> y/o al teléfono 52003656."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "¡Gracias!"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
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

                _mMessage.Subject = "Notificación de Encuesta a Entidades Fiscalizadas";

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

                _mMessage.AlternateViews.Clear();
                _mMessage.AlternateViews.Add(_aHTML);

                _mMessage.Priority = MailPriority.High;
                // _smptClient.Host = "mail.hmailserver.com"
                _smptClient.Host = "localhost";
                _smptClient.Credentials = new System.Net.NetworkCredential("cuest_ent_fisc@auditoriasuperior.gob.mx", "ent010100");
                _smptClient.Timeout = 10675199;
                _smptClient.Port = 25;
                _smptClient.Send(_mMessage);

                _sMensaje = "Correos enviados correctamente";
            }
            catch (Exception ex)
            {
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
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
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                _mMessage.To.Add(eMail.Email);

                if (eMail.Folio.Contains("ALERTA") | eMail.Folio.Contains("INFOR"))
                    // Copia oculta para administrador
                    _mMessage.Bcc.Add("jmanrique@asf.gob.mx");

                if (eMail.CCO != "")
                    _mMessage.Bcc.Add(eMail.CCO);

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

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
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

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
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaAcuse()
        {
            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = _sDirMail;
            string _sHTML = "";
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Sistema de Participación Ciudadana");

                // _mMessage.To.Add("btalamante@asf.gob.mx")
                // _mMessage.To.Add("alvaro@asf.gob.mx")
                _mMessage.To.Add(eMail.Email);
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 60%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 60%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"2\">"
                                    + "<br />"
                                    + "<table style=\"width: 80%; margin-left: auto; margin-right: auto\">"
                                        + "<tr>"
                                            + "<td>"
                                                + "<p>"
                                                    + "Por este medio acusamos recibo de su escrito, con folio <strong>" + eMail.Folio + "</strong> y fechado el " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + ". "
                                                    + "De antemano agradecemos la confianza depositada en el Sistema de Participación Ciudadana para darnos a conocer su percepción respecto a los hechos mencionados."
                                                + "</p>"
                                                + "<p>"
                                                    + "Por favor, guarde el Folio de su participación así como su contraseña ya que con ellos podrá darle seguimiento en: <a href=\"http://participacionciudadana.asf.gob.mx/Consulta.aspx\">http://participacionciudadana.asf.gob.mx/Consulta.aspx</a>."
                                                + "</p>"
                                                + "<p>"
                                                    + "Quedamos a sus órdenes."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
                                            + "</td>"
                                        + "</tr>"
                                    + "</table>"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"2\" style=\"width: 100%;\">"
                                    + "<img src=\"cid:pie\" style=\"width: 100%\" />"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"2\" style=\"width: 100%;\">"
                                    + "Este es un mensaje generado automaticamente por el Sistema de Participación Ciudadana, no es necesario responder a esta dirección de correo."
                                + "</td>"
                            + "</tr>"
                        + "</table>";

                _mMessage.Subject = "Acuse de Recibo: " + eMail.Folio;

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

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
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaAcuseInterna()
        {
            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = _sDirMail;
            string _sHTML = "";
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                // _mMessage.To.Add("btalamante@asf.gob.mx")
                // _mMessage.To.Add("alvaro@asf.gob.mx")
                _mMessage.To.Add(eMail.Email);
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 60%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 60%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"2\">"
                                    + "<br />"
                                    + "<table style=\"width: 80%; margin-left: auto; margin-right: auto\">"
                                        + "<tr>"
                                            + "<td>"
                                                + "<p>"
                                                    + "Por este medio acusamos recibo de su escrito, con folio <strong>" + eMail.Folio + "</strong> y fechado el " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + ". "
                                                    + "De antemano agradecemos la confianza depositada en el Sistema De Participación Ciudadana para darnos a conocer su percepción respecto a los hechos mencionados."
                                                + "</p>"
                                                + "<p>"
                                                    + "La Auditoría Superior de la Federación creó el Comité de Integridad con el objetivo de velar por que los postulados y las normas expresadas en su Política Institucional de Integridad sean respetados por todos nuestros integrantes. Este órgano responde directamente al Titular de la ASF y reporta cabalmente el contenido de las denuncias al mismo."
                                                + "</p>"
                                                + "<p>"
                                                    + "El Comité de Integridad sigue una metodología definida para el análisis de las denuncias presentadas. Aquellas que cuenten con los elementos de prueba mínimos que permitan determinar la existencia de un riesgo a la integridad son canalizadas, en primera instancia a la Coordinación de Seguimiento y Análisis de la Gestión de la ASF, o a la autoridad que resulte competente de acuerdo con la naturaleza e implicaciones de la falta denunciada, para que lleve a cabo las investigaciones correspondientes."
                                                + "</p>"
                                                + "<p>"
                                                    + "Una vez concluidas, éstas, su resultado será entregado nuevamente al Comité, que tomará una decisión respecto a los pasos ulteriores a tomar. Estos pueden ser, entre otros:"
                                                + "</p>"
                                                + "<ul>"
                                                    + "<li>Dar aviso a los funcionarios públicos involucrados y recomendar acciones correctivas.</li>"
                                                    + "<li>Sugerir la aplicación de una reconvención o sanción administrativa para su integración en el expediente administrativo de quien resulte responsable.</li>"
                                                    + "<li>Dar aviso a la Unidad de Evaluación y Control de la ASF.</li>"
                                                    + "<li>Proceder a levantar una denuncia penal contra quien resulte responsable.</li>"
                                                    + "<li>Sugerir la implantación de políticas o la emisión de comunicados institucionales que atiendan la causa-raíz de la queja en cuestión, haciendo patente que dichas decisiones atienden a la presentación de una denuncia.</li>"
                                                + "</ul>"
                                                + "<p>"
                                                    + "En cualquier caso, el Comité tomará en cuenta los elementos de su denuncia para poder determinar riesgos potenciales de integridad, así como al mantenimiento de un clima laboral favorable a la productividad y a una convivencia respetuosa."
                                                + "</p>"
                                                + "<p>"
                                                    + "Quedamos a sus órdenes."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Comité de Integridad"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
                                            + "</td>"
                                        + "</tr>"
                                    + "</table>"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"2\" style=\"width: 100%;\">"
                                    + "<img src=\"cid:pie\" style=\"width: 100%\" />"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"2\" style=\"width: 100%;\">"
                                    + "Este es un mensaje generado automaticamente por el Sistema de Participación Ciudadana, no es necesario responder a esta dirección de correo."
                                + "</td>"
                            + "</tr>"
                        + "</table>";

                _mMessage.Subject = "Acuse de Recibo: " + eMail.Folio;

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

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
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaPass()
        {

            // ---------------------------------------------------------
            // PRODUCCION

            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = _sDirMail;
            string _sHTML = "";
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                // _mMessage.To.Add("btalamante@asf.gob.mx")
                // _mMessage.To.Add("alvaro@asf.gob.mx")
                _mMessage.To.Add(eMail.Email);
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + "<p>"
                                                    + "Por este medio hacemos entrega de su nueva contraseña para el Folio: " + eMail.Folio + " . "
                                                + "</p>"
                                                + "<p>"
                                                    + "Su nueva contraseña es: " + eMail.Pass
                                                + "</p>"
                                                + "<p style=\"width: 90%\">"
                                                    + "De antemano agradecemos la confianza depositada en el Sistema de Participación Ciudadana para darnos a conocer "
                                                    + "su percepción respecto a los hechos mencionados."
                                                + "</p>"
                                                + "<p>"
                                                    + "Por favor, guarde el Folio de su participación así como su contraseña ya que con ellos podrá darle seguimiento a su participación en: <a href=\"http://participacionciudadana.asf.gob.mx/Consulta.aspx\">http://participacionciudadana.asf.gob.mx/Consulta.aspx</a>."
                                                + "</p>"
                                                + "<p>"
                                                    + "Quedamos a sus órdenes."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
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

                _mMessage.Subject = "Cambio de Contraseña Folio: " + eMail.Folio;

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

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
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaCorreoValidacion()
        {

            // ---------------------------------------------------------
            // PRODUCCION

            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = "participacionciudadana@asf.gob.mx";
            string _sHTML = "";
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                // _mMessage.To.Add("btalamante@asf.gob.mx")
                // _mMessage.To.Add("alvaro@asf.gob.mx")
                _mMessage.To.Add(eMail.Email);
                // _mMessage.To.Add("plflores@asf.gob.mx")

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 45%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 45%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                                + "<td style=\"width: 5%\">&nbsp;</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"3\">"
                                    + "<br />"
                                    + "<table style=\"width: 100%\">"
                                        + "<tr>"
                                            + "<td style=\"width: 5%\">&nbsp;</td>"
                                            + "<td style=\"width: 90%\">"
                                                + "<p>"
                                                    + "Por favor de clic en la siguiente liga para poder capturar su Denuncia, la liga caducará en 20 minutos: <a href=\"" + LigaValidacion + "\">" + LigaValidacion + "</a>"
                                                + "</p>"
                                                + "<p style=\"width: 90%\">"
                                                    + "De antemano agradecemos la confianza depositada en el Sistema de Participación Ciudadana para darnos a conocer "
                                                    + "su percepción respecto a los hechos mencionados."
                                                + "</p>"
                                                + "<p>"
                                                    + "Quedamos a sus órdenes."
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
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

                _mMessage.Subject = "Validación de Correo Electrónico";

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

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
                Exception = ex;
                _sMensaje = "Error al enviar el correo";
            }
            finally
            {
                _mMessage = null;
                _smptClient = null;
            }
        }

        public void EnviaNotificacion(string _psSubEstatusSolInformacion, string _psAmbiente, string _psCorreos, string _psURLSitio)
        {
            MailMessage _mMessage = new MailMessage();
            SmtpClient _smptClient = new SmtpClient();
            string _sFrom = _sDirMail;
            string _sHTML = "";
            //string _sDate = Strings.Format(DateTime.Today, "dd/MM/yyyy");

            AlternateView _aHTML;
            LinkedResource _rPie;
            LinkedResource _rLogo;

            try
            {
                _mMessage.From = new MailAddress(_sFrom, "Participación Ciudadana");

                if (_psAmbiente == "DESA" | _psAmbiente == "PRE")
                {
                    foreach (string _sCorreo in _psCorreos.Split(";"))
                        _mMessage.To.Add(_sCorreo);
                }
                else
                    _mMessage.To.Add(eMail.Email);

                _rPie = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\pie.PNG");
                _rLogo = new LinkedResource(ConfigurationManager.AppSettings("rutaPie") + @"\logo2.PNG");

                _rPie.ContentId = "pie";
                _rLogo.ContentId = "logo";

                _sHTML = "<table style='width: 1000px; font-family: Calibri; font-size: 14pt'>"
                            + "<tr>"
                                + "<td style=\"width: 60%\"><img src=\"cid:logo\" /></td>"
                                + "<td style=\"text-align: right; width: 60%\"><strong>Ciudad de México, a " + DateTime.Now.Day + " de " + mes(DateTime.Now.Month) + " de " + DateTime.Now.Year + "</strong></td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td style=\"text-align: justify\" colspan=\"2\">"
                                    + "<br />"
                                    + "<table style=\"width: 80%; margin-left: auto; margin-right: auto\">"
                                        + "<tr>"
                                            + "<td>"
                                                + "<p>Hola buen día.</p>"
                                                + "<p>Estimado ciudadano:</p>"
                                            + "</td>"
                                        + "</tr>"
                                        + "<tr>"
                                            + "<td>"
                                                + "<p>"
                                                    + "Se le informa que tiene una nueva notificación de solicitud de carga de información correspondiente a:"
                                                + "</p>"
                                                + "<p><ul><li>"
                                                    + _psSubEstatusSolInformacion
                                                + "</li></ul></p>"
                                                + "<p>"
                                                    + "Para continuar con el proceso favor de dirigirse a el portal de Participación Ciudadana – Denuncia Ciudadana, dando clic <a href='" + _psURLSitio + "Consulta.aspx'>aquí</a>."
                                                + "</p>"
                                                + "<p>"
                                                    + "Saludos"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Comité de Integridad"
                                                + "</p>"
                                                + "<p style=\"font-weight: bold\">"
                                                    + "Auditoría Superior de la Federación"
                                                + "</p>"
                                            + "</td>"
                                        + "</tr>"
                                    + "</table>"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"2\" style=\"width: 100%;\">"
                                    + "<img src=\"cid:pie\" style=\"width: 100%\" />"
                                + "</td>"
                            + "</tr>"
                            + "<tr>"
                                + "<td colspan=\"2\" style=\"width: 100%;\">"
                                    + "Este es un mensaje generado automaticamente por el Sistema de Participación Ciudadana, no es necesario responder a esta dirección de correo."
                                + "</td>"
                            + "</tr>"
                        + "</table>";

                _mMessage.Subject = "Notificación de Solicitud de Carga de Información: " + eMail.Folio;

                _aHTML = null;
                _aHTML = AlternateView.CreateAlternateViewFromString(_sHTML, null, "text/html");

                _aHTML.LinkedResources.Clear();
                _aHTML.LinkedResources.Add(_rPie);
                _aHTML.LinkedResources.Add(_rLogo);

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
                Exception = ex;
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
