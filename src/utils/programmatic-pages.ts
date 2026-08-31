/**
 * Programmatic SEO page data: service x locale/pain-point combinations.
 *
 * Each entry becomes a fully indexable landing page in BOTH languages with
 * unique titles, descriptions, FAQ schema, and localized proof points.
 * Slug pattern: /{lang}/services/{slug}/
 *
 * Keyword strategy: long-tail "service + qualifier" queries with clear intent
 * (e.g. "llc para extranjeros sin ssn") where big national competitors have
 * no Spanish content and local competitors have no depth.
 */

export interface ProgrammaticPage {
  slug: string;
  en: {
    title: string;        // < 60 chars
    description: string;  // 140-160 chars
    h1: string;
    intro: string[];      // 2-3 paragraph blocks
    bullets: string[];    // key deliverables
    faqs: { q: string; a: string }[];  // feeds FAQPage schema
    keyword: string;
  };
  es: {
    title: string;
    description: string;
    h1: string;
    intro: string[];
    bullets: string[];
    faqs: { q: string; a: string }[];
    keyword: string;
  };
  ogQuery: string; // Unsplash/Pexels search term for the cover
}

export const PROGRAMMATIC_PAGES: ProgrammaticPage[] = [
  {
    slug: 'llc-para-extranjeros-sin-ssn',
    keyword: 'llc para extranjeros sin ssn',
    ogQuery: 'immigrant entrepreneur office',
    es: {
      title: 'Abrir una LLC en EE.UU. Sin SSN — Guía para Extranjeros',
      description: 'Registre su LLC en Estados Unidos sin Seguro Social usando pasaporte o ITIN. Proceso legal paso a paso con asesores bilingües en Tennessee.',
      h1: 'Abrir una LLC en Estados Unidos sin Seguro Social (SSN)',
      intro: [
        'Sí, un extranjero no residente puede abrir una LLC legalmente en Estados Unidos sin tener Seguro Social. El IRS no exige SSN para constituir una empresa: se utiliza el Formulario SS-4 con un número ITIN o pasaporte vigente como identificación alternativa.',
        'El error más costoso es intentar el proceso solo: nombres rechazados, direcciones de agente registrado incorrectas y solicitudes EIN devueltos retrasan meses el lanzamiento del negocio. Con asesoría correcta, el registro completo toma entre 2 y 5 días hábiles.',
      ],
      bullets: [
        'Búsqueda y reserva del nombre comercial en la Secretaría de Estado',
        'Agente registrado con dirección física en el estado elegido',
        'Solicitud EIN ante el IRS sin SSN (Formulario SS-4 con pasaporte/ITIN)',
        'Acuerdo Operativo (Operating Agreement) redactado y firmado',
        'Guía para abrir cuenta bancaria comercial con pasaporte',
      ],
      faqs: [
        { q: '¿Puedo abrir una LLC en EE.UU. si vivo en otro país?', a: 'Sí. No existe requisito de residencia para ser propietario de una LLC. Solo necesita un agente registrado con dirección física en el estado de constitución, y puede gestionar todo de forma remota.' },
        { q: '¿Qué documento reemplaza al SSN para el EIN?', a: 'El IRS acepta el Formulario SS-4 con pasaporte extranjero o número ITIN. Los no residentes marcan "Foreign" en la sección de responsable y pueden obtener el EIN por fax o correo sin SSN.' },
        { q: '¿Cuánto cuesta registrar una LLC sin SSN?', a: 'La tarifa estatal varía (Tennessee: $300 anuales; Wyoming: $100; Delaware: $90) más el costo del agente registrado. La asesoría profesional evita rechazos que cuestan tiempo y pagos repetidos.' },
        { q: '¿Necesito viajar a Estados Unidos para abrir la LLC?', a: 'No. Todo el proceso de constitución y obtención del EIN es remoto. Algunos bancos exigen visita presencial para abrir la cuenta; otros aceptan verificación digital para no residentes.' },
      ],
    },
    en: {
      title: 'Start a US LLC Without an SSN — Foreign Owner Guide',
      description: 'Register your US LLC without a Social Security Number using a passport or ITIN. Legal step-by-step process from bilingual advisors in Tennessee.',
      h1: 'Start a US LLC Without a Social Security Number',
      intro: [
        'Yes — a non-resident foreigner can legally form a US LLC without a Social Security Number. The IRS does not require an SSN to form a company: Form SS-4 is filed using an ITIN or a valid passport as alternative identification.',
        'The most costly mistake is DIY-ing the process: rejected names, incorrect registered agent addresses, and returned EIN applications delay launches by months. With proper guidance, complete registration takes 2–5 business days.',
      ],
      bullets: [
        'Business name search and reservation with the Secretary of State',
        'Registered agent with a physical street address in your chosen state',
        'IRS EIN application without SSN (Form SS-4 with passport/ITIN)',
        'Operating Agreement drafted and signed',
        'Guide to opening a US business bank account on a foreign passport',
      ],
      faqs: [
        { q: 'Can I form a US LLC if I live abroad?', a: 'Yes. There is no residency requirement to own an LLC. You only need a registered agent with a physical address in the formation state, and the entire process can be managed remotely.' },
        { q: 'What replaces the SSN when applying for an EIN?', a: 'The IRS accepts Form SS-4 with a foreign passport or ITIN. Non-residents check "Foreign" in the responsible-party section and can obtain an EIN by fax or mail without an SSN.' },
        { q: 'How much does it cost to register an LLC without an SSN?', a: 'State fees vary (Tennessee: $300/year; Wyoming: $100; Delaware: $90) plus the registered agent cost. Professional guidance prevents rejections that waste time and duplicate payments.' },
        { q: 'Do I need to travel to the US to form the LLC?', a: 'No. Formation and EIN acquisition are fully remote. Some banks require an in-person visit to open the account; others accept digital verification for non-residents.' },
      ],
    },
  },
  {
    slug: 'eitc-itin-creditos-impuestos',
    keyword: 'itin numero de identificacion personal',
    ogQuery: 'tax documents passport',
    es: {
      title: 'ITIN: Número de Identificación para Impuestos sin SSN',
      description: 'Obtenga su ITIN del IRS para declarar impuestos, abrir cuentas y solicitar créditos. Asesoría bilingüe paso a paso desde Knoxville, TN.',
      h1: 'ITIN: Su Número de Identificación Fiscal del IRS',
      intro: [
        'El ITIN (Número de Identificación Personal del Contribuyente) es emitido por el IRS a personas que deben declarar impuestos en EE.UU. pero no califican para un Seguro Social. Es la llave para cumplir con el fisco, abrir cuentas bancarias y acceder a créditos fiscales.',
        'Una solicitud rechazada por documentos incorrectos puede retrasar su declaración meses y costarle créditos reembolsables. Los Agentes Aceptantes Certificados (como nuestro equipo) validan su pasaporte sin enviarlo por correo.',
      ],
      bullets: [
        'Preparación del Formulario W-7 con documentación correcta',
        'Validación de pasaporte como Agente Aceptante Certificado (sin envío postal)',
        'Solicitud de ITIN junto con su declaración de impuestos',
        'Renovación de ITIN vencidos (serie 900 terminada en 88/89, etc.)',
        'Conexión del ITIN con su LLC y obligaciones fiscales del negocio',
      ],
      faqs: [
        { q: '¿Cuánto tarda el IRS en emitir un ITIN?', a: 'Normalmente 7 a 11 semanas durante temporada alta. Las solicitudes con errores de documentación pueden tardar 6 meses o ser rechazadas, por eso la validación previa es crítica.' },
        { q: '¿Puedo abrir una cuenta bancaria solo con ITIN?', a: 'Muchos bancos y cooperativas de crédito aceptan ITIN como identificación principal, especialmente en Tennessee. Con ITIN + EIN de su LLC puede operar financieramente de forma completa.' },
        { q: '¿El ITIN me permite trabajar legalmente?', a: 'No. El ITIN es exclusivamente fiscal — no autoriza empleo ni cambia su estatus migratorio. Sirve para cumplir obligaciones tributarias y acceder al sistema financiero.' },
        { q: 'Mi ITIN va a vencer, ¿qué hago?', a: 'Los ITIN con fecha de vencimiento deben renovarse con el Formulario W-7 actualizado. Presentar con un ITIN vencido retrasa reembolsos hasta que se complete la renovación.' },
      ],
    },
    en: {
      title: 'ITIN: Tax ID Number Without an SSN — Expert Help',
      description: 'Get your IRS ITIN to file taxes, open accounts, and claim credits. Step-by-step bilingual guidance from Knoxville, TN.',
      h1: 'ITIN: Your IRS Taxpayer Identification Number',
      intro: [
        'An ITIN (Individual Taxpayer Identification Number) is issued by the IRS to people who must file US taxes but do not qualify for a Social Security Number. It is the key to tax compliance, banking access, and refundable tax credits.',
        'A rejected application due to incorrect documents can delay your return by months and cost you refundable credits. Certified Acceptance Agents (like our team) verify your passport without mailing it away.',
      ],
      bullets: [
        'Form W-7 preparation with correct supporting documentation',
        'Passport validation as a Certified Acceptance Agent (no mailing)',
        'ITIN application filed together with your tax return',
        'Renewal of expired ITINs (900-series ending in 88/89, etc.)',
        'Connecting your ITIN to your LLC and business tax obligations',
      ],
      faqs: [
        { q: 'How long does the IRS take to issue an ITIN?', a: 'Typically 7–11 weeks in peak season. Applications with documentation errors can take 6 months or be rejected outright, which is why upfront validation is critical.' },
        { q: 'Can I open a bank account with just an ITIN?', a: 'Many banks and credit unions accept an ITIN as primary identification, especially in Tennessee. With an ITIN plus your LLC\'s EIN you can operate financially without an SSN.' },
        { q: 'Does an ITIN let me work legally?', a: 'No. The ITIN is strictly for tax purposes — it does not authorize employment or change immigration status. It exists for tax compliance and financial system access.' },
        { q: 'My ITIN is expiring — what should I do?', a: 'ITINs with expiration dates must be renewed with an updated Form W-7. Filing with an expired ITIN delays refunds until the renewal is processed.' },
      ],
    },
  },
  {
    slug: 'contabilidad-para-restaurantes',
    keyword: 'contabilidad para restaurantes',
    ogQuery: 'restaurant accounting receipts',
    es: {
      title: 'Contabilidad para Restaurantes — Point of Sale y Nómina',
      description: 'Sistemas contables para restaurantes hispanos: conciliación de propinas, costo de alimentos, nómina y cumplimiento fiscal. Knoxville y todo EE.UU.',
      h1: 'Contabilidad Especializada para Restaurantes',
      intro: [
        'La contabilidad de un restaurante no es la de una oficina: propinas, pagos en efectivo, proveedores perecederos y rotación de personal crean cifras que los contadores genéricos no saben clasificar. Un sistema mal montado convierte un negocio rentable en uno que "no sabe por qué no hay caja".',
        'Montamos su sistema completo: conciliación diaria del punto de venta, cálculo de costo de alimentos (food cost), manejo de propinas reportadas y nómina multi-rol — todo bilingüe y listo para su contador de impuestos.',
      ],
      bullets: [
        'Conciliación diaria de ventas Square/Toast/Clover contra depósitos',
        'Estructura de costo de alimentos y control de merma semanal',
        'Propinas reportadas: seguimiento para declaración correcta del personal',
        'Nómina multi-rol (cocina, servicio, administración) con clasificación correcta',
        'Reportes mensuales P&L adaptados a la industria de restaurantes',
      ],
      faqs: [
        { q: '¿Por qué mi restaurante tiene ventas pero no hay caja?', a: 'Casi siempre es costo de alimentos sin controlar, merma no medida o comisiones de procesamiento que nadie concilia. Un P&L por departamento revela dónde se fuga el dinero en 30 días.' },
        { q: '¿Cómo se manejan las propinas en la contabilidad?', a: 'Las propinas reportadas deben registrarse para nómina e impuestos del empleado, pero no son ingreso del restaurante. Un mal manejo genera multas del IRS por retención incorrecta.' },
        { q: '¿Qué POS es mejor para mi contabilidad?', a: 'Square, Toast y Clover exportan bien si se configuran correctamente. Lo crítico es la conciliación diaria automática, no la marca del sistema.' },
        { q: '¿Pueden llevar mi contabilidad si no estoy en Tennessee?', a: 'Sí — todo el servicio es remoto y bilingüe. Trabaja con fotos/documentos digitales de recibos y accesos de solo lectura a su POS y banco.' },
      ],
    },
    en: {
      title: 'Restaurant Accounting — POS, Payroll & Food Cost',
      description: 'Accounting systems for restaurants: tip reconciliation, food cost, payroll, and tax compliance. Knoxville and nationwide, bilingual team.',
      h1: 'Specialized Accounting for Restaurants',
      intro: [
        'Restaurant accounting is not office accounting: tips, cash payments, perishable suppliers, and staff turnover create numbers generic accountants misclassify. A poorly built system turns a profitable restaurant into one that "can\'t figure out where the cash went."',
        'We build your complete system: daily POS reconciliation, food cost tracking, reported-tip handling, and multi-role payroll — all bilingual and ready for your tax preparer.',
      ],
      bullets: [
        'Daily reconciliation of Square/Toast/Clover sales against deposits',
        'Food cost structure and weekly waste control',
        'Reported tips: tracking for correct staff tax reporting',
        'Multi-role payroll (kitchen, service, admin) with proper classification',
        'Monthly P&L reports tailored to the restaurant industry',
      ],
      faqs: [
        { q: 'Why does my restaurant have sales but no cash?', a: 'Almost always uncontrolled food cost, unmeasured waste, or processing fees nobody reconciles. A department-level P&L reveals the leak within 30 days.' },
        { q: 'How are tips handled in the books?', a: 'Reported tips must be tracked for employee payroll and taxes, but they are not restaurant income. Mishandling them triggers IRS payroll-tax penalties.' },
        { q: 'Which POS is best for my accounting?', a: 'Square, Toast, and Clover all export well when configured correctly. What matters is automated daily reconciliation, not the brand.' },
        { q: 'Can you handle my books if I\'m not in Tennessee?', a: 'Yes — the service is fully remote and bilingual. We work with digital receipt photos and read-only access to your POS and bank.' },
      ],
    },
  },
  {
    slug: 'licencia-comercial-knoxville',
    keyword: 'licencia comercial knoxville',
    ogQuery: 'business license paperwork',
    es: {
      title: 'Licencia Comercial en Knoxville y Condado de Knox — Trámites',
      description: 'Obtenga su licencia de negocios del Condado de Knox y la Ciudad de Knoxville: requisitos, costos y plazos. Guía bilingüe con trámite asistido.',
      h1: 'Licencia Comercial en Knoxville y el Condado de Knox',
      intro: [
        'Operar un negocio en Knoxville exige licencia de impuestos comerciales del Condado de Knox (estándar o de actividad mínima), registro en la Ciudad si opera dentro de los límites municipales, y en ciertos rubros permisos especiales de salud o contratista.',
        'Presentar tarde o en la categoría incorrecta genera multas y pagos retroactivos. Nuestro equipo tramita sus licencias directamente con la Oficina del Secretario del Condado y le deja operando legalmente.',
      ],
      bullets: [
        'Determinación de la licencia correcta: estándar vs. actividad mínima',
        'Registro ante el Condado de Knox (County Clerk) y la Ciudad de Knoxville',
        'Permisos especiales según rubro: alimentos, salud, contratista, hogar',
        'Calendario de renovaciones para no perder la licencia por olvido',
        'Registro de nombre comercial (DBA) y avisos legales',
      ],
      faqs: [
        { q: '¿Quién necesita licencia comercial en el Condado de Knox?', a: 'Todo negocio con actividad dentro del condado, incluidos hogares y servicios en línea con base local. Las ventas proyectadas definen si aplica la licencia estándar o la de actividad mínima.' },
        { q: '¿Cuánto cuesta la licencia de negocios en Knoxville?', a: 'La licencia de actividad mínima cuesta $15 al año; la estándar tiene una tarifa de $15 más impuestos comerciales sobre ventas brutas. Los rubros regulados (alimentos, cuidado infantil) tienen costos adicionales de permiso.' },
        { q: '¿Trabajo desde casa necesita licencia?', a: 'Sí — el negocio en casa (home-based business) necesita la misma licencia del condado, y en algunos casos una verificación de uso de suelo de la Ciudad si recibe clientes en casa.' },
        { q: '¿Qué pasa si opero sin licencia?', a: 'El condado cobra impuestos retroactivos, multas por presentación tardía y puede cerrar el negocio. Regularizarse con asesoría cuesta mucho menos que las sanciones acumuladas.' },
      ],
    },
    en: {
      title: 'Business License in Knoxville & Knox County — Requirements',
      description: 'Get your Knox County and City of Knoxville business license: requirements, costs, and deadlines. Bilingual guide with hands-on filing help.',
      h1: 'Business Licensing in Knoxville and Knox County',
      intro: [
        'Operating in Knoxville requires a Knox County business tax license (standard or minimal-activity), City of Knoxville registration if you operate inside city limits, and for certain industries, special health or contractor permits.',
        'Filing late or under the wrong category triggers penalties and retroactive payments. Our team files directly with the County Clerk\'s office and gets you operating legally.',
      ],
      bullets: [
        'Correct license determination: standard vs. minimal activity',
        'Knox County (County Clerk) and City of Knoxville registration',
        'Industry-specific permits: food, health, contractor, home-based',
        'Renewal calendar so you never lose a license to a missed deadline',
        'DBA (fictitious business name) registration and legal notices',
      ],
      faqs: [
        { q: 'Who needs a business license in Knox County?', a: 'Every business with activity in the county, including home-based and locally-based online services. Projected gross sales determine whether the standard or minimal-activity license applies.' },
        { q: 'How much does a Knoxville business license cost?', a: 'The minimal-activity license costs $15/year; the standard license has a $15 fee plus business tax on gross receipts. Regulated industries (food, childcare) carry additional permit costs.' },
        { q: 'Does a home-based business need a license?', a: 'Yes — a home-based business needs the same county license, and in some cases a City zoning verification if you receive clients at home.' },
        { q: 'What happens if I operate without a license?', a: 'The county assesses retroactive taxes, late-filing penalties, and can shut the business down. Getting compliant with guidance costs far less than accumulated sanctions.' },
      ],
    },
  },
  {
    slug: 'cuenta-bancaria-para-negocio',
    keyword: 'abrir cuenta bancaria para negocio',
    ogQuery: 'business banking documents',
    es: {
      title: 'Cómo Abrir una Cuenta Bancaria para su Negocio — Requisitos',
      description: 'Requisitos reales de los bancos para abrir cuenta comercial: EIN, documento de constitución y operación. Bilingüe, para residentes y no residentes.',
      h1: 'Abrir una Cuenta Bancaria Comercial: Guía Práctica',
      intro: [
        'Mezclar las finanzas personales con las del negocio es la causa número uno de problemas legales y fiscales para pequeños empresarios. La cuenta bancaria comercial es el primer muro que separa su patrimonio personal — y el banco la rechaza si sus documentos no están en orden.',
        'Preparamos el expediente completo que el banco quiere ver y lo acompañamos a la sucursal (o al proceso digital) para que la cuenta se abra a la primera.',
      ],
      bullets: [
        'Verificación de que su EIN y documento de constitución coincidan',
        'Operating Agreement y resoluciones de propiedad listas para el banco',
        'Selección de banco según su perfil: residente, no residente o ITIN',
        'Acompañamiento presencial o digital en la apertura',
        'Conexión de la cuenta con su sistema contable desde el día uno',
      ],
      faqs: [
        { q: '¿Qué documentos pide el banco para una cuenta comercial?', a: 'Los estándar son: EIN del IRS, artículo/certificado de constitución de la LLC, Operating Agreement, y dos formas de identificación del propietario. Los requisitos varían por banco y por estatus migratorio.' },
        { q: '¿Puedo abrir cuenta comercial con ITIN?', a: 'Sí, varios bancos aceptan ITIN como identificación del propietario. La clave es que el EIN y el documento de la LLC estén correctamente emitidos antes de la solicitud.' },
        { q: '¿Es obligatorio separar las cuentas si soy dueño único?', a: 'Legalmente la LLC lo exige para mantener el velo corporativo; fiscalmente mezclar fondos (commingling) es la evidencia más usada para desconocer su protección personal.' },
        { q: '¿Qué banco recomiendan para negocios hispanos?', a: 'Depende del perfil: algunos bancos regionales de Tennessee tienen excelente servicio bilingüe y cuentas sin comisión para LLC pequeñas. Le orientamos según su situación específica.' },
      ],
    },
    en: {
      title: 'Open a Business Bank Account — Real Requirements',
      description: 'Real bank requirements for business accounts: EIN, formation documents, and operating agreement. Bilingual help for residents and non-residents.',
      h1: 'Opening a Business Bank Account: The Practical Guide',
      intro: [
        'Mixing personal and business finances is the number-one cause of legal and tax problems for small business owners. The business bank account is the first wall protecting your personal assets — and banks reject applications when documents are out of order.',
        'We prepare the complete file the bank wants to see and accompany you in person (or through the digital process) so the account opens on the first attempt.',
      ],
      bullets: [
        'Verification that your EIN and formation documents match',
        'Operating Agreement and ownership resolutions ready for the bank',
        'Bank selection by profile: resident, non-resident, or ITIN holder',
        'In-person or digital accompaniment during the opening',
        'Connection of the account to your bookkeeping system from day one',
      ],
      faqs: [
        { q: 'What documents do banks require for a business account?', a: 'Standard items: IRS EIN letter, LLC articles/certificate of formation, Operating Agreement, and two forms of owner ID. Requirements vary by bank and immigration status.' },
        { q: 'Can I open a business account with an ITIN?', a: 'Yes — several banks accept an ITIN as owner identification. The key is having a correctly issued EIN and LLC documents before applying.' },
        { q: 'Is separating accounts mandatory for a single-member LLC?', a: 'Legally yes, to maintain the corporate veil; and from a tax perspective, commingling funds is the most-used evidence to pierce your personal protection.' },
        { q: 'Which bank do you recommend for Hispanic-owned businesses?', a: 'It depends on your profile: several Tennessee regional banks offer excellent bilingual service and fee-free small-LLC accounts. We guide you based on your specific situation.' },
      ],
    },
  },
];

export function getProgrammaticBySlug(slug: string): ProgrammaticPage | undefined {
  return PROGRAMMATIC_PAGES.find((p) => p.slug === slug);
}
