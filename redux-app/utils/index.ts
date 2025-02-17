export const getLocalAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const transFormedDateWithTime = (date: string) => {
  let newDate = null;

  if (date == null) {
    return;
  }

  if (isDateValid(date)) {
    newDate = new Date(date);
    const newStartYear = newDate.getFullYear();
    const newStartMonth = newDate.getMonth() + 1;
    const newStartDay = newDate.getDate();

    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);

    const newStartHour = newDate.getHours();
    const newStartMinutes = newDate.getMinutes();
    const newStartSeconds = newDate.getSeconds();

    const transformedDateString = `${newStartYear}-${newStartMonth}-${newStartDay}T${newStartHour}:${newStartMinutes}:${newStartSeconds}`;
    return transformedDateString;
  }
};
export const checkPasswordRequirements = (password: string) => {
  type requirementType = {
    id: number;
    message: string;
    isFulfilled: boolean;
  };
  let requirements: requirementType[] = [];

  if (password.length > 0) {
    requirements = [
      {
        id: 1,
        message: "Minimum 8 character long",
        isFulfilled: password.length >= 8,
      },
      {
        id: 2,
        message: "At least 1 number",
        isFulfilled: /\d+/.test(password),
      },
      {
        id: 3,
        message: "At least 1 uppercase letter",
        isFulfilled: /[A-Z]+/.test(password),
      },
      {
        id: 4,
        message: "At least 1 special character",
        isFulfilled: /[!@#$%^&*()-+]+/.test(password),
      },
      {
        id: 4,
        message: "At least 1 lowercase letter",
        isFulfilled: /[a-z]+/.test(password),
      },
    ];
  }

  return requirements;
};

const isDateValid = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

export const transformDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const transFormedDate = (date: string) => {
  let newDate = null;

  if (date == null) {
    return;
  }

  if (isDateValid(date)) {
    newDate = new Date(date);
    const newStartYear = newDate.getFullYear();
    const newStartMonth = newDate.getMonth() + 1;
    const newStartDay = newDate.getDate();

    const transformedDateString = `${newStartYear}-${newStartMonth}-${newStartDay}`;
    return transformedDateString;
  }
};
export const getTextCapitalize = (text: string) => {
  const transformedText = text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return transformedText;
};

export const generateStrongPassword = () => {
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLower = getRandomChar(lowercaseChars);
  const randomUpper = getRandomChar(uppercaseChars);
  const randomNumber = getRandomChar(numbers);
  const randomSpecial = getRandomChar(specialChars);

  const additionalChars = generateRandomChars(
    6,
    lowercaseChars + uppercaseChars + numbers + specialChars
  );
  const allChars =
    randomLower + randomUpper + randomNumber + randomSpecial + additionalChars;
  const shuffledChars = shuffleString(allChars);

  return shuffledChars;
};

const getRandomChar = (characters: any) => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};

const generateRandomChars = (count: number, characters: string) => {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += getRandomChar(characters);
  }
  return result;
};

const shuffleString = (str: string) => {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
};

export const generateUniqueId = () =>
  `id_${Math.random().toString(36).substr(2, 9)}`;

export const downloadFiles = async ({
  url,
  name,
}: {
  url: string;
  name: string;
}) => {
  const imageBlob = await fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new Blob([buffer]));
  const link = document.createElement("a");
  link.href = URL.createObjectURL(imageBlob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const isPDF = (file: File | null): boolean => {
  return file ? file.type === "application/pdf" : false;
};

export const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / 1024).toFixed(2)} KB`;
  }
};
export const formatFileName = (name: string) => {
  const maxLength = 12;
  const extension = name.substring(name.lastIndexOf("."));
  const nameWithoutExtension = name.substring(0, name.lastIndexOf("."));

  if (nameWithoutExtension.length > maxLength) {
    return `${nameWithoutExtension.slice(0, maxLength)}...${extension}`;
  } else {
    return name;
  }
};

export function removeSpaces(htmlString: any) {
  return htmlString.replace(/\s+/g, "");
}

export const formatDisplayName = (displayName: string) => {
  return displayName.replace(/([a-z])([A-Z])/g, "$1 $2");
};
