import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/AuthContext';
import { AxiosProvider } from './components/AxiosContext';
import { AppRouter } from './components/BrowserRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <AxiosProvider>
        <AppRouter />
      </AxiosProvider>
    </AuthProvider>
);
// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <AxiosProvider>
//         <AppRouter />
//       </AxiosProvider>
//     </AuthProvider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
