import { AuthHeaders } from "../../helpers/Helpers";
import API_ENDPOINT from "../global";
import { api } from "../global/config";

const { LOGIN, REGISTER, GET_PROFILE, UPDATE_PROFILE, CHANGE_PASSWORD } =
  API_ENDPOINT;

class UserService {
  static async Login(data) {
    const res = await api.post(LOGIN, data);
    return res;
  }

  static async Register(data) {
    const res = await api.post(REGISTER, data);
    return res;
  }

  static async GetProfile() {
    const res = await api.get(GET_PROFILE, { headers: AuthHeaders() });
    return res;
  }

  static async UpdateProfile(data) {
    const res = await api.put(UPDATE_PROFILE, data, {
      headers: AuthHeaders(),
    });
    return res;
  }

  static async UpdatePassword(data) {
    const res = await api.put(CHANGE_PASSWORD, data, {
      headers: AuthHeaders(),
    });
    return res;
  }
}

export default UserService;
