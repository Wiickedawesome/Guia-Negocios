/**
 * Comprehensive Research & Authoritative Citation Knowledge Base for GUIA DE NEGOCIOS
 * 
 * OPEN RESEARCH POLICY:
 * The AI is authorized and encouraged to cite ANY verified, authoritative source across the open web
 * (Federal, State, County/Municipal, Academic, Industry Boards, and Guia Negocios internal service pages).
 */

export interface CitationSource {
  titleEs: string;
  titleEn: string;
  url: string;
  organization: string;
  category: 'irs' | 'tn_state' | 'local_knox' | 'sba' | 'academic' | 'industry' | 'internal' | 'banking';
  descriptionEs: string;
  descriptionEn: string;
  keywords: string[];
}

export const AUTHORITATIVE_SOURCES: CitationSource[] = [
  // 1. IRS / Federal Taxes
  {
    titleEs: 'Solicitud de Número de Identificación del Empleador (EIN) ante el IRS',
    titleEn: 'IRS Employer Identification Number (EIN) Application Portal',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
    organization: 'Internal Revenue Service (IRS)',
    category: 'irs',
    descriptionEs: 'Portal oficial del IRS para tramitar y verificar números EIN para entidades comerciales.',
    descriptionEn: 'Official IRS portal to apply for and verify Employer Identification Numbers.',
    keywords: ['ein', 'irs', 'impuestos', 'taxes', 'ss-4', 'itin', 'foreign', 'extranjero']
  },
  {
    titleEs: 'Guía de Estructuras Comerciales y Clasificación Tributaria',
    titleEn: 'IRS Business Structures and Tax Classifications',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/business-structures',
    organization: 'Internal Revenue Service (IRS)',
    category: 'irs',
    descriptionEs: 'Regulaciones federales sobre impuestos para LLC, Corporaciones S y C, y Unipersonales.',
    descriptionEn: 'Federal tax guidelines for LLCs, S-Corps, C-Corps, and Sole Proprietorships.',
    keywords: ['llc', 'corporacion', 'corporation', 's-corp', 'c-corp', 'sole proprietorship', 'impuestos']
  },
  {
    titleEs: 'Guía Tributaria para Pequeños Negocios (Publicación 334 del IRS)',
    titleEn: 'IRS Publication 334: Tax Guide for Small Business',
    url: 'https://www.irs.gov/publications/p334',
    organization: 'Internal Revenue Service (IRS)',
    category: 'irs',
    descriptionEs: 'Normas sobre gastos deducibles, contabilidad y obligaciones fiscales para propietarios.',
    descriptionEn: 'Official tax rules on write-offs, business deductions, and accounting requirements.',
    keywords: ['deducciones', 'deductions', 'write offs', 'contabilidad', 'gastos', 'publicacion 334']
  },

  // 2. Tennessee Secretary of State & State Regulations
  {
    titleEs: 'División de Servicios Comerciales de la Secretaría de Estado de Tennessee',
    titleEn: 'Tennessee Secretary of State Business Services Division',
    url: 'https://sos.tn.gov/business-services',
    organization: 'Tennessee Secretary of State (TN SOS)',
    category: 'tn_state',
    descriptionEs: 'Registro oficial de Artículos de Organización para LLCs, Corporaciones y Reportes Anuales en Tennessee.',
    descriptionEn: 'Official filing portal for LLC Articles of Organization and Annual Reports in Tennessee.',
    keywords: ['tennessee', 'tn', 'secretaria de estado', 'sos', 'registro', 'knoxville', 'articulos', 'annual report']
  },
  {
    titleEs: 'Departamento de Ingresos de Tennessee (Impuestos Estatales y Licencias)',
    titleEn: 'Tennessee Department of Revenue (Business & Sales Tax)',
    url: 'https://www.tn.gov/revenue/taxes/business-tax.html',
    organization: 'Tennessee Department of Revenue (TN DoR)',
    category: 'tn_state',
    descriptionEs: 'Registro obligatorio de Business Tax, Sales Tax y Franchise & Excise Tax en Tennessee.',
    descriptionEn: 'Mandatory state business tax, sales tax, and franchise/excise tax registration portal.',
    keywords: ['licencia', 'business tax', 'sales tax', 'franchise', 'excise', 'departamento de ingresos', 'permisos']
  },
  {
    titleEs: 'Junta de Licencias para Contratistas de Tennessee (TDCI)',
    titleEn: 'Tennessee Board for Licensing Contractors (TDCI)',
    url: 'https://www.tn.gov/commerce/regboards/contractors.html',
    organization: 'Tennessee Department of Commerce & Insurance',
    category: 'tn_state',
    descriptionEs: 'Requisitos oficiales para licencias de construcción, remodelación, plomería y electricidad en TN.',
    descriptionEn: 'Official contractor, commercial builder, and trade licensing requirements in Tennessee.',
    keywords: ['contractor', 'contratista', 'construccion', 'licencia contratista', 'tdci', 'plomeria', 'electricidad']
  },
  {
    titleEs: 'Departamento de Salud de Tennessee: Permisos de Alimentos y Restaurantes',
    titleEn: 'Tennessee Department of Health: Food Service & Mobile Food Permits',
    url: 'https://www.tn.gov/health/health-program-areas/eh/environmental-health-rules.html',
    organization: 'Tennessee Department of Health',
    category: 'tn_state',
    descriptionEs: 'Inspecciones y licencias sanitarias para restaurantes, camiones de comida (food trucks) y catering.',
    descriptionEn: 'Health department permits and sanitary inspection codes for food trucks and restaurants.',
    keywords: ['food truck', 'restaurante', 'comida', 'permiso sanitario', 'inspeccion', 'health department']
  },

  // 3. Knox County & Local Municipal Authorities
  {
    titleEs: 'Oficina del Secretario del Condado de Knox (Licencias Comerciales Locales)',
    titleEn: 'Knox County Clerk Business Tax & Licensing Office',
    url: 'https://www.knoxcounty.org/clerk/business_tax.php',
    organization: 'Knox County Clerk',
    category: 'local_knox',
    descriptionEs: 'Emisión de licencias comerciales estándar y mínimas en el condado de Knox, Tennessee.',
    descriptionEn: 'Issuance of standard and minimal business tax licenses for Knox County, Tennessee.',
    keywords: ['knox county', 'knoxville', 'condado de knox', 'clerk', 'licencia local', 'county clerk']
  },
  {
    titleEs: 'Cámara de Comercio de Knoxville (Recursos para Nuevos Negocios)',
    titleEn: 'Knoxville Chamber of Commerce Business Resources',
    url: 'https://www.knoxvillechamber.com',
    organization: 'Knoxville Chamber',
    category: 'local_knox',
    descriptionEs: 'Red de desarrollo empresarial, estadísticas económicas del este de Tennessee y eventos comerciales.',
    descriptionEn: 'Economic development network, East Tennessee business climate data, and networking.',
    keywords: ['camara de comercio', 'knoxville chamber', 'networking', 'este de tennessee', 'mercado local']
  },

  // 4. Small Business Administration (SBA), SCORE & Federal Support
  {
    titleEs: 'Guía Oficial de Redacción de Plan de Negocios (SBA)',
    titleEn: 'U.S. Small Business Administration (SBA) Business Plan Guide',
    url: 'https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan',
    organization: 'U.S. Small Business Administration (SBA)',
    category: 'sba',
    descriptionEs: 'Plantillas oficiales de plan de negocios tradicional y lean startup para solicitar préstamos y atraer inversionistas.',
    descriptionEn: 'Official traditional and lean startup business plan templates for bank loan applications and investors.',
    keywords: ['plan de negocios', 'business plan', 'sba', 'plan', 'estrategia', 'proyecciones', 'ejecutivo', 'resumen']
  },
  {
    titleEs: 'Plantillas y Mentoría de Negocios (SCORE - Aliado de la SBA)',
    titleEn: 'SCORE Association Small Business Mentorship & Planning Resources',
    url: 'https://www.score.org/resource/business-plan-template-startup-business',
    organization: 'SCORE Association',
    category: 'sba',
    descriptionEs: 'Red nacional de mentores ejecutivos y modelos financieros de planificación estratégica.',
    descriptionEn: 'Nationwide network of executive business mentors and financial planning models.',
    keywords: ['score', 'mentor', 'mentoria', 'plan de negocios', 'financiero', 'presupuesto', 'startup']
  },
  {
    titleEs: 'Guía de Inicio y Financiación de Pequeñas Empresas (SBA)',
    titleEn: 'U.S. Small Business Administration Guide to Starting a Business',
    url: 'https://www.sba.gov/business-guide/launch-your-business',
    organization: 'U.S. Small Business Administration (SBA)',
    category: 'sba',
    descriptionEs: 'Recursos federales y programas de microcréditos 7(a) y 504 para emprendedores en todo Estados Unidos.',
    descriptionEn: 'Federal resources, guidance, and 7(a)/504 microloan programs for small business owners nationwide.',
    keywords: ['sba', 'credito', 'prestamo', 'loan', 'financiacion', 'funding', 'iniciar negocio', 'emprender']
  },
  {
    titleEs: 'Administración de Seguridad y Salud Ocupacional (OSHA)',
    titleEn: 'Occupational Safety and Health Administration (OSHA) Small Business Resources',
    url: 'https://www.osha.gov/smallbusiness',
    organization: 'U.S. Department of Labor (OSHA)',
    category: 'sba',
    descriptionEs: 'Normativas de seguridad laboral y cumplimiento para empresas de construcción y servicios.',
    descriptionEn: 'Workplace safety regulations and compliance guidelines for employers.',
    keywords: ['osha', 'seguridad', 'safety', 'empleados', 'trabajadores', 'cumplimiento laboral']
  },
  {
    titleEs: 'Oficina de Marcas y Patentes de Estados Unidos (USPTO)',
    titleEn: 'United States Patent and Trademark Office (USPTO)',
    url: 'https://www.uspto.gov/trademarks',
    organization: 'USPTO',
    category: 'sba',
    descriptionEs: 'Búsqueda y registro de marcas registradas y propiedad intelectual en los Estados Unidos.',
    descriptionEn: 'Official trademark registration and intellectual property search portal.',
    keywords: ['marca', 'trademark', 'uspto', 'nombre comercial', 'propiedad intelectual', 'patente']
  },

  // 5. Academic & Economic Research
  {
    titleEs: 'Estudio de Brookings: Estabilización y Auge de Emprendedores Hispanos',
    titleEn: 'Brookings Institution: Stabilizing Latino Entrepreneurs in Growing Economies',
    url: 'https://www.brookings.edu/articles/stabilizing-latino-entrepreneurs-amid-federal-policy-volatility/',
    organization: 'Brookings Institution (2025)',
    category: 'academic',
    descriptionEs: 'Investigación sobre el papel de los emprendedores latinos en el crecimiento económico local y los efectos de la volatilidad de las políticas federales sobre ellos.',
    descriptionEn: 'Research on the role of Latino entrepreneurs in local economic growth and how federal policy volatility affects them.',
    keywords: ['investigacion', 'brookings', 'estadisticas', 'crecimiento', 'estudio', 'latinos', 'hispanos', 'jobs']
  },
  {
    titleEs: 'Iniciativa de Emprendimiento Latino de Stanford (SLEI)',
    titleEn: 'Stanford Latino Entrepreneurship Initiative (SLEI) State of Latino Entrepreneurship',
    url: 'https://www.gsb.stanford.edu/faculty-research/centers-initiatives/slei',
    organization: 'Stanford Graduate School of Business',
    category: 'academic',
    descriptionEs: 'Reporte anual sobre acceso a capital bancario, tecnología y escalabilidad de negocios hispanos.',
    descriptionEn: 'Annual national survey on bank capital access, scaling, and tech adoption among Latino businesses.',
    keywords: ['stanford', 'slei', 'banca', 'acceso a credito', 'escalar', 'estudio nacional']
  },
  {
    titleEs: 'Investigación de Michigan State University (JSRI): Crecimiento y Barreras de Empresas Latinas',
    titleEn: 'Michigan State University (JSRI): Limitations Latinos Face When Starting a Business',
    url: 'https://jsri.msu.edu',
    organization: 'Julian Samora Research Institute – Michigan State University',
    category: 'academic',
    descriptionEs: 'Análisis académico de las barreras de acceso a capital que enfrentan los emprendedores latinos y de las estrategias de capitalización disponibles.',
    descriptionEn: 'Academic analysis of capital-access barriers facing Latino entrepreneurs and the capitalization strategies available to them.',
    keywords: ['michigan state', 'msu', 'jsri', 'barreras', 'fracaso', 'banca', 'capital', 'estudio']
  },
  {
    titleEs: 'Oficina del Censo de los Estados Unidos: Datos de Negocios y Emprendimiento',
    titleEn: 'U.S. Census Bureau Small Business and Ownership Statistics',
    url: 'https://www.census.gov',
    organization: 'U.S. Census Bureau',
    category: 'academic',
    descriptionEs: 'Estadísticas oficiales sobre 1 de cada 4 nuevos negocios fundados por minorías en EE.UU.',
    descriptionEn: 'Official census survey showing 1 in 4 new U.S. businesses are Latino-owned.',
    keywords: ['censo', 'census', 'demografia', 'knoxville tn', 'minority', '1 in 4']
  },

  // 6. Internal Guia Negocios Service & Landing Page Links
  {
    titleEs: 'Paquete de Lanzamiento Completo de Negocio',
    titleEn: 'Complete Business Launch Bundle',
    url: '/es/services/paquete-lanzamiento-completo',
    organization: 'GUIA NEGOCIOS',
    category: 'internal',
    descriptionEs: 'Servicio integral de registro de LLC, obtención de EIN, licencias comerciales y asesoría bancaria.',
    descriptionEn: 'All-in-one service covering LLC filing, EIN setup, business licenses, and bank setup.',
    keywords: ['paquete', 'lanzamiento', 'bundle', 'registro llc', 'crear negocio', 'asesoria', 'servicio']
  },
  {
    titleEs: 'Asesoría en Operaciones, Contabilidad y Crecimiento',
    titleEn: 'Business Operations, Bookkeeping & Growth Advisory',
    url: '/es/services/operaciones-crecimiento',
    organization: 'GUIA NEGOCIOS',
    category: 'internal',
    descriptionEs: 'Servicios de bookkeeping, facturación limpia, separación de finanzas personales y optimización fiscal.',
    descriptionEn: 'Bookkeeping, invoicing setup, separation of personal finances, and tax readiness.',
    keywords: ['operaciones', 'contabilidad', 'bookkeeping', 'separar dinero', 'facturas', 'invoicing', 'crecimiento']
  },
  {
    titleEs: 'Apoyo y Capacitación Creedava',
    titleEn: 'Creedava Support & Community Business Training',
    url: '/es/services/apoyo-creedava',
    organization: 'GUIA NEGOCIOS',
    category: 'internal',
    descriptionEs: 'Acompañamiento personalizado para emprendedores de habla hispana en EE.UU.',
    descriptionEn: 'Personalized business coaching and guidance for bilingual entrepreneurs nationwide.',
    keywords: ['creedava', 'capacitacion', 'comunidad', 'apoyo', 'talleres', 'coaching']
  },
  {
    titleEs: 'Consulta Inicial con Guia Negocios',
    titleEn: 'Initial Consultation with Guia Negocios',
    url: '/es/contact',
    organization: 'GUIA NEGOCIOS',
    category: 'internal',
    descriptionEs: 'Hable directamente con un consultor empresarial bilingüe: (865) 202-7112.',
    descriptionEn: 'Connect with a bilingual business consultant: (865) 202-7112.',
    keywords: ['contacto', 'contact', 'consulta', 'telefono', 'cita', 'hablar']
  }
];

/**
 * Returns formatted Markdown research citations based on topic keywords and context-aware scope
 */
export function getRelevantCitations(topic: string, lang: 'es' | 'en' = 'es'): string {
  const queryWords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const isLocationSpecific = /tennessee|\btn\b|knoxville|knox|nashville|memphis|chattanooga/i.test(topic);
  
  const matched = AUTHORITATIVE_SOURCES.filter(source => {
    // If not location-specific topic, do not force Tennessee-only portals unless specifically matched
    if (!isLocationSpecific && (source.category === 'tn_state' || source.category === 'local_knox')) {
      return false;
    }
    return queryWords.some(qw => 
      source.keywords.some(k => k.includes(qw) || qw.includes(k)) ||
      source.titleEs.toLowerCase().includes(qw) ||
      source.titleEn.toLowerCase().includes(qw)
    );
  });

  const selected = new Map<string, CitationSource>();
  matched.forEach(s => selected.set(s.url, s));
  
  if (isLocationSpecific) {
    // Guarantee state and local essentials
    AUTHORITATIVE_SOURCES.filter(s => s.category === 'tn_state' || s.category === 'local_knox' || s.category === 'irs' || s.category === 'internal')
      .slice(0, 5)
      .forEach(s => selected.set(s.url, s));
  } else {
    // Guarantee federal, academic, and nationwide essentials
    AUTHORITATIVE_SOURCES.filter(s => s.category === 'sba' || s.category === 'irs' || s.category === 'academic' || s.category === 'internal')
      .slice(0, 5)
      .forEach(s => selected.set(s.url, s));
  }

  const list = Array.from(selected.values()).slice(0, 6);

  const header = lang === 'es' ? '## Fuentes y Referencias Oficiales' : '## Official Sources & References';
  
  const lines = list.map(item => {
    const title = lang === 'es' ? item.titleEs : item.titleEn;
    const desc = lang === 'es' ? item.descriptionEs : item.descriptionEn;
    return `* [${title}](${item.url}) — *${item.organization}*: ${desc}`;
  });

  const openGuideline = lang === 'es'
    ? '> *Nota editorial:* Este artículo incluye citas directas y enlaces a entidades federales oficiales (SBA, IRS), estudios económicos académicos y recursos de consultoría de Guia Negocios.'
    : '> *Editorial Note:* This article includes direct citations and links to official federal entities (SBA, IRS), academic economic research, and Guia Negocios consulting resources.';

  return `${header}\n\n${lines.join('\n')}\n\n${openGuideline}`;
}
