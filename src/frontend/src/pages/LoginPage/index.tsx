import * as Form from "@radix-ui/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoginUser } from "@/controllers/API/queries/auth";
import { useSanitizeRedirectUrl } from "@/hooks/use-sanitize-redirect-url";
import { LoginAuthPanel } from "./components/LoginAuthPanel";
import { LoginBrandPanel } from "./components/LoginBrandPanel";
import { loginDarkTheme, loginLightTheme } from "./theme";
import { CONTROL_LOGIN_STATE } from "../../constants/constants";
import { AuthContext } from "../../contexts/authContext";
import useAlertStore from "../../stores/alertStore";
import { useDarkStore } from "../../stores/darkStore";
import type { LoginType } from "../../types/api";
import type {
  inputHandlerEventType,
  loginInputStateType,
} from "../../types/components";

export default function LoginPage(): JSX.Element {
  const dark = useDarkStore((state) => state.dark);
  const theme = dark ? loginDarkTheme : loginLightTheme;
  const [inputState, setInputState] =
    useState<loginInputStateType>(CONTROL_LOGIN_STATE);
  const [rememberDevice, setRememberDevice] = useState(true);

  const { password, username } = inputState;

  useSanitizeRedirectUrl();

  const { t } = useTranslation();
  const { login, clearAuthSession } = useContext(AuthContext);
  const setErrorData = useAlertStore((state) => state.setErrorData);

  function handleInput({
    target: { name, value },
  }: inputHandlerEventType): void {
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  const { mutate, isPending } = useLoginUser();
  const queryClient = useQueryClient();

  function signIn() {
    const user: LoginType = {
      username: username.trim(),
      password: password.trim(),
    };

    mutate(user, {
      onSuccess: (data) => {
        clearAuthSession();
        login(data.access_token, "login", data.refresh_token);
        queryClient.clear();
      },
      onError: (error) => {
        const detail =
          error?.response?.data?.detail ||
          error?.message ||
          t("errors.generic");

        setErrorData({
          title: t("errors.signin"),
          list: [detail],
        });
      },
    });
  }

  return (
    <Form.Root
      onSubmit={(event) => {
        event.preventDefault();
        if (!username.trim() || !password.trim() || isPending) return;
        signIn();
      }}
      className="min-h-screen w-full"
    >
      <div className="flex min-h-screen w-full gap-[2px] p-[2px] lg:flex-row max-lg:flex-col"
        style={{ backgroundColor: theme.pageBackground }}>
        <LoginBrandPanel theme={theme} />
        <LoginAuthPanel
          theme={theme}
          username={username}
          password={password}
          isPending={isPending}
          rememberDevice={rememberDevice}
          onUsernameChange={(value) =>
            handleInput({ target: { name: "username", value } })
          }
          onPasswordChange={(value) =>
            handleInput({ target: { name: "password", value } })
          }
          onRememberDeviceChange={(checked) => setRememberDevice(checked)}
        />
      </div>
    </Form.Root>
  );
}
