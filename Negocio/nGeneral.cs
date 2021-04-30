using System;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Configuration;
using System.IO;
using System.Web;
using Datos;


namespace General
{
    public class nGeneral : IDisposable
    {

        #region "Propiedades de Control"








        protected string _sMensajeError = "";
        private Exception _Exception = null;
        private int _iUltimoId = 0;
        protected bool _bEjecuta = true;
        protected DatosSQL _dDataSQL = null;
        protected string _sStoreProc = String.Empty;
        protected DataSet _ds = null;
        //public string CadenaConexion { get; set; }
        private Boolean _ConError = false;
        protected Boolean _CompletarParametros = true;
        public bool ConError { get { return _ConError; } }
        public string Llamado { get { return _Llamado; } set { _Llamado = value; } }
        public long LlaveSesion { get; set; } //DSanchezCa 19-Mar-21
        public int TipoBuzon { get; set; } = 0;
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

        private bool _DsVacio = false;
        private string _Pagina = null;
        private string _Evento = null;
        private int _Coord2 = 0;
        private string _Coord = null;
        private string _Pais = null;
        private string _Estado = null;
        private string _Ciudad = null;
        private string _RFC_Cert = null;
        private long _LlaveUsuario = -1;
        private string _TipoLlamado = null;
        private string _Dir_IP = null;
        private string _Hostname = null;
        private string _Llamado = null;
        protected string _sSubClase = string.Empty;
        protected string _sMetodo = string.Empty;
        public long LlaveUsuario { get { return _LlaveUsuario; } set { _LlaveUsuario = value; } }
        public string Pagina { get { return _Pagina; } set { _Pagina = value; } }
        public string Evento { get { return _Evento; } set { _Evento = value; } }
        public string Coord { get { return _Coord; } set { _Coord = value; } }

        public int Coord2 { get { return _Coord2; } set { _Coord2 = value; } }
        public string Pais { get { return _Pais; } set { _Pais = value; } }
        public string Estado { get { return _Estado; } set { _Estado = value; } }
        public string Ciudad { get { return _Ciudad; } set { _Ciudad = value; } }
        public string RFC_Cert { get { return _RFC_Cert; } set { _RFC_Cert = value; } }
        public string TipoLlamado { get { return _TipoLlamado; } set { _TipoLlamado = value; } }
        public string Dir_IP { get { return _Dir_IP; } set { _Dir_IP = value; } }
        public string Hostname { get { return _Hostname; } set { _Hostname = value; } }

        public bool DsVacio { get { return _DsVacio; } set { _DsVacio = value; } }


        public string SClaveCat { get { return _Coord; } set { _Coord = value; } }

        public int ILlaveCat { get { return _Coord2; } set { _Coord2 = value; } }


        public DataSet dsDatos
        {
            get { return _ds; }
        }
        public int UltimoId
        {
            get
            {
                return _iUltimoId;
            }

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
        #endregion

        public nGeneral(string _cadenaConexion)
        {
            _dDataSQL = new DatosSQL(_cadenaConexion);
            //_Exception = new Exception();
        }

        private string _stringConnexion = "";
        public string ConexionNombre
        {
            get
            {
                return _stringConnexion;
            }
            set
            {
                _stringConnexion = value;
            }
        }

        public bool Ejecuta()
        {
            _iUltimoId = 0; _bEjecuta = true; _Exception = null;
            _ConError = false; DsVacio = true; _sMensajeError = string.Empty; //DSanchezCa 17-Mar-21
            _Pagina = _Pagina + _sSubClase != string.Empty ? "-->" + _sSubClase : _sSubClase; //DSanchezCa 17-Mar-21
            _Evento = _Evento + _sMetodo != string.Empty ? "-->" + _sMetodo : "Ejecuta"; //DSanchezCa 17-Mar-21
            try
            {
                ValidaParams();
                if (_Exception != null && _sMensajeError != string.Empty)
                {
                    Exception = _Exception;
                    return false;
                }
                //ClearParameters();
                LLenaParams();
                if (!_bEjecuta)
                {
                    return false;
                }
                DsVacio = true;
                _ds = _dDataSQL.Ejecuta(_sStoreProc);
                Exception = _dDataSQL.Exception;
                //if ( _ds == null || _Exception != null )
                //{
                //    Exception = _Exception;
                //    return false;
                //}
                if (_ds == null || _ds.Tables.Count == 0 || _ds.Tables[0].Rows.Count == 0)
                {
                    _ds = null;
                    return false;
                }
                DsVacio = false;
                int.TryParse(_ds.Tables[0].Rows[0][0].ToString(), out _iUltimoId);
                return true;
            }
            catch (Exception ex)
            {
                Exception = ex;
                return false;
            }
        }





        public DataSet TraeCatalogo()
        {

            _ds = null; 

            try
            {
                ValidaParams();
                if (_Exception != null && _sMensajeError != string.Empty)
                {
                    Exception = _Exception;
                    return _ds;
                }

                //ClearParameters();
                LLenaParams();
                if (!_bEjecuta)
                {
                    return _ds;
                }

                _dDataSQL.ClearParameters();
                _dDataSQL.AddParameter("@clave_tipo_cat", SClaveCat);
                _dDataSQL.AddParameter("@llave_tipo_cat", ILlaveCat);


                _ds = _dDataSQL.Ejecuta(_sStoreProc);
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


















        #region Metodos Privados
        protected virtual void LLenaParams()
        {

        }

        protected virtual void ValidaParams()
        {

        }
        //protected virtual void ClearParameters()
        //{

        //}

        private void ManejoError()
        {

        }

        public enum TipoDBMS
        {
            Oracle,
            SQL
        }

        public void Dispose()
        {
            _dDataSQL = null;
            _Exception = null;
            _ds = null;
        }
        #endregion
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




    }
}
