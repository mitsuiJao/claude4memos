const MEMOS_HOST = process.env.MEMOS_HOST!;
const MEMOS_TOKEN = process.env.MEMOS_TOKEN!;

const VISIBILITY_MAP: Record<number, string> = {
  1: 'PRIVATE',
  2: 'PROTECTED',
  3: 'PUBLIC',
};

export async function postComment(memoName: string, content: string, visibility?: number): Promise<void> {
  const visibilityStr = visibility != null ? VISIBILITY_MAP[visibility] : undefined;
  const res = await fetch(`${MEMOS_HOST}/api/v1/${memoName}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MEMOS_TOKEN}`,
    },
    body: JSON.stringify({ content, ...(visibilityStr && { visibility: visibilityStr }) }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to post comment: ${res.status} ${body}`);
  }
}
