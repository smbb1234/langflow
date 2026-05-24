import * as Form from "@radix-ui/react-form";
import type { LoginTheme } from "../theme";
import { CustomLink } from "@/customization/components/custom-link";
import InputComponent from "../../../components/core/parameterRenderComponent/components/inputComponent";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

type LoginAuthPanelProps = {
  theme: LoginTheme;
  username: string;
  password: string;
  isPending: boolean;
  rememberDevice: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberDeviceChange: (checked: boolean) => void;
  onGoogleSignIn?: () => void;
  onMicrosoftSignIn?: () => void;
  onSamlSignIn?: () => void;
  onForgotPassword?: () => void;
};

export function LoginAuthPanel(props: LoginAuthPanelProps): JSX.Element {
  const submitDisabled =
    props.isPending || !props.username.trim() || !props.password.trim();

  return (
    <div
      className="flex h-full min-w-0 flex-1 flex-col gap-[2px] overflow-hidden border p-[2px]"
      style={{
        borderColor: props.theme.borderPrimary,
        backgroundColor: props.theme.panelBackground,
      }}
    >
      <div
        className="flex w-full items-center justify-between border px-6 py-4"
        style={{ borderColor: props.theme.borderPrimary }}
      >
        <span className="text-[11px]" style={{ color: props.theme.textMuted }}>
          v3.4.0 · build 2026.05.18
        </span>
        <div
          className="flex items-center gap-[10px] text-[11px]"
          style={{ color: props.theme.textMuted }}
        >
          <span
            className="rounded-[4px] px-[6px] py-[2px] text-[10px]"
            style={{
              backgroundColor: props.theme.statusBadgeBackground,
              color: props.theme.statusBadgeText,
            }}
          >
            ● OPERATIONAL
          </span>
          <span>SOC 2 · ISO 27001</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto px-[60px] pb-6 pt-[60px]">
        <div className="w-full max-w-[570px] space-y-6">
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-[6px] border px-[10px] py-1 text-[11px] font-semibold"
            style={{
              borderColor: props.theme.borderStrong,
              backgroundColor: props.theme.badgeBackground,
              color: props.theme.badgeText,
            }}
          >
          ✦ AGENTIC WORKSPACE
          </span>

          <div className="space-y-2">
            <h2 className="text-[32px] font-bold" style={{ color: props.theme.textPrimary }}>
              Welcome back
            </h2>
            <p className="text-[14px] leading-[22px]" style={{ color: props.theme.textMuted }}>
              Continue where your agents left off — your runs, approvals, and trace history are preserved.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => props.onGoogleSignIn?.()}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[8px] border px-4 text-[13px] font-medium"
            style={{
              borderColor: props.theme.buttonSecondaryBorder,
              backgroundColor: props.theme.buttonSecondaryBackground,
              color: props.theme.buttonSecondaryText,
            }}
          >
            <span aria-hidden="true" className="text-[14px] font-bold" style={{ color: "#ef4444" }}>
              G
            </span>
            Google
          </button>
          <button
            type="button"
            onClick={() => props.onMicrosoftSignIn?.()}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[8px] border px-4 text-[13px] font-medium"
            style={{
              borderColor: props.theme.buttonSecondaryBorder,
              backgroundColor: props.theme.buttonSecondaryBackground,
              color: props.theme.buttonSecondaryText,
            }}
          >
            <span aria-hidden="true" className="text-[14px] font-bold" style={{ color: props.theme.warning }}>
              ⊞
            </span>
            Microsoft
          </button>
          </div>

        <button
          type="button"
          onClick={() => props.onSamlSignIn?.()}
          className="h-[43px] w-full rounded-[8px] border px-4 text-[13px] font-medium"
          style={{
            borderColor: props.theme.buttonSecondaryBorder,
            backgroundColor: props.theme.buttonSecondaryBackground,
            color: props.theme.buttonSecondaryText,
          }}
        >
          🔒 Continue with SAML SSO (acme.com)
        </button>

        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: props.theme.separator }} />
          <span className="text-[10px] font-semibold" style={{ color: props.theme.textMuted }}>
            OR WITH EMAIL
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: props.theme.separator }} />
        </div>

        <div className="w-full max-w-[450px] space-y-6">
        <Form.Field name="username" className="space-y-2">
          <Form.Label className="text-[12px] font-medium" style={{ color: props.theme.textMuted }}>
            Work email
          </Form.Label>
          <Form.Control asChild>
            <Input
              value={props.username}
              onChange={(event) => props.onUsernameChange(event.target.value)}
              placeholder="priya.menon@acme.com"
              className="h-[41px] rounded-[8px] border px-[14px] py-[10px] text-[13px]"
              style={{
                borderColor: props.theme.buttonSecondaryBorder,
                backgroundColor: props.theme.buttonSecondaryBackground,
                color: props.theme.textSecondary,
              }}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="password" className="space-y-2">
          <div className="flex items-center justify-between">
            <Form.Label className="text-[12px] font-medium" style={{ color: props.theme.textMuted }}>
              Password
            </Form.Label>
            <button
              type="button"
              onClick={() => props.onForgotPassword?.()}
              className="text-[12px]"
              style={{ color: props.theme.accent }}
            >
              Forgot?
            </button>
          </div>
          <InputComponent
            onChange={(value) => props.onPasswordChange(value)}
            value={props.password}
            isForm
            password={true}
            required
            placeholder="Password"
            className="h-[41px] w-full rounded-[8px] border text-[13px]"
            style={{
              borderColor: props.theme.buttonSecondaryBorder,
              backgroundColor: props.theme.buttonSecondaryBackground,
              color: props.theme.textSecondary,
            }}
          />
        </Form.Field>

        <label className="flex items-center gap-[10px] text-[13px]" style={{ color: props.theme.textMuted }}>
          <input
            type="checkbox"
            checked={props.rememberDevice}
            onChange={(event) =>
              props.onRememberDeviceChange(event.target.checked)
            }
            className="h-4 w-4 rounded-[4px]"
            style={{ accentColor: props.theme.accent }}
          />
          Remember this device for 30 days
        </label>

        <Form.Submit asChild>
          <Button
            type="submit"
            disabled={submitDisabled}
            className="h-[56px] w-full rounded-[8px] px-6 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: props.theme.buttonPrimaryBackground,
              color: props.theme.buttonPrimaryText,
            }}
          >
            {props.isPending ? "Signing in..." : "Sign in to workspace  ›"}
          </Button>
        </Form.Submit>

        <CustomLink to="/signup" className="w-full">
          <Button
            // Keep as a non-submit action even when rendered within the login form.
            type="button"
            className="w-full rounded-[8px] px-6 py-[14px] text-[15px] font-semibold"
            style={{
              backgroundColor: props.theme.signUpBackground,
              color: props.theme.signUpText,
            }}
          >
            Sign up
          </Button>
        </CustomLink>

        <div
          className="flex w-full gap-[10px] rounded-[6px] border px-3 py-2.5"
          style={{
            borderColor: props.theme.borderPrimary,
            backgroundColor: props.theme.cardBackground,
          }}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-[10px] text-[12px]"
            style={{
              backgroundColor: props.theme.badgeBackground,
              color: props.theme.badgeText,
            }}
          >
            ○
          </span>
          <p className="text-[11px]" style={{ color: props.theme.textMuted }}>
            You'll authenticate against your tenant policy. Least-privilege
            scopes are provisioned per session and rotate every 24h.
          </p>
        </div>

        <p className="text-center text-[12px]" style={{ color: props.theme.textMuted }}>
          New here? Request access ·{" "}
          <button type="button" className="font-medium" style={{ color: props.theme.accent }}>
            What's new
          </button>
        </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-[60px] pb-6 pt-4 text-[11px]" style={{ color: props.theme.textMuted }}>
        <span>© 2026 Diagonal Matrix · All rights reserved</span>
        <div className="flex items-center gap-3">
          <button type="button">Privacy</button>
          <button type="button">Terms</button>
          <button type="button">Trust Center</button>
        </div>
      </div>
    </div>
  );
}
