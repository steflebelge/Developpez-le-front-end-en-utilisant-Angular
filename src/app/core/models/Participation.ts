// Défintion du type Particpation comprenant
// Un id, une année, une ville,
// un nombre de medailles et un nombre d'athletes
export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
