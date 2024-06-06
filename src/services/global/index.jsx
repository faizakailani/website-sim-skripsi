import URL from "./url";

const { API_URL } = URL;

const API_ENDPOINT = {
  //auth
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,

  //users
  GET_PROFILE: (username) => `${API_URL}/users/me/${username}`,
  UPDATE_PROFILE: (username) => `${API_URL}/users/update/${username}`,

  //dosen
  GET_DOSEN: (data) => `${API_URL}/dosen/all?${data}`,
  GET_DOSEN_BY_NIDN: (nidn) => `${API_URL}/dosen/get/${nidn}`,
  ADD_DOSEN: `${API_URL}/dosen/create`,
  DELETE_DOSEN: (nidn) => `${API_URL}/dosen/delete/${nidn}`,
  UPDATE_DOSEN: (nidn) => `${API_URL}/dosen/update/${nidn}`,
  ACTIVATE_DOSEN: (nidn) => `${API_URL}/dosen/activated/${nidn}`,
  DEACTIVATE_DOSEN: (nidn) => `${API_URL}/dosen/deactivated/${nidn}`,

  //logtw
  GET_LOGTW: (data) => `${API_URL}/logtw/all?${data}`,
  GET_LOGTW_BY_ID: (id) => `${API_URL}/logtw/get/${id}`,
  ADD_LOGTW: `${API_URL}/logtw/create`,
  DELETE_LOGTW: (id) => `${API_URL}/logtw/delete/${id}`,
  UPDATE_LOGTW: (id) => `${API_URL}/logtw/update/${id}`,

  //program_studi
  GET_PRODI: (data) => `${API_URL}/program_studi/all?${data}`,
  GET_PRODI_BY_KODE: (kode) => `${API_URL}/program_studi/get/${kode}`,
  ADD_PRODI: `${API_URL}/program_studi/create`,
  DELETE_PRODI: (kode) => `${API_URL}/program_studi/delete/${kode}`,
  UPDATE_PRODI: (kode) => `${API_URL}/program_studi/update/${kode}`,
  ACTIVATE_PRODI: (kode) => `${API_URL}/program_studi/activated/${kode}`,
  DEACTIVATE_PRODI: (kode) => `${API_URL}/program_studi/deactivated/${kode}`,

  //mahasiswa
  GET_MAHASISWA: (data) => `${API_URL}/mahasiswa/all?${data}`,
  GET_MAHASISWA_BY_NIM: (nim) => `${API_URL}/mahasiswa/get/${nim}`,
  ADD_MAHASISWA: `${API_URL}/mahasiswa/create`,
  UPDATE_MAHASISWA: (nim) => `${API_URL}/mahasiswa/update/${nim}`,
  ACTIVATE_MAHASISWA: (nim) => `${API_URL}/mahasiswa/activated/${nim}`,
  DEACTIVATE_MAHASISWA: (nim) => `${API_URL}/mahasiswa/deactivated/${nim}`,

  //skripsi
  GET_SKRIPSI: (data) => `${API_URL}/skripsi/all?${data}`,
  GET_SKRIPSI_BY_ID: (id) => `${API_URL}/skripsi/get/${id}`,
  ADD_SKRIPSI: `${API_URL}/skripsi/create`,
  UPDATE_SKRIPSI: (id) => `${API_URL}/skripsi/update/${id}`,
  ACTIVATE_SKRIPSI: (id) => `${API_URL}/skripsi/activated/${id}`,
  DEACTIVATE_SKRIPSI: (id) => `${API_URL}/skripsi/deactivated/${id}`,
};

export default API_ENDPOINT;
