import { CurricularQuestion, AnimalPatient, SanctuaryToy, LevelInfo } from '../types/game';

export const PATIENTS: AnimalPatient[] = [
  {
    id: 'toby',
    name: 'Toby',
    species: 'Perrito Golden',
    gender: 'el',
    symptomTitle: 'Patita herida y raspón',
    symptomDescription: 'Toby estaba jugando en el parque y se hizo un raspón en la patita delantera. ¡Necesita una tirita mágica y mimos!',
    favoriteFood: 'Galletitas de hueso crujiente',
    foodIcon: '🦴',
    funFact: '¿Sabías que la nariz de cada perro es única en el mundo, como la huella de nuestro dedo?',
    avatarColor: '#F59E0B',
    levelRequirement: 1,
    initialHealth: 15,
  },
  {
    id: 'misi',
    name: 'Misi',
    species: 'Gatita Naranjita',
    gender: 'la',
    symptomTitle: 'Resfriado y estornudos',
    symptomDescription: 'Misi tiene fiebre suave, estornuda y tiene frío. Necesitamos jarabe de fresa y una bufandita caliente.',
    favoriteFood: 'Pescadito fresco',
    foodIcon: '🐟',
    funFact: '¿Sabías que los gatos duermen entre 12 y 16 horas al día para recargar toda su energía?',
    avatarColor: '#FB923C',
    levelRequirement: 2,
    initialHealth: 15,
  },
  {
    id: 'tambor',
    name: 'Tambor',
    species: 'Conejito Blanco',
    gender: 'el',
    symptomTitle: 'Dolor de tripa y mareo',
    symptomDescription: 'Tambor comió hojas húmedas que le cayeron pesadas. Necesita una infusión de manzanilla y masajito suave.',
    favoriteFood: 'Zanahorias crujientes',
    foodIcon: '🥕',
    funFact: '¿Sabías que los dientes de los conejos nunca dejan de crecer? ¡Por eso les encanta roer heno sano!',
    avatarColor: '#60A5FA',
    levelRequirement: 3,
    initialHealth: 15,
  },
  {
    id: 'pipo',
    name: 'Pipo',
    species: 'Erizo del Bosque',
    gender: 'el',
    symptomTitle: 'Púas enredadas con ramitas',
    symptomDescription: 'Pipo rodó por una zarza y tiene ramitas y hojas secas atrapadas en sus púas. ¡Necesita un cepillado suave!',
    favoriteFood: 'Manzanas dulces',
    foodIcon: '🍎',
    funFact: '¿Sabías que los erizos tienen cerca de 5.000 púas para protegerse cuando se hacen una bolita?',
    avatarColor: '#A78BFA',
    levelRequirement: 4,
    initialHealth: 15,
  }
];

export const INITIAL_LEVELS: LevelInfo[] = [
  {
    id: 1,
    title: 'Nivel 1: Consulta Central',
    subtitle: 'El perrito Toby necesita cura en su patita',
    patientId: 'toby',
    locationTheme: 'clinic',
    requiredStars: 0,
    unlocked: true,
    starsEarned: 0,
    bestScore: 0,
  },
  {
    id: 2,
    title: 'Nivel 2: Parque y Jardín',
    subtitle: 'La gatita Misi tiene un resfriado',
    patientId: 'misi',
    locationTheme: 'park',
    requiredStars: 2,
    unlocked: false,
    starsEarned: 0,
    bestScore: 0,
  },
  {
    id: 3,
    title: 'Nivel 3: La Granja Soleada',
    subtitle: 'El conejito Tambor tiene mareo y dolor de barriguita',
    patientId: 'tambor',
    locationTheme: 'farm',
    requiredStars: 5,
    unlocked: false,
    starsEarned: 0,
    bestScore: 0,
  },
  {
    id: 4,
    title: 'Nivel 4: Bosque de los Animales',
    subtitle: 'El erizo Pipo necesita desenredar sus púas',
    patientId: 'pipo',
    locationTheme: 'forest',
    requiredStars: 8,
    unlocked: false,
    starsEarned: 0,
    bestScore: 0,
  }
];

