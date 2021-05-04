using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Datos
{
    public class DatosSQL
    {

        private Exception _Exception;
        private List<DataParamSQL> _lParameters;
        public ControladorSQL _cBD;
        private object _oParam;
        private string _sConexion;
        private DataSet _ds;
        private bool _bResp;

        public object Param
        {
            get
            {
                return _oParam;
            }
        }

        public Exception Exception
        {
            get
            {
                return _Exception;
            }
        }

        public DatosSQL()
        {
            _sConexion = "ConnectionString";
            _Exception = null;
            _lParameters = new List<DataParamSQL>();
            _oParam = null;
        }

        public DatosSQL(string ConexionNombre)
        {
            _sConexion = ConexionNombre;
            _Exception = null;
            _lParameters = new List<DataParamSQL>();
            _oParam = null;
        }

        public DataSet Ejecuta(string _sStore)
        {
            _ds = null;

            try
            {

                _cBD = new ControladorSQL(_sConexion);
                if (_cBD.Exception == null)
                {
                    _ds = _cBD.Execute(_sStore, _lParameters);
                }
                _Exception = _cBD.Exception;

            }
            catch (Exception _ex)
            {
                _Exception = _ex;
            }
            finally
            {
                _cBD = null;
            }
            return _ds;

        }

        public bool EjecutaDML(string _sStore)
        {
            _bResp = false;

            try
            {

                _cBD = new ControladorSQL(_sConexion);
                if (_cBD.Exception == null)
                {
                    _bResp = _cBD.ExecutequeryParams(_sStore, _lParameters);
                }
                _Exception = _cBD.Exception;

            }
            catch (Exception _ex)
            {
                _Exception = _ex;
            }
            finally
            {
                _cBD = null;
            }
            return _bResp;

        }


        

        public void AddParameter(string _sNombre, object _oValor)
        {
            DataParamSQL _pItem = new DataParamSQL(_sNombre, _oValor);
            _lParameters.Add(_pItem);
        }
        public void ClearParameters()
        {
            _lParameters.Clear();
        }
        public Boolean ContieneParam(string _psName)
        {
            return _lParameters.Exists(e => e.Nombre == _psName);
        }

    }
}
