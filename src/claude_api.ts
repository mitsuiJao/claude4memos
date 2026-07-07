import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

const PROMPTS_PATH = join(process.cwd(), 'data', 'prompts.json');

function loadPrompts(): Record<string, string> {
  const raw = readFileSync(PROMPTS_PATH, 'utf-8');
  return JSON.parse(raw) as Record<string, string>;
}

export function getValidTags(): string[] {
  return Object.keys(loadPrompts());
}

const client = new Anthropic({ apiKey: process.env.CLAUDE_API });

export async function callClaude(tag: string, content: string): Promise<string> {
  const prompts = loadPrompts();
  const systemPrompt = prompts[tag];
  if (!systemPrompt) throw new Error(`Unknown tag: ${tag}`);

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16384,
    system: systemPrompt,
    messages: [{ role: 'user', content }],
	tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5,
      },
      {
        type: "web_fetch_20250910",
        name: "web_fetch",
        max_uses: 3,
        citations: { enabled: true },
      }
    ],
  });
  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Unexpected response type');
  return block.text;
}
