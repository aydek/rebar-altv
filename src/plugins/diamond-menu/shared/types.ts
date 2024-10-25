export type IDiamondMenuItem = {
    name: string;
    icon: string;
    disableCloseOnClick?: boolean;
    condition?: () => Promise<boolean>;
    onClick?: () => void;
    submenu?: IDiamondMenuItem[];
};
