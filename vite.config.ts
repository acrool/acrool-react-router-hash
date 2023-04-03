import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'node:path';
import {visualizer} from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer() as Plugin,
        eslint(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        sourcemap: process.env.NODE_ENV !== 'production',
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: (format) => `bear-react-router-hash.${format}.js`,
        },
        cssTarget: 'chrome61',
        rollupOptions: {
            external: ['react', 'react-dom', 'react-router-dom', 'history'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    define: {
        __DEV__: false,
    }
});
