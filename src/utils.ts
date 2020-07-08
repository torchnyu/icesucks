import {
  internationalSubjects,
  weirdCourseNames,
  weirdSubjectNames
} from "./constants";

export function getOrKey(key: string, obj: { [s: string]: string }): string {
  if (key in obj) {
    return obj[key];
  }
  return key;
}

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export function fixCredit(minUnits: number, maxUnits: number): string {
  if (minUnits > 0) {
    return `${minUnits} - ${maxUnits}`;
  }
  return `${maxUnits}`;
}

export function fixLocation(location: string): string {
  return location
    .replace("Room:", "Room: ")
    .replace("Bldg:COLU", "Columbia University");
}

export function fixCourseName(name: string): string {
  return getOrKey(name, weirdCourseNames)
    .replace("Sp Tpcs", "Special Topics")
    .replace(/Adolesc( |$)/, "Adolescent ")
    .replace(/Adv( |$)/, "Advanced ")
    .replace(/Intens( |$)/, "Intense ")
    .replace("Tpcs", "Topics")
    .replace(/Prob[ $:]/, "Probability")
    .replace(/:$/, "");
}

export function fixSubjectName(name: string, code: string): string {
  const lessWeirdName = getOrKey(name, weirdSubjectNames).replace(
    "Ctr",
    "Center"
  );
  if (lessWeirdName.match(/Int[`']l/)) {
    return code in internationalSubjects
      ? internationalSubjects[code]
      : "International Programs";
  }
  return lessWeirdName;
}

export const getRandomInteger = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const coreClasses = new Set([
  "csci-ua-101",
  "csci-ua-102",
  "csci-ua-201",
  "csci-ua-202",
  "csci-ua-310",
  "math-ua-120",
  "math-ua-121",
  "math-ua-122",
  "math-ua-123",
  "math-ua-140",
  "math-ua-325",
  "math-ua-343",
  "ds-ua-111",
  "ds-ua-112",
  "ds-ua-201",
  "ds-ua-202",
  "ds-ua-301"
]);

export function findCoreReqs(
  schoolCode: string,
  subjectCode: string,
  deptCourseId: string
): boolean {
  return coreClasses.has(
    `${subjectCode.toLowerCase()}-${schoolCode.toLowerCase()}-${deptCourseId}`
  );
}
