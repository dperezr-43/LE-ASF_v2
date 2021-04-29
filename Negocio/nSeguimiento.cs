using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Text.RegularExpressions;
using System.IO;
using Datos;
using System.Data;

namespace Negocio
{
    public class nSeguimiento : IDisposable
    {

        private List<cConsulta> _eListCons;
        private Exception _Exception = null;
        protected string _sMensajeError = "";
        private Boolean _ConError = false;
        protected DatosSQL _dDataSQL = null;

        public bool ConError { get { return _ConError; } }

        private long _LlaveUsuario = -1;
        private string _Pagina = null;
        private string _Evento = null;
        protected string _sMetodo = string.Empty;
        public int TipoBuzon { get; set; } = 0;
        public long LlaveUsuario { get { return _LlaveUsuario; } set { _LlaveUsuario = value; } }
        public long LlaveSesion { get; set; }
        
        public string Pagina { get { return _Pagina; } set { _Pagina = value; } }

        protected DataSet _ds = null;

        private cConsulta _eConsulta;

        public List<cConsulta> ListCons
        {
            get
            {
                return _eListCons;
            }
        }

        public nSeguimiento() 
        {
            _Exception = null;
            _eListCons = new List<cConsulta>();
            _eConsulta = new cConsulta();
            _dDataSQL = new DatosSQL(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        }

        public void Dispose()
        {
            _dDataSQL = null;
            _Exception = null;
            _ds = null;
        }

        public Exception Exception
        {

            get { return _Exception; }
            set
            {
                if (value != null)
                {
                    int _Ambiente = 0;
                    if (ConfigurationManager.AppSettings["ambiente"] != null)
                    {
                        if (!(int.TryParse(ConfigurationManager.AppSettings["ambiente"].ToString(), out _Ambiente)))
                            _Ambiente = 0;//si no es posible convertir se asignar el valor para no devolver el mensaje original, asumiendo que puede presentarse en producción
                    }
                    if (_Ambiente != 1)
                        _sMensajeError = (value.Message.Substring(0, value.Message.Length) == "-1") ? "-1Se encontraron inconsistencias al ejecutar la acción." : value.Message; //( value.Message.Substring( 0, 2 ) == "-1" ? value.Message.Substring( 2, value.Message.Length - 2 ) : "Se encontraron inconsistencias al ejecutar la acción." );
                    else
                        _sMensajeError = value.Message;
                    //_sMensajeError = value.Message;
                    _ConError = true;
                    _Exception = value;

                    if (_Ambiente != 1 && value.Message.Substring(0, 2) != "-1")
                    {
                        GuardaLogTxt(LimpiaTexto(value.Message));
                        _Exception = new Exception("-1");
                    }
                }
                else
                {
                    _Exception = null;
                    _ConError = false;
                }
            }
        }

        public void TraeConsulta()
        {
            _eListCons = new List<cConsulta>();


            //_ds = TraeConsultaGeneral();

            //if (Exception == null)
            //{

            //    if (_ds != null || _ds.Tables.Count > 0 || _ds.Tables[0].Rows.Count > 0)
            //    {
            //        foreach (DataRow _dr in _ds.Tables[0].Rows)
            //        {

            //            _eConsulta = new cConsulta
            //            {
            //                _sCalEstatus = (string)_dr["cal_status"],
            //                _sNoFolio = (string)_dr["no_folio"],
            //                _sTipoDenuncia = (string)_dr["tipo_denuncia"],
            //                _sFechaDenuncia = (string)_dr["fecha_denuncia"],
            //                _sFechaEnvio = (string)_dr["fecha_envio"],
            //                _sEstatus = (string)_dr["estatus"],
            //                _sFechaEstatus = (string)_dr["fecha_estatus"],
            //                _sProcedencia = (string)_dr["procedencia"],
            //                _sOficioProc = (string)_dr["oficio_procedencia"],
            //                _sCorreo = (string)_dr["correo"],
            //                _sImpDenuncia = (string)_dr["imp_denuncia"],
            //                _sDocsDenuncia = (string)_dr["docs_denuncia"]
            //            };

            //            _eListCons.Add(_eConsulta);
            //        }



            //    }

            //}

            for (Int32 i = 1; i <= 4; i++)
            {

                cConsulta _sCons = new cConsulta();

                _sCons._sCalEstatus = "<img src=\"../../Imagenes/editar.png\" onclick=\"javascript:CambiarEstado('Folio1234'); return false;\">";
                _sCons._sNoFolio = "PruebaNoFolio" + i;
                _sCons._sTipoDenuncia = "PruebaTipoDenuncia";
                _sCons._sFechaDenuncia = "00/00/0000";
                _sCons._sFechaEnvio = "00/00/0000";
                _sCons._sEstatus = "<table align=\"center\"><tr><td class=\"tablas_internas\"><img src=\"../../Imagenes/aprobar-green3.png\"></td><td class=\"tablas_internas\">En Revisión</td></table>";
                _sCons._sFechaEstatus = "00/00/0000";
                _sCons._sProcedencia = "Si";
                _sCons._sOficioProc = "<img src=\"../../Imagenes/PDF-rojo.png\">";
                _sCons._sCorreo = "<img src=\"../../Imagenes/correo.png\" onclick=\"javascript:EnvioCorreo('Folio1234'); return false;\">";
                _sCons._sImpDenuncia = "<img src=\"../../Imagenes/imprimir.png\">";
                _sCons._sDocsDenuncia = "<img src=\"../../Imagenes/libros.png\">";
                _sCons._lLlaveDenuncia = 0;
                _sCons._lLlaveEstado = 0;
                _sCons._lLlaveSubEstado = 0;


                _eListCons.Add(_sCons);

            }


        }

        public void EnvioCorreo(string _psFolio,
                                string _psPara,
                                string _psCCO,
                                string _psMensaje)
        {

            nMail _nMail = new nMail();
            _nMail.eMail.Email = _psPara;
            _nMail.eMail.Folio = _psFolio;
            _nMail.eMail.CCO = _psCCO;
            _nMail.eMail.Mensaje = _psMensaje;

            _nMail.EnviaCorreosEdoDen();


        }


        public string MensajeError
        {
            get { return _sMensajeError; }
            set
            {
                _sMensajeError = LimpiaTexto(value);
                _ConError = (_sMensajeError != String.Empty && _sMensajeError != null);
            }
        }
        public string LimpiaTexto(string dirtyString)
        {
            //return new String( dirtyString.Where( Char.IsLetterOrDigit ).ToArray() );
            return Regex.Replace(Acentos(RemoveWhitespace(dirtyString)), @"[^\w\/:.@-]", " ");
        }
        public string Acentos(string fullString)
        {
            string _sCadena = fullString.Replace("Á", "A");
            _sCadena = _sCadena.Replace("É", "E");
            _sCadena = _sCadena.Replace("Í", "I");
            _sCadena = _sCadena.Replace("Ó", "O");
            _sCadena = _sCadena.Replace("Ú", "U");
            return _sCadena;
        }
        public string RemoveWhitespace(string fullString)
        {
            return new string(fullString.Where(x => !char.IsWhiteSpace(x)).ToArray());
        }

        private void GuardaLogTxt(string _pMens)
        {
            StreamWriter w;
            try
            {
                _dDataSQL.ClearParameters();
                //_CompletarParametros = true;
                //CompletaParam();
                _dDataSQL.AddParameter("@P_LLAVE_USUARIO", LlaveUsuario);
                _dDataSQL.AddParameter("@P_LLAVE_SESION", LlaveSesion);
                _dDataSQL.AddParameter("@P_PAGINA", Pagina);
                _dDataSQL.AddParameter("@P_EVENTO_NET", _Evento + (_Evento != string.Empty && _sMetodo != string.Empty ? "-->" : string.Empty) + _sMetodo);
                _dDataSQL.AddParameter("@P_MENSAJE_EXCEPCION", _pMens);
                _dDataSQL.AddParameter("@P_BUZON", TipoBuzon == 0 ? null : TipoBuzon == 1 ? "ASF" : "ENT");
                _dDataSQL.Ejecuta("sp_GrabaLog");//.EjecutaNew("sp_GrabaLog");
                //throw new System.ArgumentException("Parameter cannot be null", "original");
                if (_dDataSQL.Exception.Message != "-1")
                {
                    string _sRuta = string.Empty;

                    if (System.Configuration.ConfigurationManager.AppSettings["rutaLog"] != null)
                        _sRuta = System.Configuration.ConfigurationManager.AppSettings["rutaLog"];
                    else
                        _sRuta = "C:\\log.txt";
                    if (File.Exists(_sRuta) == false)
                    {
                        w = File.CreateText(_sRuta);
                    }
                    else
                    {
                        w = File.AppendText(_sRuta);
                    }
                    w.Write("\n Entrada al Log : ");
                    w.WriteLine("{0} {1}", DateTime.Now.ToLongDateString(), DateTime.Now.ToLongTimeString());
                    w.WriteLine(" {0}: {1} ", "No fue posible guardar el error", _pMens);
                    w.WriteLine(" {0}: {1}: {2}: {3}", "Pagina", _Pagina, "Evento", _Evento);
                    w.WriteLine(" El problema presentado para guardar en la BD fue: {0}", _dDataSQL.Exception.Message);
                    w.WriteLine("-------------------------------");
                    w.Flush();
                    w.Close();
                    w.Dispose();
                }
            }
            catch (Exception ex)
            {
                _ConError = true;
                _sMensajeError = "Se encontraron problemas GuardaLogTxt, el error es: " + LimpiaTexto(ex.Message) + " Derivado de :" + _pMens;
            }
        } //private void GuardaLog

        public DataSet TraeConsultaGeneral()
        {

            _ds = null;

            try
            {
                //ValidaParams();
                //if (_Exception != null && _sMensajeError != string.Empty)
                //{
                //    Exception = _Exception;
                //    return _ds;
                //}

                ////ClearParameters();
                //LLenaParams();
                //if (!_bEjecuta)
                //{
                //    return _ds;
                //}

                _dDataSQL.ClearParameters();
                //_dDataSQL.AddParameter("@clave_tipo_cat", SClaveCat);


                _ds = _dDataSQL.Ejecuta("sp_ConsultaDenuncias");
                Exception = _dDataSQL.Exception;

                if (_ds == null || _ds.Tables.Count == 0 || _ds.Tables[0].Rows.Count == 0)
                {
                    _ds = null;
                    return _ds;
                }

                return _ds;
            }
            catch (Exception ex)
            {
                Exception = ex;
                return _ds;
            }
        }

    }

    public partial class cConsulta
    {

        public string _sCalEstatus { get; set; } = "";
        public string _sNoFolio { get; set; } = "";
        public string _sTipoDenuncia { get; set; } = "";
        public string _sFechaDenuncia { get; set; } = "";
        public string _sFechaEnvio { get; set; } = "";
        public string _sEstatus { get; set; } = "";
        public string _sFechaEstatus { get; set; } = "";
        public string _sProcedencia { get; set; } = "";
        public string _sOficioProc { get; set; } = "";
        public string _sCorreo { get; set; } = "";
        public string _sImpDenuncia { get; set; } = "";
        public string _sDocsDenuncia { get; set; } = "";
        public long _lLlaveDenuncia { get; set; } = 0;
        public long _lLlaveEstado { get; set; } = 0;
        public long _lLlaveSubEstado { get; set; } = 0;

        
            
            


    }

    

}
