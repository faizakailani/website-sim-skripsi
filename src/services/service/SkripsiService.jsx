import queryString from "query-string";
import { AuthHeaders } from "../../helpers/Helpers";
import API_ENDPOINT from "../global";
import { api } from "../global/config";

const {
  GET_SKRIPSI,
  GET_SKRIPSI_BY_ID,
  ADD_SKRIPSI,
  UPDATE_SKRIPSI,
  DELETE_SKRIPSI,
} = API_ENDPOINT;

class SkripsiService {
  static async GetSkripsi(data) {
    const stringified = queryString.stringify(data);
    const res = await api.get(GET_SKRIPSI(stringified), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async GetSkripsiByID(id) {
    const res = await api.get(GET_SKRIPSI_BY_ID(id), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async AddSkripsi(data) {
    const res = await api.post(ADD_SKRIPSI, data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async DeleteSkripsi(id) {
    const res = await api.delete(DELETE_SKRIPSI(id), {
      headers: AuthHeaders(),
    });
    return res;
  }


  static async UpdateSkripsi(id, data) {
    const res = await api.put(UPDATE_SKRIPSI(id), data, {
      headers: AuthHeaders(),
    });
    return res;
  }
}

export default SkripsiService;