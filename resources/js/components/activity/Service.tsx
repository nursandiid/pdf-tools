import { Log } from "@/types/log";

type ServiceProps = {
  item: Log;
};

export default function Service({ item }: ServiceProps) {
  const services = [
    {
      title: "Merge PDF",
      imageUrl: "/img/merge-pdf.svg",
      service: "merge_pdf",
    },
    {
      title: "Split PDF",
      imageUrl: "/img/split-pdf.svg",
      service: "split_pdf",
    },
    {
      title: "PDF to JPG",
      imageUrl: "/img/pdf-to-jpg.svg",
      service: "pdf_to_jpg",
    },
    {
      title: "JPG to PDF",
      imageUrl: "/img/jpg-to-pdf.svg",
      service: "jpg_to_pdf",
    },
    {
      title: "Rotate PDF",
      imageUrl: "/img/rotate-pdf.svg",
      service: "rotate_pdf",
    },
    {
      title: "Compress PDF",
      imageUrl: "/img/compress-pdf.svg",
      service: "compress_pdf",
    },
    {
      title: "Word to PDF",
      imageUrl: "/img/word-to-pdf.svg",
      service: "word_to_pdf",
    },
    {
      title: "Powerpoint to PDF",
      imageUrl: "/img/powerpoint-to-pdf.svg",
      service: "powerpoint_to_pdf",
    },
  ];

  const selectedService = services.find(
    ({ service }) => service === item.service,
  );

  if (!selectedService) return "-";

  return (
    <div className="flex w-full items-center gap-4 rounded-lg p-2">
      <div className="shrink-0">
        <img
          src={selectedService.imageUrl}
          alt={selectedService.title}
          className="w-6"
        />
      </div>
      <h5 className="hidden shrink-0 text-sm sm:block">
        {selectedService.title}
      </h5>
    </div>
  );
}
