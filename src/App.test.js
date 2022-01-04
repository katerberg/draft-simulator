import { screen, render } from '@testing-library/react';
import App from './App';

describe('App', () =>{
  it('renders upload button', () => {
    render(<App />);

    expect(screen.getByText('Upload')).toBeInTheDocument();
  });
});
