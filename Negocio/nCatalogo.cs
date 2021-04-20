using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using General;
using Datos;
using System.IO;
using System.Configuration;
using System.Data;

namespace Negocio
{
    public class nCatalogo  : nGeneral
    {

        
        public long LlaveCatalogo { get; set; }
        public string Texto { get; set; }

        public nCatalogo() : base(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString)
        {
            _sSubClase = "nCatalogo";
        }

        // Procedimientos almacenados 

        private Procedimientos _Proc;        
        public Procedimientos Procs
        {
            get { return _Proc; }
            set
            {
                _Proc = value;
                _sStoreProc = _Proc.ToString();
            }
        }









        public DataSet TraeCP()
        {
            DataSet _ds = new DataSet();
            
            try {


                //_ds = BD.Ejecuta("sp_CatalogoCP");
                Procs = Procedimientos.sp_TraeCP;
                _ds = Consulta();


                return _ds;

                

            }

            catch ( Exception err) {

                Exception = err;
                return _ds;
            
            }
        }




        // Procedimientos 

        public enum Procedimientos
        {
            sp_TraeCP

        }





    }
}
