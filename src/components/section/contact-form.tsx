"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

const LS_KEY = "contact_blocked_until";

function formatRemaining(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";

export function ContactForm() {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    submitContact,
    null
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmedRef = useRef(false);

  // On mount: restore blocked state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      const until = parseInt(stored, 10);
      if (until > Date.now()) {
        setBlockedUntil(until);
      } else {
        localStorage.removeItem(LS_KEY);
      }
    }
  }, []);

  // On server response: persist the block expiry to localStorage
  useEffect(() => {
    if (!state) return;
    if (state.blockedUntil) {
      localStorage.setItem(LS_KEY, String(state.blockedUntil));
      setBlockedUntil(state.blockedUntil);
    }
    if (state.success) {
      formRef.current?.reset();
    }
    setShowConfirm(false);
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirmedRef.current) {
      e.preventDefault();
      setShowConfirm(true);
      return;
    }
    confirmedRef.current = false;
  };

  const handleConfirm = () => {
    confirmedRef.current = true;
    formRef.current?.requestSubmit();
  };

  const remaining = blockedUntil ? blockedUntil - Date.now() : 0;
  const isBlocked = remaining > 0;

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      {/* Blocked from a PREVIOUS session — only show when there is no fresh action result */}
      {isBlocked && !state && (
        <div className="flex items-start gap-2.5 text-sm rounded-lg px-4 py-3 bg-red-500/10 text-red-600 dark:text-red-400">
          <span>
            You already sent a message. You can send another in{" "}
            <strong>{formatRemaining(remaining)}</strong>.
          </span>
        </div>
      )}

      {/* Current action result — success or error from this session */}
      {state && !showConfirm && (
        <div
          className={cn(
            "flex items-start gap-2.5 text-sm rounded-lg px-4 py-3",
            state.success
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          )}
        >
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="full_name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="John Doe"
            required
            disabled={isPending || isBlocked}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            disabled={isPending || isBlocked}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Your message..."
          required
          disabled={isPending || isBlocked}
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {/* Confirmation panel */}
      {showConfirm && !isBlocked && (
        <div className="flex flex-col gap-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm">
          <div className="flex items-start gap-2.5 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="size-4 mt-0.5 shrink-0 text-amber-500" />
            <span>
              Once sent, the send button will be disabled for{" "}
              <strong>24 hours</strong>. Are you sure?
            </span>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowConfirm(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleConfirm}
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Yes, send it"}
            </Button>
          </div>
        </div>
      )}

      {!showConfirm && (
        <Button
          type="submit"
          disabled={isPending || isBlocked}
          className="w-full sm:w-auto sm:self-end"
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      )}
    </form>
  );
}
