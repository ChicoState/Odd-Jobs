import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';
// import 'node_modules/react-dom/test-utils';

// Polyfills and global definitions
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock react-router-dom's useNavigate
jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

