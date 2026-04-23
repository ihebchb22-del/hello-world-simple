import type { Language } from "./index";

export const workoutTranslations: Record<string, Record<Language, string>> = {
  // Nav
  "nav.workouts": { en: "Workouts", fr: "Entraînements", ar: "التمارين" },

  // Workouts page hero
  "workouts.tagline": { en: "Train Like a Pro", fr: "Entraînez-vous Comme un Pro", ar: "تدرب كالمحترفين" },
  "workouts.title": { en: "WORKOUT PROGRAMS", fr: "PROGRAMMES D'ENTRAÎNEMENT", ar: "برامج التمارين" },
  "workouts.subtitle": {
    en: "Complete workout plans for every level — from beginner to advanced. Build muscle, burn fat, and get stronger with structured programs.",
    fr: "Plans d'entraînement complets pour tous les niveaux — du débutant à l'avancé. Prenez du muscle, brûlez les graisses et devenez plus fort avec des programmes structurés.",
    ar: "خطط تدريب كاملة لكل المستويات — من المبتدئ إلى المتقدم. ابنِ العضلات، احرق الدهون وكن أقوى مع برامج منظمة.",
  },

  // Filter categories
  "workouts.all": { en: "All Programs", fr: "Tous les Programmes", ar: "كل البرامج" },
  "workouts.muscle": { en: "Muscle Building", fr: "Prise de Masse", ar: "بناء العضلات" },
  "workouts.fatLoss": { en: "Fat Loss", fr: "Perte de Graisse", ar: "حرق الدهون" },
  "workouts.strength": { en: "Strength", fr: "Force", ar: "قوة" },
  "workouts.beginner": { en: "Beginner", fr: "Débutant", ar: "مبتدئ" },
  "workouts.home": { en: "Home", fr: "Maison", ar: "منزلي" },
  "workouts.recovery": { en: "Recovery", fr: "Récupération", ar: "تعافي" },

  // Program labels
  "workouts.daysPerWeek": { en: "days/week", fr: "jours/sem", ar: "أيام/أسبوع" },
  "workouts.duration": { en: "Duration", fr: "Durée", ar: "المدة" },
  "workouts.weeks": { en: "weeks", fr: "semaines", ar: "أسابيع" },
  "workouts.level": { en: "Level", fr: "Niveau", ar: "المستوى" },
  "workouts.goal": { en: "Goal", fr: "Objectif", ar: "الهدف" },
  "workouts.viewProgram": { en: "View Program", fr: "Voir le Programme", ar: "عرض البرنامج" },
  "workouts.equipment": { en: "Equipment", fr: "Équipement", ar: "المعدات" },
  "workouts.gym": { en: "Full Gym", fr: "Salle Complète", ar: "صالة كاملة" },
  "workouts.minimal": { en: "Minimal", fr: "Minimal", ar: "الحد الأدنى" },
  "workouts.none": { en: "None", fr: "Aucun", ar: "لا شيء" },
  "workouts.intermediate": { en: "Intermediate", fr: "Intermédiaire", ar: "متوسط" },
  "workouts.advanced": { en: "Advanced", fr: "Avancé", ar: "متقدم" },

  // Exercise library section
  "workouts.exerciseLibrary": { en: "EXERCISE LIBRARY", fr: "BIBLIOTHÈQUE D'EXERCICES", ar: "مكتبة التمارين" },
  "workouts.exerciseLibraryDesc": {
    en: "Master proper form with our complete exercise database organized by muscle group",
    fr: "Maîtrisez la bonne forme avec notre base d'exercices complète organisée par groupe musculaire",
    ar: "أتقن الأداء الصحيح مع قاعدة بيانات التمارين الكاملة حسب المجموعة العضلية",
  },
  "workouts.exercises": { en: "exercises", fr: "exercices", ar: "تمرين" },

  // Muscle groups
  "muscle.chest": { en: "Chest", fr: "Pectoraux", ar: "صدر" },
  "muscle.back": { en: "Back", fr: "Dos", ar: "ظهر" },
  "muscle.legs": { en: "Legs", fr: "Jambes", ar: "أرجل" },
  "muscle.shoulders": { en: "Shoulders", fr: "Épaules", ar: "أكتاف" },
  "muscle.arms": { en: "Arms", fr: "Bras", ar: "ذراعين" },
  "muscle.core": { en: "Core", fr: "Abdominaux", ar: "عضلات البطن" },

  // Exercises - Chest
  "exercise.benchPress": { en: "Barbell Bench Press", fr: "Développé Couché Barre", ar: "ضغط الصدر بالبار" },
  "exercise.inclineBench": { en: "Incline Dumbbell Press", fr: "Développé Incliné Haltères", ar: "ضغط مائل بالدمبل" },
  "exercise.cableFly": { en: "Cable Flyes", fr: "Écarté à la Poulie", ar: "فتح صدر بالكابل" },
  "exercise.dips": { en: "Chest Dips", fr: "Dips Pectoraux", ar: "ديبس صدر" },
  "exercise.pushUps": { en: "Push-Ups", fr: "Pompes", ar: "تمرين الضغط" },

  // Exercises - Back
  "exercise.deadlift": { en: "Deadlift", fr: "Soulevé de Terre", ar: "الرفعة الميتة" },
  "exercise.pullUp": { en: "Pull-Ups", fr: "Tractions", ar: "تمرين العقلة" },
  "exercise.barbellRow": { en: "Barbell Row", fr: "Rowing Barre", ar: "تجديف بالبار" },
  "exercise.latPulldown": { en: "Lat Pulldown", fr: "Tirage Vertical", ar: "سحب عالي" },
  "exercise.seatedRow": { en: "Seated Cable Row", fr: "Rowing Assis Poulie", ar: "تجديف جالس بالكابل" },

  // Exercises - Legs
  "exercise.squat": { en: "Barbell Squat", fr: "Squat Barre", ar: "سكوات بالبار" },
  "exercise.legPress": { en: "Leg Press", fr: "Presse à Cuisses", ar: "ضغط الأرجل" },
  "exercise.romanianDL": { en: "Romanian Deadlift", fr: "Soulevé de Terre Roumain", ar: "رفعة رومانية" },
  "exercise.legCurl": { en: "Leg Curl", fr: "Leg Curl", ar: "ثني الأرجل" },
  "exercise.calfRaise": { en: "Calf Raises", fr: "Mollets Debout", ar: "رفع بطة الساق" },

  // Exercises - Shoulders
  "exercise.ohp": { en: "Overhead Press", fr: "Développé Militaire", ar: "ضغط علوي" },
  "exercise.lateralRaise": { en: "Lateral Raises", fr: "Élévations Latérales", ar: "رفع جانبي" },
  "exercise.facePull": { en: "Face Pulls", fr: "Face Pulls", ar: "سحب للوجه" },
  "exercise.rearDelt": { en: "Rear Delt Flyes", fr: "Oiseau Arrière", ar: "فتح خلفي" },
  "exercise.arnoldPress": { en: "Arnold Press", fr: "Arnold Press", ar: "ضغط أرنولد" },

  // Exercises - Arms
  "exercise.barbellCurl": { en: "Barbell Curl", fr: "Curl Barre", ar: "كيرل بالبار" },
  "exercise.hammerCurl": { en: "Hammer Curl", fr: "Curl Marteau", ar: "كيرل مطرقة" },
  "exercise.tricepDip": { en: "Tricep Dips", fr: "Dips Triceps", ar: "ديبس ترايسبس" },
  "exercise.skullCrusher": { en: "Skull Crushers", fr: "Barre au Front", ar: "سحق الجمجمة" },
  "exercise.cableCurl": { en: "Cable Curl", fr: "Curl Poulie", ar: "كيرل بالكابل" },

  // Exercises - Core
  "exercise.plank": { en: "Plank", fr: "Planche", ar: "بلانك" },
  "exercise.hangingLegRaise": { en: "Hanging Leg Raise", fr: "Relevé de Jambes Suspendu", ar: "رفع الأرجل معلقاً" },
  "exercise.cableCrunch": { en: "Cable Crunch", fr: "Crunch Poulie", ar: "كرنش بالكابل" },
  "exercise.russianTwist": { en: "Russian Twist", fr: "Russian Twist", ar: "لف روسي" },
  "exercise.abRollout": { en: "Ab Rollout", fr: "Roue Abdominale", ar: "عجلة البطن" },
  "exercise.woodchop": { en: "Cable Woodchop", fr: "Woodchop Poulie", ar: "قطع الخشب بالكابل" },
  "exercise.dragonFlag": { en: "Dragon Flag", fr: "Dragon Flag", ar: "علم التنين" },
  "exercise.sidePlank": { en: "Side Plank", fr: "Planche Latérale", ar: "بلانك جانبي" },
  "exercise.declineCrunch": { en: "Decline Crunch", fr: "Crunch Décliné", ar: "كرنش مائل" },
  "exercise.pallofPress": { en: "Pallof Press", fr: "Pallof Press", ar: "ضغط بالوف" },

  // Extra Chest
  "exercise.declinePress": { en: "Decline Bench Press", fr: "Développé Décliné", ar: "ضغط صدر مائل سفلي" },
  "exercise.pecDeck": { en: "Pec Deck Machine", fr: "Machine Pec Deck", ar: "جهاز فتح الصدر" },
  "exercise.dbPullover": { en: "Dumbbell Pullover", fr: "Pullover Haltère", ar: "بولوفر بالدمبل" },
  "exercise.svendPress": { en: "Svend Press", fr: "Svend Press", ar: "ضغط سفند" },
  "exercise.landminePress": { en: "Landmine Press", fr: "Landmine Press", ar: "ضغط لاندماين" },

  // Extra Back
  "exercise.tBarRow": { en: "T-Bar Row", fr: "Rowing T-Bar", ar: "تجديف تي بار" },
  "exercise.singleArmRow": { en: "Single-Arm Dumbbell Row", fr: "Rowing Unilatéral Haltère", ar: "تجديف أحادي بالدمبل" },
  "exercise.straightArmPulldown": { en: "Straight-Arm Pulldown", fr: "Tirage Bras Tendus", ar: "سحب بأذرع مستقيمة" },
  "exercise.chestSupportedRow": { en: "Chest-Supported Row", fr: "Rowing Appui Poitrine", ar: "تجديف بسند الصدر" },
  "exercise.meadowsRow": { en: "Meadows Row", fr: "Meadows Row", ar: "تجديف ميدوز" },

  // Extra Legs
  "exercise.frontSquat": { en: "Front Squat", fr: "Squat Avant", ar: "سكوات أمامي" },
  "exercise.bulgSplit": { en: "Bulgarian Split Squat", fr: "Squat Bulgare", ar: "سكوات بلغاري" },
  "exercise.legExtension": { en: "Leg Extension", fr: "Leg Extension", ar: "مد الأرجل" },
  "exercise.hackSquat": { en: "Hack Squat", fr: "Hack Squat", ar: "هاك سكوات" },
  "exercise.walkingLunge": { en: "Walking Lunges", fr: "Fentes Marchées", ar: "لنجز مشي" },

  // Extra Shoulders
  "exercise.cableLateralRaise": { en: "Cable Lateral Raise", fr: "Élévation Latérale Poulie", ar: "رفع جانبي بالكابل" },
  "exercise.uprightRow": { en: "Upright Row", fr: "Rowing Vertical", ar: "تجديف عمودي" },
  "exercise.dbShoulderPress": { en: "DB Shoulder Press", fr: "Développé Épaules Haltères", ar: "ضغط كتف بالدمبل" },
  "exercise.reversePecDeck": { en: "Reverse Pec Deck", fr: "Pec Deck Inversé", ar: "بيك ديك عكسي" },
  "exercise.luRaise": { en: "Lu Raise", fr: "Lu Raise", ar: "رفع لو" },

  // Extra Arms
  "exercise.preacherCurl": { en: "Preacher Curl", fr: "Curl Pupitre", ar: "كيرل بوبيتر" },
  "exercise.tricepPushdown": { en: "Tricep Pushdown", fr: "Pushdown Triceps", ar: "دفع ترايسبس" },
  "exercise.overheadTricep": { en: "Overhead Tricep Extension", fr: "Extension Triceps au-dessus", ar: "تمديد ترايسبس علوي" },
  "exercise.concentrationCurl": { en: "Concentration Curl", fr: "Curl Concentration", ar: "كيرل تركيز" },
  "exercise.closeGripBench": { en: "Close-Grip Bench Press", fr: "Développé Couché Prise Serrée", ar: "ضغط صدر قبضة ضيقة" },

  // Glutes
  "muscle.glutes": { en: "Glutes", fr: "Fessiers", ar: "عضلات الأرداف" },
  "exercise.hipThrust": { en: "Barbell Hip Thrust", fr: "Hip Thrust Barre", ar: "هيب ثراست بالبار" },
  "exercise.gluteBridge": { en: "Glute Bridge", fr: "Pont Fessier", ar: "جسر الأرداف" },
  "exercise.cableKickback": { en: "Cable Kickback", fr: "Kickback Poulie", ar: "ركل خلفي بالكابل" },
  "exercise.sumoDeadlift": { en: "Sumo Deadlift", fr: "Soulevé de Terre Sumo", ar: "رفعة ميتة سومو" },
  "exercise.stepUp": { en: "Step-Ups", fr: "Step-Ups", ar: "ستيب أب" },
  "exercise.curtsyLunge": { en: "Curtsy Lunge", fr: "Fente Croisée", ar: "لنج متقاطع" },
  "exercise.frogPump": { en: "Frog Pumps", fr: "Frog Pumps", ar: "فروج بامبس" },
  "exercise.gluteHamRaise": { en: "Glute-Ham Raise", fr: "Glute-Ham Raise", ar: "رفع أرداف-خلفية" },

  // Traps
  "muscle.traps": { en: "Traps", fr: "Trapèzes", ar: "عضلات شبه المنحرفة" },
  "exercise.barbellShrug": { en: "Barbell Shrug", fr: "Shrug Barre", ar: "شراغ بالبار" },
  "exercise.dbShrug": { en: "Dumbbell Shrug", fr: "Shrug Haltères", ar: "شراغ بالدمبل" },
  "exercise.farmersWalk": { en: "Farmer's Walk", fr: "Marche du Fermier", ar: "مشي المزارع" },
  "exercise.rackPull": { en: "Rack Pull", fr: "Rack Pull", ar: "سحب من الرف" },
  "exercise.cableShrug": { en: "Cable Shrug", fr: "Shrug Poulie", ar: "شراغ بالكابل" },
  "exercise.behindBackShrug": { en: "Behind-Back Barbell Shrug", fr: "Shrug Barre Derrière le Dos", ar: "شراغ خلف الظهر" },

  // Forearms
  "muscle.forearms": { en: "Forearms", fr: "Avant-Bras", ar: "الساعدين" },
  "exercise.wristCurl": { en: "Wrist Curl", fr: "Curl de Poignet", ar: "ثني المعصم" },
  "exercise.reverseWristCurl": { en: "Reverse Wrist Curl", fr: "Curl de Poignet Inversé", ar: "ثني معصم عكسي" },
  "exercise.reverseGripCurl": { en: "Reverse Grip Curl", fr: "Curl Prise Inversée", ar: "كيرل قبضة عكسية" },
  "exercise.platePinch": { en: "Plate Pinch Hold", fr: "Pincement de Disque", ar: "مسك القرص بالأصابع" },
  "exercise.gripCrusher": { en: "Grip Crusher", fr: "Pince de Préhension", ar: "ضاغط القبضة" },
  "exercise.towelHang": { en: "Towel Hang", fr: "Suspension Serviette", ar: "تعلق بالمنشفة" },

  // Programs data
  "program.ppl.name": { en: "Push / Pull / Legs", fr: "Push / Pull / Legs", ar: "دفع / سحب / أرجل" },
  "program.ppl.desc": {
    en: "The ultimate 6-day split for maximizing muscle growth. Hit each muscle group twice per week with dedicated push, pull, and leg sessions.",
    fr: "Le split ultime en 6 jours pour maximiser la croissance musculaire. Travaillez chaque groupe musculaire deux fois par semaine avec des séances dédiées push, pull et jambes.",
    ar: "التقسيم الأمثل لـ 6 أيام لتعظيم نمو العضلات. استهدف كل مجموعة عضلية مرتين أسبوعياً بجلسات دفع وسحب وأرجل.",
  },

  "program.fullbody.name": { en: "Full Body 3-Day", fr: "Full Body 3 Jours", ar: "تمرين كامل 3 أيام" },
  "program.fullbody.desc": {
    en: "Train your entire body three times per week. Perfect for busy schedules while still hitting every muscle with compound movements.",
    fr: "Entraînez tout votre corps trois fois par semaine. Parfait pour les emplois du temps chargés tout en ciblant chaque muscle avec des mouvements composés.",
    ar: "درّب جسمك بالكامل ثلاث مرات أسبوعياً. مثالي للجداول المزدحمة مع استهداف كل عضلة بتمارين مركبة.",
  },

  "program.upperlower.name": { en: "Upper / Lower Split", fr: "Upper / Lower Split", ar: "تقسيم علوي / سفلي" },
  "program.upperlower.desc": {
    en: "A balanced 4-day program alternating upper and lower body sessions. Great for intermediate lifters seeking steady progression.",
    fr: "Un programme équilibré en 4 jours alternant séances haut et bas du corps. Idéal pour les pratiquants intermédiaires cherchant une progression régulière.",
    ar: "برنامج متوازن لـ 4 أيام يتناوب بين جلسات الجزء العلوي والسفلي. رائع للمتدربين المتوسطين.",
  },

  "program.brosplit.name": { en: "Classic Bro Split", fr: "Bro Split Classique", ar: "تقسيم كلاسيكي" },
  "program.brosplit.desc": {
    en: "One muscle group per day, 5 days a week. High volume approach targeting each body part with maximum intensity and recovery time.",
    fr: "Un groupe musculaire par jour, 5 jours par semaine. Approche haut volume ciblant chaque partie du corps avec intensité maximale.",
    ar: "مجموعة عضلية واحدة يومياً، 5 أيام أسبوعياً. نهج حجم عالي يستهدف كل جزء من الجسم بأقصى شدة.",
  },

  "program.hiit.name": { en: "HIIT Fat Burner", fr: "HIIT Brûleur de Graisses", ar: "HIIT حارق الدهون" },
  "program.hiit.desc": {
    en: "High-intensity interval training designed to torch body fat while preserving lean muscle. Short, explosive workouts with maximum calorie burn.",
    fr: "Entraînement par intervalles haute intensité conçu pour brûler les graisses tout en préservant la masse musculaire. Séances courtes et explosives.",
    ar: "تدريب فتري عالي الشدة مصمم لحرق دهون الجسم مع الحفاظ على العضلات. تمارين قصيرة ومتفجرة بأقصى حرق للسعرات.",
  },

  "program.strength.name": { en: "Strength 5×5", fr: "Force 5×5", ar: "قوة 5×5" },
  "program.strength.desc": {
    en: "A proven powerlifting-style program focused on progressive overload with compound lifts. Build raw strength with 5 sets of 5 reps.",
    fr: "Un programme éprouvé style powerlifting centré sur la surcharge progressive avec des mouvements composés. Construisez de la force brute avec 5 séries de 5 répétitions.",
    ar: "برنامج مثبت بأسلوب رفع الأثقال يركز على الحمل التدريجي بتمارين مركبة. ابنِ قوة خام بـ 5 مجموعات من 5 تكرارات.",
  },

  "program.beginner.name": { en: "Beginner Foundations", fr: "Fondations Débutant", ar: "أساسيات المبتدئ" },
  "program.beginner.desc": {
    en: "Start your fitness journey the right way. Learn proper form, build foundational strength, and establish consistent training habits.",
    fr: "Commencez votre parcours fitness de la bonne façon. Apprenez la bonne forme, construisez une force de base et établissez des habitudes d'entraînement régulières.",
    ar: "ابدأ رحلتك الرياضية بالطريقة الصحيحة. تعلم الأداء الصحيح، ابنِ قوة أساسية وأسس عادات تدريب منتظمة.",
  },

  "program.home.name": { en: "Home Bodyweight", fr: "Poids du Corps Maison", ar: "تمارين منزلية" },
  "program.home.desc": {
    en: "No gym? No problem. A complete bodyweight program you can do anywhere. Progressive difficulty to keep challenging your muscles.",
    fr: "Pas de salle ? Pas de problème. Un programme complet au poids du corps faisable partout. Difficulté progressive pour continuer à défier vos muscles.",
    ar: "لا صالة؟ لا مشكلة. برنامج كامل بوزن الجسم يمكنك ممارسته في أي مكان. صعوبة تدريجية لتحدي عضلاتك باستمرار.",
  },

  "program.gvt.name": { en: "German Volume Training", fr: "German Volume Training", ar: "التدريب الألماني بالحجم" },
  "program.gvt.desc": {
    en: "The ultimate hypertrophy program: 10 sets of 10 reps per exercise. Extreme volume to force muscle growth. Not for the faint-hearted — expect serious DOMS.",
    fr: "Le programme d'hypertrophie ultime : 10 séries de 10 répétitions par exercice. Volume extrême pour forcer la croissance musculaire. Pas pour les faibles — attendez-vous à des courbatures sérieuses.",
    ar: "برنامج التضخيم النهائي: 10 مجموعات من 10 تكرارات لكل تمرين. حجم متطرف لفرض نمو العضلات. ليس لضعاف القلوب.",
  },

  "program.531.name": { en: "5/3/1 Wendler", fr: "5/3/1 Wendler", ar: "5/3/1 ويندلر" },
  "program.531.desc": {
    en: "Jim Wendler's legendary strength program. Four-week cycles with progressive percentages on squat, bench, deadlift, and overhead press. Slow, steady, unstoppable gains.",
    fr: "Le programme de force légendaire de Jim Wendler. Cycles de quatre semaines avec des pourcentages progressifs sur le squat, développé couché, soulevé de terre et développé militaire.",
    ar: "برنامج القوة الأسطوري لجيم ويندلر. دورات أربعة أسابيع بنسب تصاعدية على السكوات والضغط والرفعة الميتة والضغط العلوي.",
  },

  "program.yoga.name": { en: "Yoga & Flexibility", fr: "Yoga & Souplesse", ar: "يوغا ومرونة" },
  "program.yoga.desc": {
    en: "Improve mobility, reduce injury risk, and enhance recovery. Combines vinyasa flows, deep stretches, and breathwork designed specifically for lifters.",
    fr: "Améliorez la mobilité, réduisez les risques de blessures et optimisez la récupération. Combine des flows vinyasa, des étirements profonds et du travail respiratoire conçus pour les pratiquants de musculation.",
    ar: "حسّن المرونة، قلل مخاطر الإصابة، وعزز التعافي. يجمع بين تدفقات فينياسا وتمدد عميق وتمارين تنفس مصممة خصيصاً لرافعي الأثقال.",
  },

  "program.sprint.name": { en: "Sprint & Conditioning", fr: "Sprint & Conditionnement", ar: "سبرنت وتكييف" },
  "program.sprint.desc": {
    en: "Explosive sprint intervals combined with functional conditioning drills. Torch body fat, boost VO2 max, and build athletic speed in just 3 sessions a week.",
    fr: "Des intervalles de sprint explosifs combinés à des exercices de conditionnement fonctionnel. Brûlez les graisses, améliorez votre VO2 max et développez votre vitesse athlétique en seulement 3 séances par semaine.",
    ar: "فترات سبرنت متفجرة مع تمارين تكييف وظيفية. احرق الدهون، عزز VO2 max، وابنِ سرعة رياضية في 3 جلسات أسبوعياً فقط.",
  },

  // Weekly schedule section
  "workouts.weeklySchedule": { en: "SAMPLE WEEKLY SCHEDULE", fr: "PLANNING HEBDOMADAIRE TYPE", ar: "جدول أسبوعي نموذجي" },
  "workouts.weeklyScheduleDesc": {
    en: "Here's how a typical Push/Pull/Legs week looks. Adapt rest days to your recovery needs.",
    fr: "Voici à quoi ressemble une semaine Push/Pull/Legs typique. Adaptez les jours de repos à vos besoins de récupération.",
    ar: "هكذا يبدو أسبوع دفع/سحب/أرجل نموذجي. كيّف أيام الراحة حسب احتياجات تعافيك.",
  },
  "workouts.monday": { en: "Monday", fr: "Lundi", ar: "الإثنين" },
  "workouts.tuesday": { en: "Tuesday", fr: "Mardi", ar: "الثلاثاء" },
  "workouts.wednesday": { en: "Wednesday", fr: "Mercredi", ar: "الأربعاء" },
  "workouts.thursday": { en: "Thursday", fr: "Jeudi", ar: "الخميس" },
  "workouts.friday": { en: "Friday", fr: "Vendredi", ar: "الجمعة" },
  "workouts.saturday": { en: "Saturday", fr: "Samedi", ar: "السبت" },
  "workouts.sunday": { en: "Sunday", fr: "Dimanche", ar: "الأحد" },
  "workouts.push": { en: "Push", fr: "Push", ar: "دفع" },
  "workouts.pull": { en: "Pull", fr: "Pull", ar: "سحب" },
  "workouts.legsDay": { en: "Legs", fr: "Jambes", ar: "أرجل" },
  "workouts.rest": { en: "Rest", fr: "Repos", ar: "راحة" },

  // Tips section
  "workouts.tipsTitle": { en: "TRAINING TIPS", fr: "CONSEILS D'ENTRAÎNEMENT", ar: "نصائح التدريب" },
  "workouts.tipsSubtitle": {
    en: "Essential principles to maximize your results in and out of the gym",
    fr: "Principes essentiels pour maximiser vos résultats à la salle et en dehors",
    ar: "مبادئ أساسية لتعظيم نتائجك داخل وخارج الصالة",
  },
  "workouts.tip1Title": { en: "Progressive Overload", fr: "Surcharge Progressive", ar: "الحمل التدريجي" },
  "workouts.tip1Desc": {
    en: "Gradually increase weight, reps, or sets each week to continuously challenge your muscles and stimulate growth.",
    fr: "Augmentez progressivement le poids, les répétitions ou les séries chaque semaine pour défier continuellement vos muscles.",
    ar: "زد الوزن أو التكرارات أو المجموعات تدريجياً كل أسبوع لتحدي عضلاتك باستمرار وتحفيز النمو.",
  },
  "workouts.tip2Title": { en: "Rest & Recovery", fr: "Repos & Récupération", ar: "الراحة والتعافي" },
  "workouts.tip2Desc": {
    en: "Muscles grow during rest, not during training. Sleep 7-9 hours, manage stress, and take deload weeks every 4-6 weeks.",
    fr: "Les muscles grandissent au repos, pas pendant l'entraînement. Dormez 7-9h, gérez le stress et prenez une semaine de décharge toutes les 4-6 semaines.",
    ar: "العضلات تنمو أثناء الراحة وليس أثناء التدريب. نم 7-9 ساعات، أدر التوتر وخذ أسبوع تخفيف كل 4-6 أسابيع.",
  },
  "workouts.tip3Title": { en: "Mind-Muscle Connection", fr: "Connexion Muscle-Esprit", ar: "الاتصال بين العقل والعضلة" },
  "workouts.tip3Desc": {
    en: "Focus on feeling the target muscle work through the full range of motion. Slow, controlled reps beat sloppy heavy weight.",
    fr: "Concentrez-vous sur le ressenti du muscle cible à travers toute l'amplitude. Des répétitions lentes et contrôlées battent les charges lourdes mal exécutées.",
    ar: "ركز على الشعور بالعضلة المستهدفة خلال كامل نطاق الحركة. التكرارات البطيئة المتحكمة أفضل من الأوزان الثقيلة العشوائية.",
  },
  "workouts.tip4Title": { en: "Nutrition Matters", fr: "La Nutrition Compte", ar: "التغذية مهمة" },
  "workouts.tip4Desc": {
    en: "You can't out-train a bad diet. Eat enough protein (1.6-2.2g/kg), stay in a caloric surplus for muscle gain, or deficit for fat loss.",
    fr: "Vous ne pouvez pas compenser une mauvaise alimentation. Mangez assez de protéines (1.6-2.2g/kg), surplus calorique pour la masse, déficit pour la sèche.",
    ar: "لا يمكنك تعويض نظام غذائي سيء بالتدريب. تناول ما يكفي من البروتين (1.6-2.2 غ/كغ)، فائض سعرات للكتلة أو عجز لحرق الدهون.",
  },
  "workouts.tip5Title": { en: "Warm Up Properly", fr: "Échauffement Correct", ar: "الإحماء الصحيح" },
  "workouts.tip5Desc": {
    en: "Always warm up with 5-10 min cardio and dynamic stretches. Do 2-3 warm-up sets before your working sets to prevent injuries.",
    fr: "Échauffez-vous toujours avec 5-10 min de cardio et des étirements dynamiques. Faites 2-3 séries d'échauffement avant vos séries de travail.",
    ar: "احرص دائماً على الإحماء بـ 5-10 دقائق كارديو وتمدد ديناميكي. أدِّ 2-3 مجموعات إحماء قبل مجموعات العمل لمنع الإصابات.",
  },
  "workouts.tip6Title": { en: "Track Your Progress", fr: "Suivez Vos Progrès", ar: "تتبع تقدمك" },
  "workouts.tip6Desc": {
    en: "Log every workout — weights, reps, and how you felt. Data-driven training beats guesswork every time.",
    fr: "Notez chaque entraînement — poids, répétitions et ressentis. L'entraînement basé sur les données bat les suppositions à chaque fois.",
    ar: "سجل كل تمرين — الأوزان والتكرارات وشعورك. التدريب المبني على البيانات يتفوق على التخمين دائماً.",
  },
  "workouts.tip7Title": { en: "Deload Weeks", fr: "Semaines de Décharge", ar: "أسابيع التخفيف" },
  "workouts.tip7Desc": {
    en: "Every 4-6 weeks, reduce volume and intensity by 40-50%. Deloads let your CNS recover, prevent overtraining, and set you up for new PRs.",
    fr: "Toutes les 4-6 semaines, réduisez le volume et l'intensité de 40-50%. Les décharges permettent à votre SNC de récupérer et de préparer de nouveaux records.",
    ar: "كل 4-6 أسابيع، قلل الحجم والشدة بنسبة 40-50%. أسابيع التخفيف تسمح لجهازك العصبي بالتعافي وتمنع الإفراط في التدريب.",
  },
  "workouts.tip8Title": { en: "Compound vs Isolation", fr: "Composé vs Isolation", ar: "مركبة مقابل عزل" },
  "workouts.tip8Desc": {
    en: "Build your workout around compounds (squat, bench, deadlift, rows) then finish with isolation moves. 70% compound, 30% isolation is the sweet spot.",
    fr: "Construisez votre entraînement autour des composés (squat, développé, soulevé, rowing) puis finissez avec des exercices d'isolation. 70% composé, 30% isolation est l'idéal.",
    ar: "ابنِ تمرينك حول التمارين المركبة (سكوات، ضغط، رفعة ميتة، تجديف) ثم أنهِ بتمارين العزل. 70% مركبة، 30% عزل هي النسبة المثلى.",
  },
  "workouts.tip9Title": { en: "Breathing Technique", fr: "Technique de Respiration", ar: "تقنية التنفس" },
  "workouts.tip9Desc": {
    en: "Use the Valsalva maneuver on heavy lifts: deep breath in, brace your core, lift, then exhale at the top. Proper breathing adds 10-15% to your lifts.",
    fr: "Utilisez la manœuvre de Valsalva sur les charges lourdes : inspirez profondément, gainez, soulevez, puis expirez en haut. Une bonne respiration ajoute 10-15% à vos lifts.",
    ar: "استخدم مناورة فالسالفا على الرفعات الثقيلة: استنشق بعمق، شد عضلات البطن، ارفع، ثم أخرج الهواء. التنفس الصحيح يضيف 10-15% لرفعاتك.",
  },
  "workouts.tip10Title": { en: "Training Frequency", fr: "Fréquence d'Entraînement", ar: "تكرار التدريب" },
  "workouts.tip10Desc": {
    en: "Research shows training each muscle 2x/week is optimal for hypertrophy. PPL or Upper/Lower splits achieve this naturally. More isn't always better.",
    fr: "La recherche montre que travailler chaque muscle 2x/semaine est optimal pour l'hypertrophie. Les splits PPL ou Upper/Lower y parviennent naturellement.",
    ar: "تظهر الأبحاث أن تدريب كل عضلة مرتين أسبوعياً مثالي للتضخيم. تقسيمات PPL أو علوي/سفلي تحقق ذلك طبيعياً. الأكثر ليس دائماً أفضل.",
  },

  // CTA
  "workouts.ctaTitle": { en: "READY TO START?", fr: "PRÊT À COMMENCER ?", ar: "مستعد للبدء؟" },
  "workouts.ctaDesc": {
    en: "Pair your training program with the right supplements for maximum results. Browse our collection of science-backed products.",
    fr: "Associez votre programme d'entraînement aux bons suppléments pour des résultats maximaux. Découvrez notre collection de produits scientifiques.",
    ar: "اقرن برنامجك التدريبي بالمكملات المناسبة لأقصى النتائج. تصفح مجموعتنا من المنتجات المدعومة علمياً.",
  },
  "workouts.shopSupplements": { en: "Shop Supplements", fr: "Voir les Suppléments", ar: "تسوق المكملات" },
  "workouts.useTools": { en: "Use Fitness Tools", fr: "Utiliser les Outils", ar: "استخدم الأدوات" },

  // SEO
  "workouts.seoTitle": {
    en: "Workout Programs & Exercise Library | Muscle Factory®",
    fr: "Programmes d'Entraînement & Bibliothèque d'Exercices | Muscle Factory®",
    ar: "برامج التمارين ومكتبة التمارين | Muscle Factory®",
  },
  "workouts.seoDesc": {
    en: "Free workout programs for muscle building, fat loss, and strength. Complete exercise library with proper form guides. PPL, Full Body, HIIT and more.",
    fr: "Programmes d'entraînement gratuits pour la prise de masse, la perte de graisse et la force. Bibliothèque d'exercices complète avec guides de forme.",
    ar: "برامج تدريب مجانية لبناء العضلات وحرق الدهون والقوة. مكتبة تمارين كاملة مع أدلة الأداء الصحيح.",
  },

  // New programs
  "program.calisthenics.name": { en: "Calisthenics Mastery", fr: "Maîtrise Calisthénie", ar: "إتقان الكاليسثنكس" },
  "program.calisthenics.desc": {
    en: "Build serious strength and aesthetic muscle using only your bodyweight. Progress from push-ups to planches, pull-ups to muscle-ups in 12 weeks.",
    fr: "Construisez force et muscles esthétiques avec seulement votre poids du corps. Progressez des pompes aux planches, tractions aux muscle-ups en 12 semaines.",
    ar: "ابنِ قوة جدية وعضلات جمالية بوزن جسمك فقط. تدرّج من الضغط إلى البلانش ومن العقلة إلى ماسل-أب في 12 أسبوع.",
  },
  "program.athleanx.name": { en: "Athletic Performance", fr: "Performance Athlétique", ar: "الأداء الرياضي" },
  "program.athleanx.desc": {
    en: "Train like an athlete: explosive power, speed, agility and functional strength. Combines plyometrics, Olympic lifts and conditioning circuits.",
    fr: "Entraînez-vous comme un athlète : puissance explosive, vitesse, agilité et force fonctionnelle. Pliométrie, haltérophilie et circuits de conditionnement.",
    ar: "تدرب كرياضي محترف: قوة متفجرة، سرعة، رشاقة وقوة وظيفية. يجمع البليومتريك ورفع الأثقال الأولمبي ودوائر التكييف.",
  },
  "program.crossfit.name": { en: "CrossFit WOD", fr: "CrossFit WOD", ar: "كروس فيت WOD" },
  "program.crossfit.desc": {
    en: "High-intensity functional fitness blending weightlifting, gymnastics and metcons. New 'Workout of the Day' every session for constant variation.",
    fr: "Fitness fonctionnel haute intensité mêlant haltérophilie, gymnastique et metcons. Un nouveau 'Workout du Jour' à chaque séance pour une variation constante.",
    ar: "لياقة وظيفية عالية الشدة تمزج رفع الأثقال والجمباز وتمارين الميتكون. تمرين يوم جديد كل جلسة لتنوع مستمر.",
  },
  "program.mobility.name": { en: "Daily Mobility Flow", fr: "Mobilité Quotidienne", ar: "تدفق الحركة اليومي" },
  "program.mobility.desc": {
    en: "15 minutes a day to unlock hip, shoulder and spine mobility. Perfect for desk workers and lifters battling stiffness from heavy training.",
    fr: "15 minutes par jour pour débloquer mobilité des hanches, épaules et colonne vertébrale. Parfait pour les sédentaires et les pratiquants luttant contre la raideur.",
    ar: "15 دقيقة يومياً لفك مرونة الورك والكتف والعمود الفقري. مثالي للعاملين على المكاتب ولرافعي الأثقال الذين يعانون من التيبس.",
  },
  "program.mma.name": { en: "MMA & Boxing Conditioning", fr: "Conditionnement MMA & Boxe", ar: "تكييف MMA والملاكمة" },
  "program.mma.desc": {
    en: "Fighter-style 5-day program — heavy bag work, sparring, plyometrics, and strength. Build punching power, endurance, and a fighter's physique.",
    fr: "Programme 5 jours style combattant — sac lourd, sparring, pliométrie et force. Développez la puissance de frappe, l'endurance et un physique de combattant.",
    ar: "برنامج 5 أيام بأسلوب المقاتل — كيس ثقيل وسبارينغ وبليومتري وقوة. ابنِ قوة اللكم والتحمل وجسد المقاتل.",
  },
  "program.classic.name": { en: "Classic Bodybuilding (Golden Era)", fr: "Bodybuilding Classique (Golden Era)", ar: "كمال أجسام كلاسيكي" },
  "program.classic.desc": {
    en: "Train like Arnold and Frank Zane — 5-day split with high volume, mind-muscle connection, and aesthetic focus. Tapered waist, full chest, V-taper back.",
    fr: "Entraînez-vous comme Arnold et Frank Zane — split 5 jours, volume élevé, connexion esprit-muscle et focus esthétique. Taille fine, pectoraux complets, dos en V.",
    ar: "تدرب كأرنولد وفرانك زين — تقسيم 5 أيام بحجم عالٍ والتواصل العقلي العضلي والتركيز الجمالي. خصر نحيف وصدر كامل وظهر V.",
  },
  "program.ramadan.name": { en: "Ramadan Training Plan", fr: "Programme Spécial Ramadan", ar: "برنامج خاص برمضان" },
  "program.ramadan.desc": {
    en: "Maintain muscle and strength during Ramadan. 4-day low-volume split timed around Iftar, hydration protocol Iftar to Sohour, and macronutrient split for fasting athletes.",
    fr: "Maintenez muscle et force pendant le Ramadan. Split 4 jours faible volume autour de l'Iftar, protocole d'hydratation Iftar à Sohour et répartition macros pour athlètes en jeûne.",
    ar: "حافظ على عضلاتك وقوتك خلال رمضان. تقسيم 4 أيام منخفض الحجم حول الإفطار، بروتوكول ترطيب من الإفطار إلى السحور وتوزيع المغذيات للصائمين.",
  },
  "program.women.name": { en: "Women's Strength & Glutes", fr: "Force & Glutes Femme", ar: "قوة المرأة والمؤخرة" },
  "program.women.desc": {
    en: "4-day program designed for women — hip thrust, glute bridge, RDL, plus upper body strength. Build curves, boost confidence, no fear of weights.",
    fr: "Programme 4 jours conçu pour les femmes — hip thrust, glute bridge, RDL plus force du haut du corps. Sculptez vos courbes, gagnez en confiance, sans peur des poids.",
    ar: "برنامج 4 أيام مصمم للمرأة — هيب ثرست وجلوت بريدج وRDL مع قوة الجزء العلوي. انحت منحنياتك، واكتسبي الثقة دون خوف من الأوزان.",
  },
};
