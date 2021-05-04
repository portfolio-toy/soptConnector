export interface IExperience {
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
}

export interface IExperienceInputDTO {
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date;
    current: Boolean;
    description: string;
}