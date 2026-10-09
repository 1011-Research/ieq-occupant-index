/* IEQ Occupant Index — reference prototype
   Vanilla JS, no build step, no external dependencies.
   State is held in memory only; nothing persists across a page reload.
   This file implements the three role-tiered views described in the
   accompanying paper: Occupant, Administrator, and GRIHA Council. */

const DOMAINS = [
  { id: "acoustic", label: "Noise levels", sub: "Acoustic comfort — how quiet or distracting the space is", weight: 0.29 },
  { id: "spatial", label: "Room layout and space", sub: "Spatial comfort — room to work, move and store your things", weight: 0.18 },
  { id: "thermal", label: "Temperature and humidity", sub: "Thermal comfort — how warm, muggy or still the air feels today", weight: 0.12 },
  { id: "visual", label: "Lighting and glare", sub: "Visual comfort — daylight, screen glare and brightness", weight: 0.18 },
  { id: "iaq", label: "Air freshness", sub: "Indoor air quality — stuffiness, smells and air movement", weight: 0.24 },
];

// Illustrative demo state — not real GRIHA data.
const state = {
  role: "occupant",
  occupantRatings: {},
  occupantComments: {},
  pooledResponses: 350,
  submissionSent: false,
  council: {
    queue: [
      { building: "Central academic block", institution: "Demo Institution A", domains: "5 of 5", badges: 2, credit: "2 / 2", status: "pending" },
      { building: "Studio block A", institution: "Demo Institution B", domains: "3 of 5", badges: 1, credit: "1 / 2", status: "pending" },
      { building: "Central library", institution: "Demo Institution C", domains: "4 of 5", badges: 0, credit: "1 / 2", status: "pending" },
      { building: "Postgraduate teaching block", institution: "Demo Institution D", domains: "5 of 5", badges: 3, credit: "2 / 2", status: "pooled" },
    ],
  },
};

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (typeof c === "string") node.appendChild(document.createTextNode(c));
    else if (c) node.appendChild(c);
  });
  return node;
}

function render() {
  document.querySelectorAll("nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.role === state.role);
  });
  const app = document.getElementById("app");
  app.innerHTML = "";
  if (state.role === "occupant") app.appendChild(renderOccupant());
  if (state.role === "administrator") app.appendChild(renderAdministrator());
  if (state.role === "council") app.appendChild(renderCouncil());
}

/* ---------------- Occupant view ---------------- */
function renderOccupant() {
  const wrap = el("div");
  const answered = Object.keys(state.occupantRatings).length;

  if (state.submissionSent) {
    wrap.appendChild(
      el("div", { class: "card" }, [
        el("h1", {}, "Thank you."),
        el("p", { class: "muted" }, "Your response has been pooled anonymously. Response counted once."),
      ])
    );
    return wrap;
  }

  wrap.appendChild(
    el("div", { class: "card" }, [
      el("h1", {}, "Tell us how your building actually feels."),
      el("p", { class: "muted" }, "Five questions, under a minute. Your answers are pooled with everyone else's — nothing is tied back to you."),
      el("div", { class: "stat-row" }, [
        el("div", { class: "stat" }, [el("b", {}, String(state.pooledResponses)), "responses pooled so far"]),
        el("div", { class: "stat" }, [el("b", {}, "5"), "IEQ domains"]),
        el("div", { class: "stat" }, [el("b", {}, `${answered} of 5`), "answered"]),
      ]),
    ])
  );

  DOMAINS.forEach((d) => {
    const domainCard = el("div", { class: "domain" });
    domainCard.appendChild(el("h3", {}, d.label));
    domainCard.appendChild(el("p", { class: "muted" }, d.sub));
    const scale = el("div", { class: "scale" });
    for (let i = 1; i <= 7; i++) {
      const btn = el(
        "button",
        {
          class: state.occupantRatings[d.id] === i ? "selected" : "",
          onclick: () => {
            state.occupantRatings[d.id] = i;
            render();
          },
        },
        String(i)
      );
      scale.appendChild(btn);
    }
    domainCard.appendChild(scale);
    domainCard.appendChild(
      el("div", { class: "scale-labels" }, [el("span", {}, "1 · Very dissatisfied"), el("span", {}, "7 · Very satisfied")])
    );
    const comment = el("textarea", {
      class: "comment",
      placeholder: "Optional: say more about this rating…",
      oninput: (e) => (state.occupantComments[d.id] = e.target.value),
    });
    domainCard.appendChild(comment);
    wrap.appendChild(domainCard);
  });

  const submit = el(
    "button",
    {
      class: "btn",
      disabled: answered < 5 ? "true" : null,
      onclick: () => {
        if (answered < 5) return;
        state.pooledResponses += 1;
        state.submissionSent = true;
        render();
      },
    },
    "Submit"
  );
  if (answered < 5) submit.setAttribute("disabled", "true");
  wrap.appendChild(el("div", { class: "card" }, [submit, el("span", { class: "muted" }, `  ${answered} of 5 answered`)]));
  return wrap;
}