export const SANCTUARY_TOYS: SanctuaryToy[] = [
  {
    id: 'toy_ball',
    name: 'Pelota Saltarina',
    icon: '🎾',
    price: 30,
    description: 'Bota muy alto y hace felices a los perritos.',
    bought: false,
  },
  {
    id: 'toy_scratch',
    name: 'Rascador con Pompón',
    icon: '🪵',
    price: 50,
    description: 'El juego favorito de Misi para afilarse las uñitas.',
    bought: false,
  },
  {
    id: 'toy_bed',
    name: 'Camita Mullida',
    icon: '🛏️',
    price: 75,
    description: 'Suave como una nube para descansar tras la cura.',
    bought: false,
  },
  {
    id: 'toy_fountain',
    name: 'Fuente de Agua Fresca',
    icon: '⛲',
    price: 100,
    description: 'Agua limpia y burbujeante para todos los animales.',
    bought: false,
  },
  {
    id: 'toy_tunnel',
    name: 'Túnel de Juegos',
    icon: '🎪',
    price: 120,
    description: 'Un laberinto blandito para correr y esconderse.',
    bought: false,
  }
];

export const CURRICULAR_QUESTIONS: CurricularQuestion[] = [
  // ==========================================
  // LENGUA CASTELLANA - 2º PRIMARIA
  // ==========================================
  {
    id: 'lengua_silabas_1',
    subject: 'lengua',
    competence: 'Separación Silábica con Ritmo',
    level: 1,
    title: '¡Palmadas del Veterinario!',
    prompt: '¿Cuántas sílabas tiene la palabra "PE-RRI-TO"? Da una palmada por cada trocito.',
    explanation: 'La palabra pe-rri-to tiene 3 trocitos de voz (sílabas): pe - rri - to. ¡Son 3 palmadas!',
    hint: 'Di la palabra despacio: Pe... rri... to. Cuenta cuántas veces abres la boca.',
    type: 'syllable_claps',
    visualData: {
      word: 'PERRITO',
      syllables: ['PE', 'RRI', 'TO']
    },
    options: [
      { id: '1', label: '1 sílaba', isCorrect: false },
      { id: '2', label: '2 sílabas', isCorrect: false },
      { id: '3', label: '3 sílabas (Pe-rri-to)', isCorrect: true },
      { id: '4', label: '4 sílabas', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Esponja de burbujas',
      toolIcon: '🧽',
      actionDesc: 'Limpia suavemente la herida con agua templada'
    }
  },
  {
    id: 'lengua_silabas_2',
    subject: 'lengua',
    competence: 'Separación Silábica',
    level: 2,
    title: 'Las Sílabas de Misi',
    prompt: '¿Cómo se separa en sílabas la palabra "GA-TI-TO"?',
    explanation: 'Ga - ti - to tiene 3 sílabas bien separadas.',
    hint: 'Pronuncia cada golpe de voz: Ga... ti... to.',
    type: 'multiple_choice',
    options: [
      { id: 'opt_1', label: 'Gat - ito', isCorrect: false },
      { id: 'opt_2', label: 'Ga - ti - to', isCorrect: true },
      { id: 'opt_3', label: 'Gatito (todo junto)', isCorrect: false },
      { id: 'opt_4', label: 'G - a - t - i - t - o', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Termómetro digital',
      toolIcon: '🌡️',
      actionDesc: 'Mide la temperatura de Misi con cuidado'
    }
  },
  {
    id: 'lengua_clasif_1',
    subject: 'lengua',
    competence: 'Clasificación por Sílabas',
    level: 1,
    title: 'Palabras Monosílabas',
    prompt: '¿Cuál de estas palabras tiene UNA SOLA sílaba (Monosílaba)?',
    explanation: 'La palabra "SOL" y "PEZ" se dicen de un solo golpe de voz: ¡son monosílabas!',
    hint: 'Da una sola palmada y fíjate cuál encaja sin partirse.',
    type: 'multiple_choice',
    options: [
      { id: 'c1', label: 'Gato (Ga-to)', isCorrect: false },
      { id: 'c2', label: 'Pez', isCorrect: true },
      { id: 'c3', label: 'Conejo (Co-ne-jo)', isCorrect: false },
      { id: 'c4', label: 'Veterinaria', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Gotero calmante',
      toolIcon: '💧',
      actionDesc: 'Aplica unas gotitas calmantes en la zona'
    }
  },
  {
    id: 'lengua_clasif_2',
    subject: 'lengua',
    competence: 'Clasificación por Sílabas',
    level: 3,
    title: 'Palabras Polisílabas (Más de 3)',
    prompt: '¿Cuál de estas palabras es POLISÍLABA (tiene 4 o más sílabas)?',
    explanation: 'VE - TE - RI - NA - RIA tiene 5 sílabas, ¡es una palabra polisílaba y preciosa!',
    hint: 'Busca la palabra más larga que tenga 4 trocitos o más.',
    type: 'multiple_choice',
    options: [
      { id: 'p1', label: 'Pan (1 sílaba)', isCorrect: false },
      { id: 'p2', label: 'Casa (2 sílabas)', isCorrect: false },
      { id: 'p3', label: 'Tortuga (3 sílabas)', isCorrect: false },
      { id: 'p4', label: 'Veterinaria (Ve-te-ri-na-ria)', isCorrect: true }
    ],
    treatmentStep: {
      toolName: 'Jarabe de hierbas',
      toolIcon: '🍵',
      actionDesc: 'Prepara una rica infusión de manzanilla'
    }
  },
  {
    id: 'lengua_sinonimos_1',
    subject: 'lengua',
    competence: 'Sinónimos (Significado Igual)',
    level: 1,
    title: 'Palabras Gemelas (Sinónimos)',
    prompt: 'El perrito está "ALEGRE". ¿Qué palabra significa lo mismo (sinónimo)?',
    explanation: 'Alegre y Contento son sinónimos: expresan la misma alegría.',
    hint: 'Si estás alegre, ¿cómo te sientes también?',
    type: 'multiple_choice',
    options: [
      { id: 's1', label: 'Triste', isCorrect: false },
      { id: 's2', label: 'Contento', isCorrect: true },
      { id: 's3', label: 'Dormido', isCorrect: false },
      { id: 's4', label: 'Enfadado', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Tirita con dibujos',
      toolIcon: '🩹',
      actionDesc: 'Coloca una tirita mágica protectora'
    }
  },
  {
    id: 'lengua_sinonimos_2',
    subject: 'lengua',
    competence: 'Sinónimos',
    level: 2,
    title: 'Sinónimo de Curar',
    prompt: 'Julia va a "CURAR" al gatito. ¿Qué palabra tiene el mismo significado?',
    explanation: 'Curar y Sanar son palabras sinónimas: las dos significan devolver la salud.',
    hint: 'Cuando un médico te cura, te ayuda a...',
    type: 'multiple_choice',
    options: [
      { id: 's2_1', label: 'Sanar', isCorrect: true },
      { id: 's2_2', label: 'Romper', isCorrect: false },
      { id: 's2_3', label: 'Gritar', isCorrect: false },
      { id: 's2_4', label: 'Correr', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Jarabe de fresa',
      toolIcon: '🍓',
      actionDesc: 'Administra una cucharadita de jarabe rico'
    }
  },
  {
    id: 'lengua_mayusculas_1',
    subject: 'lengua',
    competence: 'Uso de las Mayúsculas',
    level: 1,
    title: '¿Dónde va la Mayúscula?',
    prompt: 'Los nombres propios de personas y mascotas siempre se escriben con mayúscula. ¿Cuál está bien escrito?',
    explanation: 'Los nombres propios (Julia, Toby, Carlos) siempre empiezan con letra MAYÚSCULA.',
    hint: 'Fíjate en la primera letra: debe ser grande y alta.',
    type: 'multiple_choice',
    options: [
      { id: 'm1', label: 'toby el perro', isCorrect: false },
      { id: 'm2', label: 'Toby el perro', isCorrect: true },
      { id: 'm3', label: 'toBy el perro', isCorrect: false },
      { id: 'm4', label: 'TOBY EL PERRO (todo)', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Pomada de caléndula',
      toolIcon: '🧴',
      actionDesc: 'Aplica una suave pomada que alivia el dolor'
    }
  },
  {
    id: 'lengua_abecedario_1',
    subject: 'lengua',
    competence: 'El Abecedario',
    level: 2,
    title: 'Letras en Orden Alfabético',
    prompt: '¿Qué letra falta en esta serie del abecedario?:  A  -  B  -  ___  -  D',
    explanation: 'En el abecedario español va: A, B, C, D.',
    hint: 'Canta la cancioncita: A, B, ...',
    type: 'multiple_choice',
    options: [
      { id: 'abc_1', label: 'Letra F', isCorrect: false },
      { id: 'abc_2', label: 'Letra C', isCorrect: true },
      { id: 'abc_3', label: 'Letra M', isCorrect: false },
      { id: 'abc_4', label: 'Letra Z', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Manta calentita',
      toolIcon: '🧣',
      actionDesc: 'Envuelve a Misi con una bufanda acogedora'
    }
  },

  // ==========================================
  // MATEMÁTICAS - 2º PRIMARIA
  // ==========================================
  {
    id: 'mates_suma_1',
    subject: 'mates',
    competence: 'Sumas de Dos Cifras',
    level: 1,
    title: 'Contando Vendas Curativas',
    prompt: 'Julia tiene 12 vendas en un bote y 15 vendas en otro. ¿Cuántas vendas tiene en total? (12 + 15)',
    explanation: 'Sumamos las unidades: 2 + 5 = 7. Sumamos las decenas: 1 + 1 = 2. ¡El resultado es 27!',
    hint: '10 + 10 = 20. Luego suma 2 + 5 = 7. 20 + 7 = 27.',
    type: 'math_blocks',
    visualData: {
      tens: 2,
      units: 7
    },
    options: [
      { id: 'sum_1', label: '25 vendas', isCorrect: false },
      { id: 'sum_2', label: '27 vendas', isCorrect: true },
      { id: 'sum_3', label: '30 vendas', isCorrect: false },
      { id: 'sum_4', label: '17 vendas', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Venda elástica suave',
      toolIcon: '🩹',
      actionDesc: 'Venda con cariño la patita para protegerla'
    }
  },
  {
    id: 'mates_resta_1',
    subject: 'mates',
    competence: 'Restas sin Llevadas',
    level: 2,
    title: 'Galletas para Pacientes',
    prompt: 'Había 28 galletas para perritos y dimos 14 a los pacientes de la mañana. ¿Cuántas galletas quedan? (28 - 14)',
    explanation: 'A 8 unidades le quitamos 4 = 4. A 2 decenas le quitamos 1 = 1. Quedan 14 galletitas.',
    hint: 'Resta primero las unidades (8 - 4 = 4) y luego las decenas (2 - 1 = 1).',
    type: 'multiple_choice',
    options: [
      { id: 'res_1', label: '10 galletas', isCorrect: false },
      { id: 'res_2', label: '14 galletas', isCorrect: true },
      { id: 'res_3', label: '16 galletas', isCorrect: false },
      { id: 'res_4', label: '24 galletas', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Premio saludable',
      toolIcon: '🍪',
      actionDesc: 'Ofrece una galletita con vitaminas'
    }
  },
  {
    id: 'mates_problema_1',
    subject: 'mates',
    competence: 'Problemas Contextualizados',
    level: 1,
    title: 'Llegada de Pacientes',
    prompt: 'En la sala de espera hay 8 gatitos y llegan 6 conejitos más. ¿Cuántos animales hay esperando en total?',
    explanation: '8 + 6 = 14 animales en total esperando su turno.',
    hint: 'Guarda 8 en tu cabeza y cuenta 6 deditos más: 9, 10, 11, 12, 13, 14.',
    type: 'multiple_choice',
    options: [
      { id: 'p_1', label: '12 animales', isCorrect: false },
      { id: 'p_2', label: '13 animales', isCorrect: false },
      { id: 'p_3', label: '14 animales', isCorrect: true },
      { id: 'p_4', label: '16 animales', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Estetoscopio infantil',
      toolIcon: '🩺',
      actionDesc: 'Escucha el corazón feliz del animalito'
    }
  },
  {
    id: 'mates_parejas_10',
    subject: 'mates',
    competence: 'Cálculo Mental (Parejas del 10)',
    level: 1,
    title: 'Los Amigos del 10',
    prompt: 'Toby tiene 7 puntos de energía. ¿Cuántos le faltan para llegar a 10? (7 + ? = 10)',
    explanation: '¡El 7 y el 3 son amigos del 10! 7 + 3 = 10.',
    hint: 'Cuenta cuántos dedos te faltan para completar las dos manos enteras.',
    type: 'pairs_of_ten',
    visualData: {
      targetSum: 10
    },
    options: [
      { id: 'p10_1', label: 'Faltan 2', isCorrect: false },
      { id: 'p10_2', label: 'Faltan 3', isCorrect: true },
      { id: 'p10_3', label: 'Faltan 4', isCorrect: false },
      { id: 'p10_4', label: 'Faltan 5', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Luz sanadora',
      toolIcon: '✨',
      actionDesc: 'Activa la luz sanadora de recuperación rápida'
    }
  },
  {
    id: 'mates_serie_1',
    subject: 'mates',
    competence: 'Series Numéricas (+2 y +10)',
    level: 2,
    title: 'Saltos de Conejo (+2)',
    prompt: 'Tambor salta de 2 en 2:  2  -  4  -  6  -  8  -  ___ . ¿Qué número toca ahora?',
    explanation: 'Si sumamos 2 al número 8: 8 + 2 = 10. ¡Excelente salto!',
    hint: 'Añade 2 al último número: 8 + 2.',
    type: 'multiple_choice',
    options: [
      { id: 's2_1', label: '9', isCorrect: false },
      { id: 's2_2', label: '10', isCorrect: true },
      { id: 's2_3', label: '11', isCorrect: false },
      { id: 's2_4', label: '12', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Masaje de barriguita',
      toolIcon: '💆',
      actionDesc: 'Da un suave masaje en círculo para aliviar los gases'
    }
  },
  {
    id: 'mates_multiplica_1',
    subject: 'mates',
    competence: 'Iniciación a la Multiplicación',
    level: 3,
    title: 'La Tabla del 2 (Parejas)',
    prompt: 'Hay 4 conejitos en la granja y cada uno come 2 zanahorias. ¿Cuántas zanahorias comen en total? (4 veces 2 = 4 x 2)',
    explanation: '2 + 2 + 2 + 2 = 8 zanahorias. ¡4 veces 2 es igual a 8!',
    hint: 'Suma 2 cuatro veces: 2, 4, 6, 8.',
    type: 'multiple_choice',
    visualData: {
      multiplicationGroup: { count: 4, itemsPerGroup: 2, itemIcon: '🥕' }
    },
    options: [
      { id: 'mul_1', label: '6 zanahorias', isCorrect: false },
      { id: 'mul_2', label: '8 zanahorias', isCorrect: true },
      { id: 'mul_3', label: '10 zanahorias', isCorrect: false },
      { id: 'mul_4', label: '4 zanahorias', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Biberón con electrolitos',
      toolIcon: '🍼',
      actionDesc: 'Da de beber un suero dulce hidratante'
    }
  },
  {
    id: 'mates_multiplica_2',
    subject: 'mates',
    competence: 'Iniciación a la Multiplicación (Tabla del 10)',
    level: 3,
    title: 'La Tabla del 10 (Paquetes)',
    prompt: 'Tenemos 3 paquetes de tiritas. Cada paquete tiene 10 tiritas. ¿Cuántas tiritas hay en total? (3 x 10)',
    explanation: '3 veces 10: 10 + 10 + 10 = 30 tiritas.',
    hint: 'Contamos de diez en diez: 10, 20, 30.',
    type: 'multiple_choice',
    options: [
      { id: 'mul10_1', label: '13 tiritas', isCorrect: false },
      { id: 'mul10_2', label: '20 tiritas', isCorrect: false },
      { id: 'mul10_3', label: '30 tiritas', isCorrect: true },
      { id: 'mul10_4', label: '40 tiritas', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Cura con purpurina',
      toolIcon: '✨',
      actionDesc: 'Aplica una cura especial que brilla'
    }
  },

  // ==========================================
  // INGLÉS - CLASSROOM & VET OBJECTS
  // ==========================================
  {
    id: 'ingles_pencil',
    subject: 'ingles',
    competence: 'Classroom Objects Vocabulary',
    level: 1,
    title: 'The Vet’s Backpack: PENCIL',
    prompt: 'Julia needs a "PENCIL" to write the patient medical note. ¿Cuál es el objeto?',
    explanation: '"Pencil" significa lápiz en inglés. ¡Lo usamos para escribir las recetas!',
    hint: 'Sirve para escribir o dibujar en un papel.',
    type: 'object_select',
    visualData: {
      englishWord: 'pencil',
      spanishTranslation: 'lápiz'
    },
    options: [
      { id: 'pen_1', label: 'Pencil (Lápiz)', icon: '✏️', isCorrect: true },
      { id: 'pen_2', label: 'Ruler (Regla)', icon: '📏', isCorrect: false },
      { id: 'pen_3', label: 'Book (Libro)', icon: '📖', isCorrect: false },
      { id: 'pen_4', label: 'Backpack (Mochila)', icon: '🎒', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Ficha médica sellada',
      toolIcon: '📋',
      actionDesc: 'Anota en la libreta que el paciente evoluciona genial'
    }
  },
  {
    id: 'ingles_scissors',
    subject: 'ingles',
    competence: 'Classroom Objects Vocabulary',
    level: 1,
    title: 'The Vet’s Backpack: SCISSORS',
    prompt: 'We need "SCISSORS" to cut the clean gauze bandage. ¿Qué objeto es?',
    explanation: '"Scissors" son las tijeras de punta redonda seguras.',
    hint: 'Tienen dos hojas y sirven para cortar vendas o papel.',
    type: 'object_select',
    visualData: {
      englishWord: 'scissors',
      spanishTranslation: 'tijeras'
    },
    options: [
      { id: 'sci_1', label: 'Eraser (Goma)', icon: '🧼', isCorrect: false },
      { id: 'sci_2', label: 'Scissors (Tijeras)', icon: '✂️', isCorrect: true },
      { id: 'sci_3', label: 'Desk (Mesa)', icon: '🪑', isCorrect: false },
      { id: 'sci_4', label: 'Sharpener (Sacapuntas)', icon: '🗜️', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Tijeras de cura suave',
      toolIcon: '✂️',
      actionDesc: 'Corta la gasa con cuidado a la medida perfecta'
    }
  },
  {
    id: 'ingles_eraser',
    subject: 'ingles',
    competence: 'Classroom Objects Vocabulary',
    level: 2,
    title: 'The Vet’s Backpack: ERASER / RUBBER',
    prompt: 'Julia cometió un borrón en la ficha. Needs an "ERASER". ¿Qué objeto es?',
    explanation: '"Eraser" o "Rubber" es la goma de borrar.',
    hint: 'Borra cuando nos equivocamos al escribir con lápiz.',
    type: 'object_select',
    visualData: {
      englishWord: 'eraser',
      spanishTranslation: 'goma de borrar'
    },
    options: [
      { id: 'era_1', label: 'Eraser (Goma de borrar)', icon: '🧽', isCorrect: true },
      { id: 'era_2', label: 'Notebook (Cuaderno)', icon: '📓', isCorrect: false },
      { id: 'era_3', label: 'Chair (Silla)', icon: '🪑', isCorrect: false },
      { id: 'era_4', label: 'Pencil (Lápiz)', icon: '✏️', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Spray antiséptico',
      toolIcon: '🧴',
      actionDesc: 'Limpia suavemente el aire de la consulta'
    }
  },
  {
    id: 'ingles_book',
    subject: 'ingles',
    competence: 'Classroom Objects Vocabulary',
    level: 2,
    title: 'The Vet’s Guide: BOOK',
    prompt: 'Julia opens the veterinary "BOOK" to check how to cure colds. ¿Qué objeto es?',
    explanation: '"Book" es un libro con bonitas ilustraciones y sabiduría.',
    hint: 'Tiene páginas llenas de dibujos e historias para leer.',
    type: 'object_select',
    visualData: {
      englishWord: 'book',
      spanishTranslation: 'libro'
    },
    options: [
      { id: 'b_1', label: 'Ruler (Regla)', icon: '📏', isCorrect: false },
      { id: 'b_2', label: 'Book (Libro)', icon: '📖', isCorrect: true },
      { id: 'b_3', label: 'Sharpener (Sacapuntas)', icon: '🗜️', isCorrect: false },
      { id: 'b_4', label: 'Desk (Mesa)', icon: '🛋️', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Guía de cuidados',
      toolIcon: '📖',
      actionDesc: 'Consulta el remedio natural en el gran libro'
    }
  },
  {
    id: 'ingles_backpack',
    subject: 'ingles',
    competence: 'Classroom Objects Vocabulary',
    level: 3,
    title: 'Ready for Farm Visit: BACKPACK',
    prompt: 'Time to visit the farm! Julia puts all tools in her "BACKPACK". ¿Qué objeto es?',
    explanation: '"Backpack" o "Bag" es la mochila para llevar a la espalda.',
    hint: 'La llevas al cole con tus libros y estuche.',
    type: 'object_select',
    visualData: {
      englishWord: 'backpack',
      spanishTranslation: 'mochila'
    },
    options: [
      { id: 'bp_1', label: 'Chair (Silla)', icon: '🪑', isCorrect: false },
      { id: 'bp_2', label: 'Desk (Mesa)', icon: '🪵', isCorrect: false },
      { id: 'bp_3', label: 'Backpack (Mochila)', icon: '🎒', isCorrect: true },
      { id: 'bp_4', label: 'Ruler (Regla)', icon: '📏', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Botiquín de campo',
      toolIcon: '🎒',
      actionDesc: 'Prepara el botiquín de emergencia para la granja'
    }
  },
  {
    id: 'ingles_ruler',
    subject: 'ingles',
    competence: 'Classroom Objects Vocabulary',
    level: 4,
    title: 'Forest Measurement: RULER',
    prompt: 'To measure how long Pipo’s tiny quills are, we use a "RULER". ¿Qué objeto es?',
    explanation: '"Ruler" es la regla que tiene números y centímetros.',
    hint: 'Es recta y tiene números para medir cosas.',
    type: 'object_select',
    visualData: {
      englishWord: 'ruler',
      spanishTranslation: 'regla'
    },
    options: [
      { id: 'ru_1', label: 'Ruler (Regla)', icon: '📏', isCorrect: true },
      { id: 'ru_2', label: 'Pencil (Lápiz)', icon: '✏️', isCorrect: false },
      { id: 'ru_3', label: 'Notebook (Cuaderno)', icon: '📓', isCorrect: false },
      { id: 'ru_4', label: 'Sharpener (Sacapuntas)', icon: '🗜️', isCorrect: false }
    ],
    treatmentStep: {
      toolName: 'Peine especial para púas',
      toolIcon: '🪮',
      actionDesc: 'Desenreda suavemente las ramitas secas'
    }
  }
];

export const DEFAULT_AVATAR = {
  name: 'Julia',
  hairStyle: 'pigtails' as const,
  hairColor: '#8D5B4C', // warm brown
  skinTone: '#FCD5B5',
  coatColor: '#FFFFFF', // pristine white lab coat
  scrubsColor: '#34D399', // mint green veterinary scrubs
  accessory: 'stethoscope' as const,
  glasses: 'none' as const,
};
