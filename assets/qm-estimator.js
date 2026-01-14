const QM_ESTIMATES = {
  service: {
    "6-20": {
      duration: "8–12 Wochen",
      cost: "3.000–6.000 €",
      text: "Die Anforderungen der ISO 9001 werden meist bereits erfüllt. Der Aufwand entsteht durch das strukturierte Beschreiben der bestehenden Praxis."
    }
  },
  default: {
    "100+": {
      duration: "6–9 Monate",
      cost: "> 15.000 €",
      text: "Ab dieser Größe handelt es sich um ein Organisationsprojekt."
    }
  }
};

function resolveEstimate(industry, size) {
  return QM_ESTIMATES?.[industry]?.[size] || QM_ESTIMATES.default["100+"];
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".qm-estimator");
  const headline = root.dataset.headline;
  root.querySelector(".qm-estimator__headlineText").textContent = headline;

  const industrySelect = root.querySelector(".qm-estimator__industry");
  const sizeButtons = root.querySelectorAll("[data-size]");
  const btn = root.querySelector(".qm-estimator__btn");
  const result = root.querySelector(".qm-estimator__result");

  let industry = "", size = "";

  industrySelect.addEventListener("change", e => {
    industry = e.target.value;
    btn.disabled = !(industry && size);
  });

  sizeButtons.forEach(b => {
    b.addEventListener("click", () => {
      size = b.dataset.size;
      sizeButtons.forEach(x => x.classList.remove("is-active"));
      b.classList.add("is-active");
      btn.disabled = !(industry && size);
    });
  });

  btn.addEventListener("click", () => {
    const est = resolveEstimate(industry, size);
    result.innerHTML = `<p><strong>Dauer:</strong> ${est.duration}</p>
                        <p><strong>Kosten:</strong> ${est.cost}</p>
                        <p>${est.text}</p>`;
    result.hidden = false;
  });
});
