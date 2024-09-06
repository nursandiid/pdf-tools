export const isImageFile = (name: string | null) => {
  if (!name) return;

  const validExtensions = ["jpg", "jpeg", "png"];
  const extension = name.split(".").pop()?.toLowerCase() ?? "";

  return validExtensions.includes(extension);
};

export const isWordFile = (name: string | null) => {
  if (!name) return;

  const validExtensions = ["doc", "docx"];
  const extension = name.split(".").pop()?.toLowerCase() ?? "";

  return validExtensions.includes(extension);
};

export const isPowerpointFile = (name: string | null) => {
  if (!name) return;

  const validExtensions = ["ppt", "pptx"];
  const extension = name.split(".").pop()?.toLowerCase() ?? "";

  return validExtensions.includes(extension);
};

export const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return size.toFixed(2) + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};

export const calculatePercentage = (total: number, processing: number) => {
  if (total === 0) return 0;

  return Number(((processing / total) * 100).toFixed(2));
};
