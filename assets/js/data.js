/* ------------------------------------------------------------------
   SITE CONTENT
   This is the only file you need to edit to add or change entries.

   Each entry:
     id       - unique slug; becomes the URL: entry.html?id=<slug>
     kind     - "experience" or "project"
     title    - headline
     org      - organization / venue
     date     - date range shown next to the title
     image    - path to the card image, e.g. "images/pacbot.jpg"
                (leave "" and a clean placeholder is drawn instead)
     blurb    - one or two sentences shown on the front page
     tags     - short list of tools / topics
     links    - [{ label, href }] shown on the detail page
     overview - paragraph(s) at the top of the detail page (array)
     details  - [{ heading, points: [] }] sections on the detail page
     gallery  - extra images on the detail page:
                [{ src: "images/foo.jpg", caption: "..." }]
     documents- papers / reports shown as a cover card with an inline
                preview: [{ kicker, title, authors, venue, href, cover,
                            pages }] — put the PDF in /docs and a cover
                image (page 1) in /images
   ------------------------------------------------------------------ */

const SITE = {
  name: "Tianyu Lu",
  eyebrow: "TAMS · University of North Texas · Class of 2027",
  tagline:
    "TAMS student at the University of North Texas, working on multi-robot task dispatching, autonomous-driving perception, racing-drone hardware, and aerodynamic simulation.",
  description:
    "Tianyu Lu — student at the Texas Academy of Mathematics and Science, University of North Texas. Research in multi-robot dispatching and autonomous-driving perception, plus drone hardware and aerodynamics.",
  location: "Denton, TX",
  school: "TAMS, University of North Texas",
  email: "TianyuLu@my.unt.edu",
  github: "",
  resume: "docs/al_resume_1.pdf",
  about: [
    "I'm a student at the Texas Academy of Mathematics and Science at the University of North Texas in Denton (August 2025–May 2027, expected). TAMS is a residential early-college program; I take university coursework in grades 11–12.",
    "I finished grades 9–10 at Jasper High School in Plano, Texas (August 2023–May 2025) before coming to TAMS.",
    "Most of my time goes to autonomous systems, drone hardware, and simulation — dispatching ground robots from aerial sensing, multi-camera perception, and studying how a design change shows up in the flow."
  ],
  skills: [
    {
      heading: "Autonomous systems and machine learning",
      items:
        "PPO-based task dispatching, Open-RMF, MMDetection, Transformer and occupancy-model workflows"
    },
    {
      heading: "Drone hardware and control",
      items:
        "Hardware integration and flight tuning, 3D printing, pre-flight risk checks"
    },
    {
      heading: "Mechanical modeling and simulation",
      items: "ANSYS Fluent modeling and meshing, aerodynamic simulation"
    },
    {
      heading: "Communication",
      items:
        "Research writing; technical podcast scripting, recording, and production"
    },
    {
      heading: "Programming Languages",
      items: "Python, Java, C++, JavaScript, HTML, CSS"
    }
  ]
};

