import Swal from "sweetalert2";

class AlertComponent {
  Error(message) {
    Swal.fire({
      icon: "error",
      title: "Pemberitahuan!",
      text: message,
      confirmButtonColor: "red",
      confirmButtonText: "Tutup",
    });
  }

  Warning(message) {
    Swal.fire({
      icon: "warning",
      title: "Pemberitahuan!",
      text: message,
      confirmButtonColor: "red",
      confirmButtonText: "Tutup",
    });
  }

  SuccessLogin(message) {
    Swal.fire({
      icon: "success",
      title: "Selamat Datang",
      text: message,
      confirmButtonText: "Tutup",
      confirmButtonColor: "#54FF45",
    });
  }

  SuccessResponse(message) {
    Swal.fire({
      icon: "success",
      title: "Pemberitahuan!",
      text: message,
      confirmButtonColor: "#54FF45",
      confirmButtonText: "Tutup",
    });
  }

  DeleteConfirmation(title) {
    return Swal.fire({
      icon: "question",
      title: title,
      text: "Apakah yakin ingin menghapus data?",
      confirmButtonColor: "grey",
      confirmButtonText: "Hapus",
      showCancelButton: true,
      cancelButtonColor: "red",
      cancelButtonText: "Batal",
    });
  }

  LogoutConfirmation(title) {
    return Swal.fire({
      icon: "question",
      title: title,
      text: "Apakah yakin ingin Keluar dari sistem?",
      confirmButtonColor: "red",
      confirmButtonText: "Iya",
      showCancelButton: true,
      cancelButtonText: "Batal",
      cancelButtonColor: "grey",
    });
  }
}

export default new AlertComponent();
