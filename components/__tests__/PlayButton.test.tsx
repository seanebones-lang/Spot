import { render, screen, fireEvent } from '@testing-library/react';
import PlayButton from '../PlayButton';

describe('PlayButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders play icon when not playing', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /play/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Play');
  });

  it('renders pause icon when playing', () => {
    render(<PlayButton isPlaying={true} onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /pause/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Pause');
  });

  it('calls onClick when clicked', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} disabled />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('has correct size classes for small', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} size="sm" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-8', 'h-8');
  });

  it('has correct size classes for medium (default)', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-12', 'h-12');
  });

  it('has correct size classes for large', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} size="lg" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-16', 'h-16');
  });

  it('sets aria-pressed based on isPlaying', () => {
    const { rerender } = render(<PlayButton isPlaying={false} onClick={mockOnClick} />);

    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');

    rerender(<PlayButton isPlaying={true} onClick={mockOnClick} />);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('has disabled attribute when disabled', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('applies custom className', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has correct base classes', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-spotify-green');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('transition-transform');
  });

  it('shows disabled hover state when disabled', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} disabled />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:scale-100'); // No scale on hover when disabled
  });

  it('shows hover scale effect when enabled', () => {
    render(<PlayButton isPlaying={false} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:scale-105');
    expect(button).not.toHaveClass('hover:scale-100');
  });
});
