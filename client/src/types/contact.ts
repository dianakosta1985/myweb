export interface Contact {
  _id?: string; 
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactType: string;
  active: boolean;
  name?: { first: string; last: string };
  picture?: Picture;
}

export interface Result {
  items: Contact[];
  cursor: string;
  hasMore: boolean;
  isLoading: boolean;
  onSubmit?: any;
}
interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface FormType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactType: { value: string; label: string };
  active: boolean;
}
