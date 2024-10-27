type OptionTypes = 'checkbox' | 'slider' | 'number';
type ValueTypes = boolean | number;

export type ISettingsItem = {
    title: string;
    icon: string;
    options: Array<{
        title: string;
        type: OptionTypes;
        key: string;
        value?: ValueTypes;
        step?: number;
        min?: number;
        max?: number;
    }>;
};
