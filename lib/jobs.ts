export type Job = {
  id: string;
  title: string;
  titleUr: string;
  company: string;
  city: string;
  country: string;
  countryCode: string;
  category: string;
  type: "Full-time" | "Contract" | "Daily wage" | "Overseas";
  salary: string;
  visa: boolean;
  housing: boolean;
  experience: string;
  posted: string;
  tags: string[];
  description: string;
  descriptionUr: string;
  applyWhatsApp?: string;
  applyEmail?: string;
};

export const CATEGORIES = [
  "IT & Software",
  "Construction",
  "Driving & Logistics",
  "Hospitality",
  "Healthcare",
  "Factory & Warehouse",
  "Sales & Marketing",
  "Security",
  "Domestic & Facility",
  "Engineering",
] as const;

export const CITIES = [
  "Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Peshawar",
  "Dubai","Abu Dhabi","Riyadh","Jeddah","Doha","Kuwait City","Muscat","Manama",
];

export const SEED_JOBS: Job[] = [
  {id:"pk-it-01",title:"Junior Frontend Developer",titleUr:"جونئیر فرنٹ اینڈ ڈیولپر",company:"Nexora Labs",city:"Lahore",country:"Pakistan",countryCode:"PK",category:"IT & Software",type:"Full-time",salary:"PKR 120,000 – 180,000",visa:false,housing:false,experience:"1–3 years",posted:"2 days ago",tags:["React","TypeScript"],description:"React + TypeScript dashboards. Hybrid Gulberg office.",descriptionUr:"لاہور میں فرنٹ اینڈ رول۔",applyEmail:"careers@nexoralabs.example"},
  {id:"pk-sales-01",title:"Real Estate Sales Consultant",titleUr:"ریئل اسٹیٹ سیلز",company:"Bahria Associates",city:"Lahore",country:"Pakistan",countryCode:"PK",category:"Sales & Marketing",type:"Full-time",salary:"PKR 80,000 + commission",visa:false,housing:false,experience:"Fresh or 1+",posted:"1 day ago",tags:["Bahria","Field"],description:"Close plots and plazas in Bahria Town.",descriptionUr:"بحریہ ٹاؤن سیلز۔",applyWhatsApp:"923001112233"},
  {id:"pk-drive-01",title:"Company Driver — Land Cruiser",titleUr:"کمپنی ڈرائیور",company:"Yasser & Co.",city:"Islamabad",country:"Pakistan",countryCode:"PK",category:"Driving & Logistics",type:"Full-time",salary:"PKR 55,000 – 70,000",visa:false,housing:false,experience:"5+ years",posted:"5 hours ago",tags:["LTV"],description:"Family and office runs in Islamabad / Rawalpindi.",descriptionUr:"اسلام آباد ڈرائیور۔",applyWhatsApp:"923001234567"},
  {id:"pk-elec-01",title:"Electrician — Housing Sites",titleUr:"الیکٹریشن",company:"Al Kabir Builders",city:"Lahore",country:"Pakistan",countryCode:"PK",category:"Construction",type:"Contract",salary:"PKR 45,000 – 65,000",visa:false,housing:false,experience:"3+ years",posted:"3 days ago",tags:["Wiring"],description:"House wiring for 3 Marla units in Al Kabir Town Phase 2.",descriptionUr:"الکبیر ٹاؤن وائرنگ۔",applyWhatsApp:"923334445556"},
  {id:"ae-hvac-01",title:"AC Technician",titleUr:"اے سی ٹیکنیشن",company:"Al Futtaim Facilities",city:"Dubai",country:"UAE",countryCode:"AE",category:"Construction",type:"Overseas",salary:"AED 2,200 – 2,800 + OT",visa:true,housing:true,experience:"2+ years",posted:"6 hours ago",tags:["Visa","Housing"],description:"Hotel and mall HVAC in Dubai. Visa, housing, ticket.",descriptionUr:"دبئی اے سی ٹیکنیشن۔",applyEmail:"gulf@alfuttaim.example"},
  {id:"sa-drv-01",title:"Heavy Driver — Dump Truck",titleUr:"ہیوی ڈرائیور",company:"Nesma & Partners",city:"Riyadh",country:"Saudi Arabia",countryCode:"SA",category:"Driving & Logistics",type:"Overseas",salary:"SAR 2,500 – 3,200",visa:true,housing:true,experience:"HTV 3+ years",posted:"Yesterday",tags:["HTV","Iqama"],description:"Dump truck on Riyadh sites. Camp and medical.",descriptionUr:"ریاض ڈمپ ٹرک۔",applyWhatsApp:"966500111222"},
  {id:"qa-nurse-01",title:"Staff Nurse",titleUr:"اسٹاف نرس",company:"Hamad Medical",city:"Doha",country:"Qatar",countryCode:"QA",category:"Healthcare",type:"Overseas",salary:"QAR 6,000 – 8,500",visa:true,housing:true,experience:"2 years hospital",posted:"4 days ago",tags:["Prometric"],description:"Inpatient ward. Prometric + Dataflow preferred.",descriptionUr:"دوحہ نرس۔",applyEmail:"nursing@hmc.example"},
  {id:"ae-chef-01",title:"Tandoor / Karahi Cook",titleUr:"تندور کک",company:"Karachi Broast LLC",city:"Abu Dhabi",country:"UAE",countryCode:"AE",category:"Hospitality",type:"Overseas",salary:"AED 1,800 – 2,400 + tips",visa:true,housing:true,experience:"2+ years kitchen",posted:"8 hours ago",tags:["Kitchen"],description:"Pakistani restaurant kitchen. Shared villa in Mussafah.",descriptionUr:"ابوظہبی کک۔",applyWhatsApp:"971501234567"},
  {id:"pk-sec-01",title:"Security Guard — Night Shift",titleUr:"سیکیورٹی گارڈ",company:"Protective Services PK",city:"Karachi",country:"Pakistan",countryCode:"PK",category:"Security",type:"Full-time",salary:"PKR 35,000 – 42,000",visa:false,housing:false,experience:"1 year or ex-army",posted:"Today",tags:["Night"],description:"Night shift at a Clifton plaza.",descriptionUr:"کراچی سیکیورٹی۔",applyWhatsApp:"923212223334"},
  {id:"om-weld-01",title:"Pipe Welder (6G)",titleUr:"پائپ ویلڈر",company:"Petrofac Oman",city:"Muscat",country:"Oman",countryCode:"OM",category:"Engineering",type:"Overseas",salary:"OMR 280 – 350",visa:true,housing:true,experience:"6G certified",posted:"2 days ago",tags:["6G"],description:"Shutdown welding. Camp on site.",descriptionUr:"عمان ویلڈر۔",applyEmail:"craft@petrofac.example"},
  {id:"pk-fact-01",title:"Warehouse Picker / Packer",titleUr:"گودام پیکر",company:"Daraz Fulfilment",city:"Karachi",country:"Pakistan",countryCode:"PK",category:"Factory & Warehouse",type:"Full-time",salary:"PKR 32,000 – 38,000",visa:false,housing:false,experience:"No experience ok",posted:"1 day ago",tags:["Warehouse"],description:"Pick-pack in Port Qasim warehouse.",descriptionUr:"گودام پیکنگ۔",applyEmail:"warehouse@daraz.example"},
  {id:"kw-maid-01",title:"House Driver + Errands",titleUr:"گھریلو ڈرائیور",company:"Private Villa",city:"Kuwait City",country:"Kuwait",countryCode:"KW",category:"Domestic & Facility",type:"Overseas",salary:"KWD 180 – 220",visa:true,housing:true,experience:"Family driver 3 years",posted:"3 days ago",tags:["Live-in"],description:"School runs and household errands. Live-in.",descriptionUr:"کویت ڈرائیور۔",applyWhatsApp:"96590001122"}
];

export function filterJobs(jobs: Job[], q: string, category: string, location: string, gulfOnly: boolean) {
  const s = q.trim().toLowerCase();
  return jobs.filter((j) => {
    if (gulfOnly && j.countryCode === "PK") return false;
    if (category && j.category !== category) return false;
    if (location && j.city !== location && j.country !== location) return false;
    if (!s) return true;
    const hay = `${j.title} ${j.titleUr} ${j.company} ${j.city} ${j.country} ${j.category} ${j.tags.join(" ")}`.toLowerCase();
    return hay.includes(s);
  });
}
