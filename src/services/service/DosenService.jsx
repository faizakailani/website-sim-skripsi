import queryString from "query-string";
import API_ENDPOINT from "../global";
import { api } from "../global/config";
import { AuthHeaders } from "../../helpers/Helpers";

const {
  GET_DOSEN,
  GET_DOSEN_BY_NIDN,
  ADD_DOSEN,
  UPDATE_DOSEN,
  DELETE_DOSEN,
  ACTIVATE_DOSEN,
  DEACTIVATE_DOSEN,
} = API_ENDPOINT;

class DosenService {
  static async GetDosen(data) {
    const stringified = queryString.stringify(data);
    const res = await api.get(GET_DOSEN(stringified), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async GetDosenByNidn(nidn) {
    const res = await api.get(GET_DOSEN_BY_NIDN(nidn), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async AddDosen(data) {
    const res = await api.post(ADD_DOSEN, data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async DeleteDosen(nidn) {
    const res = await api.delete(DELETE_DOSEN(nidn), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async UpdateDosen(nidn, data) {
    const res = await api.put(UPDATE_DOSEN(nidn), data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async DeactivateDosen(nidn) {
    const res = await api.put(DEACTIVATE_DOSEN(nidn), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async ActivateDosen(nidn) {
    const res = await api.put(ACTIVATE_DOSEN(nidn), {
      headers: AuthHeaders(),
    });
    return res;
  }
}

export default DosenService;
