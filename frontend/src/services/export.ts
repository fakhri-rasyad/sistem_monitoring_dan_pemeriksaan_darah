import axios from "axios";
import { api } from "./api";

export async function DownloadUserDetail(publicId: string) {
  try {
    const res = await api.get("/api/v1/pasien/export", {
      responseType: "blob",
      params: {
        public_id: publicId,
      },
    });

    const contentDisposition = res.headers["content-disposition"];

    let fileName = "data_pasien.xlsx";

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(
        /filename="?([^"]+)"?/
      );

      if (fileNameMatch?.[1]) {
        fileName = fileNameMatch[1];
      }
    }

    const url = window.URL.createObjectURL(res.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Status:", err.response?.status);
      console.error("Response:", err.response?.data);
      console.error("Headers:", err.response?.headers);
      console.error("URL:", err.config?.url);
    } else {
      console.error(err);
    }

    throw err;
  }
}
