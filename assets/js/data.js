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
  gpa: "3.889 / 4.00",
  email: "",
  github: "",
  resume: "docs/al_resume_1.pdf",
  about: [
    "I'm a student at the Texas Academy of Mathematics and Science at the University of North Texas in Denton (August 2025–May 2027, expected). TAMS is a residential early-college program; I take university coursework in grades 11–12. My current GPA is 3.889/4.00.",
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
      items: "Python, Java, C++"
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
    figuresHeading: "The dispatcher",
    figures: [
      {
        src: "images/ppo_vs_attn_ppo_robot3_no_wait_dashes_no_value_arrows.png",
        wide: true,
        alt: "Diagram comparing an MLP PPO policy with an attention-enhanced PPO that tokenizes robots and tasks",
        caption:
          "Same PPO update loop; Attn-PPO swaps the flat observation vector for masked attention over robot and task tokens.",
        text: [
          "The policy still chooses among three ground robots or waiting. The attention encoder is there so the dispatcher can reason about which robot and which task belong together, instead of mixing a single 63-dimensional vector through an MLP."
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
    image: "",
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
      "With a team at UT Dallas, prototyped a low-cost, data-driven monitor that looks for generator faults in high-resolution electrical signals from wind turbines.",
    tags: ["Machine learning", "Condition monitoring", "Wind turbines"],
    links: [],
    overview: [
      "Six-week summer research camp, about 15 hours a week, on machine-learning methods for wind-turbine condition monitoring. The team received the program's Best Science Education Award."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Worked under Dr. Jie Zhang on models that read high-resolution electrical signals from the generator.",
          "Helped prototype a low-cost monitor aimed at generator faults, unplanned downtime, and maintenance decisions. Maintenance is about 38% of operating cost, and the generator accounts for about 17% of turbine failures.",
          "Tied model performance back to those operating constraints and presented the project with the team."
        ]
      }
    ],
    documents: [
      {
        kicker: "Poster",
        title:
          "Machine Learning-Enabled Condition Monitoring of Wind Turbines Using High-Resolution Electrical Signals",
        authors:
          "Amanda Yin, Christopher Huang, Emily Yin, Irene Liu, Tianyu Lu. Advisor: Jie Zhang.",
        venue: "UT Dallas STEM Bridge Summer Research Camp, 2025",
        summary:
          "A data-driven condition-monitoring approach for wind-turbine generators, presented by the team that received the camp's Best Science Education Award.",
        href: "docs/2025 UTD STEM Bridge Final Poster_Group 11.pdf"
      }
    ],
    figuresHeading: "The signal path",
    figures: [
      {
        src: "images/utdwind.png",
        wide: true,
        alt: "Diagram from a wind turbine and generator windings into an LSTM condition-monitoring model",
        caption:
          "Generator electrical signals as the input to a learned condition monitor.",
        text: [
          "The camp project treats the generator's electrical waveform as the measurement, and asks a model to flag faults early enough to matter for maintenance."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "ximalaya",
    kind: "experience",
    title: "Engineering Podcasts on Ximalaya",
    role: "Founder, Host, and Producer",
    org: "Ximalaya audio channel",
    date: "2018 — Present",
    image: "",
    blurb:
      "A long-running Chinese-language channel: 23 new episodes since late 2025, split between engineering-accident reconstructions and notes on learning autonomous driving. About 16.8k plays.",
    tags: ["Podcasting", "Technical writing", "Autonomous driving"],
    links: [],
    overview: [
      "About two hours a week. I started posting recitations and English dubbing in 2018, which is where the recording habit comes from, and relaunched the channel in late 2025."
    ],
    details: [
      {
        heading: "The shows",
        points: [
          "23 original episodes so far: 15 of Engineering Insights and 8 of Self-Driving Beginner's Journal.",
          "For Engineering Insights I read documented engineering accidents, reconstruct the technical decisions behind them, and turn the failure into a script for a general audience.",
          "Self-Driving Beginner's Journal is a set of learning notes on autonomous driving, including places I had to correct an earlier misunderstanding.",
          "Together the programs have about 16.8k plays."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "physics-club",
    kind: "experience",
    title: "Jasper High School Physics Club",
    role: "Founder and President",
    org: "Jasper High School, Plano",
    date: "2024 — 2025",
    image: "",
    blurb:
      "Founded the school's first physics club, grew it past 60 members, and coached a Physics Bowl team that finished second in Texas.",
    tags: ["Physics Bowl", "Teaching", "Club leadership"],
    links: [],
    overview: [
      "Grade 10 at Jasper, about two hours a week across the school year. I handed the club to a successor when I left for TAMS."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Founded the school's first physics club and recruited more than 60 members.",
          "Planned recurring workshops on college-level physics, with explanations, demonstrations, and practice problems.",
          "Formed and coached a Physics Bowl team that earned second place in Texas, Region 11, Division 1."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "mu-alpha-theta",
    kind: "experience",
    title: "Physics Competition Preparation",
    role: "Physics Competition Committee Head",
    org: "Mu Alpha Theta, TAMS",
    date: "2026 — Present",
    image: "",
    blurb:
      "Lead weekly mechanics sessions for students preparing for physics contests, working through past F=ma problems and a problem bank built from old exams.",
    tags: ["F=ma", "Mechanics", "Teaching"],
    links: [],
    overview: [
      "About two hours a week during the school year, running the physics side of contest prep at TAMS."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Lead weekly mechanics sessions and work through past F=ma problems with students preparing for physics competitions.",
          "Assembled a reusable problem bank from prior exams so practice and discussion have a shared set of questions."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "math-tutor",
    kind: "experience",
    title: "Elementary Mathematics Tutoring",
    role: "Volunteer Mathematics Tutor",
    org: "Stephens Elementary School",
    date: "Aug. 2025 — Present",
    image: "",
    blurb:
      "Tutor about 20 fourth- and fifth-graders in small groups, and organized MathFun, a game session built around mathematical reasoning.",
    tags: ["Tutoring", "Mathematics"],
    links: [],
    overview: [
      "About an hour and a half a week for roughly ten weeks of the year, with fourth- and fifth-grade students at Stephens Elementary."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Tutor 20 students through weekly small-group instruction and problem-solving practice.",
          "Organized MathFun, a game-based session meant to pull students into mathematical reasoning through accessible challenges."
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
    image: "",
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
    image: "",
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
    id: "wing-washout",
    kind: "project",
    title: "Wing Washout Aerodynamics Study",
    role: "Organizer",
    org: "School science project",
    date: "2024 — 2025",
    image: "",
    blurb:
      "Used ANSYS Fluent to study how wing washout can delay tip stall on a simplified commercial-aircraft wing, and where that twist costs efficiency.",
    tags: ["ANSYS Fluent", "SST k-omega", "Aerodynamics"],
    links: [],
    overview: [
      "Grade 10, about 10 hours a week for eight weeks. I presented the project at the school science fair."
    ],
    details: [
      {
        heading: "The study",
        points: [
          "Looked at how wing washout can delay wing-tip stall, and at the efficiency tradeoff that twist introduces, on a simplified commercial-aircraft wing.",
          "Built and meshed the model in ANSYS Fluent, compared several washout and angle-of-attack cases, and used the runs to mark a promising design range rather than a universal aircraft fix.",
          "Cleared negative-volume mesh errors with local refinement and boundary-layer settings, and used the SST k-omega model for the vortical flow.",
          "Documented that the numerical results still need to be checked against reference or experimental data."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "marble-sorter",
    kind: "project",
    title: "Material Marble Sorter",
    role: "Engineering Project Team Member",
    org: "School engineering project",
    date: "2024 — 2025",
    image: "",
    blurb:
      "A sorter that routes wood, glass, and metal marbles. Unreliable glass detection, caused by similar colors, was fixed by marking the exit so the sensor could see glass consistently.",
    tags: ["Sensing", "Prototyping"],
    links: [],
    overview: [
      "Grade 10, about eight hours a week for four weeks, on a small sorting machine."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Built a system that distinguishes and routes wood, glass, and metal marbles from material and color.",
          "Traced unreliable glass detection to marbles whose color was too close to the background, and added blue tape at the exit so the sensor registered glass as it passed."
        ]
      }
    ],
    gallery: []
  }
];
