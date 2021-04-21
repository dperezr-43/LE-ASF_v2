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

        
      

        public DataSet DSDatos { get; set; }

        private Exception _Exception;
        private string _sMensaje;

        private List<ECatalogo> _eCatList;
        private ECatalogo _eCat;
        private DatosSQL DB;
        private List<DataParamSQL> _lParam;

              

      




        public nCatalogo() : base(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString)
        {
            _sSubClase = "nCatalogo";

            _Exception = null;
            _eCatList = new List<ECatalogo>();
            _eCat = new ECatalogo();
            DB = null;


        }



        public string Mensaje
        {
            get
            {
                return _sMensaje;
            }
        }



        public List<ECatalogo> CatList
        {
            get
            {
                return _eCatList;
            }
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









        public void TraeCP()
        {
            DSDatos = new DataSet();


            try {

                
                Procs = Procedimientos.sp_TraeCP;
                              
                DSDatos = Consulta();
                            
               

            }

            catch ( Exception err) {

                Exception = err;
                
            
            }
        }




        // Procedimientos 

        public enum Procedimientos
        {
            sp_TraeCP

        }



        public void Catalogos() {

            _sMensaje = "";            

            _eCatList = new List<ECatalogo>();

            try {

                Procs = Procedimientos.sp_TraeCP;
                _ds = Consulta();

                if (Exception == null) {

                    if (_ds != null || _ds.Tables.Count > 0 || _ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow _dr in _ds.Tables[0].Rows) {

                            _eCat = new ECatalogo
                            {
                                Llave = (int)_dr["llave"],
                                Texto = (string)_dr["texto"]
                            };

                            _eCatList.Add(_eCat);
                        }
                    }

                }
            }
            catch (Exception err) {
                _Exception = err;
            
            }

        } // Catalogos










        public partial class ECatalogo
        {


            private long lRowNum = 0;

            public long RowNum
            {
                get
                {
                    return lRowNum;
                }

                set
                {
                    lRowNum = value;
                }
            }




            private int lLlave = 0;

            public int Llave
            {
                get
                {
                    return lLlave;
                }

                set
                {
                    lLlave = value;
                }
            }

            private string sTexto = "";

            public string Texto
            {
                get
                {
                    return sTexto;
                }

                set
                {
                    sTexto = value;
                }
            }

            
           
           

           
        }



    }
}
