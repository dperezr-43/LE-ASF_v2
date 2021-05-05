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
using System.Runtime.Serialization.Formatters.Binary;

namespace Negocio
{
    public class nDenuncia : IDisposable
    {

        private List<cConSeguimDenuncia> _eListRespSeg;

        private List<cInfoDenuncia> _eListInfoDen;

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

        protected bool _bReps = false;


        private cConSeguimDenuncia _eRespSeg;
        private cInfoDenuncia _eInfoDen;


        public List<cConSeguimDenuncia> ListRespSeg
        {
            get
            {
                return _eListRespSeg;
            }
        }

        public List<cInfoDenuncia> ListInfoDen
        {
            get
            {
                return _eListInfoDen;
            }
        }
        

        public nDenuncia()
        {
            _Exception = null;
            _eListRespSeg = new List<cConSeguimDenuncia>();
            _dDataSQL = new DatosSQL(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
        }

        public void Dispose()
        {
            _dDataSQL = null;
            _Exception = null;
            _ds = null;
            _bReps = false;
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

      
        


        public string RegistroSol(long _plLlaveDenuncia,
                                long _plLlaveTipoDenuncia,
                                Int32 _plLlaveNivelGob,
                                string _psObjetosDenunciados,
                                long _plLlaveOrigenRec,
                                string _psMailDenunciante,
                                string _psMailDenuncianteConfirm,
                                string _psPassDenunciante,
                                DataTable _poHechosDenuncia,
                                DataTable _poPeriodosDenuncia,
                                DataTable _poEntidadesDenuncia,
                                DataTable _poDocIrrDenuncia,
                                DataTable _poDocDenuncia)
        {

            _bReps = false;

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
                _dDataSQL.AddParameter("@llave_denuncia", _plLlaveDenuncia);
                _dDataSQL.AddParameter("@llave_tipo_denuncia", _plLlaveTipoDenuncia);

                //if (_plLlaveNivelGob == 0)
                //{
                //    _dDataSQL.AddParameter("@llave_nivel_gobierno", null );
                //}
                //else
                //{
                    _dDataSQL.AddParameter("@llave_nivel_gobierno", _plLlaveNivelGob);
                //}


                //_dDataSQL.AddParameter("@objetos_denunciados", _psObjetosDenunciados == null ? null: _psObjetosDenunciados);
                _dDataSQL.AddParameter("@objetos_denunciados", _psObjetosDenunciados);

                //if (_plLlaveOrigenRec == 0)
                //{
                //    _dDataSQL.AddParameter("@llave_origen_recursos", null);
                //}
                //else
                //{
                    _dDataSQL.AddParameter("@llave_origen_recursos", _plLlaveOrigenRec);
                //}

                _dDataSQL.AddParameter("@mail_denunciante", _psMailDenunciante);
                _dDataSQL.AddParameter("@mail_denunciante_confirm", _psMailDenuncianteConfirm);
                _dDataSQL.AddParameter("@password_denunciante",  _psPassDenunciante);
                _dDataSQL.AddParameter("@hechos_denuncia", _poHechosDenuncia);
                _dDataSQL.AddParameter("@periodos_denuncia", _poPeriodosDenuncia);
                _dDataSQL.AddParameter("@entidades_denuncia", _poEntidadesDenuncia);
                _dDataSQL.AddParameter("@doc_irreg_denuncia", _poDocIrrDenuncia);
                _dDataSQL.AddParameter("@doc_evidencia_denuncia", _poDocDenuncia);



                _ds = _dDataSQL.Ejecuta("sp_TraeSol");
                Exception = _dDataSQL.Exception;

                if (Exception == null)
                {

                    if (_ds != null || _ds.Tables.Count > 0 || _ds.Tables[0].Rows.Count > 0)
                    {

                        return (string)_ds.Tables[0].Rows[0]["respuesta"];

                    }
                }

                return "0, Sin registros";
            }
            catch (Exception ex)
            {
                Exception = ex;
                return "0, Sin registros";
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

      





        public void TraeRespuestaSeguimiento(string _psFolio, string _psPassword)
        {
            _eListRespSeg = new List<cConSeguimDenuncia>();
            _ds = null;

            try
            {

                _dDataSQL.ClearParameters();
                _dDataSQL.AddParameter("@folio", _psFolio);
                _dDataSQL.AddParameter("@password", _psPassword);

                _ds = _dDataSQL.Ejecuta("sp_ConsultaDenunciaSeguim");
                Exception = _dDataSQL.Exception;

                if (Exception == null)
                {
                    if (!(_ds == null || _ds.Tables.Count == 0 || _ds.Tables[0].Rows.Count == 0))
                    {

                        foreach (DataRow _dr in _ds.Tables[0].Rows)
                        {

                            _eRespSeg = new cConSeguimDenuncia
                            {

                                Respuesta = (_dr["respuesta"] == DBNull.Value ? "" : (string)_dr["respuesta"])


                            };

                            _eListRespSeg.Add(_eRespSeg);
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                Exception = ex;
            }

        }


        public void TraeInfoDenunciasFP(string _psFolio, string _psPassword)
        {
            _eListInfoDen = new List<cInfoDenuncia>();
            _ds = null;

            try
            {

                _dDataSQL.ClearParameters();
                _dDataSQL.AddParameter("@folio", _psFolio);
                _dDataSQL.AddParameter("@password", _psPassword);

                _ds = _dDataSQL.Ejecuta("sp_TraeDenunciaFP");
                Exception = _dDataSQL.Exception;

                if (Exception == null)
                {
                    if (!(_ds == null || _ds.Tables.Count == 0 || _ds.Tables[0].Rows.Count == 0))
                    {

                        foreach (DataRow _dr in _ds.Tables[0].Rows)
                        {

                            _eInfoDen = new cInfoDenuncia
                            {

                                _lOrden = (_dr["orden"] == DBNull.Value ? 0 : Convert.ToInt32(_dr["orden"])),
                                _sSeccion  = (_dr["seccion"] == DBNull.Value ? "" : (string)_dr["seccion"]),
                                _lLlaveDenuncia = (_dr["llave_denuncia"] == DBNull.Value ? 0 : Convert.ToInt32(_dr["llave_denuncia"])),
                                _lLlaveCat = (_dr["llave"] == DBNull.Value ? 0 : Convert.ToInt32(_dr["llave"])),
                                _sTexto = (_dr["texto"] == DBNull.Value ? "" : (string)_dr["texto"])


                            };

                            _eListInfoDen.Add(_eInfoDen);
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                Exception = ex;
            }





        }


        public partial class cConSeguimDenuncia
        {

            public string Respuesta { get; set; } = "";

        }

        public partial class cInfoDenuncia
        {

            public long _lOrden { get; set; } = 0;
            public string _sSeccion { get; set; } = "";
            public long _lLlaveDenuncia { get; set; } = 0;
            public long _lLlaveCat { get; set; } = 0;
            public string _sTexto { get; set; } = "";
        }

    }

}

