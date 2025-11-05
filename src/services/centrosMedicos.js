import { centrosMedicosMock } from '../mocks/centrosMedicosMock';
import { sleepIfLocal } from '../utils/sleepIfLocal';

export const getCentrosMedicos = async () => {
  await sleepIfLocal(300);
  return centrosMedicosMock;
};
