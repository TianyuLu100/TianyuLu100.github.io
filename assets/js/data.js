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
      heading: "Languages",
      items: "Python, Java, C++, JavaScript, HTML, CSS"
    }
  ],
  honors: [
    "UNT Undergraduate Research Fellowship (grades 11–12)",
    "USA Mathematical Olympiad (USAMO) qualifier; AIME best score 12/15 (grade 11)",
    "AMC 10 Distinguished Honor Roll, top 1%; AMC 12 Distinction, top 5% (grades 10–11)",
    "USA Physics Olympiad (USAPhO) qualifier via the F=ma exam (grade 10)",
    "Physics Bowl, 2nd-place team in Texas, Region 11, Division 1 (grade 10)",
    "Plano ISD Superintendent's Scholar Award, district-wide (grade 10)",
    "Best Science Education Award, UTD STEM Bridge Summer Research Camp (grade 10)"
  ],
  athletics: [
    "Point guard, TAMS basketball (2023–present). Played in the UNT Open Basketball Tournament, and keep a near-daily strength and running routine from middle school.",
    "TAMS table tennis (2023–present). Weekly singles and doubles, with forehand and backhand footwork drills.",
    "Competitive bridge (2014–2023). Tournament play from grade 1 through grade 9: bidding systems, partnership communication under incomplete information, and structured post-game review."
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
    image: "images/ppo_vs_attn_ppo_robot3_no_wait_dashes_no_value_arrows.png",
    imageFit: "contain",
    blurb:
      "Developed an attention-enhanced proximal policy optimization model that dispatches unmanned ground vehicles from aerial sensing, first in Open-RMF logistics and then in a search-and-rescue setting.",
    tags: ["PPO", "Open-RMF", "Reinforcement learning", "Python"],
    links: [],
    overview: [
      "I work in Prof. Qing Yang's lab at the University of North Texas, about 15 hours a week through the school year, on learned dispatching for unmanned ground vehicles.",
      "The dispatcher uses aerial sensing from a UAV. I studied task allocation first in an Open-RMF logistics environment, then adapted the same coordination problem to search and rescue, where a UAV locates targets and ground vehicles respond."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Developed an attention-enhanced proximal policy optimization model to dispatch unmanned ground vehicles using aerial sensing from a UAV.",
          "Implemented and evaluated scheduling simulations, analyzed the results, and revised the project when feasibility or the model itself got in the way.",
          "Prepared a first-author manuscript, submitted on August 1, 2026 to the IEEE Annual Congress on Artificial Intelligence of Things. It is still under review.",
          "In that manuscript, attention-enhanced PPO records the lowest total completion time and queue variance among the dispatchers compared on the reported test configuration."
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
          "Compares PPO-based UGV dispatching, including an attention-enhanced encoder, with A2C, DQN, greedy, and round-robin scheduling in an Open-RMF simulation.",
        href: "docs/Attn_PPO_Paper_Draft (1).pdf"
      }
    ],
    figuresHeading: "UAV-assisted UGV dispatching architecture",
    figures: [
      {
        src: "images/openrmfrl.png",
        wide: true,
        alt: "UAV-assisted UGV dispatching architecture in the Open-RMF airport-terminal simulation. The RL policy dispatches UGVs; UAV simulation supports target discovery and task notification.",
        caption:
          "UAV-assisted UGV dispatching architecture in the Open-RMF airport-terminal simulation. The RL policy dispatches UGVs; UAV simulation supports target discovery and task notification.",
        text: [
          "The RL policy dispatches UGVs; UAV simulation supports target discovery and task notification."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "autonomous-perception",
    kind: "experience",
    title: "Multi-Camera Occupancy Perception",
    role: "Research Assistant",
    org: "UNT Autonomous-Driving Perception Project",
    date: "Aug. 2025 — Present",
    image: "images/autodrive6camera.png",
    blurb:
      "Built on MMDetection to train Transformer and occupancy models that place nearby vehicles relative to the ego vehicle, and compared six-camera training with a single view.",
    tags: ["MMDetection", "Transformers", "Occupancy", "Multi-camera"],
    links: [],
    overview: [
      "About five hours a week through the school year, on a perception stack that reads the scene around a vehicle from cameras."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Used MMDetection as the base of a training pipeline that combines Transformer networks with occupancy modeling on multi-camera images.",
          "Worked on locating nearby vehicles relative to the ego vehicle, and compared how stable and how expensive six-view training is against a single view.",
          "Outlined a next step from perception into motion planning and trajectory prediction."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "stem-bridge",
    kind: "experience",
    title: "Wind-Turbine Condition Monitoring",
    role: "Team Researcher",
    org: "UT Dallas STEM Bridge, advised by Dr. Jie Zhang",
    date: "Summer 2025",
    image: "images/utdwind.png",
    imageFit: "contain",
    blurb:
      "Team project at UT Dallas: an LSTM that reads high-resolution generator signals and flags wind-turbine faults, tested on clean data and on noise at SNR 10.",
    tags: ["LSTM", "Condition monitoring", "Wind turbines", "Python"],
    links: [
      {
        label: "Yan, Senemmar, and Zhang, ASME J. Mech. Des. 2025",
        href: "https://doi.org/10.1115/1.4067056"
      }
    ],
    overview: [
      "Poster from the UT Dallas STEM Bridge camp: Machine Learning-Enabled Condition Monitoring of Wind Turbines Using High-Resolution Electrical Signals (UTD-011). I worked on it with Amanda Yin, Christopher Huang, Emily Yin, and Irene Liu. Advisor: Dr. Jie Zhang. Graduate assistants: Jingyi Yan and Fazlur Rahman Bin Karim.",
      "About 15 hours a week for six weeks. The team received the program's Best Science Education Award."
    ],
    details: [
      {
        heading: "Problem and motivation",
        points: [
          "Wind turbines sit in the middle of renewable power, and maintenance is expensive: about 38% of turbine spending goes to upkeep, and the generator accounts for about 17% of failures.",
          "The goal was a low-cost, reliable AI condition-monitoring system that keeps turbines running longer, cuts downtime, and makes wind energy more competitive."
        ]
      },
      {
        heading: "What plants monitor today",
        points: [
          "Gearbox: vibration, oil temperature, and particle count.",
          "Generator: temperature, vibration, insulation resistance, and SCADA data.",
          "Rotor blades: acoustic emissions and strain gauges.",
          "Main shaft and bearings: vibration and temperature.",
          "Tower and structure: accelerometers and tilt sensors.",
          "Typical sensors are accelerometers, thermocouples, oil-debris sensors, and current and voltage transducers."
        ]
      },
      {
        heading: "Technical approach",
        points: [
          "We started from the parts of a turbine, then learned data visualization and machine learning in Python.",
          "The monitor is a recurrent network trained on wind-turbine data to detect faults. It watches the generator, and specifically the windings.",
          "We used an LSTM rather than a plain RNN so the model can remember a time series without vanishing or exploding gradients. A hidden state carries information from one time step to the next."
        ]
      },
      {
        heading: "Results",
        points: [
          "On clean signals, training and validation were both perfect: F1 100% and accuracy 100%.",
          "With noise at SNR 10, training F1 was 96.1% and training accuracy was 62.6%. Validation dropped to 46.3% F1 and 46.0% accuracy."
        ]
      },
      {
        heading: "Conclusions",
        points: [
          "Machine-learning monitors can catch turbine faults and support maintenance decisions.",
          "Operations and maintenance spending grows with the wind market, so a data-driven monitor addresses a need that gets larger as the industry expands.",
          "The poster cites Yan, Senemmar, and Zhang, “Bi-Level Interturn Short-Circuit Fault Monitoring for Wind Turbine Generators With Benchmark Dataset Development,” ASME Journal of Mechanical Design, April 2025."
        ]
      }
    ],
    figuresHeading: "LSTM monitor",
    figures: [
      {
        src: "images/utdwind.png",
        wide: true,
        alt: "Wind turbine, generator windings, and an LSTM that reads the electrical signal over time",
        caption:
          "The monitor reads the generator windings as a time series and classifies the signal with an LSTM.",
        text: [
          "Current and voltage from the windings go in as the sequence x. The LSTM keeps a cell state and a hidden state so a fault pattern can show up across time, not only in a single sample."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "ayls",
    kind: "experience",
    title: "Youth Service and Fundraising",
    role: "Fundraising and Service Volunteer",
    org: "Alliance of Youth Leaders in the United States",
    date: "2023 — 2025",
    image: "images/alyus2.jpg",
    blurb:
      "Ran concession stands, raised about $300 for programs serving children with disabilities, packed donated books, and prepared meals with Feed My Starving Children.",
    tags: ["Fundraising", "Service"],
    links: [],
    overview: [
      "Grades 9–10, about an hour a week across the school year, with the Alliance of Youth Leaders in the United States."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Operated concession stands at community parks and personally raised approximately $300 for programs serving children with disabilities.",
          "Packed donated books for communities in Africa and prepared meal packages through Feed My Starving Children."
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
    org: "EkDrone Racing UAV Project",
    date: "Grades 11–12",
    image: "images/racingdrone2.png",
    blurb:
      "With three teammates, integrated a racing drone, tuned the power-to-weight balance and radio setup, and flew the prototype after a pre-flight checklist.",
    tags: ["UAV", "Flight tuning", "3D printing", "Fluid dynamics"],
    links: [],
    overview: [
      "A ten-week build, about 25 hours a week. I was responsible for getting the hardware to agree with itself and for the flying."
    ],
    details: [
      {
        heading: "Hardware and flight",
        points: [
          "Built the racing drone with three teammates. I took the lead on integrating hardware, checking that components were compatible, and tuning the receiver and remote-control parameters.",
          "Adjusted the power-to-weight balance and flight parameters for high-speed flying, using racing-drone materials and 3D-printed parts informed by a fluid-dynamics simulation.",
          "Wrote and ran a pre-flight risk checklist, managed flight operations, and conducted the maiden flight after the team had verified the system."
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
      "Grade 10, about 10 hours a week for eight weeks. I presented the project at the school science fair.",
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
