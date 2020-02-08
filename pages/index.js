import { useEffect, useState } from "react";
import Head from "next/head";
import fetch from "unfetch";
import copy from "copy-to-clipboard";

export default () => {
  const [pwd, setPwd] = useState("");
  const [id, setId] = useState();
  const [loading, setLoading] = useState();
  const [copied, setCopied] = useState();

  useEffect(() => setLoading(false), [id]);
  useEffect(() => setPwd(""), [loading]);
  // useEffect(() => copied && setTimeout(() => setCopied(false), 2500), [copied]);

  const clickToCopy = () => {
    copy(`https://svrlss.now.sh/api/get/${id}`);
    setCopied(true);
  };

  const getId = async () => {
    setLoading(true);

    const response = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pwd })
    });

    if (response.ok) {
      const { id } = await response.json();

      setId(id);
    }
  };

  return (
    <div className="page">
      <Head>
        <meta charset="utf-8" />
        <title>PaaS-sword</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#ffd5e5" />
        <meta name="twitter:site" content="@zealigan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:title" content="PaaS-sword" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="og:url" content="https://paassword.now.sh" />
        <meta
          name="description"
          content="Quickly and securly store a password and get a url to validate it!"
        />
        <meta
          name="og:description"
          content="Quickly and securly store a password and get a url to validate it!"
        />
        <meta name="og:image" content="https://paassword.now.sh/paasword.png" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-129208280-5"
        />
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-129208280-5');
       `}</script>
      </Head>
      <div className="hero">
        <div className="hero__main">
          <h1 className="title">
            <img
              src="/emoji_u1f512.png"
              alt="lock emoji"
              style={{ height: "2.5rem", width: "2.5rem" }}
            />
            PaaS-sword
          </h1>
          <span style={{ marginTop: "-1.25rem", fontSize: 12 }}>
            (/Password as a Service/)
          </span>
          <p className="text">
            Need to store and validate a password but don't want to write your
            own backend?
            <br />
            <br />
            <span style={{ fontWeight: "bold" }}>PaaS-sword</span> allows you to
            quickly save a password and gives you a url to validate it!
          </p>

          {/*<!-- create your password -->*/}
          <div className={`function ${loading ? "loading" : ""}`}>
            <label className="label" htmlFor="pwd">
              Create your password:
            </label>
            <input
              type="password"
              name="pwd"
              className="input"
              value={pwd}
              onChange={({ target }) => setPwd(target.value)}
            />
            <button className="button" onClick={getId}>
              Get your link!
            </button>
          </div>

          {id !== undefined && (
            <pre onClick={clickToCopy}>
              <code>https://svrlss.now.sh/api/get/{id}</code>
              <span> {copied ? "Copied!" : "Click to copy"} </span>{" "}
            </pre>
          )}
        </div>
        <div className="hero__background">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="var(--pink)"
              fillOpacity="1"
              d="M0,128L1440,64L1440,320L0,320Z"
            />
          </svg>
        </div>
      </div>
      <div className="footer">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a className="link" href="https://twitter.com/zealigan">
          Eric Adamski
        </a>
      </div>

      <style global jsx>{`
        :root {
          --pink: #ffd5e5; //#e7008a;
          --green: #a0ffe6;
          --yellow: #ffffdd;
          --blue: #81f5ff;
          --black: #262626;
          --white: #ffffff;
          --border-radius: 0.5rem;
        }

        @font-face {
          font-family: "Paytone One";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("Paytone One Regular"), local("PaytoneOne-Regular"),
            url(https://fonts.gstatic.com/s/paytoneone/v12/0nksC9P7MfYHj2oFtYm2ChTtgPvfiwq-.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: "Roboto";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("Roboto"), local("Roboto-Regular"),
            url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }

        @font-face {
          font-family: "Roboto";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: local("Roboto Bold"), local("Roboto-Bold"),
            url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2)
              format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
            U+2212, U+2215, U+FEFF, U+FFFD;
        }

        html,
        body,
        * {
          box-sizing: border-box;
          font-family: "Roboto", sans-serif;
        }

        body {
          margin: 0;
          background: var(--white);
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          padding: 0;
          font-family: "Paytone One", sans-serif;
        }

        p {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <style jsx>{`
        .page {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          margin: 0;
          background: var(--white);
        }

        .footer > span {
          margin: 0 0.25rem;
        }

        .footer > a {
          margin: 0 0.25rem;
          color: var(--black);
        }

        .footer {
          background: var(--pink);
          height: 50px;
          color: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero {
          position: relative;
          width: 100%;
          height: calc(100% - 50px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .hero__main {
          color: var(--black);
          max-width: 500px;
          padding: 1.25rem;

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero__main > p {
          padding: 0.75rem 0;
          font-size: 1.25rem;
        }

        .hero__main > h1 {
          padding: 0.75rem 0;
          font-size: 3.25rem;
        }

        .hero__background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .hero__background > svg {
          height: 100%;
        }

        pre:hover {
          cursor: pointer;
        }

        pre {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        pre > code {
          padding: 0.75rem 1rem;
          background: rgba(38, 38, 38, 0.7);
          border-radius: var(--border-radius);
          color: var(--white);
          width: 100%;
          text-align: center;
        }

        .function {
          padding: 0.5rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .function.loading {
          opacity: 0.6;
          pointer-events: none;
        }

        .function > label {
          margin: 0.25rem 0;
          font-size: 1rem;
          font-weight: bold;
        }

        .function > input {
          font-size: 1rem;
          padding: 0.5rem 0.25rem;
          margin: 0.25rem 0;
          border: none;
          border-radius: var(--border-radius);
        }

        .button {
          padding: 0.5rem 0.25rem;
          margin: 0.25rem 0;
          border: none;
          background: var(--black);
          color: var(--white);
          font-size: 1rem;
          border-radius: var(--border-radius);
          border: 2px solid var(--black);
        }

        .button:active,
        .button:focus,
        .button:hover {
          outline: none;
          background: var(--blue);
          color: var(--black);
          border-color: var(--blue);
          cursor: pointer;
        }

        .input:active,
        .input:focus {
          outline: none;
          border-color: var(--black);
        }
      `}</style>
    </div>
  );
};
