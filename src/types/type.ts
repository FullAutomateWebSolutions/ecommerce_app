export interface MenuItem {
  key: string;
  icon: React.ReactNode;      
  label: string;
  BadgeNumber?: number | 0;       
  role?: string|null; 
}
export type IUser = {
  uid?: string;
  email?: string;
  user?: string;
  token: string;
  state?: boolean;
  name?: string;
  role?: string;
};

export interface FirebaseUserResponse {
  uid: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  disabled: boolean;
  metadata: FirebaseUserMetadata;
  providerData: FirebaseProviderData[];
  customClaims: FirebaseCustomClaims;
  tokensValidAfterTime: string;
}

export interface FirebaseUserMetadata {
  lastSignInTime: string;
  creationTime: string;
  lastRefreshTime: string;
}

export interface FirebaseProviderData {
  uid: string;
  email: string;
  photoURL: string;
  providerId: string;
}

export interface FirebaseCustomClaims {
  role: string[];
}
