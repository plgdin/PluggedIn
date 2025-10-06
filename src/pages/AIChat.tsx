import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { CreateWebWorkerMLCEngine, WebWorkerMLCEngine, InitProgressReport } from "@mlc-ai/web-llm";

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const selectedModel = "gemma-2b-it-q4f32_1-MLC";

const AIChat = () => {
  const [engine, setEngine] = useState<WebWorkerMLCEngine | null>(null);
  const [engineInitReport, setEngineInitReport] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I am your PluggedIn AI assistant. How can I help you today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeEngine = async () => {
      const newEngine = await CreateWebWorkerMLCEngine(
        new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
        selectedModel,
        { 
          initProgressCallback: (report: InitProgressReport) => {
            setEngineInitReport(report.text);
          } 
        }
      );
      setEngineInitReport("AI Engine Ready!");
      setTimeout(() => setEngineInitReport(null), 2000);
      setEngine(newEngine);
    };
    initializeEngine();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = currentMessage.trim();
    if (!trimmedMessage || !engine) return;

    const userMessage: Message = { sender: 'user', text: trimmedMessage };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const chunks = await engine.chat.completions.create({
        messages: [{ role: "user", content: trimmedMessage }],
        stream: true,
      });

      let reply = "";
      const botMessage: Message = { sender: 'bot', text: "" };
      setMessages(prev => [...prev, botMessage]);

      for await (const chunk of chunks) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          reply += delta;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = reply;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = { sender: 'bot', text: "Sorry, I had an error processing that." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      await engine.reload(selectedModel);
    }
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto py-8 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
        <Card className="flex-grow flex flex-col w-full max-w-4xl mx-auto">
          <CardContent className="flex-grow overflow-y-auto p-6 space-y-4">
            {engineInitReport && <div className="text-center text-sm text-muted-foreground p-2">{engineInitReport}</div>}
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                <div className={`rounded-lg px-4 py-2 max-w-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="rounded-lg px-4 py-2 max-w-lg bg-muted">
                  <p className="text-sm animate-pulse">...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t bg-background">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              {/* This is the updated Input component */}
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={!engine ? "AI engine is loading..." : "Ask me anything..."}
                className="flex-grow"
                disabled={isLoading || !engine}
                autoFocus
              />
              <Button type="submit" disabled={isLoading || !engine}>Send</Button>
            </form>
          </div>
        </Card>
      </div>
    </AnimatedPage>
  );
};

export default AIChat;