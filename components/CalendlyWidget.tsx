'use client';

import { InlineWidget, PopupButton } from 'react-calendly';

interface CalendlyInlineProps {
  url?: string;
}

export function CalendlyInline({ url = 'https://calendly.com/kev-cadogan300/30min' }: CalendlyInlineProps) {
  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden">
      <InlineWidget url={url} />
    </div>
  );
}

interface CalendlyPopupProps {
  url?: string;
  text?: string;
  className?: string;
}

export function CalendlyPopup({
  url = 'https://calendly.com/kev-cadogan300/30min',
  text = 'Schedule a Call',
  className = ''
}: CalendlyPopupProps) {
  return (
    <PopupButton
      url={url}
      rootElement={document.getElementById('__next') as HTMLElement}
      text={text}
      className={className}
    />
  );
}
