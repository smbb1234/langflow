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
    <section
      className="flex h-screen w-full flex-col lg:min-w-[570px] lg:flex-1"
      style={{ backgroundColor: props.theme.authBg }}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-[60px] pt-[60px]">
        <div className="w-[450px] max-w-full">
          <h2 className="text-[34px] font-bold leading-[42px]" style={{ color: props.theme.authTitle }}>
            Welcome back
          </h2>
          <p className="mt-3 text-[14px] leading-[22px]" style={{ color: props.theme.authBody }}>
            Continue where your agents left off — runs, approvals and trace history are preserved.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => props.onGoogleSignIn?.()}
              className="flex h-[44px] w-[219px] items-center justify-center gap-2 rounded-[8px] border text-[13px] font-medium"
              style={{ backgroundColor: props.theme.controlBg, borderColor: props.theme.controlBorder, color: props.theme.controlText }}
            >
              <span aria-hidden="true" className="font-semibold text-[#DB4437]">
                G
              </span>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => props.onMicrosoftSignIn?.()}
              className="flex h-[44px] w-[219px] items-center justify-center gap-2 rounded-[8px] border text-[13px] font-medium"
              style={{ backgroundColor: props.theme.controlBg, borderColor: props.theme.controlBorder, color: props.theme.controlText }}
            >
              <span aria-hidden="true" className="grid h-3.5 w-3.5 grid-cols-2 gap-[1px]">
                <span className="bg-[#F25022]" />
                <span className="bg-[#7FBA00]" />
                <span className="bg-[#00A4EF]" />
                <span className="bg-[#FFB900]" />
              </span>
              <span>Microsoft</span>
            </button>
          </div>

          <button type="button" onClick={() => props.onSamlSignIn?.()} className="mt-3 h-[43px] w-full rounded-[8px] border text-[13px] font-medium" style={{backgroundColor: props.theme.controlBg, borderColor: props.theme.controlBorder, color: props.theme.controlText}}>
            Continue with SAML SSO (acme.com)
          </button>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1" style={{ backgroundColor: props.theme.divider }} />
            <span className="text-[10px] font-semibold" style={{ color: props.theme.dividerText }}>OR WITH EMAIL</span>
            <div className="h-px flex-1" style={{ backgroundColor: props.theme.divider }} />
          </div>

          <Form.Field name="username" className="mt-4 space-y-2">
            <Form.Label className="text-[12px]" style={{ color: props.theme.authLabel }}>Work email</Form.Label>
            <Form.Control asChild>
              <Input
                value={props.username}
                onChange={(event) => props.onUsernameChange(event.target.value)}
                placeholder="priya.menon@acme.com"
                className="h-[41px] w-full rounded-[8px] border px-3 text-[13px]"
                style={{
                  backgroundColor: props.theme.controlBg,
                  borderColor: props.theme.controlBorder,
                  color: props.theme.controlText,
                }}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="password" className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <Form.Label className="text-[12px]" style={{ color: props.theme.authLabel }}>Password</Form.Label>
              <button type="button" onClick={() => props.onForgotPassword?.()} className="text-[12px]" style={{ color: props.theme.link }}>Forgot?</button>
            </div>
            <InputComponent
              onChange={(value) => props.onPasswordChange(value)}
              value={props.password}
              isForm
              password={true}
              required
              placeholder="Password"
              className="h-[41px] w-full rounded-[8px] border text-[13px]"
              style={{ backgroundColor: props.theme.controlBg, borderColor: props.theme.controlBorder, color: props.theme.controlText }}
            />
          </Form.Field>

          <label className="mt-4 flex items-center gap-[10px] text-[13px]" style={{ color: props.theme.authMuted }}>
            <input
              type="checkbox"
              checked={props.rememberDevice}
              onChange={(event) => props.onRememberDeviceChange(event.target.checked)}
              className="h-4 w-4 rounded"
              style={{ accentColor: props.theme.checkboxBg }}
            />
            Remember this device for 30 days
          </label>

          <Form.Submit asChild>
            <Button type="submit" disabled={submitDisabled} className="mt-4 h-[56px] w-full rounded-[8px] text-[15px] font-semibold" style={{ backgroundColor: props.theme.primaryButtonBg, color: props.theme.primaryButtonText }}>
              {props.isPending ? "Signing in..." : "Sign in to workspace ›"}
            </Button>
          </Form.Submit>

          <CustomLink to="/signup" className="block w-full">
            <Button type="button" className="mt-3 h-[50px] w-full rounded-[8px] border text-[15px] font-semibold" style={{ backgroundColor: props.theme.signUpBg, borderColor: props.theme.signUpBorder, color: props.theme.signUpText }}>
              Sign up
            </Button>
          </CustomLink>

          <div className="mt-4 rounded-[8px] border px-3 py-2.5" style={{ backgroundColor: props.theme.securityBg, borderColor: props.theme.securityBorder }}>
            <p className="text-[11px]" style={{ color: props.theme.securityText }}>
              You&apos;ll authenticate against your tenant policy. <span style={{ color: props.theme.securityStrong, fontWeight: 600 }}>Least-privilege scopes</span> are provisioned per session and rotate every 24h.
            </p>
          </div>

          <p className="mt-3 text-[12px]" style={{ color: props.theme.authMuted }}>
            New here? <button type="button" style={{ color: props.theme.link }}>Request access</button> · <button type="button" style={{ color: props.theme.link }}>What&apos;s new</button>
          </p>
        </div>
      </div>

      <div className="flex h-[56px] items-center justify-between px-[60px] text-[11px]" style={{ color: props.theme.footerText }}>
        <span>© 2026 Diagonal Matrix · All rights reserved</span>
        <div className="flex items-center gap-3">
          <button type="button">Privacy</button>
          <button type="button">Terms</button>
          <button type="button">Trust Center</button>
        </div>
      </div>
    </section>
  );
}
