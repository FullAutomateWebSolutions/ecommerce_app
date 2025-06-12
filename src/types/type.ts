export interface MenuItem {
  key: string;
  icon: React.ReactNode;      // ícone JSX
  label: string;
  BadgeNumber?: number | 0;       // opcional
}