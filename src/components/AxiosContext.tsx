import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

interface IAxiosContext {
  authAxios: any;
  publicAxios: any;
}

const baseUrl = 'http://localhost:8008';

const AxiosContext = createContext<IAxiosContext>({authAxios: null, publicAxios: null});
const { Provider } = AxiosContext;

const AxiosProvider: React.FC<any> = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const publicAxios = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  authAxios.interceptors.request.use(
    config => {
      // if (!config.headers?.Authorization) {
      //   (config.headers as any).Authorization = `Bearer ${authContext.getAccessToken()}`;
      // }
      // return config;
      if ((config as AxiosAuthRefreshRequestConfig).skipAuthRefresh) {
        // console.log('should already have a header: ', config.headers);
        return config;
      }
      // console.log('sending request: ', config.url, (config as any).skipAuthRefresh);
      const token = authContext?.user?.token;
      // console.log('interceptor token: ', token?.substring(0) + '...');
      console.log()
      if(token) {
        (config.headers as any)['x-access-token'] = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  authAxios.interceptors.response.use(
    response => response,
    async (err) => {
      const original = err.config;
      if (original && (original as AxiosAuthRefreshRequestConfig).skipAuthRefresh) {
        return Promise.reject(err);
      }
      if (err && err.response && err.response.status === 401 && !original._retry) {
        original._retry = true;
        return authAxios(original);
      }
      return Promise.reject(err);
    }
  )

  const refreshAuthLogic = (failedRequest: { config: { url: any; }; response: { config: { headers: { [x: string]: any; }; }; }; }) => {
    // console.log('Failed request: ', JSON.stringify(failedRequest));
    console.log('Failed request: ', failedRequest.config.url);
    const data = {
      token: authContext!.user?.refresh,
      id: authContext?.user?.id
    };

    const options = {
      method: 'POST',
      data,
      url: baseUrl + '/auth/clerk/refresh',
    };

    return publicAxios(options)
      .then(async tokenRefreshResponse => {
        // console.log('refreshing: ', tokenRefreshResponse.data);
        // console.log('saving new token: ', tokenRefreshResponse.data.token.substring(0));
        // prep failed request
        failedRequest.response.config.headers['x-access-token'] = tokenRefreshResponse.data.token;
        
        const user = tokenRefreshResponse.data;

        authContext?.login(user);

        return Promise.resolve();
      })
      .catch(e => {
        console.error('REFRESH failed: ', e);
        // TODO investigate weird 403 :/ getting some random token out of nowhere?
        authContext?.logout();
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, { pauseInstanceWhileRefreshing: true});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};