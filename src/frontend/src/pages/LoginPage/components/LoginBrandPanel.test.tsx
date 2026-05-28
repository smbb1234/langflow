import { render, screen } from "@testing-library/react";
import { LoginBrandPanel } from "./LoginBrandPanel";
import { loginLightTheme } from "../theme";

jest.mock("@/stores/darkStore", () => ({
  useDarkStore: (selector: (state: { dark: boolean }) => boolean) => selector({ dark: false }),
}));

describe("LoginBrandPanel", () => {
  it("renders dark Jai logo even when dark mode store is false", () => {
    render(<LoginBrandPanel theme={loginLightTheme} />);
    const logo = screen.getByAltText("JAI — No-Code Agentic AI Platform by Diagonal Matrix") as HTMLImageElement;
    expect(logo.src).toContain("/jai/jai-logo-dark.png");
  });
});
