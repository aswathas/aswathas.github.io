// Cloudflare Pages Function. Aggregates GitHub stars + latest releases at request time
// so the HTML build never has to know them. Cache at the edge for 10 minutes.

const REPOS = [
  'axiom',
  'second-brain',
  'the-analyst',
  'olx-india-cli',
  'Project-Hail-Mary',
  'ForensicToolW3',
  'borderpayment',
  'Safe_Passfortest',
  'agent-skills',
  'health-lovely',
];

type Repo = {
  stargazers_count: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
};

export const onRequest: PagesFunction = async ({ request }) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=600',
    'User-Agent': 'resume-site',
    Accept: 'application/vnd.github+json',
  };

  try {
    const reqs: Promise<Response>[] = [
      fetch('https://api.github.com/users/aswathas', { headers }),
      ...REPOS.map((r) =>
        fetch(`https://api.github.com/repos/aswathas/${r}`, { headers }),
      ),
    ];
    const [user, ...repos] = await Promise.all(
      reqs.map((r) => r.catch(() => null)),
    );

    if (!user?.ok) throw new Error('GitHub user lookup failed');

    const u = (await user.json()) as { public_repos: number; followers: number };

    const projects: Record<string, { name: string; stars: number; language: string | null; url: string; description: string | null }> = {};
    for (const r of repos) {
      if (!r?.ok) continue;
      const j = (await r.json()) as Repo;
      projects[j.name] = {
        name: j.name,
        stars: j.stargazers_count,
        language: j.language,
        url: j.html_url,
        description: j.description,
      };
    }

    const stars = Object.values(projects).reduce((n, p) => n + p.stars, 0);

    return Response.json(
      {
        fetchedAt: new Date().toISOString(),
        handle: 'aswathas',
        repos: u.public_repos,
        followers: u.followers,
        stars,
        projects,
      },
      { headers },
    );
  } catch {
    return Response.json({ error: 'GitHub unavailable' }, { status: 502, headers });
  }
};

export { REPOS };