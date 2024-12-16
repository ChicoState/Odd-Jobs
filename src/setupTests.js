import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills and global definitions
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

