type OptionTypes = 'boolean' | 'slider';

export interface ISettings {
    title: string;
    icon: string;
    options: {
        title: string;
        type: OptionTypes;
        key: string;
        value: any;
        min?: number;
        max?: number;
    }[];
}
