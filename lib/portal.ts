export type Highlight = "Premium" | "Top" | "Featured";

export type Candidate = {
  id: string;
  name: string;
  title: string;
  city: string;
  country: string;
  experience: string;
  skills: string[];
  salary: string;
  about: string;
  phone: string;
  cnic: string;
};

export type Company = {
  slug: string;
  name: string;
  city: string;
  industry: string;
  about: string;
  top: boolean;
};

export const COMPANIES: Company[] = [
  { slug: "nexora-labs", name: "Nexora Labs", city: "Lahore", industry: "IT & Software", about: "Product studio hiring engineers and designers.", top: true },
  { slug: "bahria-associates", name: "Bahria Associates", city: "Lahore", industry: "Sales & Marketing", about: "Plot and plaza sales across Bahria Town.", top: true },
  { slug: "yasser-co", name: "Yasser & Co.", city: "Islamabad", industry: "Driving & Logistics", about: "Family office and site transport.", top: false },
  { slug: "al-kabir-builders", name: "Al Kabir Builders", city: "Lahore", industry: "Construction", about: "Housing sites in Al Kabir Town Phase 2.", top: true },
  { slug: "al-futtaim-facilities", name: "Al Futtaim Facilities", city: "Dubai", industry: "Construction", about: "Gulf facilities, visa and housing roles.", top: true },
  { slug: "hamad-medical", name: "Hamad Medical", city: "Doha", industry: "Healthcare", about: "Hospital hiring for licensed nurses.", top: false },
  { slug: "national-style-bank", name: "National Style Bank", city: "Karachi", industry: "Banking", about: "Sample senior banking desk used for management jobs.", top: true },
];

export const HIGHLIGHT: Record<string, Highlight> = {
  "pk-it-01": "Premium",
  "pk-sales-01": "Top",
  "ae-hvac-01": "Premium",
  "qa-nurse-01": "Featured",
  "pk-drive-01": "Featured",
};

export const CANDIDATES: Candidate[] = [
  { id: "c1", name: "Ayesha Khan", title: "Frontend Developer", city: "Lahore", country: "Pakistan", experience: "2 years", skills: ["React", "TypeScript"], salary: "PKR 150,000", about: "Dashboards and Urdu/English product UI.", phone: "923001110001", cnic: "35202-1111111-2" },
  { id: "c2", name: "Bilal Ahmed", title: "Electrician", city: "Lahore", country: "Pakistan", experience: "6 years", skills: ["Wiring", "Sites"], salary: "PKR 55,000", about: "Housing-site wiring, 3 Marla and plazas.", phone: "923331110002", cnic: "35202-2222222-3" },
  { id: "c3", name: "Imran Shah", title: "Company Driver", city: "Islamabad", country: "Pakistan", experience: "8 years", skills: ["LTV", "Land Cruiser"], salary: "PKR 65,000", about: "Islamabad and Rawalpindi family and office runs.", phone: "923001110003", cnic: "61101-3333333-4" },
  { id: "c4", name: "Fatima Noor", title: "Staff Nurse", city: "Karachi", country: "Pakistan", experience: "3 years", skills: ["Ward", "Prometric"], salary: "QAR 7,000", about: "Ready for Gulf hospital roles.", phone: "923211110004", cnic: "42101-4444444-5" },
  { id: "c5", name: "Hassan Ali", title: "AC Technician", city: "Faisalabad", country: "Pakistan", experience: "4 years", skills: ["HVAC", "Visa"], salary: "AED 2,500", about: "Split and chiller maintenance. Passport ready.", phone: "923001110005", cnic: "33100-5555555-6" },
  { id: "c6", name: "Sana Malik", title: "HR Generalist", city: "Karachi", country: "Pakistan", experience: "5 years", skills: ["Recruiting", "Payroll"], salary: "PKR 180,000", about: "Shortlisting, interviews, and employee files.", phone: "923331110006", cnic: "42101-6666666-7" },
];

export const PACKAGES = [
  { name: "Featured Job", price: "$99", points: ["Applicant CVs", "75 InstaMatch suggestions", "30-day listing"] },
  { name: "Top Job", price: "$210", points: ["Homepage link for 10 days", "Applicant filter", "3 search keywords", "300 InstaMatch suggestions"] },
  { name: "Premium Select", price: "On request", points: ["Homepage highlight", "Human shortlist", "Phone screen", "3 keywords"] },
  { name: "CV Search", price: "$250 / month", points: ["Search the full candidate pool", "Download matched CVs", "Passive candidates"] },
  { name: "Top Employer", price: "1–12 months", points: ["Unlimited-style postings", "CV search", "Interview tools", "Homepage brand"] },
  { name: "Career Portal", price: "Custom", points: ["Branded careers site", "Jobs synced from Kaamkar", "Your colours and logo"] },
];

export const CAMPUSES = ["NUST", "LUMS", "IBA Karachi", "FAST", "UET Lahore", "COMSATS", "Punjab University", "Bahria University"];

export function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || "") as T;
  } catch {
    return fallback;
  }
}

export function saveJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
