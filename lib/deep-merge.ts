type Object = { [key: string]: any };

const isObject = (obj: any) =>
  obj !== null && typeof obj === "object" && !Array.isArray(obj);

export const deepMerge = (target: Object, source: Object, level = 0) => {
  const copyTarget = level === 0 ? structuredClone(target) : target;

  for (const key in source) {
    const sourceVal = source[key];

    if (!isObject(sourceVal)) {
      copyTarget[key] = sourceVal;
    } else {
      if (!isObject(copyTarget[key])) {
        copyTarget[key] = {};
      }
      deepMerge(copyTarget[key], sourceVal, level + 1);
    }
  }
  return copyTarget;
};
