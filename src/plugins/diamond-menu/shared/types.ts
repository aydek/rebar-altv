export type IDiamondMenuItem = {
    name: string;
    icon: string;
    onClick?: () => void;
    submenu?: IDiamondMenuItem[];
};
