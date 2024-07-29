export interface DialogButton {
    text: string;
    color?: "primary" | "warn" | "accent";
    result: any;
}

export interface DialogData {
    title: string;
    message: string;
    buttons: DialogButton[];
    panelClass?: string;
}
