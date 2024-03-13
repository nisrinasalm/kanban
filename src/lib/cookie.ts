import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string => cookies.get('@nisrinasalm/token');

export const setToken = (token: string) => {
  cookies.set('@nisrinasalm/token', token, { path: '/' });
};

export const removeToken = () => cookies.remove('@sch/token', { path: '/' });