import { workspaceLightTheme } from "../theme";

describe("workspaceLightTheme", () => {
  it("uses non-pure-white backgrounds and updated shadow", () => {
    expect(workspaceLightTheme.pageBg).toBe("#eef2f4");
    expect(workspaceLightTheme.panelBg).toBe("#f8fafb");
    expect(workspaceLightTheme.surface).toBe("#fdfdfd");
    expect(workspaceLightTheme.surfaceBase).toBe("#f2f4f7");
    expect(workspaceLightTheme.surfaceMuted).toBe("#eef1f4");
    expect(workspaceLightTheme.inputBg).toBe("#f5f6f9");
    expect(workspaceLightTheme.panelBorder).toBe("#d8dde3");
    expect(workspaceLightTheme.shadowSoft).toBe("0 6px 18px rgba(15, 23, 42, 0.08)");
    [workspaceLightTheme.pageBg, workspaceLightTheme.panelBg, workspaceLightTheme.surface, workspaceLightTheme.surfaceBase, workspaceLightTheme.inputBg].forEach((color) => expect(color).not.toBe("#ffffff"));
  });
});
