import { render, screen } from '@testing-library/react';
import App from './App';
const {expect} = require("chai");
const {ethers} = require("hardhat")
require("@nomicfoundation/hardhat-foundry");

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
