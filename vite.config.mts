import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    svgr(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@ui/': path.resolve(__dirname, 'src/components') + '/',
      '@ui': path.resolve(__dirname, 'src/components'),
      '@assets/': path.resolve(__dirname, 'src/assets') + '/',
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api/': path.resolve(__dirname, 'src/api') + '/',
      '@api': path.resolve(__dirname, 'src/api'),
      '@utils/': path.resolve(__dirname, 'src/utils') + '/',
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@shared/': path.resolve(__dirname, 'src/shared') + '/',
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@entities/': path.resolve(__dirname, 'src/entities') + '/',
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features/': path.resolve(__dirname, 'src/features') + '/',
      '@features': path.resolve(__dirname, 'src/features'),
      '@widgets/': path.resolve(__dirname, 'src/widgets') + '/',
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      ui: path.resolve(__dirname, 'src/components'),
    },
  },
  server: {
    port: 3000,
    host: 'localhost',
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React, React-DOM, Scheduler는 분리하지 않음 (메인 번들에 포함)
          // React 19에서 scheduler가 React와 강하게 결합되어 있어 분리 시 에러 발생
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/scheduler')
          ) {
            // undefined를 반환하면 메인 번들에 포함됨
            return undefined;
          }
          // 페이지 레벨 코드 스플리팅
          if (id.includes('/pages/main-page')) {
            return 'main-page';
          }
          if (id.includes('/pages/login-page')) {
            return 'login-page';
          }
          if (id.includes('/pages/widget-page')) {
            return 'widget-page';
          }
          if (id.includes('/pages/calibration-page')) {
            return 'calibration-page';
          }
          if (id.includes('/pages/onboarding')) {
            return 'onboarding';
          }
          if (id.includes('/pages/email-verification')) {
            return 'email-verification';
          }
          if (id.includes('/pages/signup-page')) {
            return 'signup-page';
          }
          if (id.includes('/pages/resend-verification-page')) {
            return 'resend-verification';
          }
          // Recharts 라이브러리 분리
          if (id.includes('node_modules/recharts')) {
            return 'recharts';
          }
        },
      },
    },
  },
});
