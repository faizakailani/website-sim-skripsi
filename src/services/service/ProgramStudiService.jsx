import queryString from "query-string";
import { AuthHeaders } from "../../helpers/Helpers";
import API_ENDPOINT from "../global";
import { api } from "../global/config";

const { 
  GET_PRODI,
  GET_PRODI_BY_KODE,
  ADD_PRODI,
  UPDATE_PRODI,
  DELETE_PRODI,
  ACTIVATE_PRODI,
  DEACTIVATE_PRODI,
 } = API_ENDPOINT;

class ProgramStudiService {
  static async GetProdi(data) {
    const stringified = queryString.stringify(data);
    const res = await api.get(GET_PRODI(stringified), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async GetProdiByKode(kode) {
    const res = await api.get(GET_PRODI_BY_KODE(kode), {
      headers: AuthHeaders(),
    });
    return res;
  }
  
  static async AddProdi(kode){
    const res = await api.post(ADD_PRODI, kode, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async DeleteProdi(kode){
    const res = await api.delete(DELETE_PRODI(kode), {
      headers: AuthHeaders(),
    });
    return res;
  }

  
  static async UpdateProdi(kode){
    const res = await api.put(UPDATE_PRODI(kode), kode, {
      headers: AuthHeaders(),
    });
    return res;
  }
  
  static async DeactivateProdi(kode){
    const res = await api.put(DEACTIVATE_PRODI(kode), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async ActivateProdi(kode){
    const res = await api.put(ACTIVATE_PRODI(kode), {
      headers: AuthHeaders(),
    });
    return res;
  }
}

export default ProgramStudiService;