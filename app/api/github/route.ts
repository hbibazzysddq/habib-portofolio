import { NextResponse } from "next/server";

type GithubRepo = {
  name: string;
  url: string;
  description: string | null;
  stargazers: number;
  language: string | null;
  updatedAt: string;
};

type GithubContributionDay = {
  date: string;
  count: number;
  color: string;
};

type GithubStatsResponse = {
  username: string;
  publicRepos: number | null;
  createdAt: string | null;
  contributionsLastYear: number | null;
  contributionsDaily: GithubContributionDay[] | null;
  repos: GithubRepo[] | null;
};

async function getPublicRepos(username: string): Promise<number | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { public_repos?: number };
  return typeof data.public_repos === "number" ? data.public_repos : null;
}

async function getContributionsLastYear(username: string): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return null;
  const json = (await res.json()) as any;
  const total = json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
  return typeof total === "number" ? total : null;
}

async function getUserCreatedAt(username: string): Promise<string | null> {
  // REST can return created_at without token.
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { created_at?: string };
  return typeof data.created_at === "string" ? data.created_at : null;
}

async function getDailyContributions(username: string, days: number): Promise<GithubContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - Math.max(1, days));

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from: from.toISOString(), to: to.toISOString() },
    }),
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return null;
  const json = (await res.json()) as any;
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) return null;

  const allDays: GithubContributionDay[] = weeks
    .flatMap((w: any) => (Array.isArray(w?.contributionDays) ? w.contributionDays : []))
    .map((d: any) => ({
      date: String(d?.date ?? ""),
      count: Number(d?.contributionCount ?? 0),
      color: String(d?.color ?? "#232329"),
    }))
    .filter((d) => d.date);

  return allDays.slice(-Math.max(1, days));
}

async function getContributionCalendar(username: string, fromIso: string, toIso: string): Promise<GithubContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username, from: fromIso, to: toIso } }),
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return null;
  const json = (await res.json()) as any;
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) return null;

  return weeks
    .flatMap((w: any) => (Array.isArray(w?.contributionDays) ? w.contributionDays : []))
    .map((d: any) => ({
      date: String(d?.date ?? ""),
      count: Number(d?.contributionCount ?? 0),
      color: String(d?.color ?? "#232329"),
    }))
    .filter((d) => d.date);
}

async function getRepos(username: string, limit: number): Promise<GithubRepo[] | null> {
  const token = process.env.GITHUB_TOKEN;

  // Prefer GraphQL when token exists (more metadata, stable sorting).
  if (token) {
    const query = `
      query($login: String!, $first: Int!) {
        user(login: $login) {
          repositories(
            first: $first
            orderBy: { field: UPDATED_AT, direction: DESC }
            ownerAffiliations: OWNER
            privacy: PUBLIC
          ) {
            nodes {
              name
              url
              description
              updatedAt
              stargazerCount
              primaryLanguage { name }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username, first: limit } }),
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as any;
    const nodes = json?.data?.user?.repositories?.nodes;
    if (!Array.isArray(nodes)) return null;
    return nodes.map((r: any) => ({
      name: String(r?.name ?? ""),
      url: String(r?.url ?? ""),
      description: r?.description ? String(r.description) : null,
      updatedAt: String(r?.updatedAt ?? ""),
      stargazers: Number(r?.stargazerCount ?? 0),
      language: r?.primaryLanguage?.name ? String(r.primaryLanguage.name) : null,
    }));
  }

  // Fallback: REST (no token)
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=${limit}&sort=updated`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 60 * 60 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as any[];
  if (!Array.isArray(data)) return null;
  return data.slice(0, limit).map((r: any) => ({
    name: String(r?.name ?? ""),
    url: String(r?.html_url ?? ""),
    description: r?.description ? String(r.description) : null,
    updatedAt: String(r?.updated_at ?? ""),
    stargazers: Number(r?.stargazers_count ?? 0),
    language: r?.language ? String(r.language) : null,
  }));
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("user")?.trim();
  const days = Number(searchParams.get("days") ?? "14");
  const year = Number(searchParams.get("year") ?? "");
  const reposLimit = Number(searchParams.get("repos") ?? "6");

  if (!username) {
    return NextResponse.json({ error: "Missing `user` query param." }, { status: 400 });
  }

  const createdAt = await getUserCreatedAt(username);
  const createdYear = createdAt ? new Date(createdAt).getFullYear() : null;
  const currentYear = new Date().getFullYear();
  const resolvedYear =
    Number.isFinite(year) && year > 1970
      ? Math.min(Math.max(year, createdYear ?? year), currentYear)
      : currentYear;

  const fromIso = new Date(Date.UTC(resolvedYear, 0, 1, 0, 0, 0)).toISOString();
  const toIso = new Date(Date.UTC(resolvedYear, 11, 31, 23, 59, 59)).toISOString();

  const [publicRepos, contributionsLastYear, contributionsDaily, repos, contributionsCalendar] = await Promise.all([
    getPublicRepos(username),
    getContributionsLastYear(username),
    getDailyContributions(username, Number.isFinite(days) ? Math.min(Math.max(days, 1), 60) : 14),
    getRepos(username, Number.isFinite(reposLimit) ? Math.min(Math.max(reposLimit, 1), 12) : 6),
    getContributionCalendar(username, fromIso, toIso),
  ]);

  const payload: GithubStatsResponse = {
    username,
    publicRepos,
    createdAt,
    contributionsLastYear,
    contributionsDaily: contributionsCalendar ?? contributionsDaily,
    repos,
  };
  return NextResponse.json(payload);
}

