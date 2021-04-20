using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.IO;
using System.Security.Cryptography;

    

namespace Funciones
{
    class nFunciones
    {


        private string EncryptionKey { get; set; } = "ac907a9aE2da0c4e24X94d==";
        private string EncryptionIV { get; set; } = "AfRr4gBtjZ34GerTgTyu2E==";
        public string CadenaDesencriptada { get; set; } = string.Empty;
        public string CadenaEncriptar { get; set; } = string.Empty;
        public string CadenaEncriptada { get; set; } = string.Empty;
        public string MensajeResp = string.Empty;

        //public bool EnviaCorreo(string _psCorreo, string _psSeccion, string _psURL)
        //{
        //    nMail _nMail = new nMail();
        //    try
        //    {
        //        CadenaEncriptar = _psCorreo + "ß" + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
        //        EncryptString();
        //        _nMail.LigaValidacion = _psURL + _psSeccion + ".aspx?datos=" + Convert.ToBase64String(Encoding.ASCII.GetBytes(CadenaEncriptada));
        //        _nMail.eMail.Email = _psCorreo;
        //        _nMail.EnviaCorreoValidacion();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        MensajeResp = ex.Message;
        //        return false;
        //    }
        //}

        public bool EncryptString()
        {
            byte[] iv = Convert.FromBase64String(EncryptionIV); // New Byte(15) {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
                                                                // Convert.FromBase64String("cea55f11A3e30v4c6bNa05==") 'Encoding.UTF8.GetBytes("cea55f11-3e30-4c6b-a05c-248d6b61e9ae-ac907a9a-2da0-4e24-94d3-8d059fbf05b7-ac907a9a-2da0-4e24-94d3-8d059fbf05b7-ac907a9a-28888899") 'New Byte(15) {}
            byte[] array;

            try
            {
                using (Aes aes = Aes.Create())
                {
                    aes.Mode = CipherMode.CBC;
                    // aes.KeySize = 128
                    // aes.BlockSize = 128
                    // aes.FeedbackSize = 128
                    // aes.Padding = PaddingMode.None
                    aes.Key = Convert.FromBase64String(EncryptionKey);
                    aes.IV = iv;
                    ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                            {
                                streamWriter.Write(CadenaEncriptar);
                            }
                            array = memoryStream.ToArray();
                        }
                    }
                }
                CadenaEncriptada = Convert.ToBase64String(array);
                return true;
            }
            catch (Exception ex)
            {
                MensajeResp = ex.Message;
                return false;
            }
        }
        public bool DecryptString()
        {
            byte[] iv = Convert.FromBase64String(EncryptionIV); // New Byte(15) {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
            byte[] buffer = Convert.FromBase64String(CadenaEncriptada);
            try
            {
                using (Aes aes = Aes.Create())
                {
                    aes.Mode = CipherMode.CBC;
                    // aes.KeySize = 128
                    // aes.BlockSize = 128
                    // aes.FeedbackSize = 128
                    // aes.Padding = PaddingMode.None
                    aes.Key = Convert.FromBase64String(EncryptionKey);
                    aes.IV = iv;
                    ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                    using (MemoryStream memoryStream = new MemoryStream(buffer))
                    {
                        using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                            {
                                CadenaDesencriptada = streamReader.ReadToEnd();
                            }
                        }
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                MensajeResp = ex.Message;
                return false;
            }
        }

    }
}
