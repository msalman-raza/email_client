export interface Email {
    uid: string;
    sender: string;
    subject: string;
    message: string;
    time_sent: number;
    isSeen?: boolean;
}