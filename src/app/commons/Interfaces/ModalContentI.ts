export type ToggleModalTypes = 'o' | 'c';
export type ToggleCloseTypes = 'confirm' | 'close';

export interface ModalContentI {
    headerLabel: string;
    content: string;
    primaryButton: string;
    secondaryButton: string;
}

export interface ToggleStatusI {
    toggleStatus: ToggleModalTypes;
}

export interface ModalDataI extends ModalContentI, ToggleStatusI {

}