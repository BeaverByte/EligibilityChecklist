// Questions Data
export const questionBank = [
  {
    id: "error",
    text: "Error made",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["MED"], nextQuestion: "medical-1" },
      { answer: "No" },
    ],
  },
  {
    id: "medical-1",
    text: "Does the member have Medical?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["MED"], nextQuestion: "medical-2" },
      { answer: "No" },
    ],
  },
  {
    id: "medical-2",
    text: "Does the member have a high deductible plan?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["HDP"], nextQuestion: "medical-3" },
      { answer: "No", nextQuestion: "medical-3" },
    ],
  },
  {
    id: "medical-3",
    text: "What is the Medical Network?",
    elementType: "checkbox",
    options: [
      {
        answer: "Aetna (Aetna Signature Administrators)",
        nextQuestion: "medical-4-a",
      },
      {
        answer: "Cofinity or Cofinity Advantage",
        riders: ["PHW"],
        nextQuestion: "medical-4-b",
      },
      {
        answer: "PHCS",
        riders: ["PHS, AAH, COR"],
        nextQuestion: "medical-4-c",
      },
      {
        answer: "First Health",
        riders: ["FHN, AAH, COR"],
        porgs: ["FHNC"],
      },
      ,
    ],
  },
  {
    id: "medical-4-a",
    text: "Does the Nidd policy tab show same copay for Generalist and Specialist?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["AETN"],
        riders: ["AET, AAH, COR"],
      },
      {
        answer: "no",
        porgs: ["AEPC"],
        riders: ["AET, AAH, COR"],
      },
    ],
  },
  {
    id: "medical-4-b",
    text: "Does member live in Michigan?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        nextQuestion: "medical-4-b-a",
      },
      {
        answer: "no",
        porgs: ["CFNA"],
        riders: ["COD, AAH, COR"],
      },
    ],
  },
  {
    id: "medical-4-b-a",
    text: "Does the member's ZIP code start with 490-492?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["CFNL"],
        riders: ["CFL, AAH, COR"],
      },
      {
        answer: "no",
        porgs: ["CFNT"],
        riders: ["COF, AAH, COR"],
      },
    ],
  },
  {
    id: "medical-4-c",
    text: "Does the Nidd policy tab show same copay for Generalist and Specialist?",
    elementType: "radio",
    options: [
      {
        answer: "yes",
        porgs: ["PHCS"],
      },
      {
        answer: "no",
        porgs: ["PHC1"],
      },
    ],
  },
  {
    text: "Does the member have Dental?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: ["DEN"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    text: "Does the member have Vision?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: ["VIS"] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
  {
    text: "Does the member have Life?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: [], riders: [""] },
      { answer: "No", porgs: [], riders: [] },
    ],
  },
];
