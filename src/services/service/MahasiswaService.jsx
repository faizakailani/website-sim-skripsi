import queryString from "query-string";
import API_ENDPOINT from "../global";
import { api } from "../global/config";
import { AuthHeaders } from "../../helpers/Helpers";

const {
  GET_MAHASISWA,
  GET_MAHASISWA_BY_NIM,
  ADD_MAHASISWA,
  UPDATE_MAHASISWA,
  DELETE_MAHASISWA,
  ACTIVATE_MAHASISWA,
  DEACTIVATE_MAHASISWA,
} = API_ENDPOINT;

class MahasiswaService {
  static async GetMahasiswa(data) {
    const stringified = queryString.stringify(data);
    const res = await api.get(GET_MAHASISWA(stringified), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async GetMahasiswaByNim(nim) {
    const res = await api.get(GET_MAHASISWA_BY_NIM(nim), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async AddMahasiswa(data) {
    const res = await api.post(ADD_MAHASISWA, data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async DeleteMahasiswa(nim) {
    const res = await api.delete(DELETE_MAHASISWA(nim), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async UpdateMahasiswa(nim, data) {
    const res = await api.put(UPDATE_MAHASISWA(nim), data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async DeactivateMahasiswa(nim) {
    const res = await api.put(DEACTIVATE_MAHASISWA(nim), {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async ActivateMahasiswa(nim) {
    const res = await api.put(ACTIVATE_MAHASISWA(nim), {
      headers: AuthHeaders(),
    });
    return res;
  }
}

export default MahasiswaService;
