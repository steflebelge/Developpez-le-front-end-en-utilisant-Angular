import {Participation} from "./Participation";

// Définition du type Olympic comprenant
// un ID, un pays et un tableau de Participations
export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
