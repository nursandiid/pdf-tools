import Card from "@/components/download/Card";

export default function Services() {
  const services = [
    {
      title: "Merge PDF",
      imageUrl: "/img/merge-pdf.svg",
      href: route("merge_pdf"),
    },
    {
      title: "Split PDF",
      imageUrl: "/img/split-pdf.svg",
      href: route("split_pdf"),
    },
    {
      title: "PDF to JPG",
      imageUrl: "/img/pdf-to-jpg.svg",
      href: route("pdf_to_jpg"),
    },
    {
      title: "JPG to PDF",
      imageUrl: "/img/jpg-to-pdf.svg",
      href: route("jpg_to_pdf"),
    },
    {
      title: "Rotate PDF",
      imageUrl: "/img/rotate-pdf.svg",
      href: route("rotate_pdf"),
    },
    {
      title: "Compress PDF",
      imageUrl: "/img/compress-pdf.svg",
      href: route("compress_pdf"),
    },
    {
      title: "Word to PDF",
      imageUrl: "/img/word-to-pdf.svg",
      href: route("word_to_pdf"),
    },
    {
      title: "Powerpoint to PDF",
      imageUrl: "/img/powerpoint-to-pdf.svg",
      href: route("powerpoint_to_pdf"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service) => (
        <Card
          title={service.title}
          imageUrl={service.imageUrl}
          href={service.href}
          key={service.title}
        />
      ))}
    </div>
  );
}
