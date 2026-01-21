<<<<<<< HEAD
import { render, screen, fireEvent } from "@testing-library/react";
import ControlButton from "../ControlButton";
import { Shuffle } from "lucide-react";

describe("ControlButton", () => {
=======
import { render, screen, fireEvent } from '@testing-library/react';
import ControlButton from '../ControlButton';
import { Shuffle } from 'lucide-react';

describe('ControlButton', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

<<<<<<< HEAD
  it("renders with children", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button">
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button">
        Click me
      </ControlButton>,
    );

    const button = screen.getByRole("button");
=======
  it('renders with children', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button">
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button">
        Click me
      </ControlButton>
    );

    const button = screen.getByRole('button');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

<<<<<<< HEAD
  it("does not call onClick when disabled", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" disabled>
        Click me
      </ControlButton>,
    );

    const button = screen.getByRole("button");
=======
  it('does not call onClick when disabled', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" disabled>
        Click me
      </ControlButton>
    );

    const button = screen.getByRole('button');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

<<<<<<< HEAD
  it("has correct aria-label", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Shuffle toggle">
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button", { name: /shuffle toggle/i });
    expect(button).toHaveAttribute("aria-label", "Shuffle toggle");
  });

  it("shows active state with correct classes", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" active>
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-spotify-green");
  });

  it("shows inactive state with correct classes", () => {
    render(
      <ControlButton
        onClick={mockOnClick}
        ariaLabel="Test button"
        active={false}
      >
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-spotify-text-gray");
    expect(button).not.toHaveClass("text-spotify-green");
  });

  it("sets aria-pressed when provided", () => {
    render(
      <ControlButton
        onClick={mockOnClick}
        ariaLabel="Test button"
        ariaPressed={true}
      >
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("has disabled attribute when disabled", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" disabled>
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("uses title when provided", () => {
    render(
      <ControlButton
        onClick={mockOnClick}
        ariaLabel="Test button"
        title="Custom title"
      >
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("title", "Custom title");
  });

  it("falls back to ariaLabel for title when title not provided", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Fallback title">
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("title", "Fallback title");
  });

  it("applies custom className", () => {
    render(
      <ControlButton
        onClick={mockOnClick}
=======
  it('has correct aria-label', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Shuffle toggle">
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button', { name: /shuffle toggle/i });
    expect(button).toHaveAttribute('aria-label', 'Shuffle toggle');
  });

  it('shows active state with correct classes', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" active>
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-spotify-green');
  });

  it('shows inactive state with correct classes', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" active={false}>
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-spotify-text-gray');
    expect(button).not.toHaveClass('text-spotify-green');
  });

  it('sets aria-pressed when provided', () => {
    render(
      <ControlButton 
        onClick={mockOnClick} 
        ariaLabel="Test button" 
        ariaPressed={true}
      >
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('has disabled attribute when disabled', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button" disabled>
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('uses title when provided', () => {
    render(
      <ControlButton 
        onClick={mockOnClick} 
        ariaLabel="Test button" 
        title="Custom title"
      >
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Custom title');
  });

  it('falls back to ariaLabel for title when title not provided', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Fallback title">
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Fallback title');
  });

  it('applies custom className', () => {
    render(
      <ControlButton 
        onClick={mockOnClick} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        ariaLabel="Test button"
        className="custom-class"
      >
        <Shuffle />
<<<<<<< HEAD
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("has correct base classes", () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button">
        <Shuffle />
      </ControlButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("border-none");
    expect(button).toHaveClass("transition-colors");
    expect(button).toHaveClass("cursor-pointer");
=======
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has correct base classes', () => {
    render(
      <ControlButton onClick={mockOnClick} ariaLabel="Test button">
        <Shuffle />
      </ControlButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border-none');
    expect(button).toHaveClass('transition-colors');
    expect(button).toHaveClass('cursor-pointer');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  });
});
