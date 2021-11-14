export interface ILog {
    date: string;
    type: "ERROR" | "INFO" | "WARNING";
    description: string;
};