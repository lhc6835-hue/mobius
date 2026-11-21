import html from './index.html';
const TYPES = { mp3: 'audio/mpeg', wav: 'audio/wav' };
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/audio/')) {
      const key = decodeURIComponent(url.pathname.slice(1));
      const data = env.AUDIO_KV && await env.AUDIO_KV.get(key, { type: 'arrayBuffer', cacheTtl: 86400 });
      if (!data) return new Response('not found', { status: 404 });
      return new Response(data, { headers: { 'content-type': TYPES[key.split('.').pop()] || 'application/octet-stream', 'cache-control': 'public, max-age=604800', 'access-control-allow-origin': '*' } });
    }
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=300' } });
  }
};
