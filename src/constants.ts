/*
  Constant for API_URL, course and subject names,
  handling odd data
*/

import { IRequirement, Modifier, RequirementType } from "./types";

export const API_URL = "https://schedge.a1liu.com";

export const weirdCourseNames: { [s: string]: string } = {
  "Intro to Computer SCI": "Intro to Computer Science",
  "Computer Systems Org": "Computer Systems Organization",
  "Topics of General Interest:":
    "Topics of General Interest: Drawing on the Web",
  "Spec Tpcs in Prog Lang:": "Special Topics in Programming Languages",
  "Quantitative Reasoning: Prob,Stats & Decisn-Mkng":
    "Quantitative Reasoning: Probability, Statistics & Decision-Making",
  "Expressive Culture: Tpcs": "Expressive Culture: Topics",
  "Expressive Cult: Images": "Expressive Culture: Images",
  "Honors Analy of Algo": "Honors Analysis of Algorithms",
  "Sp Tpcs Modern Art:": "Special Topics Modern Art:",
  "Hist of City Planning, 19th & 20th Centuries":
    "History of City Planning: 19th & 20th Centuries",
  "Topics in AS:": "Topics in Animal Studies",
  "Dutch &Flemish Painting, 1600-1700": "Dutch & Flemish Painting, 1600-1700",
  "East Asian Art II:China, Korea, Japan, 1000Ce-Pr":
    "East Asian Art II: China, Korea, Japan, 1000Ce-Pr",
  "From Huck Finn to Columbine:Understanding Disruptive Behaviors in Chldrn & Adolscnt":
    "From Huck Finn to Columbine: Understanding Disruptive Behaviors in Children & Adolescents",
  TrendingMentalHealth: "Trending Mental Health",
  "Adv Sem: Autism Spectrum Disorders":
    "Advanced Seminar: Autism Spectrum Disorders",
  "Elemen French Level I": "Elementary French Level I",
  "Elem French Level II": "Elementary French Level II",
  "Spec Top Computer SCI:": "Special Topics",
  "Honors Programming Lang": "Honors Programming Languages",
  "Master'S Thesis Research": "Master's Thesis Research",
  "Risk & Portfolio Mngmnt With Econometrics":
    "Risk & Portfolio Management With Econometrics",
  "Prob & Meth in Mideast Studies":
    "Problems & Methods in Middle Eastern Studies",
  "Prob & Meth in Hebrew & Judaic Studies":
    "Problems & Methods in Hebrew & Judaic Studies",
  "Prin of Financial Acctg": "Principals of Financial Accounting"
};

export const weirdSubjectNames: { [s: string]: string } = {
  "Child/Adoles Mental Hlth Stds": "Child/Adolescent Mental Health Studies",
  "European and Mediterranean Stu": "European and Mediterranean Studies",
  "Latin Amer-Caribbean Studies": "Latin American-Caribbean Studies",
  "Ctr for Art, Society & Pub Pol": "Center for Art, Society & Public Policy",
  "Ctr for Experiment Humanities": "Center for Experimental Humanities"
};

export const internationalSubjects: { [s: string]: string } = {
  ICINE: "Cinema Studies (International)",
  IFMTV: "Film & TV (International)",
  IPHTI: "Photography and Imaging (International)",
  ITHEA: "Drama (International)",
  ISPEC: "TSOA Special Programs (International)"
};

export const seasons = {
  sp: "Spring",
  fa: "Fall"
};

export const requirements: { [code: string]: IRequirement[] } = {
  "ua-csci": [
    {
      type: RequirementType.One,
      code: "CSCI-UA 101",
      name: "Intro To Computer Science"
    },
    { type: RequirementType.One, code: "CSCI-UA 102", name: "Data Structures" },
    {
      type: RequirementType.One,
      code: "CSCI-UA 201",
      name: "Computer Systems Organization"
    },
    {
      type: RequirementType.One,
      code: "CSCI-UA 202",
      name: "Operating Systems"
    },
    {
      type: RequirementType.One,
      code: "CSCI-UA 310",
      name: "Basic Algorithms"
    },
    {
      type: RequirementType.One,
      code: "MATH-UA 121",
      name: "Calculus I"
    },
    {
      type: RequirementType.One,
      code: "MATH-UA 120",
      name: "Discrete Mathematics"
    },
    {
      type: RequirementType.Choose,
      num: 5,
      args: [
        { type: RequirementType.One, code: "CSCI-UA 4xx", name: "Electives" }
      ]
    }
  ],
  "uy-cs": [
    {
      type: RequirementType.One,
      code: "CS-UY 1114",
      name: "Introduction to Programming & Problem Solving"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 1122",
      name: "Introduction To Computer Science"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 1134",
      name: "Data Structures and Algorithms"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 2124",
      name: "Object Oriented Programming"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 2214",
      name: "Computer Architecture and Organization"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 2413",
      name: "Design & Analysis of Algorithms"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 3224",
      name: "Introduction to Operating Systems"
    },
    {
      type: RequirementType.One,
      code: "CS-UY 4513",
      name: "Software Engineering"
    },
    { type: RequirementType.One, code: "CS-UY 4523", name: "Design Project" },

    {
      type: RequirementType.One,
      code: "MA-UY 1024",
      name: "Calculus I for Engineers"
    },
    {
      type: RequirementType.One,
      code: "MA-UY 1124",
      name: "Calculus II for Engineers"
    },
    {
      type: RequirementType.One,
      code: "MA-UY 2224",
      name: "Data Analysis"
    },
    {
      type: RequirementType.One,
      code: "MA-UY 2314",
      name: "Discrete Mathematics"
    },
    {
      type: RequirementType.One,
      code: "MA-UY 2034",
      name: "Linear Algebra and Differential Equations",
      modifier: Modifier.Recommended
    }
  ]
};
