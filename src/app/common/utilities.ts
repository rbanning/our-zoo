export const capitalize = (text: string) => {
  const parts = text.split(" ").filter(Boolean);
  return parts
    .map(word => {
      return word[0].toLocaleUpperCase() + word.substr(1);
    })
    .join(" ");
};

export const replaceSpace = (text: string, replacement: string) => {
  if (text) {
    return text.replace(/\s/g, replacement);
  }
  //else
  return null;
};

export type ArrayMapFunction = (v?: any, i?: number) => any;

export const buildArray = (size: number, mapFn: ArrayMapFunction): any[] => {
  return Array.from({ length: size }, mapFn);
};

export const randomElement = (array: any[]) => {
  if (!Array.isArray(array)) {
    throw new Error("randomElement() expects an array argument");
  }
  return array[(Math.random() * array.length) | 0];
};

export const randomElements = (array: any[], count: number) => {
  if (!Array.isArray(array)) {
    throw new Error("randomElements() expects an array argument");
  }

  if (count <= 0) {
    return [];
  }
  if (count >= array.length) {
    return [...array];
  }

  //else
  const indicies = buildArray(array.length, (v, i) => i);
  const ret = [];

  let i;
  while (ret.length < count) {
    i = (Math.random() * indicies.length) | 0; //truncate
    ret.push(indicies[i]);
    indicies.splice(i, 0);
  }

  return array.filter((v, i) => ret.includes(i));
};

export const changeRatio = function(past: number, current: number): number {
  return past === 0 ? 0 : (current - past) / past;
};

export const encrypt = (text: string, passcode: string): string => {
  const result: number[] = [];
  const passLen = passcode.length;

  let offset: number, ascii: number;

  for (let i = 0; i < text.length; i++) {
    offset = i % passLen;
    ascii = text.charCodeAt(i) + passcode.charCodeAt(offset);
    result.push(ascii);
  }

  return btoa(JSON.stringify(result));
};

export const decrypt = (text: string, passcode: string): string => {
  const array: number[] = JSON.parse(atob(text));

  if (Array.isArray(array)) {
    const result: number[] = [];
    const passLen = passcode.length;
    let offset: number, ascii: number;
    for (let i = 0; i < array.length; i++) {
      offset = i % passLen;
      ascii = array[i] - passcode.charCodeAt(offset);
      result.push(ascii);
    }

    return result.map((val: number) => String.fromCharCode(val)).join("");
  }

  //else
  return null;
};
