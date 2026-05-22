export interface ToyReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ToyProduct {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  price: number;
  category: string;
  rating: number;
  image: string;
  images: string[];
  stock: number;
  dimensions: string;
  materials: string;
  recommendedAge: string;
  isFeatured?: boolean;
  reviews: ToyReview[];
}

export interface CartItem {
  product: ToyProduct;
  quantity: number;
  giftMessage?: string;
  giftWrapped?: boolean;
}

export interface ManufacturerValue {
  title: string;
  description: string;
  iconName: string;
}

export interface ManufacturerAbout {
  name: string;
  tagline: string;
  history: string;
  storyHeading: string;
  storyBody: string;
  values: ManufacturerValue[];
  factoryAddress: string;
  whatsappNumber: string; // The target phone number to send WhatsApp direct message
  contactEmail: string;
}
