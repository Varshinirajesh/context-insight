import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  Server, 
  GitBranch, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Code,
  Database,
  Chrome,
  Zap,
  Settings,
  FileText
} from "lucide-react";

const ProjectBreakdown = () => {
  const taskBreakdown = {
    frontend: {
      title: "Frontend & Chrome Extension",
      icon: <Monitor className="h-5 w-5" />,
      difficulty: "Easy-Moderate",
      tasks: [
        {
          phase: "Phase 1: Basic Setup",
          items: [
            "Create React app with TypeScript",
            "Set up basic UI components (Input, Button, Results)",
            "Implement URL validation",
            "Add loading states and error handling",
            "Create responsive design system"
          ]
        },
        {
          phase: "Phase 2: Chrome Extension",
          items: [
            "Create manifest.json with necessary permissions",
            "Build popup interface",
            "Implement background script",
            "Add context menus for link checking"
          ]
        },
        {
          phase: "Phase 3: Advanced Features",
          items: [
            "Content script for hover detection",
            "Real-time link analysis",
            "Color-coded safety indicators",
            "Browser notification system",
            "Settings and preferences panel"
          ]
        }
      ]
    },
    backend: {
      title: "Backend & ML",
      icon: <Server className="h-5 w-5" />,
      difficulty: "Moderate",
      tasks: [
        {
          phase: "Phase 1: Environment Setup",
          items: [
            "Set up Python virtual environment",
            "Install required packages (Flask, scikit-learn, pandas)",
            "Create project structure",
            "Set up logging and configuration"
          ]
        },
        {
          phase: "Phase 2: Data & Model",
          items: [
            "Gather and prepare dataset",
            "Create feature_extractor.py",
            "Train initial model (Logistic Regression/Random Forest)",
            "Save model as .pkl file",
            "Implement model validation"
          ]
        },
        {
          phase: "Phase 3: API Development",
          items: [
            "Create Flask API with /predict endpoint",
            "Implement feature extraction pipeline",
            "Add explainability features",
            "Create response formatting",
            "Add rate limiting and security"
          ]
        }
      ]
    },
    devops: {
      title: "QA / DevOps / Integration",
      icon: <GitBranch className="h-5 w-5" />,
      difficulty: "Moderate-Difficult",
      tasks: [
        {
          phase: "Phase 1: Repository Setup",
          items: [
            "Initialize Git repository",
            "Create branching strategy (main, develop, feature/*)",
            "Set up GitHub project board",
            "Create issue templates",
            "Configure branch protection rules"
          ]
        },
        {
          phase: "Phase 2: Development Environment",
          items: [
            "Configure CORS for local development",
            "Set up environment variables",
            "Create Docker containers",
            "Implement local testing scripts"
          ]
        },
        {
          phase: "Phase 3: CI/CD & Deployment",
          items: [
            "Set up GitHub Actions workflows",
            "Configure automated testing (pytest, jest)",
            "Deploy backend to Render/Heroku",
            "Deploy frontend to Vercel/Netlify",
            "Set up monitoring and logging"
          ]
        }
      ]
    }
  };

  const fileStructure = {
    root: [
      "link-safety-checker/",
      "├── frontend/",
      "│   ├── src/",
      "│   │   ├── components/",
      "│   │   ├── hooks/",
      "│   │   ├── utils/",
      "│   │   └── App.tsx",
      "│   ├── public/",
      "│   └── package.json",
      "├── chrome-extension/",
      "│   ├── manifest.json",
      "│   ├── popup/",
      "│   ├── content/",
      "│   └── background/",
      "├── backend/",
      "│   ├── app.py",
      "│   ├── feature_extractor.py",
      "│   ├── models/",
      "│   ├── data/",
      "│   ├── tests/",
      "│   └── requirements.txt",
      "├── docs/",
      "│   ├── README.md",
      "│   ├── DEMO.md",
      "│   └── API.md",
      "├── .github/",
      "│   └── workflows/",
      "└── docker-compose.yml"
    ]
  };

  const roadmap = [
    {
      phase: "MVP (Week 1-2)",
      status: "current",
      items: [
        "Basic web interface",
        "Mock API responses",
        "Simple ML model",
        "Basic Chrome extension"
      ]
    },
    {
      phase: "Enhanced Features (Week 3-4)",
      status: "planned",
      items: [
        "Real-time scanning",
        "Improved ML accuracy",
        "Advanced Chrome integration",
        "User preferences"
      ]
    },
    {
      phase: "Production Ready (Week 5-6)",
      status: "future",
      items: [
        "Performance optimization",
        "Security hardening",
        "Comprehensive testing",
        "Documentation"
      ]
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Project Breakdown</h2>
        <p className="text-muted-foreground">
          Comprehensive task breakdown, file structure, and roadmap for your link safety checker
        </p>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Task Breakdown
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            File Structure
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Roadmap
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {Object.entries(taskBreakdown).map(([key, section]) => (
              <Card key={key} className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={section.difficulty.includes('Easy') ? 'default' : 'secondary'}>
                      {section.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.tasks.map((phase, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-sm text-primary">{phase.phase}</h4>
                      <ul className="space-y-1">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Recommended File Structure
              </CardTitle>
              <CardDescription>
                Organized structure for multi-component project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm">
                {fileStructure.root.map((line, index) => (
                  <div key={index} className="leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Chrome className="h-5 w-5" />
                  Chrome Extension
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div><strong>manifest.json</strong> - Extension configuration</div>
                  <div><strong>popup/</strong> - Extension popup interface</div>
                  <div><strong>content/</strong> - Content scripts for web pages</div>
                  <div><strong>background/</strong> - Background service worker</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backend API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div><strong>app.py</strong> - Flask application entry</div>
                  <div><strong>feature_extractor.py</strong> - ML feature extraction</div>
                  <div><strong>models/</strong> - Trained ML models</div>
                  <div><strong>tests/</strong> - Unit and integration tests</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  DevOps Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm space-y-1">
                  <div><strong>.github/workflows/</strong> - CI/CD pipelines</div>
                  <div><strong>docker-compose.yml</strong> - Container orchestration</div>
                  <div><strong>docs/</strong> - Project documentation</div>
                  <div><strong>README.md</strong> - Project overview</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <div className="space-y-4">
            {roadmap.map((phase, index) => (
              <Card key={index} className={`border-l-4 ${
                phase.status === 'current' ? 'border-l-primary' :
                phase.status === 'planned' ? 'border-l-warning' : 'border-l-muted'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{phase.phase}</span>
                    <Badge variant={
                      phase.status === 'current' ? 'default' :
                      phase.status === 'planned' ? 'secondary' : 'outline'
                    }>
                      {phase.status === 'current' ? 'In Progress' :
                       phase.status === 'planned' ? 'Planned' : 'Future'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    {phase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm">
                        {phase.status === 'current' ? 
                          <Zap className="h-3 w-3 text-primary" /> :
                          phase.status === 'planned' ?
                          <Clock className="h-3 w-3 text-warning" /> :
                          <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                        }
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectBreakdown;