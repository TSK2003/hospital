export const technologiesList = [
  {
    id: 'mri-scanner',
    slug: 'mri-scanner',
    name: '3.0 Tesla Silent Pediatric MRI Scanner',
    category: 'Advanced Neuro & Body Imaging',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    description: 'Ultra-high-field 3.0T MRI scanner equipped with silent scan technology and wide-bore pediatric comfort tunnel to minimize scan noise and anxiety.',
    features: [
      'Pioneering Silent Scan Technology reducing acoustic noise by up to 90%',
      '70cm Wide Bore with ambient video projections for child relaxation',
      'Ultra-fast acquisition sequences cutting scan durations by 50%',
      'High-resolution zero-radiation neuro, spine, and joint imaging'
    ],
    benefits: [
      'Eliminates need for heavy sedation in many older pediatric patients',
      'High precision crystal-clear diagnostic images for early detection',
      'Radiation-free safe imaging suitable for repeat pediatric scans',
      'Parent accompanying inside scanner room allowed'
    ],
    usage: 'Used for pediatric brain scans, seizure localization, spinal cord evaluation, congenital musculoskeletal anomalies, and abdominal organ soft-tissue imaging.',
    safetyInfo: 'Zero ionizing radiation. Thorough pre-scan metal screening performed by certified pediatric MRI technologists.'
  },
  {
    id: 'ct-scan',
    slug: 'ct-scan',
    name: '128-Slice Low-Dose Pediatric CT Scanner',
    category: 'Rapid Diagnostics',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    description: 'Next-generation 128-slice Computed Tomography scanner optimized with dose-reduction algorithms specifically tailored for pediatric radiation safety.',
    features: [
      'ALARA (As Low As Reasonably Achievable) pediatric dose protocols',
      'Sub-second full body scanning speed (0.28 second rotation)',
      '3D vascular & airway reconstruction capabilities',
      'Pediatric emergency trauma imaging in seconds'
    ],
    benefits: [
      'Up to 80% lower radiation exposure compared to conventional CT scanners',
      'Captures motion-free images even if child moves slightly during scan',
      'Immediate diagnostic answers in emergency and trauma situations',
      'Ultra-thin slice clarity for fine bone and organ evaluation'
    ],
    usage: 'Ideal for pediatric trauma evaluation, complex bone fractures, chest infections, congenital cardiac CT angiograms, and abdominal emergencies.',
    safetyInfo: 'Strict dose monitoring according to international pediatric radiology guidelines. Lead shielding and tailored kilovoltage settings applied.'
  },
  {
    id: 'digital-xray',
    slug: 'digital-xray',
    name: 'High-Resolution Digital Radiography (X-Ray)',
    category: 'Diagnostic Radiology',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    description: 'Fully digital flat-panel X-ray imaging system delivering instant high-contrast orthopedic and chest images with micro-dose X-ray exposure.',
    features: [
      'Instant digital preview within 3 seconds of image capture',
      'Wireless mobile digital X-ray unit for bedside NICU/PICU scanning',
      'Ultra-low pediatric radiation emission sensors',
      'High-definition bone density and joint alignment visualization'
    ],
    benefits: [
      'No physical film waiting time; instant picture delivery to physician monitors',
      'Significantly reduced radiation dose compared to traditional analog X-rays',
      'Gentle positioning for injured or crying pediatric patients',
      'Bedside X-rays for critically ill neonates in incubators'
    ],
    usage: 'Used for diagnosing childhood bone fractures, chest lung infections (pneumonia/bronchitis), foreign object ingestion, and joint alignment.',
    safetyInfo: 'Protective pediatric lead aprons and thyroid guards used for all imaging sessions.'
  },
  {
    id: 'ultrasound',
    slug: 'ultrasound',
    name: 'HD Pediatric Color Doppler Ultrasound',
    category: 'Non-Invasive Diagnostics',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    description: 'Premium high-frequency pediatric ultrasound system with micro-convex transducers specialized for infant abdominal, cranial, and cardiac doppler scans.',
    features: [
      'Micro-convex transducers designed specifically for small infant bodies',
      'High-definition Color Doppler blood flow mapping',
      'Cranial ultrasound probe for infant fontanelle brain scanning',
      'Non-invasive, zero radiation soft-tissue imaging'
    ],
    benefits: [
      'Completely painless and silent scan experience for infants',
      'Bedside scanning capability in NICU and pediatric wards',
      'Immediate real-time diagnostic evaluation by pediatric radiologists',
      'No fasting or sedation needed for most scans'
    ],
    usage: 'Abdominal pain evaluation, infant hip dysplasia screening, cranial fontanelle brain scans, kidney & urinary tract Doppler, and appendicitis diagnosis.',
    safetyInfo: '100% safe acoustic sound waves with zero radiation exposure.'
  },
  {
    id: 'ecg',
    slug: 'ecg',
    name: '12-Lead Pediatric Digital Electrocardiogram',
    category: 'Cardiac Diagnostics',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1000&q=80',
    description: 'Compact 12-lead digital ECG system with pediatric electrode pads and specialized pediatric heart rhythm analysis algorithms.',
    features: [
      'Child-sized soft gel ECG suction electrodes',
      'High-speed simultaneous 12-lead signal acquisition',
      'Automatic pediatric arrhythmia interpretation software',
      'Wireless digital integration with patient Electronic Health Records'
    ],
    benefits: [
      'Painless 2-minute cardiac evaluation',
      'Accurate detection of pediatric heart rhythm irregularities',
      'Gentle non-irritating adhesive pads suitable for delicate infant skin',
      'Instant report generation for pediatric cardiologists'
    ],
    usage: 'Screening for pediatric heart murmurs, chest pain evaluation, fainting spells (syncope), and pre-operative cardiac clearance.',
    safetyInfo: 'Passive electrical signal recording with zero discomfort or electrical hazard.'
  },
  {
    id: 'eeg',
    slug: 'eeg',
    name: '32-Channel Video EEG Brain Mapping System',
    category: 'Neuro-Diagnostics',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80',
    description: 'Advanced 32-channel video Electroencephalogram (EEG) setup with high-definition synchronized video recording for childhood epilepsy and seizure analysis.',
    features: [
      'Synchronized HD video camera monitoring brain wave spikes with physical movements',
      'Soft pediatric electrode caps tailored for infant head dimensions',
      'Long-term sleep EEG monitoring capability',
      'Advanced digital artifact suppression and brain mapping'
    ],
    benefits: [
      'Precise pinpointing of seizure focal zones in pediatric epilepsy',
      'Painless procedure conducted while child sleeps or watches cartoons',
      'Differentiates true epileptic seizures from non-epileptic pediatric twitches',
      'Comprehensive report generated by chief pediatric neurologist'
    ],
    usage: 'Evaluation of childhood seizures, unexplained staring spells, sleep disorders, developmental delay, and head injury neurological follow-up.',
    safetyInfo: 'Non-invasive passive brain activity recording.'
  },
  {
    id: 'ventilator',
    slug: 'ventilator',
    name: 'Advanced Pediatric & Neonatal Servo Ventilator',
    category: 'Critical Life Support',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    description: 'Precision mechanical ventilators capable of delivering micro-tidal volumes (as low as 2ml) safely to premature neonates and critically ill children.',
    features: [
      'High-Frequency Oscillatory Ventilation (HFOV) mode for fragile lungs',
      'Neurally Adjusted Ventilatory Assist (NAVA) tracking infant breathing reflexes',
      'Integrated heated humidification circuits preventing lung airway drying',
      'Real-time lung mechanics and airway pressure monitoring'
    ],
    benefits: [
      'Protects delicate infant lung tissues from pressure barotrauma',
      'Supports smooth weaning off respiratory support',
      'Continuous oxygenation control managed by pediatric intensivists',
      'Ensures survival in severe pediatric respiratory failure cases'
    ],
    usage: 'Used in NICU/PICU for severe infant respiratory distress syndrome (RDS), pneumonia, meconium aspiration, and post-cardiac surgery recovery.',
    safetyInfo: 'Multi-level intelligent backup safety alarms and continuous bedside nursing care.'
  },
  {
    id: 'nicu-equipment',
    slug: 'nicu-equipment',
    name: 'Level-III NICU Care Suite & Bedside Monitoring',
    category: 'Neonatal Critical Care',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    description: 'Integrated Level-III NICU monitoring workstation including continuous multi-parameter vitals, micro-infusion pumps, and blood gas analyzers.',
    features: [
      'Central bedside multi-para monitors (ECG, SpO2, NIBP, Respiration, Temp)',
      'Precision syringe infusion pumps delivering micro-gram medication dosages',
      'Bedside blood gas & electrolyte micro-analyzer (results in 60 seconds)',
      'Non-invasive transcutaneous bilirubin & oxygen sensors'
    ],
    benefits: [
      'Real-time continuous surveillance of pre-term infant vital signs',
      'Eliminates frequent blood drawing through non-invasive sensors',
      'Delivers exact micro-titrated IV medications with zero margin of error',
      'Instant alarm notification to central nursing station'
    ],
    usage: 'Continuous vital monitoring for premature babies, low birth weight infants, and neonates recovering from congenital surgeries.',
    safetyInfo: 'Failsafe battery backups and sterile single-use patient sensor connections.'
  },
  {
    id: 'picu-equipment',
    slug: 'picu-equipment',
    name: 'PICU Hemodynamic & Neuro Monitoring Workstation',
    category: 'Pediatric Intensive Care',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    description: 'High-acuity PICU life support equipment suite incorporating invasive arterial pressure monitoring, end-tidal CO2, and targeted temperature management.',
    features: [
      'Invasive hemodynamic monitoring (Arterial Line, Central Venous Pressure)',
      'Capnography (EtCO2) continuous breath-by-breath monitoring',
      'Targeted therapeutic hypothermia cooling units',
      'Pediatric continuous renal replacement & dialysis access'
    ],
    benefits: [
      'Enables rapid emergency response to subtle changes in critical child condition',
      'Provides total organ support during severe sepsis or multisystem shock',
      'Monitors brain oxygenation and intracranial pressure following trauma',
      'Improves PICU survival outcomes significantly'
    ],
    usage: 'Critical monitoring for pediatric septic shock, head trauma, severe dengue shock syndrome, and major post-operative recoveries.',
    safetyInfo: 'Dedicated 1:1 nurse-to-patient vigilance with triple redundancy alarm triggers.'
  },
  {
    id: 'laboratory-equipment',
    slug: 'laboratory-equipment',
    name: 'NABL-Accredited Automated Pediatric Pathology Lab',
    category: 'Diagnostic Pathology',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    description: 'Fully automated biochemistry, hematology, and microbiology analyzer requiring minimal blood sample volumes (as low as 100 microliters) for pediatric testing.',
    features: [
      'Micro-sample blood analyzers optimized for infant finger/heel pricks',
      'Automated 5-part differential blood cell counter',
      'Rapid PCR molecular diagnostic panels for childhood viral infections',
      'Barcode-tracked zero-error specimen handling'
    ],
    benefits: [
      'Requires tiny blood volume, preventing anemia in sick infants',
      'Rapid turnaround time (results available within 30-45 minutes)',
      'Accurate detection of infant infections, dengue, typhoid, and jaundice',
      '24/7 round-the-clock emergency lab operation'
    ],
    usage: 'Complete blood count (CBC), newborn bilirubin, blood cultures, CRP, metabolic panels, and allergy testing.',
    safetyInfo: 'NABL quality certified with strict daily calibration control.'
  },
  {
    id: 'incubator',
    slug: 'incubator',
    name: 'Closed Micro-Climate Neonatal Incubator',
    category: 'Neonatal Care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1000&q=80',
    description: 'Thermally controlled closed micro-environment incubator with automated humidity control and double-wall insulation for premature infants.',
    features: [
      'Servo-controlled skin temperature regulation maintaining precise body warmth',
      'Active ultrasonic humidification preventing pre-term water loss',
      'Double-walled transparent canopy reducing radiant heat loss',
      'Built-in in-bed weighing scale without disturbing baby'
    ],
    benefits: [
      'Simulates womb-like warmth and humidity for premature infants',
      'Protects pre-term infants from external ambient drafts and acoustic noise',
      'Enables painless weight tracking while infant slumbers inside',
      'Easy access ports for parents and neonatologists'
    ],
    usage: 'Essential care for premature babies born before 37 weeks, very low birth weight babies, and thermally unstable neonates.',
    safetyInfo: 'Dual independent over-temperature cut-off safety sensors.'
  },
  {
    id: 'phototherapy-unit',
    slug: 'phototherapy-unit',
    name: 'Intense Blue LED Neonatal Phototherapy System',
    category: 'Jaundice Therapy',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80',
    description: 'High-intensity narrow-band blue LED phototherapy unit designed for fast, safe photo-breakdown of serum bilirubin in newborn infant jaundice.',
    features: [
      'Narrow spectrum 450-470 nm high-potency blue LED light technology',
      'Zero UV radiation emission and low heat generation',
      'Double-sided (top and bottom Bili-Bed) 360-degree light exposure',
      'Built-in digital timer tracking exact phototherapy duration'
    ],
    benefits: [
      'Rapidly lowers serum bilirubin levels within 12-24 hours',
      'Prevents severe jaundice complications like kernicterus',
      'Comfortable heatless illumination allowing baby to rest peacefully',
      'Can be placed in-room with parents during mother-baby rooming-in'
    ],
    usage: 'Treatment of neonatal hyperbilirubinemia (newborn jaundice) in full-term and premature infants.',
    safetyInfo: 'Soft pediatric eye protection shields applied during all phototherapy sessions.'
  }
];
