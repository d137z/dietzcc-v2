'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ConsentData = {
  decision: 'accepted' | 'rejected' | 'custom';
  consent: { necessary: true; statistics: boolean; marketing: boolean };
  timestamp: string;
};

const STORAGE_KEY = 'dietzcc_cookie_consent';
const OPEN_EVENT = 'dietzcc:openCookieConsent';

export function openCookieConsent() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 700);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: ConsentData = JSON.parse(stored);
          setStatistics(data.consent.statistics);
          setMarketing(data.consent.marketing);
        }
      } catch {}
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const save = (decision: ConsentData['decision'], stats: boolean, market: boolean) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          decision,
          consent: { necessary: true, statistics: stats, marketing: market },
          timestamp: new Date().toISOString(),
        } satisfies ConsentData),
      );
    } catch {}
    setVisible(false);
    setExpanded(false);
  };

  if (pathname === '/skattejagt') return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop (mobil) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 sm:hidden"
            style={{ background: 'rgba(10,10,10,0.4)' }}
            onClick={() => {}} // intentionally blank — brugeren skal tage stilling
          />

          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '110%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie-samtykke"
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px] z-50"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            {/* Header */}
            <div className="p-5 pb-0 flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'var(--accent-muted)' }}
              >
                <Shield size={17} style={{ color: 'var(--accent)' }} strokeWidth={2} />
              </div>
              <div>
                <h2
                  className="font-semibold text-[15px] leading-snug"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-geist-sans)' }}
                >
                  {t.cookie.title}
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {t.cookie.subtitle}
                </p>
              </div>
            </div>

            {/* Brødtekst */}
            <div className="px-5 pt-3">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.cookie.body}
              </p>

              {/* Udvidet cookie-valg */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex flex-col gap-2.5">
                      <CookieToggle
                        label={t.cookie.necessary}
                        description={t.cookie.necessaryDesc}
                        checked={true}
                        disabled
                        onChange={() => {}}
                      />
                      <CookieToggle
                        label={t.cookie.statistics}
                        description={t.cookie.statisticsDesc}
                        checked={statistics}
                        onChange={setStatistics}
                      />
                      <CookieToggle
                        label={t.cookie.marketing}
                        description={t.cookie.marketingDesc}
                        checked={marketing}
                        onChange={setMarketing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1 text-xs mt-3 mb-4 font-medium transition-colors duration-150"
                style={{ color: 'var(--accent)' }}
                aria-expanded={expanded}
              >
                {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {expanded ? t.cookie.hideDetails : t.cookie.showDetails}
              </button>
            </div>

            {/* Knapper */}
            <div
              className="px-5 py-4 flex flex-col-reverse sm:flex-row gap-2 border-t"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {expanded ? (
                <OutlineButton onClick={() => save('custom', statistics, marketing)}>
                  {t.cookie.saveChoice}
                </OutlineButton>
              ) : (
                <OutlineButton onClick={() => save('rejected', false, false)}>
                  {t.cookie.rejectAll}
                </OutlineButton>
              )}
              {!expanded && (
                <OutlineButton onClick={() => setExpanded(true)}>
                  {t.cookie.customize}
                </OutlineButton>
              )}
              <PrimaryButton onClick={() => save('accepted', true, true)}>
                {t.cookie.acceptAll}
              </PrimaryButton>
            </div>

            {/* Legal note */}
            <p
              className="px-5 pb-4 text-[11px] leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.cookie.legal}{' '}
              <a
                href="/privatlivspolitik"
                className="underline underline-offset-2 transition-colors duration-150"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.cookie.legalLink}
              </a>
              {t.cookie.legalEnd}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150"
      style={{ borderRadius: 'var(--radius-btn)', background: 'var(--accent)' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')}
    >
      {children}
    </button>
  );
}

function OutlineButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 px-4 py-2.5 text-sm font-medium border transition-all duration-150"
      style={{
        borderRadius: 'var(--radius-btn)',
        color: 'var(--text-secondary)',
        borderColor: 'var(--border-strong)',
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
        (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
      }}
    >
      {children}
    </button>
  );
}

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
          {label}
        </p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={`Slå ${label}-cookies ${checked ? 'fra' : 'til'}`}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className="flex-shrink-0 mt-0.5 relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2"
        style={{
          background: checked ? 'var(--accent)' : 'var(--border-strong)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.65 : 1,
        }}
      >
        <span
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200"
          style={{ left: checked ? '26px' : '3px' }}
        />
      </button>
    </div>
  );
}
