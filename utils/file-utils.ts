export enum FileExtensions {
  AAC = ".aac",
  ABW = ".abw",
  ARC = ".arc",
  AVI = ".avi",
  AZW = ".azw",
  BIN = ".bin",
  BMP = ".bmp",
  BZ = ".bz",
  BZ2 = ".bz2",
  CSH = ".csh",
  CSS = ".css",
  CSV = ".csv",
  DOC = ".doc",
  DOCX = ".docx",
  EOT = ".eot",
  EPUB = ".epub",
  GIF = ".gif",
  GDOC = ".gdoc",
  GSHEET = ".gsheet",
  GSLIDE = ".gslide",
  HTM = ".htm",
  HTML = ".html",
  ICO = ".ico",
  ICS = ".ics",
  JAR = ".jar",
  JPEG = ".jpeg",
  JPG = ".jpg",
  JS = ".js",
  JSON = ".json",
  JSONLD = ".jsonld",
  MID = ".mid",
  MIDI = ".midi",
  MJS = ".mjs",
  MP3 = ".mp3",
  MPEG = ".mpeg",
  MPKG = ".mpkg",
  ODP = ".odp",
  ODS = ".ods",
  ODT = ".odt",
  OGA = ".oga",
  OGV = ".ogv",
  OGX = ".ogx",
  OPUS = ".opus",
  OTF = ".otf",
  PNG = ".png",
  PDF = ".pdf",
  PHP = ".php",
  PPT = ".ppt",
  PPTX = ".pptx",
  RAR = ".rar",
  RTF = ".rtf",
  SH = ".sh",
  SVG = ".svg",
  SWF = ".swf",
  TAR = ".tar",
  TIF = ".tif",
  TIFF = ".tiff",
  TS = ".ts",
  TTF = ".ttf",
  TXT = ".txt",
  VSD = ".vsd",
  WAV = ".wav",
  WEBA = ".weba",
  WEBM = ".webm",
  WEBP = ".webp",
  WOFF = ".woff",
  WOFF2 = ".woff2",
  XHTML = ".xhtml",
  XLS = ".xls",
  XLSX = ".xlsx",
  XML = ".xml",
  XUL = ".xul",
  ZIP = ".zip",
  _3GP = ".3gp",
  _3G2 = ".3g2",
  _7Z = ".7z",
  AMR = ".amr",
  FLAC = ".flac",
  IDML = ".idml",
  MP4 = ".mp4",
  OGG = ".ogg",
  POTX = ".potx",
  VSDX = ".vsdx",
  XLIFF = ".xliff",
  MXLIFF = ".mxliff",
  TMX = ".tmx",
  TBX = ".tbx",
  SDLTM = ".sdltm",
  SDLXLIFF = ".sdlxliff",
  XLF = ".xlf",
}

export const calculateFileSizeInKb = (bytes: number) =>
  `${Math.fround(bytes / 1000).toPrecision(3)} KB`;

export function convertBytes(byteSize: number): string {
  const units: string[] = ["B", "KB", "MB", "GB"];

  // Handle empty or zero-size files
  if (byteSize === 0) {
    return `0B`;
  }

  let size: number = byteSize;
  let unitIndex: number = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024.0;
    unitIndex += 1;
  }

  if (!size) {
    return `0B`;
  }

  const formattedSize: string =
    size % 1 === 0 ? size.toFixed(0) : size.toFixed(2);
  const result: string = `${formattedSize} ${units[unitIndex]}`;
  return result;
}

export const mbsToSize = (size: number) => convertBytes(mbToBytes(size));

export const fileSizeConversion = (fileSize: number): string => {
  return fileSize >= 1000 * 1024
    ? `${Math.round(fileSize / (1024 * 1024))} MB`
    : `${Math.round(fileSize / 1024)} KB`;
};

export const bytesToMB = (bytes: number) => {
  const megabytes = bytes / (1024 * 1024);
  const formatted = megabytes.toFixed(2);
  return formatted.endsWith(".00") ? formatted.slice(0, -3) : formatted;
};

export const mbToBytes = (mb: number) => {
  const bytesPerMB = 1024 * 1024;
  return mb * bytesPerMB;
};
