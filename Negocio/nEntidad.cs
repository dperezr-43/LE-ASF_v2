using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Datos;


using System.Data;
using System.Configuration;

namespace Negocio
{
    class nEntidad
    {

        private Exception _Exception = null;
        private string _sMensaje = string.Empty;
        private List<eEntidad> _eEntidadList;
        private eEntidad _eEntidad = null;
        private DatosSQL _dData = null;
        private List<DataParamSQL> _lParam = null;

        private readonly Exception _value = null;



        //private nLog _nLog;

        public string Mensaje
        {
            get
            {
                return _sMensaje;
            }
        }

        public List<eEntidad> eEntidadList
        {
            get
            {
                return _eEntidadList;
            }
        }

        public eEntidad eEntidad
        {
            get
            {
                return _eEntidad;
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
                //_nLog.ErrorMsg = _value.Message;
                //_nLog.Ruta = ConfigurationManager.AppSettings("rutaLog").ToString;
                //_nLog.GrabaLog();
            }
        }

      

        //public void CargaEntFed()
        //{
        //    DataSet _dSet = new DataSet();

        //    try
        //    {
        //        _dSet = _dData.Consulta("sp_TraeEntFed");

        //        if (IsNothing(_dData.Exception))
        //        {
        //            if (_dSet.Tables(0).Rows.Count > 0)
        //            {
        //                foreach (DataRow _dr in _dSet.Tables(0).Rows)
        //                {
        //                    _eEntidad = null;
        //                    _eEntidad = new eEntidad();

        //                    _eEntidad.LlaveEntSICSA = _dr("LLAVE_CAT").ToString();
        //                    _eEntidad.NombreEntidad = _dr("NOMBRE").ToString();

        //                    _eEntidadList.Add(_eEntidad);
        //                }
        //            }
        //            else
        //                _sMensaje = "Sin Datos";
        //        }
        //        else
        //        {
        //            Exception = _dData.Exception;
        //            _sMensaje = "Error al traer los datos";
        //        }

        //        _sMensaje = "Datos cargados correctamente";
        //    }
        //    catch (Exception _ex)
        //    {
        //        Exception = _ex;
        //        _sMensaje = "Error al cargar los datos -> " + _ex.Message;
        //    }
        //    finally
        //    {
        //        if (!IsNothing(_dSet))
        //            _dSet.Dispose();
        //        _dSet = null;
        //        _dData = null;
        //    }
        //}







        //public void cargaMunicipios()
        //{
        //    DataSet _dSet = new DataSet();

        //    try
        //    {
        //        _lParam = new List<DataParam>();
        //        _lParam.Add(new DataParam("@P_LLAVE_ENT", eEntidad.LlaveEntSICSA));
        //        _dData.Parameters = _lParam;
        //        _dSet = _dData.Consulta("sp_TraeMunicipios");

        //        if (IsNothing(_dData.Exception))
        //        {
        //            if (_dSet.Tables(0).Rows.Count > 0)
        //            {
        //                foreach (DataRow _dr in _dSet.Tables(0).Rows)
        //                {
        //                    _eEntidad = null;
        //                    _eEntidad = new eEntidad();

        //                    _eEntidad.LlaveEntSICSA = _dr("LLAVE_MUNICIPIO").ToString();
        //                    _eEntidad.NombreEntidad = _dr("NOMBRE").ToString();

        //                    _eEntidadList.Add(_eEntidad);
        //                }
        //            }
        //            else
        //                _sMensaje = "Sin Datos";
        //        }
        //        else
        //        {
        //            Exception = _dData.Exception;
        //            _sMensaje = "Error al traer los datos";
        //        }

        //        _sMensaje = "Datos cargados correctamente";
        //    }
        //    catch (Exception _ex)
        //    {
        //        Exception = _ex;
        //        _sMensaje = "Error al cargar los datos -> " + _ex.Message;
        //    }
        //    finally
        //    {
        //        if (!IsNothing(_dSet))
        //            _dSet.Dispose();
        //        _dSet = null/* TODO Change to default(_) if this is not a reference type */;
        //        _dData = null;
        //    }
        //}
        ////public void Carga()
        //{
        //    DataSet _dSet = new DataSet();

        //    try
        //    {
        //        _lParam = new List<DataParam>();
        //        _lParam.Add(new DataParam("@P_NOMBRE_ENT", (Interaction.IIf(eEntidad.NombreEntidad == "", "NA", eEntidad.NombreEntidad))));
        //        _lParam.Add(new DataParam("@P_PERIODO", eEntidad.Periodo));
        //        _dData.Parameters = _lParam;
        //        _dSet = _dData.Consulta("sp_TraeEntidades");

        //        if (IsNothing(_dData.Exception))
        //        {
        //            if (_dSet.Tables(0).Rows.Count > 0)
        //            {
        //                foreach (DataRow _dr in _dSet.Tables(0).Rows)
        //                {
        //                    _eEntidad = null;
        //                    _eEntidad = new eEntidad();

        //                    _eEntidad.LlaveEntSICSA = _dr("llave_entidad_sicsa").ToString();
        //                    _eEntidad.AbrevEntidad = _dr("abrev_entidad").ToString();
        //                    _eEntidad.NombreEntidad = _dr("nombre_entidad").ToString();
        //                    // _eEntidad.NombreMuestra = _dr("abrev_entidad").ToString() & " - " & _dr("nombre_entidad").ToString()
        //                    _eEntidad.NombreMuestra = _dr("nombre_entidad").ToString();

        //                    _eEntidadList.Add(_eEntidad);
        //                }
        //                _sMensaje = "Datos cargados correctamente";
        //            }
        //            else
        //                _sMensaje = "Error al cargar los datos";
        //        }
        //        else
        //        {
        //            Exception = _dData.Exception;
        //            _sMensaje = "Error al cargar los datos";
        //        }
        //    }
        //    catch (Exception _ex)
        //    {
        //        Exception = _ex;
        //        _sMensaje = "Error al cargar los datos -> " + _ex.Message;
        //    }
        //    finally
        //    {
        //        if (!IsNothing(_dSet))
        //            _dSet.Dispose();
        //        _dSet = null;
        //        _dData = null;
        //    }
        //}
    }



    public class eEntidad
    {
        private long _lLlaveEntSICSA = 0;
        private string _sAbrevEntidad = "";
        private string _sNombreEntidad = "";
        private string _sNombreMuestra = "";
        private long _lPeriodo = 0;

        public long LlaveEntSICSA
        {
            get
            {
                return _lLlaveEntSICSA;
            }
            set
            {
                _lLlaveEntSICSA = value;
            }
        }

        public string AbrevEntidad
        {
            get
            {
                return _sAbrevEntidad;
            }
            set
            {
                _sAbrevEntidad = value;
            }
        }

        public string NombreEntidad
        {
            get
            {
                return _sNombreEntidad;
            }
            set
            {
                _sNombreEntidad = value;
            }
        }

        public string NombreMuestra
        {
            get
            {
                return _sNombreMuestra;
            }
            set
            {
                _sNombreMuestra = value;
            }
        }
        public long Periodo
        {
            get
            {
                return _lPeriodo;
            }
            set
            {
                _lPeriodo = value;
            }
        }
    }




}
