using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace Datos
{
    public class ControladorSQL: IDisposable 
    {

        private string _sConexion = "";
        private Exception _Exception;
        private SqlConnection _cn;
        private SqlDataAdapter _da;
        private SqlCommand _cmd;

        private string _sError = string.Empty;
        private object _oParam = null;

        #region "Propiedades"

        public object Param
        {
            get
            {
                return _oParam;
            }
        }


        public string MensajeError
        {
            get
            {
                return _sError;
            }
        }

        public Exception Exception
        {
            get
            {
                return _Exception;
            }
        }
        #endregion



        public ControladorSQL(string _strCn)
        {
            try
            {
                _sConexion = _strCn;
                _cn = new SqlConnection();
                _da = new SqlDataAdapter();
                _cmd = new SqlCommand();
                OpenConnection();

            }
            catch
            {
                _Exception = new Exception("Error en la conexión");
            }
        }


        private void OpenConnection()
        {
            try
            {
                _cn.ConnectionString = _sConexion;
                if (_cn.State == ConnectionState.Open)
                {
                    _cn.Close();
                }
                _cn.Open();
            }
            catch (Exception _ex)
            {
                _Exception = _ex;
            }
        }

        public DataSet Execute(string _sStoreName, List<DataParamSQL> _lParameters)
        {

            DataSet _ds = new DataSet();

            try
            {

                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.CommandText = _sStoreName;
                _cmd.Parameters.Clear();

                if (_lParameters != null)
                {
                    LlenaParametrosIN(_lParameters);
                }

                LlenaParametrosOUT();
                _cmd.Connection = _cn;
                _cmd.CommandTimeout = 0;
                _da.SelectCommand = _cmd;
                _ds.Clear();
                _da.Fill(_ds);

                if (_cmd.Parameters["@sql_error"].Value.ToString().Length > 0)
                {
                    _Exception = new Exception(_cmd.Parameters["@sql_error"].Value.ToString());
                    return null;
                }

                return _ds;

            }
            catch (Exception _ex)
            {
                _Exception = new Exception("Error en Execute -> " + _ex.Message);
                return null;
            }
            finally
            {
                Dispose();
                if (_ds != null)
                {
                    _ds.Dispose();
                }
                _ds = null;
            }

        }

        public bool ExecutequeryParams(string _sStoreName, List<DataParamSQL> _lParameters)
        {

            try
            {

                _cmd.CommandType = CommandType.StoredProcedure;
                _cmd.CommandText = _sStoreName;
                _cmd.Parameters.Clear();

                if (_lParameters != null)
                {
                    LlenaParametrosIN(_lParameters);
                }

                LlenaParametrosOUT();
                _cmd.Connection = _cn;
                _cmd.CommandTimeout = 0;
                _da.SelectCommand = _cmd;
                _cmd.ExecuteNonQuery();

                if (_cmd.Parameters["@sql_error"].Value.ToString().Length > 0)
                {
                    _Exception = new Exception(_cmd.Parameters["@sql_error"].Value.ToString());
                    return false;
                }

                return true;

            }
            catch (Exception _ex)
            {
                _Exception = new Exception("Error en ExecutequeryParams -> " + _ex.Message);
                return false;
            }
            finally
            {
                Dispose();
               
            }

        }

        

        private void LlenaParametrosIN(List<DataParamSQL> _lParameters)
        {

            SqlParameter _Param;

            try
            {

                for (int i = 0; i < _lParameters.ToArray().Length; i++)
                {
                    _Param = null;
                    _Param = new SqlParameter();
                    _Param.ParameterName = _lParameters[i].Nombre.ToString();
                    _Param.Value = _lParameters[i].Valor;
                    _cmd.Parameters.Add(_Param);
                }

            }
            catch (Exception _ex)
            {
                _Exception = _ex;
            }
            finally
            {
                _Param = null;
            }

        }

        private void LlenaParametrosOUT()
        {
            _cmd.Parameters.Add("@sql_error", SqlDbType.NVarChar).Direction = ParameterDirection.Output;
            _cmd.Parameters["@sql_error"].Size = 4000;
        }

        public void Dispose()
        {

            try
            {
                if (_cn != null)
                {
                    _cn.Close();
                    _cn.Dispose();
                }

                if (_cmd != null)
                {
                    _cmd.Dispose();
                }

                if (_da != null)
                {
                    _da.Dispose();
                }

            }
            catch (Exception _ex)
            {
                _Exception = _ex;
            }
            finally
            {
                _cn = null;
                _cmd = null;
                _da = null;
            }
        }
    }


    public class DataParamSQL
    {

        private string _sNombre;
        private object _oValor;

        public DataParamSQL()
        {
            _sNombre = String.Empty;
        }

        public DataParamSQL(string Nombre, object Valor)
        {
            _sNombre = Nombre;
            _oValor = Valor;
        }

        public string Nombre
        {
            get
            {
                return _sNombre;
            }
            set
            {
                _sNombre = value;
            }
        }

        public object Valor
        {
            get
            {
                return _oValor;
            }
            set
            {
                _oValor = value;
            }
        }

    }
}

