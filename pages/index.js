import { useEffect, useState } from "react";
import Head from "next/head";
import fetch from "unfetch";
import copy from "copy-to-clipboard";
import dedent from "dedent";

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
        <meta charSet="utf-8" />
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
              placeholder="Enter a password to store"
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

        {/* how it works */}
        <div className="instructions">
          <div className="instructions__step" count="1">
            Create a password
            <svg
              width="100%"
              height="50px"
              viewBox="0 -4 300 41"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path id="MyPath">
                <animate
                  attributeType="XML"
                  attributeName="d"
                  from="m0,30 h0"
                  to="m0,30 h400"
                  dur="7.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </path>

              <text fontSize="2rem" fill="var(--black)">
                <textPath xlinkHref="#MyPath">H,%A3_a)aQ"&ygP$</textPath>
              </text>
            </svg>
          </div>
          <div className="instructions__step" count="2">
            Copy URL
            <p
              style={{
                padding: "1rem 0",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              https://svrlss.now.sh/api/get/{id}
            </p>
          </div>
          <div className="instructions__step" count="3">
            Validate against it
            <pre>
              <code style={{ textAlign: "left" }}>
                {dedent`
                  fetch("https://svrlss.now.sh/api/get/${id}", {
                    method: "POST",
                    body: { pwd: "my test password" }
                  })
                `}
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="footer">
        Made with
        <span role="img" aria-label="love">
          ❤️
        </span>
        by
        <a className="link" href="https://twitter.com/zealigan">
          Eric Adamski
        </a>
        <span role="img" aria-label="soon">
          🔜
        </span>
        <a href="https://github.com/ericadamski/serverless-password">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 256 250"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <path
                d="M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z"
                fill="#161614"
              ></path>
            </g>
          </svg>
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
        .instructions {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .instructions__step {
          position: relative;
          margin: 1rem;
          width: 350px;
          minheight: 100px;
          border: 2px solid var(--black);
          border-radius: var(--border-radius);
          padding: 1rem;
        }

        .instructions__step::after {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          content: attr(count);
          top: -0.75rem;
          left: -0.75rem;
          width: 1.5rem;
          height: 1.5rem;
          background: var(--black);
          border-radius: 50%;
        }

        .page {
          width: 100vw;
          min-height: 100vh;
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
          height: calc(100vh - 50px);
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
          overflow-x: auto;
          white-space: pre-wrap;
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
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          border-bottom: 2px solid var(--black);
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
