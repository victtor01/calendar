export interface Annotation {
    id: number;
    text: string;
    annotationId?: number | null;
    status: StatusAnnotation
}

export type StatusAnnotation = 'CONCLUDED' | 'ACTIVE'