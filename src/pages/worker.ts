import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// This is the entry point for the web worker
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};