const ENTRIES = [
  /* ----------------------------- EXPERIENCE ----------------------------- */
  {
    id: "yang-lab",
    kind: "experience",
    title: "UAV-Assisted UGV Task Dispatching",
    role: "Student Researcher",
    org: "University of North Texas, Prof. Qing Yang's Lab",
    date: "Aug. 2025 — Present",
    image: "images/yang-lab-results.svg",
    imageFit: "contain",
    blurb:
      "Built a ROS 2/Open-RMF experiment pipeline and an attention-enhanced PPO dispatcher for three UGVs receiving UAV-discovered tasks. In the current repeated-run batch, Attn-PPO reduced mean mission time by 16.0% versus PPO while improving workload balance.",
    tags: [
      "Attn-PPO",
      "ROS 2",
      "Open-RMF",
      "Gazebo",
      "Stable-Baselines3",
      "Python",
      "C++"
    ],
    links: [],
    overview: [
      "I work in Prof. Qing Yang's lab at the University of North Texas. My research asks how a fleet should assign newly discovered tasks when every choice changes future robot queues, travel distance, and mission completion time.",
      "I built the end-to-end experimental stack in ROS 2, Gazebo, and Open-RMF: a simulated UAV discovers red-cube targets, a learned policy assigns each task to one of three delivery robots, RMF executes the navigation request, and completion-monitoring and recorder nodes close the loop. The same interfaces let me compare learned policies with deterministic baselines without changing the robot-execution layer.",
      "The current aggregated evaluation batch shows a meaningful trade-off. Attn-PPO reached the shortest mean mission time and lowest queue-count variance, while greedy scheduling retained lower local waiting time and movement distance. I therefore treat attention as a fleet-level scheduling improvement in this configuration, not as a universal winner on every objective."
    ],
    details: [
      {
        heading: "End-to-end system engineering",
        points: [
          "Orchestrated the airport-terminal experiment with a single launch pipeline that starts the RMF/Gazebo scene, task monitor, custom RMF task server, selected dispatcher, red-cube targets, UAV task-notification process, and CSV recorder in a controlled sequence.",
          "Defined the ROS 2 dispatch loop: /task_monitor/start announces a target; the dispatcher combines that queue with /fleet_states; /submit_single_nav_task sends the selected robot and waypoint to the RMF adapter; and /custom_task_completion returns the outcome to the policy and recorder.",
          "Implemented task completion around physical execution rather than a synthetic timeout. The monitor tracks deliveryRobot positions, confirms arrival and dwell near the target, submits the RMF completion event, and removes the corresponding Gazebo entity.",
          "Kept decision logic replaceable: PPO, Attn-PPO, A2C, DQN, greedy, and round-robin dispatchers all use the same task source, RMF execution path, completion monitor, and data recorder."
        ]
      },
      {
        heading: "Attention-enhanced PPO",
        points: [
          "Formulated dispatching as a 63-feature observation: 3 × 7 robot features, 8 × 3 pending-task features, 9 global workload features, and 3 × 3 estimated start times. Four discrete actions select one of three UGVs or wait.",
          "Converted the flat state into 12 entities—one global token, three robot tokens, and eight task tokens—and masked inactive task slots before attention. The encoder uses 64-dimensional embeddings, four self-attention heads, a residual connection with layer normalization, and a 128-dimensional output shared by PPO's policy and value functions.",
          "Kept PPO's optimizer, reward, action space, and RMF interface fixed. The reward combines valid assignment, task waiting, travel distance, nonlinear queue congestion, completion, and estimated-makespan improvement.",
          "Code-level qualification: the current attention extractor accepts the 63-dimensional observation for interface compatibility but tokenizes only the first 54 robot, task, and global features. The final nine estimated-start-time features are not consumed by its forward pass, so a strict feature-controlled PPO-versus-Attn-PPO ablation still requires aligning those inputs.",
          "Trained through Stable-Baselines3 with a 3 × 10⁻⁴ learning rate, 2,048-step rollouts, batch size 64, discount factor 0.95, and masked attention over the varying pending-task set."
        ]
      },
      {
        heading: "Experimental design and instrumentation",
        points: [
          "Evaluated three delivery robots on 20 spatially distributed red-cube tasks in the Open-RMF airport-terminal map. The task-discovery layer releases a task every 20 seconds; up to eight pending tasks are visible to the policy.",
          "Recorded end-to-end experiment time, completion rate, average waiting time, total and per-robot movement distance, task counts, idle ratios, and active-task count from the same ROS 2 topics for every dispatcher.",
          "Built batch-test scripts for learned and heuristic policies and an analysis pipeline that extracts run-level metrics, computes mean and standard deviation, derives queue-count variance, and produces comparison figures.",
          "Used CPU inference on a one-second dispatch cycle; the attention encoder processes only 12 tokens, keeping policy inference small relative to RMF navigation time."
        ]
      },
      {
        heading: "Current results",
        points: [
          "Across the current aggregated RMF evaluation batch, Attn-PPO recorded 633.14 ± 12.68 s mean completion time and 0.76 ± 0.65 queue-count variance—the best fleet-level values among the six evaluated dispatchers.",
          "Against PPO-MLP, Attn-PPO reduced mean completion time from 753.64 s to 633.14 s (16.0%) and queue-count variance from 2.22 to 0.76 (65.8%). It was also 16.7% faster than A2C, 33.5% faster than greedy, and 46.9% faster than round-robin in this batch.",
          "The result is multi-objective rather than uniformly dominant: greedy achieved the lowest mean waiting time (291.16 s) and per-robot movement distance (177.34 m), while Attn-PPO used 357.26 s and 189.14 m. Attention performed best when the objective emphasized overall mission completion and balanced robot queues.",
          "The strongest conclusion is bounded to this simulation configuration and the available logged runs, which do not identify matched independent training seeds. The study currently uses one map, three UGVs, a fixed task pool, and UAV-assisted task discovery; feature-aligned ablations, matched seeds, additional layouts, higher arrival rates, and physical-robot transfer remain future work."
        ]
      },
      {
        heading: "Research communication",
        points: [
          "Prepared the project as a first-author manuscript covering the ROS 2/RMF architecture, MDP, attention encoder, controlled baselines, ablations, experimental trade-offs, and limitations.",
          "Submitted the manuscript on August 1, 2026 to the IEEE Annual Congress on Artificial Intelligence of Things; it is under review.",
          "Extended the original logistics formulation toward search-and-rescue scenarios, where aerial sensing supplies target locations and ground robots perform the response."
        ]
      }
    ],
    documents: [
      {
        kicker: "Manuscript",
        title:
          "Attention-Enhanced PPO for UGV Task Dispatching in UAV-Assisted Open-RMF Logistics",
        authors: "Tianyu Lu (first author)",
        venue:
          "Submitted August 1, 2026 to the IEEE Annual Congress on Artificial Intelligence of Things. Under review.",
        summary:
          "Presents the complete ROS 2/Open-RMF pipeline, 63-dimensional dispatching MDP, masked 12-token attention encoder, and a shared-pipeline comparison with PPO, A2C, DQN, greedy, and round-robin scheduling.",
        href: "docs/Attn_PPO_Paper_Draft (1).pdf"
      }
    ],
    figuresHeading: "System and evidence",
    figures: [
      {
        src: "images/yang-lab-system-architecture.svg",
        wide: true,
        alt: "End-to-end ROS 2 and Open-RMF architecture for UAV-assisted UGV task dispatching, from target discovery through policy assignment, RMF execution, task completion, and data recording.",
        caption:
          "End-to-end experimental architecture. UAV-assisted target discovery feeds a replaceable dispatcher; the RMF adapter and fleet execute the assignment; completion events and recorded fleet state close the evaluation loop.",
        text: [
          "The software separates task discovery, decision making, and execution. That boundary made the experiment reproducible: every algorithm receives the same task notifications and fleet-state stream, then submits assignments through the same SingleNavTask service.",
          "The current RL action controls only the three UGVs. The UAV supports sensing and task generation but is not yet a dispatchable agent."
        ]
      },
      {
        src: "images/yang-lab-results.svg",
        wide: true,
        alt: "Comparison of mean mission completion time for Attn-PPO, PPO, A2C, greedy, round-robin, and DQN, with a summary of waiting time, movement distance, and queue variance.",
        caption:
          "Current aggregated RMF evaluation batch. Lower is better for every metric; error bars show standard deviation where reported.",
        text: [
          "Attn-PPO is strongest on the two fleet-level objectives emphasized in this study: total completion time and workload balance. Its mean completion time is 16.0% below PPO's, and its queue-count variance is 65.8% lower.",
          "Greedy remains an important baseline: it minimizes immediate waiting and travel in this map, but its mean mission completion time is longer. The comparison is evidence of an objective trade-off, not a claim that one policy dominates every metric."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "autonomous-perception",
    kind: "experience",
    title: "Dynamic Expert Routing for Multi-Task Vision (GiT)",
    role: "Research Assistant",
    org: "UNT Autonomous-Driving Perception Project",
    date: "Aug. 2025 — Present",
    image: "images/gitbev.png",
    blurb:
      "Extends GiT, a generalist vision model, with task-conditioned dual-expert routing across detection, segmentation, captioning, and grounding. Studies when tasks should share representations versus separate pathways, including KoLeo-based feature separation, routing visualizations, and ablations.",
    tags: [
      "GiT",
      "Multi-task learning",
      "Expert routing",
      "KoLeo",
      "Object detection",
      "Segmentation",
      "Visual grounding"
    ],
    links: [],
    overview: [
      "Learning When to Share: Dynamic Expert Routing for Multi-Task Vision in GiT builds on GiT, a generalist vision model, to ask when tasks such as object detection, instance segmentation, semantic segmentation, image captioning, and visual grounding should share knowledge and when they should use different computational pathways.",
      "The project develops a dynamic, task-conditioned dual-expert routing architecture and evaluates whether feature-separation methods such as KoLeo can produce meaningful expert specialization. Analysis includes carefully aligned baselines, loss-curve studies, routing visualization, feature-distance measurements, and ablation experiments.",
      "Preliminary findings suggest that simply increasing the distance between expert representations does not necessarily improve performance, and that visual tasks may form distinct collaborative families. The work therefore explores routing mechanisms that adaptively select experts according to the current input and generation state, with the goal of reducing interference in multi-task learning."
    ],
    details: [
      {
        heading: "Problem and motivation",
        points: [
          "Multi-task vision training can help related tasks transfer representation, but shared parameters also create interference when tasks need different features or decoding behavior.",
          "GiT provides a single backbone for diverse vision-and-language outputs; the research question is how to route computation so collaboration happens where it helps and separation happens where it hurts."
        ]
      },
      {
        heading: "Methods",
        points: [
          "Implemented a task-conditioned dual-expert routing module on top of GiT so each forward pass can allocate features to one of two expert pathways based on task context and model state.",
          "Compared routing-only designs against feature-separation objectives such as KoLeo, with baselines matched on capacity and training schedule so observed differences trace to routing and regularization rather than setup drift.",
          "Tracked training dynamics with loss curves, expert-usage and routing maps, and pairwise feature-distance statistics to connect specialization patterns with downstream metrics."
        ]
      },
      {
        heading: "Preliminary findings",
        points: [
          "Pushing expert representations farther apart in feature space did not reliably improve task accuracy; separation alone is not a sufficient training signal for useful specialization.",
          "Tasks clustered into collaborative families—groups that benefited from shared experts—rather than requiring a fixed one-expert-per-task partition.",
          "Input- and state-dependent routing is the more promising direction for limiting cross-task interference while preserving shared structure where tasks align."
        ]
      },
      {
        heading: "My contribution",
        points: [
          "Ran model experiments, analyzed training and evaluation logs, and built visualizations that support hypothesis testing rather than one-off result plots.",
          "Helped formulate concrete research questions—for example, when KoLeo helps routing versus when it only decorrelates features—and tested them against the empirical evidence from ablations and baselines."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "stem-bridge",
    kind: "experience",
    layout: "stem-rich",
    title: "Wind-Turbine Condition Monitoring",
    role: "Team Researcher",
    org: "UT Dallas STEM Bridge, advised by Dr. Jie Zhang",
    date: "Summer 2025",
    image: "images/utdwind.png",
    imageFit: "contain",
    blurb:
      "Team project at UT Dallas: graded generator inter-turn short circuits from three-phase current and discrete-Meyer wavelet coefficients. On clean simulated signals, LSTM and GRU both reached 100% test accuracy; noise at SNR 10 dropped validation F1 to 46.3%.",
    tags: ["LSTM", "GRU", "2D CNN", "DWT", "Python"],
    links: [
      {
        label: "Yan, Senemmar, and Zhang, ASME J. Mech. Des. 2025",
        href: "https://doi.org/10.1115/1.4067056"
      }
    ],
    overview: [
      "Team project at the UT Dallas STEM Bridge camp: Machine Learning-Enabled Condition Monitoring of Wind Turbines Using High-Resolution Electrical Signals (UTD-011). I worked on it with Amanda Yin, Christopher Huang, Emily Yin, and Irene Liu. Advisor: Dr. Jie Zhang. Graduate assistants: Jingyi Yan and Fazlur Rahman Bin Karim.",
      "We learned the turbine, then Python visualization, then a condition monitor that reads the generator windings. The team received the program's Best Science Education Award.",
      "The models follow the DOES Lab benchmark for inter-turn short-circuit faults. Each window of three-phase current, plus level-1 discrete Meyer wavelet coefficients, is labeled green (healthy or mild), yellow (moderate, still running), or red (severe)."
    ],
    details: [
      {
        heading: "Problem",
        points: [
          "Maintenance is about 38% of wind-turbine spending, and the generator accounts for about 17% of failures. The camp goal was a low-cost monitor that flags winding faults early enough to cut downtime.",
          "A plant already watches the gearbox (vibration, oil temperature, particle count), the generator (temperature, vibration, insulation resistance, SCADA), the blades, the shaft and bearings, and the tower. We used current from the windings, the electrical measurement the generator already produces."
        ]
      },
      {
        heading: "Signals and features",
        points: [
          "Each fault file is a simulated stator record from 0.05 s to 80 s, sampled every 0.25 ms, with columns for time, phase currents A/B/C, and the matching discrete-Meyer (dmey) level-1 approximation coefficients.",
          "Filenames encode the faulted phase, a resistance parameter R, and a fault-winding ratio fwr. The lab scenario table maps each pair onto green, yellow, or red. A higher fault resistance is a milder short, so two files with the same winding ratio can sit in different classes.",
          "We also plotted a year of 10-minute SCADA from Kelmarsh turbine 1 (2020, about 52,700 rows: wind speed, power, energy export, and lost production) to learn the operating data before moving to the high-rate current records.",
          "A discrete wavelet transform places each frequency in time, which fits a non-stationary current. The approximation coefficients carry the slow trend; the detail coefficients carry short transients."
        ]
      },
      {
        heading: "How a window becomes a label",
        points: [
          "Training uses the steady 20–40 s of each record. Currents are divided by 4,000 and wavelet coefficients by 60, then cut into windows of 50 time steps, so one example is a 50 × 6 tensor.",
          "The split is temporal inside each scenario: 0–30% and 50–90% train, 30–40% validate, and 40–50% plus 90–100% test. Windows are shuffled after the cut, and the training set is randomly oversampled so no class is the majority.",
          "The test windows are new slices of faults the model has already seen, not held-out severities or turbines. A perfect score on clean simulation shows that the classes separate in this representation. It does not show that the monitor would grade a new machine."
        ]
      },
      {
        heading: "Models",
        points: [
          "The monitor is an LSTM, so a fault pattern can persist in the cell state instead of vanishing across the window. Stack: LSTM 24, 48, 48, and 24 units, dropout 0.1 after each layer, then a 3-way softmax. Loss is categorical cross-entropy, the optimizer is Adam, and the tracked metric is F1.",
          "The same windows also trained a GRU with the same widths (dropout 0.1, 0.2, 0.2, 0.1) and a 2D CNN: 24 and 48 filters of size 2×2, then two dense layers of 48. Recurrent models ran 15 epochs at batch 768; the CNN used batch 512.",
          "On a GPU the 15-epoch LSTM fit took about 781 s and the GRU about 824 s. The CNN finished in about 145 s."
        ]
      },
      {
        heading: "Clean-signal results",
        points: [
          "LSTM and GRU both scored 100% accuracy and macro F1 on the validation windows and on the test windows (about 831,000 test windows, confusion matrices with an empty off-diagonal).",
          "The 2D CNN reached 98.79% test accuracy and 0.9876 macro F1. Every red window was correct. The mistakes sit between green and yellow: about 5,500 green windows called yellow and about 4,600 yellow windows called green."
        ]
      },
      {
        heading: "Noise",
        points: [
          "With noise at SNR 10, training F1 stays high at 96.1%, but training accuracy is 62.6%. Validation falls to 46.3% F1 and 46.0% accuracy.",
          "That gap is the limit of the result. Clean simulated current is easy for an LSTM once every severity has been seen; the same model does not hold its score when the current is noisy. A usable monitor still needs denoising, augmentation, or features that survive SNR 10, plus a split that holds out severities the model has never trained on."
        ]
      }
    ],
    figuresHeading: "Signals and test-set confusion",
    figures: [
      {
        src: "images/utdwind.png",
        wide: true,
        alt: "Wind turbine, generator windings, and an LSTM cell that reads the electrical signal over time",
        caption:
          "The monitor reads the generator windings as a time series and classifies the window with an LSTM.",
        text: [
          "Phase currents enter as the sequence x. The cell state C and the hidden state h carry a fault pattern from one step to the next."
        ]
      },
      {
        src: "images/stem-dwt.png",
        wide: true,
        alt: "Discrete wavelet transform of a time series with a db4 wavelet: original signal, level-3 approximation, and detail coefficients at levels 3, 2, and 1",
        caption:
          "Discrete wavelet transform with a db4 wavelet. Approximation coefficients keep the slow shape; detail coefficients keep the short spikes.",
        text: [
          "The fault records use discrete Meyer at one level. This db4 example shows the same split: low-frequency trend in the approximation, transients in the details."
        ]
      },
      {
        src: "images/stem-current.png",
        wide: true,
        alt: "Phase A stator current over 80 seconds of a normal-operation simulation, active from about 18 to 62 seconds",
        caption:
          "Normal operation, phase A current. The machine is running from about 18 s to 62 s; the model sees only 20–40 s.",
        text: [
          "The same plot for a fault file is the raw input, before the current is scaled by 4,000 and stacked with the other two phases."
        ]
      },
      {
        src: "images/stem-coef.png",
        wide: true,
        alt: "Discrete Meyer approximation coefficients for phases A, B, and C during normal operation",
        caption:
          "Level-1 discrete-Meyer approximation coefficients for phases A, B, and C on the same normal run.",
        text: [
          "These three series are the other half of each window. On a clean record they are smooth and large only while the machine is producing current, which is why a classifier can separate the lab scenarios before any noise is added."
        ]
      },
      {
        src: "images/stem-cm-lstm.png",
        alt: "LSTM test confusion matrix with all mass on the diagonal for classes 0, 1, and 2",
        caption:
          "LSTM test confusion matrix. Classes 0, 1, and 2 are green, yellow, and red.",
        text: [
          "Every test window landed on the diagonal. The GRU matrix is the same pattern. Both scores are on clean windows drawn from scenarios that also appear in training."
        ]
      },
      {
        src: "images/stem-cm-gru.png",
        alt: "GRU test confusion matrix with all mass on the diagonal",
        caption: "GRU test confusion matrix, same split and same clean records.",
        text: [
          "GRU matched the LSTM score. The 15-epoch fit took about 824 s, against about 781 s for the LSTM."
        ]
      },
      {
        src: "images/stem-cm-cnn.png",
        alt: "2D CNN test confusion matrix with residual errors between classes 0 and 1 and none in class 2",
        caption:
          "2D CNN test confusion matrix. Red is exact; the remaining errors are green versus yellow.",
        text: [
          "The CNN is the practical comparison: about five times faster to train, and 98.79% accurate, with the residual confined to the two neighboring classes."
        ]
      }
    ],
    gallery: []
  },
  /* ------------------------------ PROJECTS ------------------------------ */
  {
    id: "ekdrone",
    kind: "project",
    title: "EkDrone Racing UAV",
    role: "Hardware and Flight Lead",
    org: "EkDrone Racing UAV Project · TAMS / UNT",
    date: "2025–2026",
    image: "images/racingdrone2.png",
    blurb:
      "Four-person team engineering a micro-class racing quad to challenge the Guinness World Records for battery-powered RC quadcopter speed—targeting on the order of 400 km/h (250 mph)—with wing-informed structure, propeller aerodynamics, and a compact FPV avionics stack.",
    tags: [
      "FPV",
      "Aerodynamics",
      "CAD",
      "Propeller design",
      "Flight testing"
    ],
    links: [],
    overview: [
      "Our team is dedicated to pushing the limits of aerial technology. Our primary goal is to break the world record for drone speed in the quadcopter form factor, setting a new benchmark for performance and engineering innovation. Along the way, we aim to share what we learn. In the future, we plan to educate and inspire the next generation of creators, bringing drone knowledge to local communities, students, and anyone passionate about flight.",
      "We combine aerospace structure and airfoil work, computer-engineering hardware integration, and flight-control software. The near-term focus is the Guinness categories for fastest speed by a battery-powered RC quadcopter and fastest speed by an RC micro drone (quadcopter), with outreach tied to the UNT and TAMS communities.",
      "Project roadmap: procure the full bill of materials by early November 2025, fly a functional prototype by early December 2025 (electronics suite plus first-pass aerodynamic body), then iterate toward a record attempt by March 2026, with at most about one month of schedule margin."
    ],
    details: [
      {
        heading: "Aerodynamics and structure",
        points: [
          "Prioritize stability at extreme speed—earlier record attempts in our research failed when the frame could not stay controllable, so the four-rotor support structure is being shaped like a lifting surface rather than a bare cross arm.",
          "Airfoil and planform studies draw on NACA and Eppler families (for example NACA 633018 and FX 63-137) with CFD and hand sketches that explore blended bodies, fin placement, and boundary-layer management on the nose and fuselage.",
          "Wind-tunnel nose comparisons at roughly 39 mph and 72 °F showed a long elliptical nose produced the lowest measured drag (~4.15 g) among parabolic, ogive, conical, and blunt-cylinder options—guiding the forward fuselage CAD.",
          "Manufacturing targets include faster builds (on the order of a few days for printed propellers and main body), carbon-fiber fits where stiffness matters, and optional riblet or surface-roughness treatments on micro-propellers after published thrust-stand studies."
        ]
      },
      {
        heading: "Propulsion, avionics, and packaging",
        points: [
          "Control link: RadioMaster TX16S (EdgeTX) transmitter with an ExpressLRS receiver on the airframe; flight stack centers on a combined flight-controller and ESC board sized for high-RPM micro motors.",
          "Power train: 6S 650 mAh high-discharge LiPo (XT30), Flash Hobby Arthur 1408 2800 KV class motors, low-ESR bulk capacitors, and 18 AWG / 26 AWG harnessing following FPV wiring practice.",
          "Video and telemetry: micro FPV camera, 5.8 GHz VTX (Rush Tank Solo class), RHCP antenna, and goggles for chase viewing; GPS module reserved for future positioning experiments.",
          "Pack electronics to minimize frontal area when viewed from ahead while keeping cable runs short—length is traded against drag and center-of-mass placement in the CAD body."
        ]
      },
      {
        heading: "Propeller modeling and test plan",
        points: [
          "Propeller thrust uses static and dynamic models (including the empirical dynamic-thrust formulation from electricrcaircraftguy.com) to bracket RPM, pitch, and forward speed before bench tests.",
          "Open research questions on our sensitivity list: push–pull motor installation drag (on the order of 0.3 N per motor), fin drag and directional stability, whole-airframe drag buildup, and propeller design sweeps (axial bend, sweep, blade count, and angle of attack at target speed).",
          "Literature on 3D-printed micro-propeller roughness suggests measurable thrust gain and power reduction at matched Reynolds number—another knob in the design space alongside conventional pitch and diameter trades.",
          "Future flight-software scripts include auto-hover and straight-line assist modes to make high-speed trim and range testing repeatable once the prototype is airborne."
        ]
      },
      {
        heading: "Hardware, flight operations, and outreach",
        points: [
          "Built the racing drone with three teammates. I lead hardware integration, component compatibility checks, and receiver and transmitter tuning.",
          "Balance power-to-weight and flight gains for high-speed flight using racing-grade materials and 3D-printed parts informed by fluid-dynamics simulation and the structural CAD.",
          "Author and run a pre-flight risk checklist, manage flight operations, and conduct maiden-flight milestones after the team verifies the system.",
          "Longer-term outreach includes STEM partnerships (for example AIAA volunteer channels), low-cost educational airplane kits for schools, and documenting the build for sponsors and campus collaborators."
        ]
      }
    ],
    figuresHeading: "Design studies and validation",
    figures: [
      {
        src: "images/ekdrone/doc-2-image4.jpg",
        wide: true,
        alt: "Notebook sketches of drone airframes, wings, and boundary-layer notes",
        caption:
          "Early notebook concepts: blended lifting bodies, multi-rotor layouts, and boundary-layer notes on the nose and fuselage.",
        text: [
          "Sketches explore wing-shaped rotor supports and “advanced” versus pictorial layouts before the team locked manufacturing-friendly geometry in CAD."
        ]
      },
      {
        src: "images/ekdrone/doc-4-image1.png",
        alt: "Table of nose-shape wind-tunnel drag measurements at about 39 mph",
        caption:
          "Nose-shape drag comparison at ~39 mph and 72 °F; long elliptical profile measured the lowest drag in the sweep.",
        text: [
          "The table motivated a sharper but still elliptical forward section instead of a blunt cylinder, which measured roughly twice the drag of the best shape in the same tunnel run."
        ]
      },
      {
        src: "images/ekdrone/doc-1-image2.png",
        alt: "Dynamic thrust equation for propellers relating RPM, diameter, pitch, and forward airspeed",
        caption:
          "Dynamic thrust model used to bracket propeller RPM, diameter, and pitch before bench and thrust-stand experiments.",
        text: [
          "We use the expanded and simplified forms to sanity-check motor and prop choices against target airspeed, then refine with measured thrust-stand data on printed props."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "UAV",
    kind: "project",
    title: "Autonomous Quadrotor UAV",
    role: "Hardware and Autonomy Integration",
    org: "Research UAV platform",
    date: "2025",
    image: "images/drone1.jpg",
    blurb:
      "Quadrotor built for onboard planning and flight: Jetson companion computer, depth camera, and an NxIPX4v2 stack with GPS and IMU, running PX4, ROS 2, and EGO-Planner.",
    tags: ["PX4", "ROS 2", "EGO-Planner", "Jetson", "UAV"],
    links: [],
    overview: [
      "This project is a research quadrotor aimed at autonomous navigation in cluttered space. The airframe carries a depth camera and an edge computer for perception and planning, while a dedicated flight controller closes the loop on attitude, position, and motor outputs.",
      "We designed the platform in two layers: a power and avionics architecture (main bus, DC–DC conversion, short-circuit protection, RC link, and companion computer) and a PX4 wiring stack on a 2–6S power distribution board with four ESC outputs, an M1430 GPS module, and an IMU on the NxIPX4v2 flight controller.",
      "On software, PX4 runs on the flight controller for stabilization and low-level control; ROS 2 on the companion computer handles sensors, state estimation, and offboard commands; EGO-Planner generates local, obstacle-aware trajectories that feed the autonomy pipeline."
    ],
    details: [
      {
        heading: "System architecture",
        points: [
          "Main battery power passes through DC–DC regulation and short-circuit detection before it reaches the Jetson companion computer, the camera, and the RC receiver, so bench and field tests stay within a defined safe envelope.",
          "The flight stack sits on an NxIPX4v2 controller wired to a 2–6S distribution board with 32 A ESC outputs to four corner motors, plus GPS (M1430) and an inertial measurement unit for outdoor position and attitude.",
          "RC remains in the loop for manual override and calibration, while the companion computer exchanges setpoints and telemetry with PX4 over the serial/USB link defined in the bring-up diagram."
        ]
      },
      {
        heading: "Mechanical integration",
        points: [
          "The mechanical layout places a forward-mounted depth camera on the frame, the companion computer and flight controller in the center stack, four brushless motors on the arms, and a central LiPo pack for balance.",
          "Propeller guards and a modular center plate make sensor swaps and wiring checks easier during integration—matching the labeled assembly diagram used during the build.",
          "The photo of the assembled prototype shows the integrated wiring harness, guarded rotors, dual link antennas, and the perception payload ready for ROS 2 bring-up on the bench."
        ]
      },
      {
        heading: "Software stack",
        points: [
          "PX4 provides the real-time autopilot: sensor drivers, state estimation, and motor mixing on the flight controller, with offboard mode for trajectory tracking from the companion computer.",
          "ROS 2 nodes publish camera and IMU data, fuse odometry with GPS when available, and bridge MAVLink topics to PX4 for armed flight and mode switching.",
          "EGO-Planner (gradient-based local planning) builds a occupancy representation from depth, replans in milliseconds, and outputs smooth position commands for agile flight around obstacles."
        ]
      },
      {
        heading: "Summary and outlook",
        points: [
          "The hardware design ties protected power, PX4-grade flight electronics, and Jetson-class compute into one platform that can run the full sense–plan–act loop.",
          "Bringing EGO-Planner up on ROS 2 with PX4 offboard control validates the architecture: perception and planning stay on the companion computer; safety-critical control stays on the flight controller.",
          "Next steps are tighter calibration of the depth–body transform, outdoor GPS-inertial fusion tests, and closed-loop flights that log planner latency, tracking error, and power draw end to end."
        ]
      }
    ],
    figuresHeading: "Design diagrams and prototype",
    figures: [
      {
        src: "images/uav-architecture.png",
        wide: true,
        alt: "UAV power and avionics block diagram alongside NxIPX4v2 wiring to ESCs, GPS, and IMU",
        caption:
          "Power path (DC–DC, short-circuit detection, Jetson, camera, RC) and PX4 flight-controller wiring on the 2–6S distribution board.",
        text: [
          "The left block diagram is the logical power and compute stack; the right panel is the physical hookup for motors, GPS, and the inertial unit on the NxIPX4v2."
        ]
      },
      {
        src: "images/uav-hardware.jpg",
        wide: true,
        alt: "Labeled quadrotor assembly showing depth camera, onboard computer, flight controller, motors, and battery",
        caption:
          "Exploded mechanical layout: depth camera, companion computer, flight controller, frame, four motors, and center battery pack.",
        text: [
          "This layout guided cable routing and center-of-mass placement so the depth camera frame aligns with the planner’s occupancy grid."
        ]
      },
      {
        src: "images/drone1.jpg",
        wide: true,
        alt: "Assembled quadrotor prototype with propeller guards, depth sensor, and dual antennas on a workbench",
        caption:
          "Integrated prototype after wiring and bench checks, ready for PX4 parameter tuning and ROS 2 launch files.",
        text: [
          "Guards, the forward perception module, and the dual-antenna RC link reflect the same architecture as the schematics—now as a flyable airframe."
        ]
      }
    ],
    gallery: []
  },  
  {
    id: "wing-washout",
    kind: "project",
    title: "Wing Washout Aerodynamics Study",
    role: "Organizer",
    org: "School science project",
    date: "2024 — 2025",
    image: "images/wash.jpg",
    blurb:
      "ANSYS Fluent sweeps of a simplified 737 wing. With no washout the tip is stalled by 12° angle of attack; with 5° of washout the same tip section is still attached at 12° and at 18°.",
    tags: ["ANSYS Fluent", "SST k-omega", "Aerodynamics"],
    links: [],
    overview: [
      "I presented the project at the school science fair.",
      "The Fluent workbook is a plot book, not a written report. Each case is named 737-washout-angle: washout of 0°, 3°, or 5°, and angle of attack from 0° to 18° in steps of 3°. For every case I saved static pressure, velocity, and velocity vectors on the symmetry plane, on a cut 3 m from the root (root airfoil), on a cut 7 m from the root (tip airfoil), and on a cut 10 m from the root (the tip)."
    ],
    details: [
      {
        heading: "The study",
        points: [
          "The question was whether washout can delay tip stall on a simplified commercial-aircraft wing, and what efficiency that twist costs.",
          "I built and meshed the model in ANSYS Fluent, cleared negative-volume cells with local refinement and boundary-layer settings, and used the SST k-omega model for the vortical flow.",
          "The saved contours cover the full 0° washout sweep and the 5° washout sweep except 15°. The 3° washout cases, and 5° washout at 15°, are titled in the workbook but have no contour images.",
          "These runs mark a design range. They still need to be checked against reference or experimental data."
        ]
      },
      {
        heading: "What the contours show",
        points: [
          "At 0° washout and 0° angle of attack, the symmetry-plane pressure has a stagnation point on the nose and suction over the upper surface. The wake behind the trailing edge is thin.",
          "With no washout, the tip section at 10 m is already stalled at 12°. Velocity vectors reverse over the aft upper surface, and the same separated wake is still there at 15° and 18°.",
          "On that untwisted wing the root does not stall with the tip. At 15° the section 3 m from the root still has a fast suction peak, and the vectors follow the airfoil.",
          "With 5° of washout, the tip section at the same 12° stays attached: the vectors follow the upper surface, with only a thin slow layer near the wall. At 18° the tip flow still leaves near the trailing edge instead of opening into that reversed wake."
        ]
      }
    ],
    figuresHeading: "Selected contours",
    figures: [
      {
        src: "images/washout-0deg-0aoa-pressure.png",
        wide: true,
        alt: "Static-pressure contours on the symmetry plane of the wing at 0 degrees washout and 0 degrees angle of attack",
        caption:
          "737-0-0, symmetry plane. Static pressure at 0° washout and 0° angle of attack.",
        text: [
          "Stagnation sits on the nose, suction sits over the upper surface, and the wake is thin. This is the attached baseline the later angles are compared with."
        ]
      },
      {
        src: "images/washout-0deg-12aoa-tip-vectors.png",
        wide: true,
        alt: "Velocity vectors at the wing tip with 0 degrees washout and 12 degrees angle of attack, showing a reversed wake",
        caption:
          "737-0-12, 10 m from the root. Velocity vectors at 0° washout and 12° angle of attack.",
        text: [
          "The tip is stalled. Vectors over the aft upper surface turn back upstream, and a slow wake sits off the surface."
        ]
      },
      {
        src: "images/washout-0deg-15aoa-root-vectors.png",
        wide: true,
        alt: "Velocity vectors 3 meters from the wing root at 0 degrees washout and 15 degrees angle of attack, still following the airfoil",
        caption:
          "737-0-15, 3 m from the root. Velocity vectors at 0° washout and 15° angle of attack.",
        text: [
          "Three degrees higher than the stalled tip, the root section is still attached. A fast suction peak runs over the upper surface and the vectors follow the airfoil. On the untwisted wing, the tip loses attachment first."
        ]
      },
      {
        src: "images/washout-5deg-12aoa-tip-vectors.png",
        wide: true,
        alt: "Velocity vectors at the wing tip with 5 degrees of washout and 12 degrees angle of attack, still attached",
        caption:
          "737-5-12, 10 m from the root. Velocity vectors at 5° washout and 12° angle of attack.",
        text: [
          "Same station and same angle as the stalled untwisted tip. With 5° of washout the vectors stay on the upper surface."
        ]
      },
      {
        src: "images/washout-5deg-18aoa-tip-vectors.png",
        wide: true,
        alt: "Velocity vectors at the wing tip with 5 degrees of washout and 18 degrees angle of attack",
        caption:
          "737-5-18, 10 m from the root. Velocity vectors at 5° washout and 18° angle of attack.",
        text: [
          "At 18° the tip flow still leaves near the trailing edge. It does not open into the thick reversed wake seen without washout at 12°."
        ]
      }
    ],
    gallery: []
  },
];
