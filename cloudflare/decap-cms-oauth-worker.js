/**
 * OAuth proxy for Decap CMS (public/admin) — GitHub backend.
 *
 * Deploy this as its own Cloudflare Worker. It needs two secrets set in the
 * Worker's settings (Settings -> Variables -> Encrypt), NOT hardcoded here:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 * (from the GitHub OAuth App registered for this purpose)
 *
 * Routes:
 *   GET /auth      -> redirects to GitHub's OAuth authorize screen
 *   GET /callback  -> exchanges the returned code for a token and hands it
 *                     back to the Decap CMS popup window via postMessage
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
      authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
      authorizeUrl.searchParams.set('scope', 'repo,user');
      return Response.redirect(authorizeUrl.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Falta el parámetro "code" de GitHub.', { status: 400 });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const tokenData = await tokenRes.json();

      if (tokenData.error || !tokenData.access_token) {
        return new Response(
          `Error obteniendo el token: ${tokenData.error_description || tokenData.error || 'desconocido'}`,
          { status: 400 }
        );
      }

      const payloadJson = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
      // safe to embed inside a single-quoted JS string literal below
      const escaped = payloadJson.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      const html = `<!doctype html>
<html><body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:' + '${escaped}',
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
</body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    return new Response('Decap CMS OAuth proxy — rutas: /auth, /callback', { status: 200 });
  },
};
