// Day-by-day breakdown for each of the 16 workout programs.
// All visible strings use i18n keys — translations live in translations-workouts.ts.

export interface ExerciseSet {
  exerciseKey: string;     // i18n key (reuse exercise.* or program-specific keys)
  sets: number;
  reps: string;            // e.g. "8-12", "5", "30s"
  rest: string;            // e.g. "60s", "2-3min"
  noteKey?: string;        // optional tip key
}

export interface ProgramDay {
  dayKey: string;          // i18n key for the day title (e.g. "pday.ppl.push")
  focusKey: string;        // muscle group / focus i18n key
  exercises: ExerciseSet[];
}

export interface ProgramDetail {
  id: string;
  overviewKey: string;     // long description i18n key
  splitKey: string;        // short split label e.g. "Push / Pull / Legs"
  intensityKey: string;    // intensity label
  caloriesKey: string;     // calories burned per session
  benefitKeys: string[];   // 4 bullet benefits
  warmupKeys: string[];    // 3 warmup steps
  cooldownKeys: string[];  // 3 cooldown steps
  nutritionKey: string;    // nutrition tip
  days: ProgramDay[];
}

// Helper rest values
const R60 = "60s";
const R90 = "90s";
const R120 = "2min";
const R180 = "3min";

export const programDetails: Record<string, ProgramDetail> = {
  ppl: {
    id: "ppl",
    overviewKey: "pdetail.ppl.overview",
    splitKey: "pdetail.ppl.split",
    intensityKey: "pdetail.intensity.high",
    caloriesKey: "pdetail.cal.500",
    benefitKeys: ["pdetail.ppl.b1", "pdetail.ppl.b2", "pdetail.ppl.b3", "pdetail.ppl.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.ppl.nutrition",
    days: [
      { dayKey: "pday.push", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.inclineBench", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.ohp", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.lateralRaise", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.skullCrusher", sets: 3, reps: "10-12", rest: R60 },
      ]},
      { dayKey: "pday.pull", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.deadlift", sets: 4, reps: "5", rest: R180 },
        { exerciseKey: "exercise.pullUp", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.facePull", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.barbellCurl", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.hammerCurl", sets: 3, reps: "10-12", rest: R60 },
      ]},
      { dayKey: "pday.legs", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.legPress", sets: 3, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.legCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "15-20", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.push2", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.ohp", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.dbShoulderPress", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.inclineBench", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.cableLateralRaise", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.dips", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.overheadTricep", sets: 3, reps: "10-12", rest: R60 },
      ]},
      { dayKey: "pday.pull2", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.latPulldown", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.seatedRow", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.rearDelt", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.preacherCurl", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.cableCurl", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.legs2", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.frontSquat", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.bulgSplit", sets: 3, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.legExtension", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.legCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "15-20", rest: R60 },
        { exerciseKey: "exercise.hangingLegRaise", sets: 3, reps: "12-15", rest: R60 },
      ]},
    ],
  },

  fullbody: {
    id: "fullbody",
    overviewKey: "pdetail.fullbody.overview",
    splitKey: "pdetail.fullbody.split",
    intensityKey: "pdetail.intensity.medium",
    caloriesKey: "pdetail.cal.450",
    benefitKeys: ["pdetail.fullbody.b1", "pdetail.fullbody.b2", "pdetail.fullbody.b3", "pdetail.fullbody.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.fullbody.nutrition",
    days: [
      { dayKey: "pday.fullA", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.benchPress", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.barbellRow", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.ohp", sets: 3, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.barbellCurl", sets: 2, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
      ]},
      { dayKey: "pday.fullB", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.deadlift", sets: 3, reps: "5-6", rest: R180 },
        { exerciseKey: "exercise.inclineBench", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.latPulldown", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.lateralRaise", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 3, reps: "15-20", rest: R60 },
      ]},
      { dayKey: "pday.fullC", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.frontSquat", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.dbShoulderPress", sets: 3, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.seatedRow", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.romanianDL", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.hammerCurl", sets: 2, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.hangingLegRaise", sets: 3, reps: "10-12", rest: R60 },
      ]},
    ],
  },

  upperlower: {
    id: "upperlower",
    overviewKey: "pdetail.upperlower.overview",
    splitKey: "pdetail.upperlower.split",
    intensityKey: "pdetail.intensity.high",
    caloriesKey: "pdetail.cal.500",
    benefitKeys: ["pdetail.upperlower.b1", "pdetail.upperlower.b2", "pdetail.upperlower.b3", "pdetail.upperlower.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.upperlower.nutrition",
    days: [
      { dayKey: "pday.upperHeavy", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 4, reps: "5-6", rest: R180 },
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "5-6", rest: R180 },
        { exerciseKey: "exercise.ohp", sets: 3, reps: "6-8", rest: R120 },
        { exerciseKey: "exercise.pullUp", sets: 3, reps: "6-8", rest: R120 },
        { exerciseKey: "exercise.barbellCurl", sets: 3, reps: "8-10", rest: R60 },
        { exerciseKey: "exercise.skullCrusher", sets: 3, reps: "8-10", rest: R60 },
      ]},
      { dayKey: "pday.lowerHeavy", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 4, reps: "5-6", rest: R180 },
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.legPress", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.legCurl", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.upperLight", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.inclineBench", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.seatedRow", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.dbShoulderPress", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.latPulldown", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.cableCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.lowerLight", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.frontSquat", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.bulgSplit", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.legExtension", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.hipThrust", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "15-20", rest: R60 },
        { exerciseKey: "exercise.cableCrunch", sets: 3, reps: "12-15", rest: R60 },
      ]},
    ],
  },

  brosplit: {
    id: "brosplit",
    overviewKey: "pdetail.brosplit.overview",
    splitKey: "pdetail.brosplit.split",
    intensityKey: "pdetail.intensity.high",
    caloriesKey: "pdetail.cal.450",
    benefitKeys: ["pdetail.brosplit.b1", "pdetail.brosplit.b2", "pdetail.brosplit.b3", "pdetail.brosplit.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.brosplit.nutrition",
    days: [
      { dayKey: "pday.chest", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.inclineBench", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.declinePress", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.cableFly", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.dips", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.pushUps", sets: 3, reps: "AMRAP", rest: R60 },
      ]},
      { dayKey: "pday.back", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.deadlift", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.pullUp", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.tBarRow", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.latPulldown", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.straightArmPulldown", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.shoulders", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.ohp", sets: 4, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.arnoldPress", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.lateralRaise", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.rearDelt", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.facePull", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.barbellShrug", sets: 4, reps: "10-12", rest: R60 },
      ]},
      { dayKey: "pday.armsDay", focusKey: "muscle.arms", exercises: [
        { exerciseKey: "exercise.barbellCurl", sets: 4, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.closeGripBench", sets: 4, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.hammerCurl", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.skullCrusher", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.preacherCurl", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.legs", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 4, reps: "8-10", rest: R180 },
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.legPress", sets: 3, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.walkingLunge", sets: 3, reps: "12 each", rest: R90 },
        { exerciseKey: "exercise.legCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 5, reps: "15-20", rest: R60 },
      ]},
    ],
  },

  hiit: {
    id: "hiit",
    overviewKey: "pdetail.hiit.overview",
    splitKey: "pdetail.hiit.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.600",
    benefitKeys: ["pdetail.hiit.b1", "pdetail.hiit.b2", "pdetail.hiit.b3", "pdetail.hiit.b4"],
    warmupKeys: ["pdetail.warmup.jog3", "pdetail.warmup.dynamic", "pdetail.warmup.jumps"],
    cooldownKeys: ["pdetail.cooldown.walk", "pdetail.cooldown.stretch", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.hiit.nutrition",
    days: [
      { dayKey: "pday.tabataA", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.burpees", sets: 8, reps: "20s", rest: "10s" },
        { exerciseKey: "exercise.mountainClimber", sets: 8, reps: "20s", rest: "10s" },
        { exerciseKey: "exercise.jumpSquat", sets: 8, reps: "20s", rest: "10s" },
        { exerciseKey: "exercise.plank", sets: 4, reps: "30s", rest: "15s" },
      ]},
      { dayKey: "pday.circuitB", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.kettlebellSwing", sets: 5, reps: "20", rest: R60 },
        { exerciseKey: "exercise.boxJump", sets: 5, reps: "10", rest: R60 },
        { exerciseKey: "exercise.pushUps", sets: 5, reps: "15", rest: R60 },
        { exerciseKey: "exercise.russianTwist", sets: 5, reps: "30", rest: R60 },
      ]},
      { dayKey: "pday.sprintC", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.sprintInterval", sets: 10, reps: "30s", rest: R60, noteKey: "pdetail.note.allOut" },
        { exerciseKey: "exercise.battleRope", sets: 5, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
      ]},
      { dayKey: "pday.metconD", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.thruster", sets: 5, reps: "12", rest: R90 },
        { exerciseKey: "exercise.burpees", sets: 5, reps: "15", rest: R90 },
        { exerciseKey: "exercise.kettlebellSwing", sets: 5, reps: "20", rest: R90 },
        { exerciseKey: "exercise.mountainClimber", sets: 5, reps: "30", rest: R90 },
      ]},
    ],
  },

  strength: {
    id: "strength",
    overviewKey: "pdetail.strength.overview",
    splitKey: "pdetail.strength.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.400",
    benefitKeys: ["pdetail.strength.b1", "pdetail.strength.b2", "pdetail.strength.b3", "pdetail.strength.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.barbell", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.strength.nutrition",
    days: [
      { dayKey: "pday.squatDay", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 5, reps: "5", rest: R180, noteKey: "pdetail.note.workingSets" },
        { exerciseKey: "exercise.benchPress", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.barbellRow", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.deadliftDay", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.squat", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.ohp", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.deadlift", sets: 1, reps: "5", rest: R180, noteKey: "pdetail.note.oneHeavySet" },
        { exerciseKey: "exercise.hangingLegRaise", sets: 3, reps: "10", rest: R60 },
      ]},
      { dayKey: "pday.benchDay", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.squat", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.benchPress", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.barbellRow", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.barbellCurl", sets: 3, reps: "8", rest: R90 },
      ]},
    ],
  },

  beginner: {
    id: "beginner",
    overviewKey: "pdetail.beginner.overview",
    splitKey: "pdetail.beginner.split",
    intensityKey: "pdetail.intensity.low",
    caloriesKey: "pdetail.cal.350",
    benefitKeys: ["pdetail.beginner.b1", "pdetail.beginner.b2", "pdetail.beginner.b3", "pdetail.beginner.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.bodyweight"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.walk", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.beginner.nutrition",
    days: [
      { dayKey: "pday.fullA", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.benchPress", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.latPulldown", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.dbShoulderPress", sets: 3, reps: "10", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "30s", rest: R60 },
      ]},
      { dayKey: "pday.fullB", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.legPress", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.inclineBench", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.seatedRow", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.lateralRaise", sets: 3, reps: "12", rest: R60 },
        { exerciseKey: "exercise.cableCrunch", sets: 3, reps: "12", rest: R60 },
      ]},
      { dayKey: "pday.fullC", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.romanianDL", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.pushUps", sets: 3, reps: "10", rest: R60 },
        { exerciseKey: "exercise.barbellRow", sets: 3, reps: "10", rest: R90 },
        { exerciseKey: "exercise.barbellCurl", sets: 3, reps: "12", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "12", rest: R60 },
      ]},
    ],
  },

  home: {
    id: "home",
    overviewKey: "pdetail.home.overview",
    splitKey: "pdetail.home.split",
    intensityKey: "pdetail.intensity.medium",
    caloriesKey: "pdetail.cal.400",
    benefitKeys: ["pdetail.home.b1", "pdetail.home.b2", "pdetail.home.b3", "pdetail.home.b4"],
    warmupKeys: ["pdetail.warmup.jog3", "pdetail.warmup.dynamic", "pdetail.warmup.bodyweight"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.walk", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.home.nutrition",
    days: [
      { dayKey: "pday.upperBW", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.pushUps", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.pikePushUp", sets: 3, reps: "10", rest: R60 },
        { exerciseKey: "exercise.dips", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.invertedRow", sets: 3, reps: "10", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
      ]},
      { dayKey: "pday.lowerBW", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.bodyweightSquat", sets: 4, reps: "20", rest: R60 },
        { exerciseKey: "exercise.walkingLunge", sets: 3, reps: "20 each", rest: R60 },
        { exerciseKey: "exercise.gluteBridge", sets: 3, reps: "15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "20", rest: R60 },
        { exerciseKey: "exercise.wallSit", sets: 3, reps: "45s", rest: R60 },
      ]},
      { dayKey: "pday.coreCardio", focusKey: "muscle.core", exercises: [
        { exerciseKey: "exercise.burpees", sets: 4, reps: "10", rest: R60 },
        { exerciseKey: "exercise.mountainClimber", sets: 4, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.russianTwist", sets: 3, reps: "30", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
        { exerciseKey: "exercise.jumpSquat", sets: 3, reps: "15", rest: R60 },
      ]},
      { dayKey: "pday.upperBW2", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.diamondPushUp", sets: 4, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.declinePushUp", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.invertedRow", sets: 3, reps: "10", rest: R60 },
        { exerciseKey: "exercise.supermans", sets: 3, reps: "15", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.fullHome", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.burpees", sets: 4, reps: "12", rest: R60 },
        { exerciseKey: "exercise.bodyweightSquat", sets: 4, reps: "20", rest: R60 },
        { exerciseKey: "exercise.pushUps", sets: 4, reps: "15", rest: R60 },
        { exerciseKey: "exercise.mountainClimber", sets: 3, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
    ],
  },

  gvt: {
    id: "gvt",
    overviewKey: "pdetail.gvt.overview",
    splitKey: "pdetail.gvt.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.550",
    benefitKeys: ["pdetail.gvt.b1", "pdetail.gvt.b2", "pdetail.gvt.b3", "pdetail.gvt.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.barbell", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.gvt.nutrition",
    days: [
      { dayKey: "pday.chestBack", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 10, reps: "10", rest: "90s", noteKey: "pdetail.note.gvt" },
        { exerciseKey: "exercise.barbellRow", sets: 10, reps: "10", rest: R90 },
        { exerciseKey: "exercise.cableFly", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.facePull", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.legsAbs", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 10, reps: "10", rest: R90 },
        { exerciseKey: "exercise.legCurl", sets: 10, reps: "10", rest: R90 },
        { exerciseKey: "exercise.calfRaise", sets: 3, reps: "15-20", rest: R60 },
        { exerciseKey: "exercise.cableCrunch", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.armsShoulders", focusKey: "muscle.arms", exercises: [
        { exerciseKey: "exercise.dips", sets: 10, reps: "10", rest: R90 },
        { exerciseKey: "exercise.barbellCurl", sets: 10, reps: "10", rest: R90 },
        { exerciseKey: "exercise.lateralRaise", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.rearDelt", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.fullAccessory", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "10", rest: R120 },
        { exerciseKey: "exercise.pullUp", sets: 4, reps: "10", rest: R90 },
        { exerciseKey: "exercise.ohp", sets: 4, reps: "10", rest: R90 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
    ],
  },

  "531": {
    id: "531",
    overviewKey: "pdetail.531.overview",
    splitKey: "pdetail.531.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.450",
    benefitKeys: ["pdetail.531.b1", "pdetail.531.b2", "pdetail.531.b3", "pdetail.531.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.barbell", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.531.nutrition",
    days: [
      { dayKey: "pday.ohpDay", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.ohp", sets: 3, reps: "5/3/1", rest: R180, noteKey: "pdetail.note.531main" },
        { exerciseKey: "exercise.benchPress", sets: 5, reps: "10", rest: R120 },
        { exerciseKey: "exercise.dips", sets: 5, reps: "10", rest: R90 },
        { exerciseKey: "exercise.facePull", sets: 5, reps: "15", rest: R60 },
      ]},
      { dayKey: "pday.deadliftDay", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.deadlift", sets: 3, reps: "5/3/1", rest: R180, noteKey: "pdetail.note.531main" },
        { exerciseKey: "exercise.romanianDL", sets: 5, reps: "10", rest: R120 },
        { exerciseKey: "exercise.legCurl", sets: 5, reps: "12", rest: R90 },
        { exerciseKey: "exercise.hangingLegRaise", sets: 5, reps: "10", rest: R60 },
      ]},
      { dayKey: "pday.benchDay", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 3, reps: "5/3/1", rest: R180, noteKey: "pdetail.note.531main" },
        { exerciseKey: "exercise.dbShoulderPress", sets: 5, reps: "10", rest: R120 },
        { exerciseKey: "exercise.pullUp", sets: 5, reps: "10", rest: R90 },
        { exerciseKey: "exercise.barbellCurl", sets: 5, reps: "10", rest: R60 },
      ]},
      { dayKey: "pday.squatDay", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 3, reps: "5/3/1", rest: R180, noteKey: "pdetail.note.531main" },
        { exerciseKey: "exercise.frontSquat", sets: 5, reps: "10", rest: R120 },
        { exerciseKey: "exercise.legPress", sets: 5, reps: "10", rest: R90 },
        { exerciseKey: "exercise.calfRaise", sets: 5, reps: "15", rest: R60 },
      ]},
    ],
  },

  yoga: {
    id: "yoga",
    overviewKey: "pdetail.yoga.overview",
    splitKey: "pdetail.yoga.split",
    intensityKey: "pdetail.intensity.low",
    caloriesKey: "pdetail.cal.250",
    benefitKeys: ["pdetail.yoga.b1", "pdetail.yoga.b2", "pdetail.yoga.b3", "pdetail.yoga.b4"],
    warmupKeys: ["pdetail.warmup.breath", "pdetail.warmup.catCow", "pdetail.warmup.dynamic"],
    cooldownKeys: ["pdetail.cooldown.savasana", "pdetail.cooldown.breath", "pdetail.cooldown.meditate"],
    nutritionKey: "pdetail.yoga.nutrition",
    days: [
      { dayKey: "pday.vinyasa", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.sunSalutation", sets: 5, reps: "1 flow", rest: "30s" },
        { exerciseKey: "exercise.warriorPose", sets: 3, reps: "45s each", rest: "30s" },
        { exerciseKey: "exercise.downwardDog", sets: 4, reps: "60s", rest: "30s" },
        { exerciseKey: "exercise.childPose", sets: 3, reps: "60s", rest: "30s" },
      ]},
      { dayKey: "pday.yin", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.pigeonPose", sets: 2, reps: "3min each", rest: "30s" },
        { exerciseKey: "exercise.butterfly", sets: 3, reps: "2min", rest: "30s" },
        { exerciseKey: "exercise.seatedFold", sets: 3, reps: "2min", rest: "30s" },
        { exerciseKey: "exercise.savasana", sets: 1, reps: "10min", rest: "0" },
      ]},
      { dayKey: "pday.power", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.chairPose", sets: 3, reps: "45s", rest: "30s" },
        { exerciseKey: "exercise.crowPose", sets: 3, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
        { exerciseKey: "exercise.bridge", sets: 3, reps: "45s", rest: "30s" },
      ]},
      { dayKey: "pday.restorative", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.legUpWall", sets: 1, reps: "5min", rest: "0" },
        { exerciseKey: "exercise.supineTwist", sets: 2, reps: "2min each", rest: "30s" },
        { exerciseKey: "exercise.happyBaby", sets: 2, reps: "2min", rest: "30s" },
        { exerciseKey: "exercise.savasana", sets: 1, reps: "10min", rest: "0" },
      ]},
    ],
  },

  sprint: {
    id: "sprint",
    overviewKey: "pdetail.sprint.overview",
    splitKey: "pdetail.sprint.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.500",
    benefitKeys: ["pdetail.sprint.b1", "pdetail.sprint.b2", "pdetail.sprint.b3", "pdetail.sprint.b4"],
    warmupKeys: ["pdetail.warmup.jog3", "pdetail.warmup.dynamic", "pdetail.warmup.strides"],
    cooldownKeys: ["pdetail.cooldown.walk", "pdetail.cooldown.stretch", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.sprint.nutrition",
    days: [
      { dayKey: "pday.sprintShort", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.sprintInterval", sets: 8, reps: "100m", rest: "90s", noteKey: "pdetail.note.allOut" },
        { exerciseKey: "exercise.boxJump", sets: 4, reps: "10", rest: R90 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.sprintLong", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.sprintInterval", sets: 6, reps: "200m", rest: R180 },
        { exerciseKey: "exercise.walkingLunge", sets: 3, reps: "20 each", rest: R60 },
        { exerciseKey: "exercise.russianTwist", sets: 3, reps: "30", rest: R60 },
      ]},
      { dayKey: "pday.hillSprint", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.hillSprint", sets: 10, reps: "30s", rest: R120, noteKey: "pdetail.note.allOut" },
        { exerciseKey: "exercise.jumpSquat", sets: 3, reps: "15", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
      ]},
    ],
  },

  calisthenics: {
    id: "calisthenics",
    overviewKey: "pdetail.calisthenics.overview",
    splitKey: "pdetail.calisthenics.split",
    intensityKey: "pdetail.intensity.high",
    caloriesKey: "pdetail.cal.450",
    benefitKeys: ["pdetail.calisthenics.b1", "pdetail.calisthenics.b2", "pdetail.calisthenics.b3", "pdetail.calisthenics.b4"],
    warmupKeys: ["pdetail.warmup.jog3", "pdetail.warmup.dynamic", "pdetail.warmup.bodyweight"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.calisthenics.nutrition",
    days: [
      { dayKey: "pday.pullSkill", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.pullUp", sets: 5, reps: "5-8", rest: R120 },
        { exerciseKey: "exercise.invertedRow", sets: 4, reps: "10", rest: R90 },
        { exerciseKey: "exercise.frontLeverProg", sets: 4, reps: "10s", rest: R120 },
        { exerciseKey: "exercise.barbellCurl", sets: 3, reps: "10", rest: R60 },
      ]},
      { dayKey: "pday.pushSkill", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.dips", sets: 5, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.pushUps", sets: 4, reps: "15", rest: R90 },
        { exerciseKey: "exercise.handstandHold", sets: 4, reps: "30s", rest: R120 },
        { exerciseKey: "exercise.diamondPushUp", sets: 3, reps: "12", rest: R60 },
      ]},
      { dayKey: "pday.legSkill", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.pistolSquat", sets: 4, reps: "5 each", rest: R120 },
        { exerciseKey: "exercise.bodyweightSquat", sets: 4, reps: "25", rest: R60 },
        { exerciseKey: "exercise.walkingLunge", sets: 3, reps: "20 each", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "20", rest: R60 },
      ]},
      { dayKey: "pday.coreFlow", focusKey: "muscle.core", exercises: [
        { exerciseKey: "exercise.dragonFlag", sets: 4, reps: "5-8", rest: R90 },
        { exerciseKey: "exercise.hangingLegRaise", sets: 4, reps: "10", rest: R60 },
        { exerciseKey: "exercise.lSit", sets: 4, reps: "20s", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.skillDay", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.muscleUp", sets: 5, reps: "3-5", rest: R180, noteKey: "pdetail.note.skill" },
        { exerciseKey: "exercise.humanFlagProg", sets: 4, reps: "10s", rest: R120 },
        { exerciseKey: "exercise.planche", sets: 4, reps: "15s", rest: R120 },
        { exerciseKey: "exercise.handstandHold", sets: 3, reps: "45s", rest: R90 },
      ]},
    ],
  },

  athleanx: {
    id: "athleanx",
    overviewKey: "pdetail.athleanx.overview",
    splitKey: "pdetail.athleanx.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.550",
    benefitKeys: ["pdetail.athleanx.b1", "pdetail.athleanx.b2", "pdetail.athleanx.b3", "pdetail.athleanx.b4"],
    warmupKeys: ["pdetail.warmup.jog3", "pdetail.warmup.dynamic", "pdetail.warmup.jumps"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.athleanx.nutrition",
    days: [
      { dayKey: "pday.power", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.powerClean", sets: 5, reps: "3", rest: R180 },
        { exerciseKey: "exercise.boxJump", sets: 5, reps: "5", rest: R120 },
        { exerciseKey: "exercise.squat", sets: 4, reps: "6", rest: R180 },
        { exerciseKey: "exercise.medBallSlam", sets: 4, reps: "10", rest: R90 },
      ]},
      { dayKey: "pday.upperPower", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.plyoPushUp", sets: 4, reps: "8", rest: R120 },
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "8", rest: R120 },
        { exerciseKey: "exercise.medBallChest", sets: 4, reps: "10", rest: R90 },
      ]},
      { dayKey: "pday.speedAgility", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.sprintInterval", sets: 8, reps: "40m", rest: R90, noteKey: "pdetail.note.allOut" },
        { exerciseKey: "exercise.ladderDrill", sets: 5, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.coneDrill", sets: 5, reps: "20s", rest: R60 },
        { exerciseKey: "exercise.planklatRaise", sets: 4, reps: "30s", rest: R60 },
      ]},
      { dayKey: "pday.athleticConditioning", focusKey: "muscle.core", exercises: [
        { exerciseKey: "exercise.kettlebellSwing", sets: 5, reps: "20", rest: R90 },
        { exerciseKey: "exercise.farmersWalk", sets: 4, reps: "30m", rest: R120 },
        { exerciseKey: "exercise.battleRope", sets: 5, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.turkishGetup", sets: 3, reps: "5 each", rest: R90 },
      ]},
    ],
  },

  crossfit: {
    id: "crossfit",
    overviewKey: "pdetail.crossfit.overview",
    splitKey: "pdetail.crossfit.split",
    intensityKey: "pdetail.intensity.veryHigh",
    caloriesKey: "pdetail.cal.700",
    benefitKeys: ["pdetail.crossfit.b1", "pdetail.crossfit.b2", "pdetail.crossfit.b3", "pdetail.crossfit.b4"],
    warmupKeys: ["pdetail.warmup.row5", "pdetail.warmup.dynamic", "pdetail.warmup.barbell"],
    cooldownKeys: ["pdetail.cooldown.walk", "pdetail.cooldown.stretch", "pdetail.cooldown.foam"],
    nutritionKey: "pdetail.crossfit.nutrition",
    days: [
      { dayKey: "pday.wodFran", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.thruster", sets: 1, reps: "21-15-9", rest: "0", noteKey: "pdetail.note.fran" },
        { exerciseKey: "exercise.pullUp", sets: 1, reps: "21-15-9", rest: "0" },
      ]},
      { dayKey: "pday.strengthDay", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.powerClean", sets: 5, reps: "3", rest: R180 },
        { exerciseKey: "exercise.handstandPushUp", sets: 4, reps: "8", rest: R120 },
        { exerciseKey: "exercise.toesToBar", sets: 4, reps: "10", rest: R90 },
      ]},
      { dayKey: "pday.amrap", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.burpees", sets: 1, reps: "20min AMRAP", rest: "0", noteKey: "pdetail.note.amrap" },
        { exerciseKey: "exercise.boxJump", sets: 1, reps: "10/round", rest: "0" },
        { exerciseKey: "exercise.kettlebellSwing", sets: 1, reps: "15/round", rest: "0" },
        { exerciseKey: "exercise.pullUp", sets: 1, reps: "5/round", rest: "0" },
      ]},
      { dayKey: "pday.olyDay", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.snatch", sets: 6, reps: "2", rest: R180 },
        { exerciseKey: "exercise.cleanJerk", sets: 6, reps: "2", rest: R180 },
        { exerciseKey: "exercise.deadlift", sets: 5, reps: "5", rest: R180 },
        { exerciseKey: "exercise.farmersWalk", sets: 3, reps: "40m", rest: R120 },
      ]},
      { dayKey: "pday.metconLong", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.row", sets: 5, reps: "500m", rest: R120 },
        { exerciseKey: "exercise.wallBall", sets: 5, reps: "20", rest: R90 },
        { exerciseKey: "exercise.burpees", sets: 5, reps: "10", rest: R90 },
        { exerciseKey: "exercise.doubleUnder", sets: 5, reps: "50", rest: R60 },
      ]},
    ],
  },

  mobility: {
    id: "mobility",
    overviewKey: "pdetail.mobility.overview",
    splitKey: "pdetail.mobility.split",
    intensityKey: "pdetail.intensity.low",
    caloriesKey: "pdetail.cal.150",
    benefitKeys: ["pdetail.mobility.b1", "pdetail.mobility.b2", "pdetail.mobility.b3", "pdetail.mobility.b4"],
    warmupKeys: ["pdetail.warmup.breath", "pdetail.warmup.catCow", "pdetail.warmup.dynamic"],
    cooldownKeys: ["pdetail.cooldown.savasana", "pdetail.cooldown.breath", "pdetail.cooldown.meditate"],
    nutritionKey: "pdetail.mobility.nutrition",
    days: [
      { dayKey: "pday.hipFlow", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.worldsGreatest", sets: 3, reps: "10 each", rest: "30s" },
        { exerciseKey: "exercise.pigeonPose", sets: 2, reps: "60s each", rest: "30s" },
        { exerciseKey: "exercise.coupletStretch", sets: 2, reps: "45s each", rest: "30s" },
        { exerciseKey: "exercise.deepSquatHold", sets: 3, reps: "60s", rest: "30s" },
      ]},
      { dayKey: "pday.shoulderFlow", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.bandPullApart", sets: 3, reps: "15", rest: "30s" },
        { exerciseKey: "exercise.shoulderDislocate", sets: 3, reps: "10", rest: "30s" },
        { exerciseKey: "exercise.thoracicOpener", sets: 3, reps: "10", rest: "30s" },
        { exerciseKey: "exercise.wallSlide", sets: 3, reps: "12", rest: "30s" },
      ]},
      { dayKey: "pday.spineFlow", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.catCow", sets: 3, reps: "10", rest: "30s" },
        { exerciseKey: "exercise.threadNeedle", sets: 2, reps: "8 each", rest: "30s" },
        { exerciseKey: "exercise.cobra", sets: 3, reps: "30s", rest: "30s" },
        { exerciseKey: "exercise.childPose", sets: 3, reps: "60s", rest: "30s" },
      ]},
      { dayKey: "pday.fullFlow", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.sunSalutation", sets: 3, reps: "1 flow", rest: "30s" },
        { exerciseKey: "exercise.downwardDog", sets: 3, reps: "45s", rest: "30s" },
        { exerciseKey: "exercise.warriorPose", sets: 2, reps: "45s each", rest: "30s" },
        { exerciseKey: "exercise.savasana", sets: 1, reps: "5min", rest: "0" },
      ]},
      { dayKey: "pday.recoveryRoll", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.foamRollBack", sets: 2, reps: "60s", rest: "30s" },
        { exerciseKey: "exercise.foamRollQuads", sets: 2, reps: "60s", rest: "30s" },
        { exerciseKey: "exercise.foamRollItBand", sets: 2, reps: "60s", rest: "30s" },
        { exerciseKey: "exercise.lacrosseFeet", sets: 2, reps: "60s each", rest: "30s" },
      ]},
      { dayKey: "pday.breathReset", focusKey: "workouts.recovery", exercises: [
        { exerciseKey: "exercise.boxBreath", sets: 4, reps: "2min", rest: "30s" },
        { exerciseKey: "exercise.diaphragm", sets: 3, reps: "10 breaths", rest: "30s" },
        { exerciseKey: "exercise.legUpWall", sets: 1, reps: "5min", rest: "0" },
      ]},
    ],
  },

  mma: {
    id: "mma",
    overviewKey: "pdetail.mma.overview",
    splitKey: "pdetail.mma.split",
    intensityKey: "pdetail.intensity.high",
    caloriesKey: "pdetail.cal.700",
    benefitKeys: ["pdetail.mma.b1", "pdetail.mma.b2", "pdetail.mma.b3", "pdetail.mma.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.shadow", "pdetail.warmup.dynamic"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.mma.nutrition",
    days: [
      { dayKey: "pday.strikingPower", focusKey: "muscle.arms", exercises: [
        { exerciseKey: "exercise.shadowBoxing", sets: 3, reps: "3min", rest: R60 },
        { exerciseKey: "exercise.heavyBag", sets: 5, reps: "3min", rest: R90 },
        { exerciseKey: "exercise.medBallSlam", sets: 4, reps: "10", rest: R60 },
        { exerciseKey: "exercise.plyoPushUp", sets: 4, reps: "8", rest: R90 },
        { exerciseKey: "exercise.battleRope", sets: 4, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
      { dayKey: "pday.strengthBase", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 4, reps: "5", rest: R180 },
        { exerciseKey: "exercise.deadlift", sets: 4, reps: "5", rest: R180 },
        { exerciseKey: "exercise.pullUp", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.dips", sets: 4, reps: "10", rest: R90 },
        { exerciseKey: "exercise.farmersWalk", sets: 3, reps: "40m", rest: R90 },
      ]},
      { dayKey: "pday.conditioning", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.jumpRope", sets: 5, reps: "3min", rest: R60 },
        { exerciseKey: "exercise.burpees", sets: 5, reps: "15", rest: R60 },
        { exerciseKey: "exercise.kettlebellSwing", sets: 5, reps: "20", rest: R60 },
        { exerciseKey: "exercise.sprintInterval", sets: 8, reps: "30s", rest: R60 },
        { exerciseKey: "exercise.mountainClimber", sets: 4, reps: "40s", rest: R60 },
      ]},
      { dayKey: "pday.grappling", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "8", rest: R120 },
        { exerciseKey: "exercise.turkishGetup", sets: 3, reps: "5 each", rest: R120 },
        { exerciseKey: "exercise.kettlebellSwing", sets: 4, reps: "20", rest: R90 },
        { exerciseKey: "exercise.hangingLegRaise", sets: 4, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.russianTwist", sets: 4, reps: "20", rest: R60 },
        { exerciseKey: "exercise.bridge", sets: 3, reps: "30s", rest: R60 },
      ]},
      { dayKey: "pday.fightSim", focusKey: "workouts.fatLoss", exercises: [
        { exerciseKey: "exercise.heavyBag", sets: 5, reps: "3min", rest: R60 },
        { exerciseKey: "exercise.shadowBoxing", sets: 3, reps: "3min", rest: R60 },
        { exerciseKey: "exercise.burpees", sets: 4, reps: "10", rest: R60 },
        { exerciseKey: "exercise.boxJump", sets: 4, reps: "8", rest: R90 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "60s", rest: R60 },
      ]},
    ],
  },

  classic: {
    id: "classic",
    overviewKey: "pdetail.classic.overview",
    splitKey: "pdetail.classic.split",
    intensityKey: "pdetail.intensity.high",
    caloriesKey: "pdetail.cal.500",
    benefitKeys: ["pdetail.classic.b1", "pdetail.classic.b2", "pdetail.classic.b3", "pdetail.classic.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.posing"],
    nutritionKey: "pdetail.classic.nutrition",
    days: [
      { dayKey: "pday.chestArms", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 5, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.inclineBench", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.dbPullover", sets: 4, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.cableFly", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.barbellCurl", sets: 4, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.skullCrusher", sets: 4, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.concentrationCurl", sets: 3, reps: "10-12", rest: R60 },
      ]},
      { dayKey: "pday.backShoulders", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.deadlift", sets: 5, reps: "6-8", rest: R180 },
        { exerciseKey: "exercise.pullUp", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.barbellRow", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.ohp", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.lateralRaise", sets: 5, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.rearDelt", sets: 4, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.legsClassic", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 5, reps: "8-10", rest: R180 },
        { exerciseKey: "exercise.legPress", sets: 4, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.legCurl", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.legExtension", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 5, reps: "15-20", rest: R60 },
      ]},
      { dayKey: "pday.aestheticArms", focusKey: "muscle.arms", exercises: [
        { exerciseKey: "exercise.preacherCurl", sets: 4, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.hammerCurl", sets: 4, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.cableCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.closeGripBench", sets: 4, reps: "8-10", rest: R90 },
        { exerciseKey: "exercise.tricepPushdown", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.overheadTricep", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.posingDay", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.inclineBench", sets: 4, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.cableFly", sets: 4, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.lateralRaise", sets: 4, reps: "15-20", rest: R60 },
        { exerciseKey: "exercise.cableCurl", sets: 3, reps: "15", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "15", rest: R60 },
        { exerciseKey: "exercise.vacuum", sets: 5, reps: "20s", rest: "30s" },
        { exerciseKey: "exercise.posingPractice", sets: 1, reps: "20min", rest: "0" },
      ]},
    ],
  },

  ramadan: {
    id: "ramadan",
    overviewKey: "pdetail.ramadan.overview",
    splitKey: "pdetail.ramadan.split",
    intensityKey: "pdetail.intensity.moderate",
    caloriesKey: "pdetail.cal.350",
    benefitKeys: ["pdetail.ramadan.b1", "pdetail.ramadan.b2", "pdetail.ramadan.b3", "pdetail.ramadan.b4"],
    warmupKeys: ["pdetail.warmup.light", "pdetail.warmup.dynamic", "pdetail.warmup.activation"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.hydrate", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.ramadan.nutrition",
    days: [
      { dayKey: "pday.preIftarUpper", focusKey: "muscle.chest", exercises: [
        { exerciseKey: "exercise.benchPress", sets: 3, reps: "8-10", rest: R120, noteKey: "pdetail.note.preIftar" },
        { exerciseKey: "exercise.inclineBench", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.latPulldown", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.seatedRow", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.lateralRaise", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.postIftarLegs", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 3, reps: "8-10", rest: R180, noteKey: "pdetail.note.postIftar" },
        { exerciseKey: "exercise.legPress", sets: 3, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.romanianDL", sets: 3, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.legCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "15-20", rest: R60 },
      ]},
      { dayKey: "pday.preIftarPull", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.pullUp", sets: 3, reps: "6-8", rest: R120 },
        { exerciseKey: "exercise.barbellRow", sets: 3, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.facePull", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.barbellCurl", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.hammerCurl", sets: 3, reps: "10-12", rest: R60 },
      ]},
      { dayKey: "pday.postIftarPush", focusKey: "muscle.shoulders", exercises: [
        { exerciseKey: "exercise.ohp", sets: 3, reps: "8-10", rest: R120, noteKey: "pdetail.note.postIftar" },
        { exerciseKey: "exercise.dbShoulderPress", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.lateralRaise", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
      ]},
    ],
  },

  women: {
    id: "women",
    overviewKey: "pdetail.women.overview",
    splitKey: "pdetail.women.split",
    intensityKey: "pdetail.intensity.moderate",
    caloriesKey: "pdetail.cal.400",
    benefitKeys: ["pdetail.women.b1", "pdetail.women.b2", "pdetail.women.b3", "pdetail.women.b4"],
    warmupKeys: ["pdetail.warmup.cardio5", "pdetail.warmup.dynamic", "pdetail.warmup.glute"],
    cooldownKeys: ["pdetail.cooldown.stretch", "pdetail.cooldown.foam", "pdetail.cooldown.breath"],
    nutritionKey: "pdetail.women.nutrition",
    days: [
      { dayKey: "pday.gluteFocus", focusKey: "muscle.glutes", exercises: [
        { exerciseKey: "exercise.hipThrust", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.bulgSplit", sets: 3, reps: "10 each", rest: R90 },
        { exerciseKey: "exercise.cableKickback", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.gluteBridge", sets: 3, reps: "15", rest: R60 },
        { exerciseKey: "exercise.frogPump", sets: 3, reps: "20", rest: R60 },
      ]},
      { dayKey: "pday.upperBodyTone", focusKey: "muscle.back", exercises: [
        { exerciseKey: "exercise.latPulldown", sets: 4, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.seatedRow", sets: 4, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.dbShoulderPress", sets: 3, reps: "10-12", rest: R90 },
        { exerciseKey: "exercise.lateralRaise", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.cableCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.tricepPushdown", sets: 3, reps: "12-15", rest: R60 },
      ]},
      { dayKey: "pday.legsFullPosterior", focusKey: "muscle.legs", exercises: [
        { exerciseKey: "exercise.squat", sets: 4, reps: "8-10", rest: R120 },
        { exerciseKey: "exercise.romanianDL", sets: 4, reps: "10-12", rest: R120 },
        { exerciseKey: "exercise.legPress", sets: 3, reps: "12-15", rest: R90 },
        { exerciseKey: "exercise.legCurl", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.calfRaise", sets: 4, reps: "15-20", rest: R60 },
      ]},
      { dayKey: "pday.coreGluteFinish", focusKey: "muscle.core", exercises: [
        { exerciseKey: "exercise.hipThrust", sets: 4, reps: "12-15", rest: R90 },
        { exerciseKey: "exercise.cableKickback", sets: 3, reps: "12-15", rest: R60 },
        { exerciseKey: "exercise.plank", sets: 3, reps: "45s", rest: R60 },
        { exerciseKey: "exercise.russianTwist", sets: 3, reps: "20", rest: R60 },
        { exerciseKey: "exercise.hangingLegRaise", sets: 3, reps: "10-12", rest: R60 },
        { exerciseKey: "exercise.deadBug", sets: 3, reps: "10 each", rest: R60 },
      ]},
    ],
  },
};
