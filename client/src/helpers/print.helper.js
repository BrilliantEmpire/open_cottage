import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import download from "downloadjs";
import { message } from "antd";

const handleDownloadPDF = async (recipe) => {
  const postCardElement =
    typeof window !== "undefined" &&
    window?.document.querySelector("#recipe-card");

  const pdfWidth = postCardElement.offsetWidth;
  const pdfHeight = postCardElement.offsetHeight;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [pdfWidth, pdfHeight],
    pdfVersion: "1.4",
  });

  await toJpeg(postCardElement, { quality: 1.0, pixelRatio: 12 })
    .then(function (dataUrl) {
      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);

      const downloadFileName = `${recipe?.title}.pdf`;

      download(pdf.output("blob"), downloadFileName, "application/pdf");
    })
    .then(() => {
      message.success("Downloaded Successfully");
    })
    .catch((err) => console.log(err));
};

export { handleDownloadPDF };
