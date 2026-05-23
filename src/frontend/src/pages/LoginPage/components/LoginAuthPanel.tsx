import * as Form from "@radix-ui/react-form";
import { CustomLink } from "@/customization/components/custom-link";
import InputComponent from "../../../components/core/parameterRenderComponent/components/inputComponent";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

type LoginAuthPanelProps = {
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
    <div className="flex h-full min-w-0 flex-1 flex-col gap-[2px] overflow-hidden border border-[#1e293b] bg-[#0a1018] p-[2px]">
      <div className="flex w-full items-center justify-between border border-[#1e293b] px-6 py-4">
        <span className="text-[11px] text-[#64748b]">
          v3.4.0 · build 2026.05.18
        </span>
        <div className="flex items-center gap-[10px] text-[11px] text-[#64748b]">
          <span className="rounded-[4px] bg-[#021b0c] px-[6px] py-[2px] text-[10px] text-[#4ade80]">
            ● OPERATIONAL
          </span>
          <span>SOC 2 · ISO 27001</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-8 lg:px-16 lg:py-12">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-[6px] border border-[#334155] bg-[#031d2e] px-[10px] py-1 text-[11px] font-semibold text-[#0ea5e9]">
          ✦ AGENTIC WORKSPACE
        </span>

        <div className="space-y-2">
          <h2 className="text-[32px] font-bold text-[#f1f5f9]">Sign in</h2>
          <p className="text-[14px] leading-[22px] text-[#94a3b8]">
            Continue where your agents left off — runs, approvals, and trace
            history are preserved.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => props.onGoogleSignIn?.()}
            className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#334155] bg-[#0d1420] px-4 py-3 text-[13px] font-medium text-[#cbd5e1]"
          >
            <span
              aria-hidden="true"
              className="text-[14px] font-bold text-[#ef4444]"
            >
              G
            </span>
            Google
          </button>
          <button
            type="button"
            onClick={() => props.onMicrosoftSignIn?.()}
            className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#334155] bg-[#0d1420] px-4 py-3 text-[13px] font-medium text-[#cbd5e1]"
          >
            <span
              aria-hidden="true"
              className="text-[14px] font-bold text-[#fbbf24]"
            >
              ⊞
            </span>
            Microsoft
          </button>
        </div>

        <button
          type="button"
          onClick={() => props.onSamlSignIn?.()}
          className="w-full rounded-[8px] border border-[#334155] bg-[#0d1420] px-4 py-3 text-[13px] font-medium text-[#cbd5e1]"
        >
          🔒 Continue with SAML SSO (acme.com)
        </button>

        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-[#1a2535]" />
          <span className="text-[10px] font-semibold text-[#64748b]">
            OR WITH EMAIL
          </span>
          <div className="h-px flex-1 bg-[#1a2535]" />
        </div>

        <Form.Field name="username" className="space-y-2">
          <Form.Label className="text-[12px] font-medium text-[#94a3b8]">
            Work email
          </Form.Label>
          <Form.Control asChild>
            <Input
              value={props.username}
              onChange={(event) => props.onUsernameChange(event.target.value)}
              placeholder="priya.menon@acme.com"
              className="h-[38px] rounded-[8px] border-[#334155] bg-[#0d1420] px-[14px] py-[10px] text-[13px] text-[#cbd5e1] placeholder:text-[#475569]"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="password" className="space-y-2">
          <div className="flex items-center justify-between">
            <Form.Label className="text-[12px] font-medium text-[#94a3b8]">
              Password
            </Form.Label>
            <button
              type="button"
              onClick={() => props.onForgotPassword?.()}
              className="text-[12px] text-[#0ea5e9]"
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
            className="w-full rounded-[8px] border border-[#334155] bg-[#0d1420] text-[13px] text-[#cbd5e1] placeholder:text-[#475569]"
          />
        </Form.Field>

        <label className="flex items-center gap-[10px] text-[13px] text-[#94a3b8]">
          <input
            type="checkbox"
            checked={props.rememberDevice}
            onChange={(event) =>
              props.onRememberDeviceChange(event.target.checked)
            }
            className="h-4 w-4 rounded-[4px] accent-[#0ea5e9]"
          />
          Remember this device for 30 days
        </label>

        <Form.Submit asChild>
          <Button
            type="submit"
            disabled={submitDisabled}
            className="w-full rounded-[8px] bg-[#0ea5e9] px-6 py-[14px] text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {props.isPending ? "Signing in..." : "Sign in to workspace  ›"}
          </Button>
        </Form.Submit>

        <CustomLink to="/signup" className="w-full">
          <Button
            type="button"
            className="w-full rounded-[8px] bg-[#0ea5e9] px-6 py-[14px] text-[15px] font-semibold text-white"
          >
            Sign up
          </Button>
        </CustomLink>

        <div className="flex w-full gap-[10px] rounded-[6px] border border-[#1e293b] bg-[#0a1018] px-3 py-2.5">
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-[10px] bg-[#031d2e] text-[12px] text-[#0ea5e9]"
          >
            ○
          </span>
          <p className="text-[11px] text-[#64748b]">
            You'll authenticate against your tenant policy. Least-privilege
            scopes are provisioned per session and rotate every 24h.
          </p>
        </div>

        <p className="text-center text-[12px] text-[#64748b]">
          New here? Request access ·{" "}
          <button type="button" className="font-medium text-[#0ea5e9]">
            What's new
          </button>
        </p>
      </div>

      <div className="flex items-center justify-between px-6 pb-6 pt-4 text-[11px] text-[#64748b] lg:px-16">
        <span>© 2026 · All rights reserved</span>
        <div className="flex items-center gap-3">
          <button type="button">Privacy</button>
          <button type="button">Terms</button>
          <button type="button">Trust Center</button>
        </div>
      </div>
    </div>
  );
}
