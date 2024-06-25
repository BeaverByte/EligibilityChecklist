// Questions Data
export const questionBank = [
  {
    id: "error",
    text: "Error made",
    elementType: "radio",
    options: [
      {
        answer: "Yes",
        riders: ["MED"],
        nextQuestion: "medical-1",
      },
      { answer: "No" },
    ],
  },
  {
    id: "medical-1",
    text: "Does the member have Medical?",
    elementType: "radio",
    options: [
      {
        answer: "Yes",
        riders: ["MED"],
        nextQuestion: "medical-2",
      },
      { answer: "No" },
    ],
    required: true,
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
    elementType: "radio",
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
        riders: ["PHS", "AAH", "COR"],
        nextQuestion: "medical-4-c",
      },
      {
        answer: "First Health",
        riders: ["FHN", "AAH", "COR"],
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
        riders: ["AET", "AAH", "COR"],
      },
      {
        answer: "no",
        porgs: ["AEPC"],
        riders: ["AET", "AAH", "COR"],
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
        riders: ["COD", "AAH", "COR"],
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
        riders: ["CFL", "AAH", "COR"],
      },
      {
        answer: "no",
        porgs: ["CFNT"],
        riders: ["COF", "AAH", "COR"],
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
    id: "dental-1",
    text: "Does the member have Dental?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["DEN"], nextQuestion: "dental-2" },
      { answer: "No" },
    ],
    required: true,
  },
  {
    id: "dental-2",
    text: "What is the member's Dental network?",
    elementType: "radio",
    options: [
      { answer: "Dentemax", riders: ["DNM"], nextQuestion: "dental-3" },
      {
        answer: "Aetna Dental Administrators (ASA)",
        riders: ["AED"],
        nextQuestion: "dental-6",
      },
    ],
  },
  {
    id: "dental-6",
    text: "Does the Nidd policy tab show NNV Rider?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["NNV"], nextQuestion: "dental-7" },
      { answer: "No", porgs: ["AEDN"], nextQuestion: "dental-5" },
    ],
  },
  {
    id: "dental-7",
    text: "Is Dental Out of Network Co-Insurance 10% or less?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: ["AEDN"], nextQuestion: "dental-5" },
      { answer: "No", porgs: ["AEDM"] },
    ],
  },
  {
    id: "dental-3",
    text: "Does the Nidd policy tab show NNV Rider?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["NNV"], nextQuestion: "dental-4" },
      { answer: "No", porgs: ["DNMX"] },
    ],
  },
  {
    id: "dental-4",
    text: "Is Dental Out of Network Co-Insurance 10% or less?",
    elementType: "radio",
    options: [
      { answer: "Yes", porgs: ["DNMX"], nextQuestion: "dental-5" },
      { answer: "No", porgs: ["DXMC"], nextQuestion: "dental-5" },
    ],
  },
  {
    id: "dental-5",
    text: "Does member pay all for Dental?",
    elementType: "radio",
    options: [{ answer: "Yes", riders: ["VDN"] }, { answer: "No" }],
  },
  {
    id: "vision-1-a",
    text: "Does the member have Vision?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["VIS"], nextQuestion: "vision-2" },
      { answer: "No" },
    ],
    required: true,
  },
  {
    id: "vision-2",
    text: "Does group have Eyemed?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["EYE"], nextQuestion: "vision-3" },
      { answer: "No", nextQuestion: "vision-3" },
    ],
  },
  {
    id: "vision-3",
    text: "Does the member Pay All for Vision?",
    elementType: "radio",
    options: [{ answer: "Yes", riders: ["VVN"] }, { answer: "No" }],
  },
  {
    id: "life-1",
    text: "Does the member have Life?",
    elementType: "radio",
    options: [{ answer: "Yes", nextQuestion: "life-2" }, { answer: "No" }],
    required: true,
  },
  {
    id: "life-2",
    text: "Does the member have AD&D?",
    elementType: "radio",
    options: [
      { answer: "Yes", riders: ["LAD"] },
      { answer: "No", riders: ["LIF"] },
    ],
  },
];