/* ---------------- Administrator view ---------------- */
function renderAdministrator() {
  const wrap = el("div");

  // Simple illustrative scoring derived from occupant ratings collected in this session,
  // falling back to a fixed illustrative example when no ratings exist yet.
  const example = { acoustic: 5.4, spatial: 5.6, thermal: 4.9, visual: 5.7, iaq: 5.9 };
  const weightedTotal = DOMAINS.reduce((sum, d) => {
    const val = state.occupantRatings[d.id] || example[d.id];
    return sum + (val / 7) * d.weight * 2; // scaled illustratively to a 2-point domain credit
  }, 0);

  wrap.appendChild(
    el("div", { class: "card" }, [
      el("h1", {}, "What the occupants said, turned into credit."),
      el("p", { class: "muted" }, "Central academic block · Demo Institution A · illustrative data"),
      el("div", { class: "stat-row" }, [
        el("div", { class: "stat" }, [el("b", {}, weightedTotal.toFixed(2)), "weighted score of 2.00"]),
        el("div", { class: "stat" }, [el("b", {}, String(state.pooledResponses)), "responses pooled"]),
      ]),
    ])
  );

  const domainsCard = el("div", { class: "card" });
  domainsCard.appendChild(el("h2", {}, "Domain results"));
  DOMAINS.forEach((d) => {
    const val = state.occupantRatings[d.id] || example[d.id];
    const pct = Math.round((val / 7) * 100);
    const row = el("div", { style: "margin-bottom:12px;" });
    row.appendChild(
      el("div", { style: "display:flex;justify-content:space-between;" }, [
        el("span", {}, `${d.label} (${Math.round(d.weight * 100)}% weight)`),
        el("span", { class: "muted" }, `${val.toFixed(1)} / 7 avg`),
      ])
    );
    const barWrap = el("div", { class: "weight-bar-wrap" });
    barWrap.appendChild(el("div", { class: "weight-bar", style: `width:${pct}%` }));
    row.appendChild(barWrap);
    domainsCard.appendChild(row);
  });
  wrap.appendChild(domainsCard);

  const badges = [
    { name: "Health Leadership", earned: weightedTotal > 1.3 },
    { name: "Energy Champion", earned: true },
    { name: "Digital Adaptation", earned: weightedTotal > 1.1 },
  ];
  const badgeCard = el("div", { class: "card" });
  badgeCard.appendChild(el("h2", {}, "Recognition badges"));
  const row = el("div", { class: "badge-row" });
  badges.forEach((b) => row.appendChild(el("span", { class: `badge-chip ${b.earned ? "earned" : ""}` }, b.earned ? `✓ ${b.name}` : b.name)));
  badgeCard.appendChild(row);
  wrap.appendChild(badgeCard);

  const sendCard = el("div", { class: "card" });
  sendCard.appendChild(el("h2", {}, "Send to GRIHA Council"));
  sendCard.appendChild(el("p", { class: "muted" }, "Each send is recorded as a numbered attempt for this building."));
  sendCard.appendChild(
    el(
      "button",
      {
        class: "btn secondary",
        onclick: () => {
          state.council.queue[0].status = "pending";
          state.role = "council";
          render();
        },
      },
      "Send attempt"
    )
  );
  wrap.appendChild(sendCard);

  return wrap;
}

/* ---------------- GRIHA Council view ---------------- */
function renderCouncil() {
  const wrap = el("div");
  const pooledCount = state.council.queue.filter((r) => r.status === "pooled").length;

  wrap.appendChild(
    el("div", { class: "card" }, [
      el("h1", {}, "Evidence accumulating, building by building."),
      el("p", { class: "muted" }, "Submissions from certified institutions, read as a growing body of evidence rather than as individual cases."),
      el("div", { class: "stat-row" }, [
        el("div", { class: "stat" }, [el("b", {}, String(state.council.queue.length)), "submissions received"]),
        el("div", { class: "stat" }, [el("b", {}, String(pooledCount)), "in evidence pool"]),
      ]),
    ])
  );

  const tableCard = el("div", { class: "card" });
  tableCard.appendChild(el("h2", {}, "Submission queue"));
  const table = el("table");
  table.appendChild(
    el("tr", {}, [el("th", {}, "Building"), el("th", {}, "Domains"), el("th", {}, "Credit"), el("th", {}, "Status"), el("th", {}, "Action")])
  );
  state.council.queue.forEach((row, idx) => {
    const statusTag =
      row.status === "pooled"
        ? el("span", { class: "tag pooled" }, "In evidence pool")
        : row.status === "returned"
        ? el("span", { class: "tag returned" }, "Returned")
        : el("span", { class: "tag pending" }, "Awaiting review");

    const actions = el("span");
    if (row.status === "pending") {
      actions.appendChild(
        el(
          "button",
          {
            class: "btn outline",
            style: "padding:4px 10px;font-size:.78rem;margin-right:6px;",
            onclick: () => {
              state.council.queue[idx].status = "returned";
              render();
            },
          },
          "Return"
        )
      );
      actions.appendChild(
        el(
          "button",
          {
            class: "btn secondary",
            style: "padding:4px 10px;font-size:.78rem;",
            onclick: () => {
              state.council.queue[idx].status = "pooled";
              render();
            },
          },
          "Accept into pool"
        )
      );
    }

    table.appendChild(
      el("tr", {}, [
        el("td", {}, [row.building, el("div", { class: "muted" }, row.institution)]),
        el("td", {}, row.domains),
        el("td", {}, row.credit),
        el("td", {}, statusTag),
        el("td", {}, actions),
      ])
    );
  });
  tableCard.appendChild(table);
  wrap.appendChild(tableCard);

  const driftCard = el("div", { class: "card" });
  driftCard.appendChild(el("h2", {}, "Is the recalibrated weighting holding up?"));
  const driftTable = el("table");
  driftTable.appendChild(el("tr", {}, [el("th", {}, "Domain"), el("th", {}, "Schema weight"), el("th", {}, "Verdict")]));
  DOMAINS.forEach((d) => {
    driftTable.appendChild(el("tr", {}, [el("td", {}, d.label), el("td", {}, `${Math.round(d.weight * 100)}%`), el("td", {}, "Holding")]));
  });
  driftCard.appendChild(driftTable);
  wrap.appendChild(driftCard);

  return wrap;
}

document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.role = btn.dataset.role;
    render();
  });
});

render();
