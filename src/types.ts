export interface EcosystemItem {
  id: string;
  category: string;
  title: string;
  description: string;
  buttonText: string;
  iconName: string;
  highlights: string[];
  metrics: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface DemoFormData {
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  companyName: string;
  teamSize: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  botField?: string;
}
