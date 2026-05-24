<!-- markdownlint-disable MD030 -->

# JAI

JAI is a powerful platform for building and deploying AI-powered agents and workflows. It provides developers with both a visual authoring experience and built-in API and MCP servers that turn every workflow into a tool that can be integrated into applications built on any framework or stack. JAI comes with batteries included and supports all major LLMs, vector databases, and a growing library of AI tools.

## ✨ Highlight features

- **Visual builder interface** to quickly get started and iterate.
- **Source code access** lets you customize any component using Python.
- **Interactive playground** to immediately test and refine your flows with step-by-step control.
- **Multi-agent orchestration** with conversation management and retrieval.
- **Deploy as an API** or export as JSON for Python apps.
- **Deploy as an MCP server** and turn your flows into tools for MCP clients.
- **Observability** with LangSmith, LangFuse, and other integrations.
- **Enterprise-ready** security and scalability.

## 🆕 Recent UI updates

The latest frontend refresh focused on the **Login** and **Agent Workspace** experiences:

- **Light/Dark theme parity** for login and agent workspace pages with shared, typed theme tokens.
- **Refreshed login UX** with improved panel hierarchy, copy, sizing, and visual clarity.
- **Agent workspace v2 layout polish** across top bar, prompt input, trace console bar, run sidebar, and inspector panels.
- **Updated frontend tests** to reflect the new sign-in copy and UI expectations.

These updates help align the day-to-day authoring flow with a cleaner, more consistent visual system while preserving existing JAI workflow behavior.

## 🖥️ JAI Desktop

JAI Desktop is the easiest way to get started with JAI. All dependencies are included, so you don't need to manage Python environments or install packages manually.
Available for Windows and macOS.

## ⚡️ Quickstart

### Install locally (recommended)

Requires Python 3.10–3.13 and [uv](https://docs.astral.sh/uv/getting-started/installation/) (recommended package manager).

#### Install

From a fresh directory, run:

```shell
uv pip install jai -U
```

#### Run

To start JAI, run:

```shell
uv run jai run
```

JAI starts at http://127.0.0.1:7860.

That's it! You're ready to build with JAI! 🎉

## 📦 Other install options

### Run from source

If you've cloned this repository and want to contribute, run this command from the repository root:

```shell
make run_cli
```

For more information, see [DEVELOPMENT.md](./DEVELOPMENT.md).

### Docker

Start a JAI container with default settings:

```shell
docker run -p 7860:7860 jai:latest
```

JAI is available at http://localhost:7860/.

## 🛡️ Security

For security information, see our [Security Policy](./SECURITY.md).

## 🚀 Deployment

JAI is completely open source and you can deploy it to all major deployment clouds.
