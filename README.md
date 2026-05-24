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

## ⚡️ Quickstart

### Start with the prebuilt Docker image (recommended)

Every release includes a prebuilt container image, so you can start JAI without installing Python, Node.js, or project dependencies locally.

1. Choose a tagged version from Releases (example uses `latest`).
2. Pull the image:

```shell
docker pull langflow-custom:latest
```

3. Start the container:

```shell
docker run --rm -it -p 7860:7860   -v jai-data:/app/.langflow   --name langflow-custom   langflow-custom:latest
```

4. Open http://localhost:7860.

> Data generated in JAI is persisted in the `jai-data` Docker volume.

## 🧑‍💻 Run from source (clone + env + start backend/frontend)

If you want to develop locally or customize JAI deeply, use the repository source.

### 1) Clone and enter the repository

```shell
git clone https://github.com/langflow-ai/langflow.git
cd langflow
```

### 2) Configure environment variables

Create a local environment file:

```shell
cp .env.example .env
```

Then edit `.env` with the providers and secrets you need (for example OpenAI keys).

### 3) Install dependencies

```shell
make init
```

### 4) Start backend and frontend (two terminals)

Terminal 1 (backend):

```shell
make backend
```

Terminal 2 (frontend):

```shell
make frontend
```

Open http://localhost:3000 for the development UI (hot reload enabled).

For more contributor workflows and troubleshooting, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## 📦 Other install options

### Python CLI install

If you prefer running JAI directly with Python:

```shell
uv pip install langflow -U
```

Run it with:

```shell
uv run langflow run
```

JAI starts at http://127.0.0.1:7860.

### CLI tips

- Check available commands:

  ```shell
  uv run langflow --help
  ```

- Show help for a specific command:

  ```shell
  uv run langflow run --help
  ```

- Run with custom host/port:

  ```shell
  uv run langflow run --host 0.0.0.0 --port 7860
  ```

- Use a local `.env` file before launching:

  ```shell
  set -a && source .env && set +a
  uv run langflow run
  ```

### Development setup

To build and run from source in one command:

```shell
make run_cli
```

For detailed development instructions, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## 🛡️ Security

For security information, reporting guidance, and supported versions, see our [Security Policy](./SECURITY.md).

## 🚀 Deployment

JAI is completely open source and you can deploy it to all major deployment clouds.
