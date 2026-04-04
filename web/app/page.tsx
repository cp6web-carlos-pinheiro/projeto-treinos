"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";

type RequestResult = {
  status: number;
  data: unknown;
  duration: number;
  error?: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: { id: string; name: string; email: string } | null;
};

const BASE = "/api";

async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<RequestResult> {
  const start = Date.now();
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, data, duration: Date.now() - start };
  } catch (err) {
    return {
      status: 0,
      data: null,
      duration: Date.now() - start,
      error: String(err),
    };
  }
}

function StatusBadge({ status }: { status: number }) {
  const color =
    status === 0
      ? "var(--text-muted)"
      : status < 300
        ? "var(--success)"
        : status < 400
          ? "var(--warning)"
          : "var(--error)";
  return (
    <span style={{ color, fontWeight: 700, fontSize: 13 }}>
      {status === 0 ? "—" : status}
    </span>
  );
}

function JsonViewer({ data }: { data: unknown }) {
  if (data === null || data === undefined)
    return <span style={{ color: "var(--text-muted)" }}>null</span>;
  return (
    <pre
      style={{
        background: "#0d1117",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        color: "#e1e4e8",
        maxHeight: 300,
        overflowY: "auto",
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {children}
    </div>
  );
}

function EndpointRow({
  label,
  method,
  path,
  children,
}: {
  label: string;
  method: string;
  path: string;
  children: React.ReactNode;
}) {
  const methodColor: Record<string, string> = {
    GET: "#3fb950",
    POST: "#58a6ff",
    PUT: "#d29922",
    PATCH: "#bc8cff",
    DELETE: "#f85149",
  };
  return (
    <div className={styles.endpointRow}>
      <div className={styles.endpointHeader}>
        <span
          style={{
            color: methodColor[method] ?? "#e1e4e8",
            fontWeight: 700,
            fontSize: 12,
            background: "#0d1117",
            padding: "2px 8px",
            borderRadius: 4,
            border: `1px solid ${methodColor[method] ?? "#30363d"}`,
          }}
        >
          {method}
        </span>
        <code style={{ fontSize: 13, color: "var(--text-muted)" }}>{path}</code>
        <span style={{ fontSize: 13, color: "var(--text)" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function ResultSection({ result }: { result: RequestResult | null }) {
  if (!result) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 6,
        }}
      >
        <StatusBadge status={result.status} />
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {result.duration}ms
        </span>
        {result.error && (
          <span style={{ fontSize: 12, color: "var(--error)" }}>
            {result.error}
          </span>
        )}
      </div>
      <JsonViewer data={result.data} />
    </div>
  );
}

export default function Home() {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });
  const [healthResult, setHealthResult] = useState<RequestResult | null>(null);
  const [authEmail, setAuthEmail] = useState("test@example.com");
  const [authPassword, setAuthPassword] = useState("password123");
  const [authName, setAuthName] = useState("Test User");
  const [authResult, setAuthResult] = useState<RequestResult | null>(null);

  const [homeDate, setHomeDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [homeResult, setHomeResult] = useState<RequestResult | null>(null);

  const [meResult, setMeResult] = useState<RequestResult | null>(null);
  const [meWeight, setMeWeight] = useState("70000");
  const [meHeight, setMeHeight] = useState("175");
  const [meAge, setMeAge] = useState("25");
  const [meBodyFat, setMeBodyFat] = useState("15");
  const [mePutResult, setMePutResult] = useState<RequestResult | null>(null);

  const [statsFrom, setStatsFrom] = useState("2025-01-01");
  const [statsTo, setStatsTo] = useState(new Date().toISOString().split("T")[0]);
  const [statsResult, setStatsResult] = useState<RequestResult | null>(null);

  const [plansResult, setPlansResult] = useState<RequestResult | null>(null);

  const checkSession = useCallback(async () => {
    const res = await apiFetch("/auth/get-session");
    if (res.status === 200 && res.data) {
      const d = res.data as { user?: { id: string; name: string; email: string } };
      if (d.user) {
        setAuth({ isLoggedIn: true, user: d.user });
        return;
      }
    }
    setAuth({ isLoggedIn: false, user: null });
  }, []);

  useEffect(() => {
    checkSession();
    apiFetch("/").then(setHealthResult);
  }, [checkSession]);

  const handleSignUp = async () => {
    const res = await apiFetch("/auth/sign-up/email", {
      method: "POST",
      body: JSON.stringify({
        email: authEmail,
        password: authPassword,
        name: authName,
      }),
    });
    setAuthResult(res);
    if (res.status === 200 || res.status === 201) await checkSession();
  };

  const handleSignIn = async () => {
    const res = await apiFetch("/auth/sign-in/email", {
      method: "POST",
      body: JSON.stringify({ email: authEmail, password: authPassword }),
    });
    setAuthResult(res);
    if (res.status === 200) await checkSession();
  };

  const handleSignOut = async () => {
    await apiFetch("/auth/sign-out", { method: "POST" });
    setAuth({ isLoggedIn: false, user: null });
    setAuthResult(null);
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>🏋️ Bootcamp Treinos</h1>
            <p className={styles.subtitle}>API Test Page</p>
          </div>
          <div className={styles.authStatus}>
            {auth.isLoggedIn ? (
              <>
                <span style={{ color: "var(--success)", fontSize: 13 }}>
                  ● Logado como {auth.user?.name}
                </span>
                <button className={styles.btnDanger} onClick={handleSignOut}>
                  Sair
                </button>
              </>
            ) : (
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                ● Não autenticado
              </span>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Health Check */}
          <Card title="🟢 Health Check">
            <EndpointRow label="Hello World" method="GET" path="/">
              <button
                className={styles.btn}
                onClick={() => apiFetch("/").then(setHealthResult)}
              >
                Testar
              </button>
              <ResultSection result={healthResult} />
            </EndpointRow>
          </Card>

          {/* Auth */}
          <Card title="🔐 Autenticação">
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome</label>
              <input
                className={styles.input}
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                placeholder="Nome"
              />
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="Email"
              />
              <label className={styles.label}>Senha</label>
              <input
                className={styles.input}
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="Senha"
              />
              <div className={styles.btnRow}>
                <EndpointRow label="Cadastro" method="POST" path="/auth/sign-up/email">
                  <button className={styles.btn} onClick={handleSignUp}>
                    Cadastrar
                  </button>
                </EndpointRow>
                <EndpointRow label="Login" method="POST" path="/auth/sign-in/email">
                  <button className={styles.btnAccent} onClick={handleSignIn}>
                    Entrar
                  </button>
                </EndpointRow>
              </div>
            </div>
            <ResultSection result={authResult} />
          </Card>

          {/* Home */}
          <Card title="🏠 Home">
            <EndpointRow label="Dados da home por data" method="GET" path="/home/:date">
              <div className={styles.formGroup}>
                <label className={styles.label}>Data</label>
                <input
                  className={styles.input}
                  type="date"
                  value={homeDate}
                  onChange={(e) => setHomeDate(e.target.value)}
                />
              </div>
              <button
                className={styles.btn}
                onClick={() =>
                  apiFetch(`/home/${homeDate}`).then(setHomeResult)
                }
              >
                Buscar
              </button>
              <ResultSection result={homeResult} />
            </EndpointRow>
          </Card>

          {/* Me */}
          <Card title="👤 Me">
            <EndpointRow label="Meus dados de treino" method="GET" path="/me">
              <button
                className={styles.btn}
                onClick={() => apiFetch("/me").then(setMeResult)}
              >
                Buscar
              </button>
              <ResultSection result={meResult} />
            </EndpointRow>

            <EndpointRow
              label="Atualizar dados de treino"
              method="PUT"
              path="/me"
            >
              <div className={styles.formGroup}>
                <label className={styles.label}>Peso (gramas)</label>
                <input
                  className={styles.input}
                  type="number"
                  value={meWeight}
                  onChange={(e) => setMeWeight(e.target.value)}
                  placeholder="Ex: 70000"
                />
                <label className={styles.label}>Altura (cm)</label>
                <input
                  className={styles.input}
                  type="number"
                  value={meHeight}
                  onChange={(e) => setMeHeight(e.target.value)}
                  placeholder="Ex: 175"
                />
                <label className={styles.label}>Idade</label>
                <input
                  className={styles.input}
                  type="number"
                  value={meAge}
                  onChange={(e) => setMeAge(e.target.value)}
                  placeholder="Ex: 25"
                />
                <label className={styles.label}>
                  % Gordura Corporal (opcional)
                </label>
                <input
                  className={styles.input}
                  type="number"
                  value={meBodyFat}
                  onChange={(e) => setMeBodyFat(e.target.value)}
                  placeholder="Ex: 15"
                />
              </div>
              <button
                className={styles.btn}
                onClick={() =>
                  apiFetch("/me", {
                    method: "PUT",
                    body: JSON.stringify({
                      weightInGrams: Number(meWeight),
                      heightInCentimeters: Number(meHeight),
                      age: Number(meAge),
                      bodyFatPercentage: meBodyFat
                        ? Number(meBodyFat)
                        : undefined,
                    }),
                  }).then(setMePutResult)
                }
              >
                Atualizar
              </button>
              <ResultSection result={mePutResult} />
            </EndpointRow>
          </Card>

          {/* Stats */}
          <Card title="📊 Stats">
            <EndpointRow
              label="Estatísticas de treino"
              method="GET"
              path="/stats"
            >
              <div className={styles.formGroup}>
                <label className={styles.label}>De</label>
                <input
                  className={styles.input}
                  type="date"
                  value={statsFrom}
                  onChange={(e) => setStatsFrom(e.target.value)}
                />
                <label className={styles.label}>Até</label>
                <input
                  className={styles.input}
                  type="date"
                  value={statsTo}
                  onChange={(e) => setStatsTo(e.target.value)}
                />
              </div>
              <button
                className={styles.btn}
                onClick={() =>
                  apiFetch(
                    `/stats?from=${statsFrom}&to=${statsTo}`
                  ).then(setStatsResult)
                }
              >
                Buscar
              </button>
              <ResultSection result={statsResult} />
            </EndpointRow>
          </Card>

          {/* Workout Plans */}
          <Card title="📋 Planos de Treino">
            <EndpointRow
              label="Listar planos de treino"
              method="GET"
              path="/workout-plans"
            >
              <div className={styles.btnRow}>
                <button
                  className={styles.btn}
                  onClick={() =>
                    apiFetch("/workout-plans").then(setPlansResult)
                  }
                >
                  Todos
                </button>
                <button
                  className={styles.btn}
                  onClick={() =>
                    apiFetch("/workout-plans?active=true").then(setPlansResult)
                  }
                >
                  Apenas Ativos
                </button>
              </div>
              <ResultSection result={plansResult} />
            </EndpointRow>
          </Card>

          {/* Docs */}
          <Card title="📖 Documentação">
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
              A documentação interativa da API (Scalar / OpenAPI) está disponível diretamente no backend.
            </p>
            <a
              href="http://localhost:8081/docs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              Abrir Docs → localhost:8081/docs
            </a>
          </Card>
        </div>
      </main>
    </div>
  );
}
