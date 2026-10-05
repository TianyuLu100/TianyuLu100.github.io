/* Rich case-study renderer for the UT Dallas wind-turbine entry. */

function renderStemBridgePage(root, entry) {
  root.innerHTML = `
    <nav class="stem-subnav" aria-label="Wind-turbine case study">
      <div class="stem-wrap">
        <a class="stem-subnav-brand" href="#stem-top">
          <span>UTD-011</span> Wind Turbine CMS
        </a>
        <div class="stem-subnav-links">
          <a href="#stem-background">Problem</a>
          <a href="#stem-approach">Approach</a>
          <a href="#stem-data">Data</a>
          <a href="#stem-wavelet">Wavelets</a>
          <a href="#stem-models">Models</a>
          <a href="#stem-results">Results</a>
          <a href="#stem-journey">Journey</a>
        </div>
      </div>
    </nav>

    <header class="stem-hero" id="stem-top">
      <canvas id="stem-wave-canvas" aria-hidden="true"></canvas>
      <div class="stem-wrap stem-hero-content">
        <a class="stem-back" href="index.html#experience">All work</a>
        <span class="stem-kicker">2025 UT Dallas STEM Bridge · Group 11</span>
        <h1>Machine Learning-Enabled<br><span>Wind-Turbine Condition Monitoring</span></h1>
        <p class="stem-hero-lede">
          Grading generator inter-turn short-circuit faults from high-resolution
          three-phase current and discrete-wavelet features.
        </p>
        <div class="stem-stats" aria-label="Project highlights">
          <article class="stem-stat">
            <strong data-stem-count="100" data-suffix="%">100%</strong>
            <span>LSTM test accuracy on clean signals</span>
          </article>
          <article class="stem-stat">
            <strong data-stem-count="3" data-suffix=" classes">3 classes</strong>
            <span>Green, yellow, and red condition grades</span>
          </article>
          <article class="stem-stat">
            <strong data-stem-count="3" data-suffix=" models">3 models</strong>
            <span>LSTM, GRU, and 2D CNN compared</span>
          </article>
          <article class="stem-stat">
            <strong data-stem-count="4000" data-suffix=" Hz">4,000 Hz</strong>
            <span>Three-phase current sampling rate</span>
          </article>
        </div>
      </div>
    </header>

    <section class="stem-section" id="stem-background">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Problem &amp; motivation</p>
        <h2>Why monitor a wind-turbine generator?</h2>
        <p class="stem-lead">
          Maintenance accounts for about <strong>38%</strong> of wind-turbine
          spending, while the generator is responsible for about
          <strong>17%</strong> of turbine failures. Our goal was a lower-cost,
          data-driven condition-monitoring system that can flag winding damage
          early enough to reduce downtime and support predictive maintenance.
        </p>

        <div class="stem-grid-3 stem-reveal stem-space-lg">
          <article class="stem-card stem-metric-card">
            <span class="stem-card-number">38%</span>
            <h3>Operations and maintenance</h3>
            <p>
              A large lifetime cost makes earlier fault detection economically
              meaningful, not just technically useful.
            </p>
          </article>
          <article class="stem-card stem-metric-card">
            <span class="stem-card-number">17%</span>
            <h3>Generator failures</h3>
            <p>
              Inter-turn short circuits begin inside the windings and can be
              difficult to distinguish from normal current variation.
            </p>
          </article>
          <article class="stem-card stem-metric-card">
            <span class="stem-card-number">CMS</span>
            <h3>Predictive maintenance</h3>
            <p>
              A reliable condition monitor can turn high-rate electrical
              measurements into an actionable maintenance grade.
            </p>
          </article>
        </div>

        <div class="stem-grid-2 stem-reveal stem-space-md">
          <article class="stem-card">
            <h3>What plants already monitor</h3>
            <ul>
              <li><strong>Gearbox:</strong> vibration, oil temperature, particle count</li>
              <li><strong>Generator:</strong> temperature, vibration, insulation resistance, SCADA</li>
              <li><strong>Blades:</strong> acoustic emissions and strain</li>
              <li><strong>Shaft, bearings, and tower:</strong> vibration, temperature, and tilt</li>
            </ul>
          </article>
          <article class="stem-card">
            <h3>Our signal path</h3>
            <p>
              We focused on the generator windings and used three-phase stator
              current—the electrical measurement the machine already produces.
              The model grades the signal as healthy/mild, moderate, or severe.
            </p>
            <div class="stem-signal-chip-row" aria-label="Model inputs">
              <span>Current A/B/C</span>
              <span>dmey coefficient A/B/C</span>
              <span>50 time steps</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="stem-section stem-section-alt" id="stem-approach">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Technical approach</p>
        <h2>From electrical signal to maintenance grade</h2>
        <p class="stem-lead">
          We transformed each high-rate current record into time-frequency
          features, normalized the six channels, sliced them into short
          sequences, and trained three deep-learning classifiers.
        </p>

        <div class="stem-pipeline stem-reveal">
          <article class="stem-step">
            <span>1</span>
            <h3>Acquire</h3>
            <p>Simulated stator currents I<sub>A</sub>, I<sub>B</sub>, and I<sub>C</sub> at 0.25 ms intervals.</p>
          </article>
          <article class="stem-step">
            <span>2</span>
            <h3>Transform</h3>
            <p>Level-1 discrete Meyer DWT produces one approximation coefficient per phase.</p>
          </article>
          <article class="stem-step">
            <span>3</span>
            <h3>Normalize</h3>
            <p>Use the steady 20–40 s interval; divide current by 4,000 and coefficients by 60.</p>
          </article>
          <article class="stem-step">
            <span>4</span>
            <h3>Window</h3>
            <p>Build 50 × 6 tensors and randomly oversample the training set to balance classes.</p>
          </article>
          <article class="stem-step">
            <span>5</span>
            <h3>Classify</h3>
            <p>LSTM, GRU, or 2D CNN feeds a three-way softmax output.</p>
          </article>
        </div>

        <h3 class="stem-subheading">Three condition grades</h3>
        <div class="stem-classes stem-reveal">
          <article class="stem-class stem-class-green">
            <h3><span aria-hidden="true"></span>Green · Healthy / mild</h3>
            <p>Normal operation or a low-severity winding abnormality.</p>
          </article>
          <article class="stem-class stem-class-yellow">
            <h3><span aria-hidden="true"></span>Yellow · Moderate</h3>
            <p>The generator remains operational, but maintenance should be scheduled.</p>
          </article>
          <article class="stem-class stem-class-red">
            <h3><span aria-hidden="true"></span>Red · Severe</h3>
            <p>A high-severity short-circuit condition that calls for immediate action.</p>
          </article>
        </div>
        <p class="stem-note">
          The benchmark maps fault resistance and fault-winding ratio to the
          three labels; severity is not determined by winding ratio alone.
        </p>
      </div>
    </section>

    <section class="stem-section" id="stem-data">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Datasets</p>
        <h2>Real operating context, simulated fault labels</h2>
        <p class="stem-lead">
          We first explored a year of real Kelmarsh wind-farm SCADA, then
          trained the fault classifiers on the DOES Lab inter-turn
          short-circuit benchmark, where exact fault severity is known.
        </p>

        <div class="stem-grid-2 stem-reveal stem-space-lg">
          <article class="stem-card">
            <span class="stem-card-label">Operating context</span>
            <h3>Kelmarsh turbine 1 · 2020</h3>
            <p>
              About 52,700 ten-minute records spanning wind speed, power,
              exported energy, lost production, pitch, oil pressure, tower
              acceleration, and grid measurements.
            </p>
            <div class="stem-mini-gallery">
              <figure>
                <img src="images/stem-kelmarsh-wind-energy.png" alt="Scatter plot of wind speed against exported energy" loading="lazy" data-stem-lightbox>
                <figcaption>Wind speed vs. exported energy</figcaption>
              </figure>
              <figure>
                <img src="images/stem-kelmarsh-production-factor.png" alt="Scatter plot of electrical power against production factor" loading="lazy" data-stem-lightbox>
                <figcaption>Power vs. production factor</figcaption>
              </figure>
            </div>
          </article>

          <article class="stem-card">
            <span class="stem-card-label">Classification data</span>
            <h3>High-resolution winding-fault simulations</h3>
            <p>
              Each CSV contains about 320,000 samples and seven columns:
              time, three phase currents, and three level-1 dmey approximation
              coefficients.
            </p>
            <div class="stem-table-wrap">
              <table>
                <thead>
                  <tr><th>Scenario</th><th>Meaning</th><th>Use</th></tr>
                </thead>
                <tbody>
                  <tr><td>Normal operation</td><td>No short circuit</td><td class="stem-good">Green</td></tr>
                  <tr><td>R = 0.01, fwr = 10%</td><td>Moderate fault</td><td class="stem-warn">Yellow</td></tr>
                  <tr><td>R = 0.001, fwr = 20%</td><td>Severe fault</td><td class="stem-bad">Red</td></tr>
                  <tr><td>SNR = 10</td><td>Noisy current</td><td>Robustness test</td></tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <div class="stem-grid-2 stem-figure-grid stem-reveal">
          <figure>
            <img src="images/stem-current.png" alt="Normal-operation phase A stator current over time" loading="lazy" data-stem-lightbox>
            <figcaption>Normal-operation phase A current; the model uses the steady 20–40 s interval.</figcaption>
          </figure>
          <figure>
            <img src="images/stem-coef.png" alt="Discrete Meyer approximation coefficients for phases A, B, and C" loading="lazy" data-stem-lightbox>
            <figcaption>Level-1 dmey approximation coefficients for all three phases.</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="stem-section stem-section-alt" id="stem-wavelet">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Signal processing</p>
        <h2>Why discrete wavelet features?</h2>
        <p class="stem-lead">
          A Fourier spectrum says which frequencies exist, but not when they
          appear. Wavelets localize a changing signal in both time and
          frequency—useful for transient fault signatures in non-stationary
          generator current.
        </p>

        <div class="stem-grid-2 stem-wavelet-grid stem-reveal stem-space-lg">
          <div>
            <figure>
              <img src="images/stem-wavelet-time-frequency.png" alt="Wavelet transform heat map showing time and frequency localization" loading="lazy" data-stem-lightbox>
              <figcaption>A wavelet transform preserves when each frequency appears.</figcaption>
            </figure>
            <article class="stem-card stem-space-sm">
              <h3>Approximation and detail</h3>
              <ul>
                <li><strong>Approximation (A):</strong> low-frequency structure and the overall trend</li>
                <li><strong>Detail (D):</strong> high-frequency transients and short events</li>
                <li><strong>Our features:</strong> level-1 dmey approximation coefficients from phases A, B, and C</li>
              </ul>
              <code>cA, cD = pywt.dwt(signal, "dmey")</code>
            </article>
          </div>
          <figure>
            <img src="images/stem-mother-wavelets.png" alt="Comparison of Haar, Daubechies, Symlet, Coiflet, biorthogonal, and discrete Meyer wavelets" loading="lazy" data-stem-lightbox>
            <figcaption>Mother wavelets differ in smoothness, symmetry, and support.</figcaption>
          </figure>
        </div>

        <div class="stem-grid-2 stem-figure-grid stem-reveal">
          <figure>
            <img src="images/stem-dwt.png" alt="Three-level db4 discrete wavelet decomposition" loading="lazy" data-stem-lightbox>
            <figcaption>A db4 example makes the approximation/detail split visible across scales.</figcaption>
          </figure>
          <figure>
            <img src="images/stem-dmey-histograms.png" alt="Histograms of discrete Meyer coefficients for phases A, B, and C" loading="lazy" data-stem-lightbox>
            <figcaption>Distribution of the three dmey approximation channels in normal operation.</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="stem-section" id="stem-models">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Deep-learning models</p>
        <h2>Three architectures, one controlled input</h2>
        <p class="stem-lead">
          All models receive the same 50-step, six-feature windows and predict
          the same three labels. The recurrent models preserve information
          through time; the CNN treats the window as a small 2D feature map.
        </p>

        <div class="stem-grid-3 stem-model-grid stem-reveal stem-space-lg">
          <article class="stem-card">
            <span class="stem-card-label">Core CMS</span>
            <h3>LSTM</h3>
            <div class="stem-architecture">
              <div class="stem-layer stem-layer-input">Input <span>50 × 6</span></div>
              <div class="stem-layer">LSTM 24 <span>dropout 0.1</span></div>
              <div class="stem-layer">LSTM 48 <span>dropout 0.1</span></div>
              <div class="stem-layer">LSTM 48 <span>dropout 0.1</span></div>
              <div class="stem-layer">LSTM 24 <span>dropout 0.1</span></div>
              <div class="stem-layer stem-layer-output">Dense 3 <span>softmax</span></div>
            </div>
          </article>

          <article class="stem-card">
            <span class="stem-card-label">Recurrent baseline</span>
            <h3>GRU</h3>
            <div class="stem-architecture">
              <div class="stem-layer stem-layer-input">Input <span>50 × 6</span></div>
              <div class="stem-layer">GRU 24 <span>dropout 0.1</span></div>
              <div class="stem-layer">GRU 48 <span>dropout 0.2</span></div>
              <div class="stem-layer">GRU 48 <span>dropout 0.2</span></div>
              <div class="stem-layer">GRU 24 <span>dropout 0.1</span></div>
              <div class="stem-layer stem-layer-output">Dense 3 <span>softmax</span></div>
            </div>
          </article>

          <article class="stem-card">
            <span class="stem-card-label">Fast comparison</span>
            <h3>2D CNN</h3>
            <div class="stem-architecture">
              <div class="stem-layer stem-layer-input">Input <span>50 × 6 × 1</span></div>
              <div class="stem-layer">Conv2D 24 <span>2 × 2</span></div>
              <div class="stem-layer">Conv2D 48 <span>2 × 2</span></div>
              <div class="stem-layer">Flatten <span>dense 48</span></div>
              <div class="stem-layer">Dense 48 <span>dropout 0.1</span></div>
              <div class="stem-layer stem-layer-output">Dense 3 <span>softmax</span></div>
            </div>
          </article>
        </div>

        <div class="stem-grid-2 stem-reveal stem-space-md stem-model-context">
          <figure class="stem-lstm-figure">
            <img src="images/utdwind.png" alt="Wind turbine and generator winding signal feeding an LSTM cell" loading="lazy" data-stem-lightbox>
            <figcaption>The cell state carries a fault pattern across the current window.</figcaption>
          </figure>
          <article class="stem-card">
            <h3>Training setup</h3>
            <ul>
              <li>Adam optimizer, categorical cross-entropy, F1 metric</li>
              <li>15 epochs; batch 768 for LSTM/GRU and 512 for CNN</li>
              <li>About 3.02 million balanced training windows</li>
              <li>About 831,000 test windows</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="stem-section stem-section-alt" id="stem-results">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Results</p>
        <h2>Clean simulation separates; noise exposes the limit</h2>
        <p class="stem-lead">
          LSTM and GRU classified every clean test window correctly. The 2D
          CNN trained much faster and remained near 99%, with errors confined
          to neighboring green/yellow grades. At SNR 10, LSTM validation
          performance fell sharply.
        </p>

        <div class="stem-tabs stem-reveal" role="tablist" aria-label="Model results">
          <button type="button" role="tab" aria-selected="true" aria-controls="stem-panel-lstm" id="stem-tab-lstm" data-stem-tab="lstm">LSTM</button>
          <button type="button" role="tab" aria-selected="false" aria-controls="stem-panel-gru" id="stem-tab-gru" data-stem-tab="gru">GRU</button>
          <button type="button" role="tab" aria-selected="false" aria-controls="stem-panel-cnn" id="stem-tab-cnn" data-stem-tab="cnn">2D CNN</button>
        </div>

        <div class="stem-tab-panel is-active" id="stem-panel-lstm" role="tabpanel" aria-labelledby="stem-tab-lstm" data-stem-panel="lstm">
          <figure>
            <img src="images/stem-cm-lstm.png" alt="LSTM confusion matrix with all samples on the diagonal" loading="lazy" data-stem-lightbox>
            <figcaption>Classes 0, 1, and 2 are green, yellow, and red.</figcaption>
          </figure>
          <article class="stem-card">
            <h3>LSTM · clean test set</h3>
            <div class="stem-table-wrap">
              <table>
                <tbody>
                  <tr><th>Accuracy</th><td class="stem-good">100%</td></tr>
                  <tr><th>Macro F1</th><td class="stem-good">100%</td></tr>
                  <tr><th>Validation accuracy</th><td class="stem-good">100%</td></tr>
                  <tr><th>15-epoch fit</th><td>≈ 781 s</td></tr>
                </tbody>
              </table>
            </div>
            <p>All three classes have an empty off-diagonal on clean windows.</p>
          </article>
        </div>

        <div class="stem-tab-panel" id="stem-panel-gru" role="tabpanel" aria-labelledby="stem-tab-gru" data-stem-panel="gru" hidden>
          <figure>
            <img src="images/stem-cm-gru.png" alt="GRU confusion matrix with all samples on the diagonal" loading="lazy" data-stem-lightbox>
            <figcaption>GRU produces the same clean-test pattern as LSTM.</figcaption>
          </figure>
          <article class="stem-card">
            <h3>GRU · clean test set</h3>
            <div class="stem-table-wrap">
              <table>
                <tbody>
                  <tr><th>Accuracy</th><td class="stem-good">100%</td></tr>
                  <tr><th>Macro F1</th><td class="stem-good">100%</td></tr>
                  <tr><th>Validation accuracy</th><td class="stem-good">100%</td></tr>
                  <tr><th>15-epoch fit</th><td>≈ 824 s</td></tr>
                </tbody>
              </table>
            </div>
            <p>GRU matches LSTM accuracy and takes slightly longer in this run.</p>
          </article>
        </div>

        <div class="stem-tab-panel" id="stem-panel-cnn" role="tabpanel" aria-labelledby="stem-tab-cnn" data-stem-panel="cnn" hidden>
          <figure>
            <img src="images/stem-cm-cnn.png" alt="2D CNN confusion matrix with errors between green and yellow but none in red" loading="lazy" data-stem-lightbox>
            <figcaption>Red is exact; residual errors sit between green and yellow.</figcaption>
          </figure>
          <article class="stem-card">
            <h3>2D CNN · clean test set</h3>
            <div class="stem-table-wrap">
              <table>
                <tbody>
                  <tr><th>Accuracy</th><td class="stem-warn">98.79%</td></tr>
                  <tr><th>Macro F1</th><td class="stem-warn">98.76%</td></tr>
                  <tr><th>Validation accuracy</th><td class="stem-warn">98.13%</td></tr>
                  <tr><th>15-epoch fit</th><td class="stem-good">≈ 145 s</td></tr>
                </tbody>
              </table>
            </div>
            <p>About five times faster to fit, with no severe-fault errors.</p>
          </article>
        </div>

        <div class="stem-grid-2 stem-reveal stem-space-lg">
          <article class="stem-card">
            <h3>Clean vs. SNR 10</h3>
            <div class="stem-bars" data-stem-bars>
              <div class="stem-bar-row">
                <div><span>Clean · training F1</span><strong>100%</strong></div>
                <span class="stem-bar"><i data-value="100"></i></span>
              </div>
              <div class="stem-bar-row">
                <div><span>Clean · validation F1</span><strong>100%</strong></div>
                <span class="stem-bar"><i data-value="100"></i></span>
              </div>
              <div class="stem-bar-row is-noisy">
                <div><span>SNR 10 · training F1</span><strong>96.1%</strong></div>
                <span class="stem-bar"><i data-value="96.1"></i></span>
              </div>
              <div class="stem-bar-row is-noisy">
                <div><span>SNR 10 · validation F1</span><strong>46.3%</strong></div>
                <span class="stem-bar"><i data-value="46.3"></i></span>
              </div>
              <div class="stem-bar-row is-noisy">
                <div><span>SNR 10 · validation accuracy</span><strong>46.0%</strong></div>
                <span class="stem-bar"><i data-value="46"></i></span>
              </div>
            </div>
          </article>

          <article class="stem-card">
            <h3>Model comparison</h3>
            <div class="stem-table-wrap">
              <table>
                <thead><tr><th>Model</th><th>Accuracy</th><th>Macro F1</th><th>Fit</th></tr></thead>
                <tbody>
                  <tr><td>LSTM</td><td class="stem-good">100%</td><td class="stem-good">100%</td><td>781 s</td></tr>
                  <tr><td>GRU</td><td class="stem-good">100%</td><td class="stem-good">100%</td><td>824 s</td></tr>
                  <tr><td>2D CNN</td><td class="stem-warn">98.79%</td><td class="stem-warn">98.76%</td><td class="stem-good">145 s</td></tr>
                </tbody>
              </table>
            </div>
            <p class="stem-card-conclusion">
              Clean accuracy is not the end result: the 49.8-point gap between
              noisy training and validation F1 indicates overfitting and sets
              the next engineering target.
            </p>
          </article>
        </div>

        <aside class="stem-limit stem-reveal">
          <span>Interpretation limit</span>
          <p>
            The test windows are unseen time slices of fault scenarios that
            appear in training—not held-out severities or turbines. The clean
            100% result shows that this representation separates the benchmark
            classes; it does not yet demonstrate transfer to a new machine.
          </p>
        </aside>
      </div>
    </section>

    <section class="stem-section" id="stem-journey">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Learning journey</p>
        <h2>From Python fundamentals to a three-class CMS</h2>
        <p class="stem-lead">
          The six-week camp deliberately built the project in layers: code,
          visualization, neural-network evaluation, signal processing, and
          finally wind-turbine fault diagnosis.
        </p>

        <div class="stem-grid-2 stem-journey-grid stem-reveal stem-space-lg">
          <div class="stem-timeline">
            <article>
              <span>Week 1</span>
              <h3>Python foundations</h3>
              <p>Data structures, slicing, loops, conditions, and reproducible notebook work.</p>
            </article>
            <article>
              <span>Week 2</span>
              <h3>Wind-farm data visualization</h3>
              <p>Pandas filtering, correlation maps, and operating relationships in Kelmarsh SCADA.</p>
            </article>
            <article>
              <span>Week 3</span>
              <h3>Neural-network evaluation</h3>
              <p>A bank-churn ANN introduced scaling, confusion matrices, ROC curves, and AUC.</p>
            </article>
            <article>
              <span>Week 4+</span>
              <h3>Wavelets and fault classification</h3>
              <p>dmey features, temporal windows, LSTM/GRU/CNN training, and robustness analysis.</p>
            </article>
          </div>
          <figure>
            <img src="images/stem-ann-roc.png" alt="ROC curve from the introductory neural-network exercise" loading="lazy" data-stem-lightbox>
            <figcaption>Introductory ANN exercise: test accuracy 86.3%, ROC AUC 0.865.</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="stem-section stem-section-alt stem-conclusion" id="stem-conclusion">
      <div class="stem-wrap">
        <p class="stem-eyebrow">Conclusion &amp; next steps</p>
        <h2>What the project established</h2>
        <div class="stem-grid-2 stem-reveal stem-space-md">
          <article class="stem-card">
            <h3>Takeaway</h3>
            <ul>
              <li>High-resolution generator current contains enough structure to grade clean benchmark faults.</li>
              <li>Wavelet coefficients provide compact time-frequency features for the classifier.</li>
              <li>LSTM and GRU maximize clean accuracy; CNN offers a strong speed–accuracy trade-off.</li>
            </ul>
          </article>
          <article class="stem-card">
            <h3>Next experiment</h3>
            <ul>
              <li>Add denoising and noise augmentation.</li>
              <li>Hold out entire severities and fault scenarios during training.</li>
              <li>Validate across phases, operating conditions, and real wind-turbine signals.</li>
            </ul>
          </article>
        </div>
        <p class="stem-reference">
          Benchmark reference:
          <a href="https://doi.org/10.1115/1.4067056" target="_blank" rel="noopener">
            Yan, Senemmar, and Zhang, <em>ASME Journal of Mechanical Design</em>, 2025
          </a>.
        </p>
        <p class="stem-acknowledgement">
          The team received the UT Dallas STEM Bridge Best Science Education
          Award. Thanks to Dr. Jie Zhang, Jingyi Yan, Fazlur Rahman Bin Karim,
          UT Dallas, and the TAST/STEM Bridge program.
        </p>
      </div>
    </section>

    <div class="stem-lightbox" id="stem-lightbox" role="dialog" aria-modal="true" aria-label="Expanded figure" hidden>
      <button type="button" aria-label="Close expanded figure">×</button>
      <img alt="">
    </div>
  `;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Animated three-phase current behind the title. */
  const canvas = document.getElementById("stem-wave-canvas");
  const context = canvas && canvas.getContext("2d");
  let canvasWidth = 0;
  let canvasHeight = 0;
  let phase = 0;

  function resizeCanvas() {
    if (!canvas || !context) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = canvas.clientWidth * dpr;
    canvasHeight = canvas.clientHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  function drawCurrent() {
    if (!context) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["#c25c00", "#8a857b", "#d2ccc0"];
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    colors.forEach((color, channel) => {
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = 1.5 * dpr;
      for (let x = 0; x <= canvasWidth; x += 4 * dpr) {
        const envelope = 0.58 + 0.42 * Math.sin((x / canvasWidth) * Math.PI);
        const y =
          canvasHeight * 0.62 +
          Math.sin(x * 0.012 / dpr + phase - channel * 2.094) *
            canvasHeight *
            0.15 *
            envelope;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    });
  }

  function animateCurrent() {
    drawCurrent();
    phase += 0.02;
    window.requestAnimationFrame(animateCurrent);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  if (reducedMotion) drawCurrent();
  else animateCurrent();

  /* Count the four project highlights into place. */
  document.querySelectorAll("[data-stem-count]").forEach((node) => {
    const target = Number(node.dataset.stemCount);
    const suffix = node.dataset.suffix || "";
    if (reducedMotion) {
      node.textContent = target.toLocaleString("en-US") + suffix;
      return;
    }

    const started = performance.now();
    const duration = 1300;
    function tick(now) {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      node.textContent = value.toLocaleString("en-US") + suffix;
      if (progress < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  });

  /* Scroll reveals and metric bars. Content stays visible without JS. */
  const reveals = root.querySelectorAll(".stem-reveal");
  if (!reducedMotion && "IntersectionObserver" in window) {
    root.classList.add("stem-motion");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((item) => {
          if (!item.isIntersecting) return;
          item.target.classList.add("is-visible");
          observer.unobserve(item.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((node) => revealObserver.observe(node));
  }

  const barGroup = root.querySelector("[data-stem-bars]");
  function fillBars() {
    if (!barGroup) return;
    barGroup.querySelectorAll("[data-value]").forEach((bar) => {
      bar.style.width = bar.dataset.value + "%";
    });
  }
  if (
    barGroup &&
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {
    const barObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((item) => item.isIntersecting)) return;
        fillBars();
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    barObserver.observe(barGroup);
  } else {
    fillBars();
  }

  /* Model result tabs. */
  const tabs = [...root.querySelectorAll("[data-stem-tab]")];
  const panels = [...root.querySelectorAll("[data-stem-panel]")];
  function selectTab(name) {
    tabs.forEach((tab) => {
      const selected = tab.dataset.stemTab === name;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.stemPanel === name;
      panel.classList.toggle("is-active", selected);
      panel.hidden = !selected;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab.dataset.stemTab));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(index + offset + tabs.length) % tabs.length];
      selectTab(next.dataset.stemTab);
      next.focus();
    });
  });
  selectTab("lstm");

  /* Figure lightbox. */
  const lightbox = document.getElementById("stem-lightbox");
  const lightboxImage = lightbox && lightbox.querySelector("img");
  const lightboxClose = lightbox && lightbox.querySelector("button");
  let lastFocusedImage = null;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedImage) lastFocusedImage.focus();
  }

  root.querySelectorAll("[data-stem-lightbox]").forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", (image.alt || "Figure") + " — enlarge");
    function openImage() {
      if (!lightbox || !lightboxImage) return;
      lastFocusedImage = image;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    }
    image.addEventListener("click", openImage);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage();
      }
    });
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* Track the current case-study section in the secondary navigation. */
  const sectionLinks = [
    ...root.querySelectorAll(".stem-subnav-links a")
  ];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  function markCurrentSection() {
    let current = sections[0] ? sections[0].id : "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    sectionLinks.forEach((link) => {
      const active = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  markCurrentSection();
  window.addEventListener("scroll", markCurrentSection, { passive: true });
}
