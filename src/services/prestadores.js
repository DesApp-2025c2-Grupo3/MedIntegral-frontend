import api from './api';

export const getPrestadores = async () => {
  const { data } = await api.get('/prestadores');
  return data;
};
