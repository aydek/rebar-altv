export interface IMenuItem {
    name: string;
    icon: string;
    onClick?: () => void;
    submenus?: {
        name: string;
        icon?: string;
        onClick?: () => void;
    }[];
}
