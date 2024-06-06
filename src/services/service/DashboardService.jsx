import { AuthHeaders } from "../../helpers/Helpers";
import API_ENDPOINT from "../global";
import { api } from "../global/config";

const { GET_DASHBOARD } = API_ENDPOINT;

class DashboardService {
  static async GetData() {
    const res = await api.get(GET_DASHBOARD, { headers: AuthHeaders() });
    return res;
  }
}

export default DashboardService;
