export interface IRegistrationConfig {
  /* Charts */
  bar?: boolean;
  bubble?: boolean;
  doughnut?: boolean;
  line?: boolean;
  polar?: boolean;
  pie?: boolean;
  radar?: boolean;
  scatter?: boolean;
  /* Accessories */
  // decimation?: boolean;
  filler?: boolean;
  legend?: boolean;
  title?: boolean;
  tooltip?: boolean;
  /* Other */
  others?: ChartComponentLike[];
}
