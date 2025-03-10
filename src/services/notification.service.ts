import toasteventbus from "primevue/toasteventbus";
import Swal from "sweetalert2";

class NotificacionService {
  Notify(message: any, delay: number = 5000) {
    var title: string;
    if (message.type == "success") {
      title = "Éxito";
    } else if (message.type == "error") {
      title = "Error";
    } else if (message.type == "warning") {
      message.type = "warn";
      title = "Advertencia";
    } else {
      title = "Información";
    }
    if (
      message?.type != null &&
      message?.text != null &&
      message?.type != "" &&
      message?.text != ""
    ) {
      setTimeout(() => {
        toasteventbus.emit("add", {
          severity: message.type,
          summary: title,
          detail: message.text,
          life: delay,
        });
      }, 1000);
    }
  }

  Sweetalert(message: any, delay: number = 5000) {
    var title: string;
    if (message.type == "success") {
      title = "Éxito";
    } else if (message.type == "error") {
      title = "Error";
    } else if (message.type == "warning") {
      title = "Advertencia";
    } else {
      title = "Información";
    }
    if (
      message?.type != null &&
      message?.text != null &&
      message?.type != "" &&
      message?.text != ""
    ) {
      Swal.fire({
        title: title,
        text: message.text ?? "Ha ocurrido un error",
        icon: message.type ?? "info",
      });
    }
  }
}

const notificacionService = new NotificacionService();
export { notificacionService };

