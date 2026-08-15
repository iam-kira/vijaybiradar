import type { SVGProps } from "react";

/**
 * Imperium icon system — single-weight engraved-line marks.
 * Every icon shares a 24x24 grid, 1.5px stroke, round caps/joins, no fill,
 * currentColor — so they read as one bronze/gold family wherever used.
 * Always render with aria-hidden="true"; pair with visible or sr-only text
 * for the accessible name (icons carry no label of their own).
 */

export type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </Base>
  );
}

export function ViolinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3c1.4 0 2.2 1 2 2.2-.2 1.1-1 1.6-1 2.6 0 .8.6 1.2 1.4 1.2.9 0 1.6.7 1.6 1.6 0 1.3-1.2 1.9-1.2 3.1 0 1.6 2 2.3 2 4.4a2.8 2.8 0 0 1-5.6 0c0-1.1.6-1.7.6-2.6 0-.7-.5-1-1.2-1s-1.2.3-1.2 1c0 .9.6 1.5.6 2.6a2.8 2.8 0 0 1-5.6 0c0-2.1 2-2.8 2-4.4 0-1.2-1.2-1.8-1.2-3.1 0-.9.7-1.6 1.6-1.6.8 0 1.4-.4 1.4-1.2 0-1-.8-1.5-1-2.6C9.8 4 10.6 3 12 3Z" />
    </Base>
  );
}

export function MusicNoteIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 18a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      <path d="M11.5 15.5V5.5l7-1.5v10" />
      <path d="M18.5 14a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </Base>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.4" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </Base>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="8" width="18" height="11" rx="1.4" />
      <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
      <path d="M3 13h18" />
    </Base>
  );
}

export function GithubMarkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5 0 3.8 2.4 6.9 5.8 8 .4.1.6-.2.6-.4v-1.6c-2.4.5-2.9-1.1-2.9-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-1.9-.2-4-1-4-4.3 0-.9.3-1.7 1-2.3-.1-.2-.4-1.1.1-2.3 0 0 .8-.2 2.6 1a9 9 0 0 1 4.8 0c1.8-1.2 2.6-1 2.6-1 .5 1.2.2 2.1.1 2.3.6.6 1 1.4 1 2.3 0 3.3-2.1 4.1-4 4.3.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4 3.4-1.1 5.8-4.2 5.8-8 0-4.7-3.8-8.5-8.5-8.5Z" />
    </Base>
  );
}

export function CheckShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5 19 6v6c0 4.5-3 7-7 8.5-4-1.5-7-4-7-8.5V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </Base>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4 21 19H3L12 4Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.6" r="0.4" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
    </Base>
  );
}

export function TowerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3h6l1.5 5-1 1 1 9H8.5l1-9-1-1L9 3Z" />
      <path d="M8 21h8M9.5 9h5" />
    </Base>
  );
}

export function CircuitIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2-2" />
    </Base>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="11" width="14" height="9" rx="1.4" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </Base>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" />
    </Base>
  );
}

export function DiceIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.2" />
      <circle cx="8.3" cy="8.3" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="8.3" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8.3" cy="15.7" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.7" cy="15.7" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function MotorcycleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8.3 17h7.4l-2.2-6h-4l-1 2.6M12.5 11h4l2 3.5M4 14l2.5-3h3" />
    </Base>
  );
}

export function LaurelArchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 20V11a7 7 0 0 1 14 0v9" />
      <path d="M6.5 20V11.5M17.5 20V11.5" />
      <path d="M4 20h16" />
    </Base>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m3 12 3.5-3.5L9 11l3-3 2.5 2.5L18 7l3 3" />
      <path d="m9 11 3.2 3.2a1.4 1.4 0 0 0 2-2L11 9" />
      <path d="M6.5 8.5 4 11" />
    </Base>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7 10M17 5h3v1.5A3.5 3.5 0 0 1 17 10" />
      <path d="M12 14v3M9 20h6l-.7-3H9.7L9 20Z" />
    </Base>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20.5s-7.5-4.6-9.4-9A5 5 0 0 1 12 7a5 5 0 0 1 9.4 4.5c-1.9 4.4-9.4 9-9.4 9Z" />
    </Base>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0c0 4.9 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </Base>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.4" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </Base>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 3.5 2.6 5.4 5.9.7-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.7L12 3.5Z" />
    </Base>
  );
}

export function ClapperIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10.5 19 8l1 5-15 2.5-1-5Z" />
      <path d="m5 10 1.5-3.5M9.5 9l1.5-3.5M14 8l1.5-3.5" />
      <rect x="4" y="13.5" width="16" height="6" rx="1" />
    </Base>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function MuteIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 9.5h3.5L13 6v12l-4.5-3.5H5v-5Z" />
      <path d="m16.5 9.5 4 5M20.5 9.5l-4 5" />
    </Base>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21c4 0 6-2.6 6-6 0-3-2-4.8-3-7-1 1.4-1.6 2-2.6 1.6.6-2 .1-3.8-1-5.1-.3 2.4-1.7 3.7-3.3 5.3C6.4 11.4 6 13 6 15c0 3.4 2 6 6 6Z" />
    </Base>
  );
}

export function ChessPawnIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="6.5" r="2.3" />
      <path d="M9.5 11h5l1.3 4.5H8.2L9.5 11Z" />
      <path d="M7 20.5h10l-.8-3.2H7.8L7 20.5Z" />
    </Base>
  );
}

export function CrossedSwordsIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 4l7 7M20 4l-7 7M4 20l7-7M20 20l-7-7" />
      <path d="M4 4h3M4 4v3M20 4h-3M20 4v3M4 20h3M4 20v-3M20 20h-3M20 20v-3" />
    </Base>
  );
}

export function ChartUpIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 17 9.5 11l3.5 3 6-7" />
      <path d="M15 6.5h4.5V11" />
    </Base>
  );
}

export function FlexArmIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 15c0-3 1.5-4.5 3.5-5.5C10 8.7 10.5 7.5 10 6c1.8.2 2.8 1.5 2.8 3.3 0 1.4-.8 2-.8 3.2 0 1.6 1.3 2.5 2.8 2.5 1.7 0 2.7-1.1 2.7-1.1" />
      <path d="M17.5 13.5c1 0 1.8.8 1.8 1.8v1.2a3.5 3.5 0 0 1-3.5 3.5H9a4 4 0 0 1-4-4v-1" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}
