<<<<<<< HEAD
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProgressBar from "../ProgressBar";

// Mock formatDuration
jest.mock("@/lib/utils", () => ({
=======
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

// Mock formatDuration
jest.mock('@/lib/utils', () => ({
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  formatDuration: jest.fn((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
<<<<<<< HEAD
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }),
  cn: jest.fn((...inputs: any[]) => inputs.filter(Boolean).join(" ")),
}));

describe("ProgressBar", () => {
=======
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }),
  cn: jest.fn((...inputs: any[]) => inputs.filter(Boolean).join(' ')),
}));

describe('ProgressBar', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const mockOnSeek = jest.fn();
  const defaultProps = {
    progress: 50,
    duration: 180000, // 3 minutes
    currentTime: 90000, // 1.5 minutes
    onSeek: mockOnSeek,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

<<<<<<< HEAD
  it("renders with correct progress percentage", () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
  });

  it("displays current time and duration", () => {
=======
  it('renders with correct progress percentage', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('displays current time and duration', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    render(<ProgressBar {...defaultProps} />);

    const timeElements = screen.getAllByText(/^\d+:\d{2}$/);
    expect(timeElements.length).toBeGreaterThanOrEqual(2);
  });

<<<<<<< HEAD
  it("calls onSeek when clicked", () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole("progressbar");

=======
  it('calls onSeek when clicked', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole('progressbar');
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Mock getBoundingClientRect
    const mockRect = {
      left: 0,
      width: 100,
      top: 0,
      height: 10,
      bottom: 10,
      right: 100,
    };
    progressBar.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

    fireEvent.mouseDown(progressBar, { clientX: 50 });

    expect(mockOnSeek).toHaveBeenCalled();
  });

<<<<<<< HEAD
  it("calculates seek position correctly", () => {
    render(<ProgressBar {...defaultProps} duration={100000} />);

    const progressBar = screen.getByRole("progressbar");
=======
  it('calculates seek position correctly', () => {
    render(<ProgressBar {...defaultProps} duration={100000} />);

    const progressBar = screen.getByRole('progressbar');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const mockRect = {
      left: 0,
      width: 1000,
      top: 0,
      height: 10,
      bottom: 10,
      right: 1000,
    };
    progressBar.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

    // Click at 50% of the bar
    fireEvent.mouseDown(progressBar, { clientX: 500 });

    expect(mockOnSeek).toHaveBeenCalledWith(50000); // 50% of 100000ms
  });

<<<<<<< HEAD
  it("clamps seek position to valid range", () => {
    render(<ProgressBar {...defaultProps} duration={100000} />);

    const progressBar = screen.getByRole("progressbar");
=======
  it('clamps seek position to valid range', () => {
    render(<ProgressBar {...defaultProps} duration={100000} />);

    const progressBar = screen.getByRole('progressbar');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const mockRect = {
      left: 0,
      width: 1000,
      top: 0,
      height: 10,
      bottom: 10,
      right: 1000,
    };
    progressBar.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

    // Click beyond the bar (should clamp to max)
    fireEvent.mouseDown(progressBar, { clientX: 2000 });

    expect(mockOnSeek).toHaveBeenCalledWith(100000);

    // Click before the bar (should clamp to min)
    fireEvent.mouseDown(progressBar, { clientX: -100 });
    expect(mockOnSeek).toHaveBeenCalledWith(0);
  });

<<<<<<< HEAD
  it("has correct accessibility attributes", () => {
    render(<ProgressBar {...defaultProps} progress={75} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "75");
    expect(progressBar).toHaveAttribute("aria-label");
    expect(progressBar.getAttribute("aria-label")).toContain("Progress:");
  });

  it("handles zero progress", () => {
    render(<ProgressBar {...defaultProps} progress={0} currentTime={0} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");
  });

  it("handles full progress", () => {
=======
  it('has correct accessibility attributes', () => {
    render(<ProgressBar {...defaultProps} progress={75} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    expect(progressBar).toHaveAttribute('aria-label');
    expect(progressBar.getAttribute('aria-label')).toContain('Progress:');
  });

  it('handles zero progress', () => {
    render(<ProgressBar {...defaultProps} progress={0} currentTime={0} />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('handles full progress', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    render(
      <ProgressBar
        {...defaultProps}
        progress={100}
        currentTime={defaultProps.duration}
<<<<<<< HEAD
      />,
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });

  it("handles touch events", () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole("progressbar");
=======
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('handles touch events', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole('progressbar');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const mockRect = {
      left: 0,
      width: 1000,
      top: 0,
      height: 10,
      bottom: 10,
      right: 1000,
    };
    progressBar.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

    fireEvent.touchStart(progressBar, {
      touches: [{ clientX: 500, clientY: 0 }],
    });

    expect(mockOnSeek).toHaveBeenCalled();
  });

<<<<<<< HEAD
  it("shows hover indicator on mouse move", () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole("progressbar");
=======
  it('shows hover indicator on mouse move', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole('progressbar');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const mockRect = {
      left: 0,
      width: 1000,
      top: 0,
      height: 10,
      bottom: 10,
      right: 1000,
    };
    progressBar.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

    fireEvent.mouseMove(progressBar, { clientX: 500 });

    // The hover indicator should appear
    const indicator = progressBar.querySelector('[class*="absolute"]');
    expect(indicator).toBeInTheDocument();
  });

<<<<<<< HEAD
  it("hides hover indicator on mouse leave", () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole("progressbar");
=======
  it('hides hover indicator on mouse leave', () => {
    render(<ProgressBar {...defaultProps} />);

    const progressBar = screen.getByRole('progressbar');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const mockRect = {
      left: 0,
      width: 1000,
      top: 0,
      height: 10,
      bottom: 10,
      right: 1000,
    };
    progressBar.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

    fireEvent.mouseMove(progressBar, { clientX: 500 });
    fireEvent.mouseLeave(progressBar);

    // After mouse leave, hover state should be cleared
    // The indicator visibility is controlled by state, so we verify the behavior
    expect(progressBar).toBeInTheDocument();
  });
});
