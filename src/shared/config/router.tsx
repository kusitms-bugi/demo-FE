import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// 라우트 레벨 코드 스플리팅: 메인 페이지만 lazy import
const MainPage = lazy(() => import('../../pages/main-page'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/main',
    element: <Navigate to="/" replace />,
  },
]);
